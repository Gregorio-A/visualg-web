# Análise de problemas e melhorias do VisuAlg Web

Data da análise: 2026-06-30

Este arquivo lista os problemas atuais do projeto em ordem de prioridade. A prioridade considera impacto para alunos/professores, risco de executar algoritmos incorretamente, facilidade de diagnosticar erros e maturidade para publicação.

Status após v0.11: os itens P0 abaixo foram corrigidos no lançamento v0.11. Eles permanecem documentados como histórico do que foi tratado e como referência para regressões futuras.

## Evidências verificadas

- `npm run build:web` passa, mas com avisos de scripts não empacotados e fontes ausentes.
- `npm run lint` não valida nada; apenas imprime `No linting configured`.
- 29 exemplos completos dentro de `src/docs/*.md` passam pelo lexer, parser e executor.
- Capturas desktop e mobile renderizam, mas a versão mobile mostra rolagem horizontal no editor e controles comprimidos.
- Antes da v0.11, testes manuais de comportamento confirmaram que tokens inválidos, comandos não suportados e comandos fora de contexto podiam passar sem erro. Esses casos agora devem gerar erro explícito.

## Escala de prioridade

- P0: corrige execução errada, falso sucesso ou perda/confusão grave para o usuário.
- P1: melhora compatibilidade com VisuAlg 3.0.7 e fecha lacunas da linguagem.
- P2: melhora UX, depuração e experiência didática.
- P3: reduz dívida técnica e risco de manutenção.
- P4: polimento, produto, publicação e melhorias incrementais.

---

## P0 - Correção semântica e confiabilidade corrigida na v0.11

### 1. Corrigido v0.11 - O lexer ignorava caracteres desconhecidos em vez de gerar erro

Antes da v0.11, caracteres não reconhecidos caíam no `default` do lexer e eram simplesmente descartados. Isso permitia que um código inválido rodasse como se estivesse correto.

Exemplo confirmado:

```visualg
algoritmo "t"
var
  x: inteiro
inicio
  x @ <- 1
  escreval(x)
fimalgoritmo
```

Resultado anterior: imprime `1`.  
Resultado desejado: erro léxico na linha do caractere `@`.

Feito na v0.11:

- Gerar erro para qualquer caractere/token desconhecido.
- Incluir linha e coluna no erro.
- Tratar string sem aspas de fechamento como erro.
- Tratar comentário em bloco `{ ...` sem `}` como erro.
- Não permitir que símbolos perdidos alterem silenciosamente a intenção do aluno.

### 2. Corrigido v0.11 - Palavras-chave reconhecidas pelo editor, mas não suportadas pelo executor, eram ignoradas

O editor destaca comandos como `pausa`, `debug`, `eco`, `cronometro`, `timer`, `aleatorio` e `arquivo`, mas o parser os pula como `Unknown keyword`.

Exemplo confirmado:

```visualg
algoritmo "t"
inicio
  pausa
  escreval("depois")
fimalgoritmo
```

Resultado anterior: imprime `depois`.  
Resultado desejado: ou implementar o comando, ou mostrar erro claro: `Comando "pausa" ainda não é suportado no VisuAlg Web`.

Feito na v0.11:

- Remover esses comandos do highlight se não forem suportados.
- Ou manter o highlight e gerar erro explícito no parser.
- Evitar documentação e editor indicando recursos que não existem.

### 3. Corrigido v0.11 - `interrompa` fora de laço encerrava fluxo sem erro

Exemplo confirmado:

```visualg
algoritmo "t"
inicio
  escreval("antes")
  interrompa
  escreval("depois")
fimalgoritmo
```

Resultado anterior: imprime apenas `antes`, sem erro.  
Resultado desejado: erro semântico dizendo que `interrompa` só pode ser usado dentro de laços.

Feito na v0.11:

- Criar validação de contexto antes da execução.
- Rastrear profundidade de laço no parser/analisador semântico.
- Rejeitar `interrompa` fora de `para`, `enquanto`, `repita...ate` e `repita...fimrepita`.

### 4. Corrigido v0.11 - `retorne` fora de função encerrava fluxo sem erro

Exemplo confirmado:

```visualg
algoritmo "t"
inicio
  escreval("antes")
  retorne 1
  escreval("depois")
fimalgoritmo
```

Resultado anterior: imprime apenas `antes`, sem erro.  
Resultado desejado: erro semântico dizendo que `retorne` só pode aparecer dentro de função.

Feito na v0.11:

- Rastrear contexto de função/procedimento.
- Rejeitar `retorne` no programa principal e em procedimentos, se a regra adotada for a do VisuAlg clássico.
- Validar que toda função retorna valor compatível com seu tipo.

### 5. Corrigido v0.11 - Tipos eram coercidos silenciosamente

O executor converte valores inválidos para `0`, `0.0`, string ou booleano sem avisar. Isso mascara erros didáticos importantes.

Exemplo confirmado:

```visualg
algoritmo "t"
var
  x: inteiro
inicio
  x <- "abc"
  escreval(x)
fimalgoritmo
```

Resultado anterior: imprime `0`.  
Resultado desejado: erro de tipo, ou pelo menos aviso configurável.

Feito na v0.11:

- Separar coerção de entrada (`leia`) de coerção de atribuição.
- Em atribuição e expressões, validar tipo estritamente.
- Mostrar mensagens como `Não é possível atribuir caractere a inteiro`.
- Decidir se o Web deve ser estrito por padrão, já que o público é educacional.

### 6. Corrigido v0.11 - Divisão por zero não era tratada

Exemplo confirmado:

```visualg
algoritmo "t"
var
  x: real
inicio
  x <- 1 / 0
  escreval(x)
fimalgoritmo
```

Resultado anterior: imprime `Infinity`.  
Resultado desejado: erro de execução com linha do problema.

Feito na v0.11:

- Validar divisão real, divisão inteira e `mod`.
- Rejeitar divisão por zero antes de retornar resultado JavaScript.
- Evitar `Infinity`, `-Infinity` e `NaN` no console e no painel de variáveis.

### 7. Corrigido v0.11 - Vetores não validavam limites, dimensões nem índices

Vetores são armazenados como objeto esparso e aceitam qualquer índice avaliado.

Exemplo confirmado:

```visualg
algoritmo "t"
var
  v: vetor [1..2] de inteiro
inicio
  v[99] <- 7
  escreval(v[99])
fimalgoritmo
```

Resultado anterior: imprime `7`.  
Resultado desejado: erro de índice fora do intervalo `1..2`.

Feito na v0.11:

- Avaliar e armazenar limites do vetor no momento da declaração.
- Validar quantidade de dimensões em acesso e atribuição.
- Validar se índices são inteiros.
- Validar se cada índice está dentro do intervalo declarado.
- Mostrar vetores no painel de variáveis de forma inspecionável.

### 8. Corrigido v0.11 - Assinaturas de funções e procedimentos não eram validadas

O executor aceita argumentos faltantes e extras silenciosamente.

Exemplos confirmados:

- Procedimento com parâmetro obrigatório chamado como `p()` usa valor padrão `0`.
- Procedimento com um parâmetro chamado como `p(1, 2)` ignora o argumento extra.

Feito na v0.11:

- Validar aridade exata na chamada.
- Validar tipo de cada argumento.
- Gerar erro para argumento extra ou faltante.
- Validar passagem por referência: parâmetro `var` deve receber variável simples compatível.
- Gerar erro claro quando `var` recebe expressão, literal ou chamada de função.

### 9. Corrigido v0.11 - Escopos e nomes precisavam de análise semântica real

Antes da v0.11, o parser fazia apenas validações pontuais. Faltava uma etapa dedicada para resolver símbolos antes da execução.

Feito na v0.11:

- Detectar nomes duplicados entre variáveis, funções e procedimentos.
- Validar colisões entre parâmetro e variável local.
- Validar uso de identificador antes de executar.
- Bloquear uso de palavra reservada como nome.
- Validar o limite de 30 caracteres em todos os identificadores, não só em variáveis declaradas.
- Validar tipos declarados; hoje qualquer `KEYWORD` pode acabar aceito como tipo em alguns pontos.

### 10. Corrigido v0.11 - Execução por abas usava estruturas globais demais

Editor, terminal e painel de variáveis são globais. A aba armazena algum estado, mas a execução ativa depende de UI global. Isso aumenta risco de estado errado ao alternar abas durante execução ou leitura.

Feito na v0.11:

- Isolar estado de execução por aba.
- Definir se múltiplas abas podem executar ao mesmo tempo. Se não puderem, bloquear troca/execução concorrente claramente.
- Preservar console, variáveis, highlight e status por aba.
- Cancelar leituras pendentes ao trocar/fechar aba em execução.

---

## P1 - Compatibilidade com VisuAlg e linguagem

### 11. Definir e documentar o alvo de compatibilidade

O projeto se apresenta como VisuAlg 3.0.7, mas implementa um subconjunto. Isso é aceitável, desde que o escopo seja explícito e testado.

A fazer:

- Criar uma tabela `suportado / parcial / não suportado`.
- Separar "compatível com VisuAlg" de "extensões do Web".
- Usar essa tabela como base para docs, syntax highlight e mensagens de erro.

### 12. `senao se` em uma linha não é suportado

Exemplo confirmado:

```visualg
algoritmo "t"
var
  x: inteiro
inicio
  x <- 2
  se x = 1 entao
    escreval("um")
  senao se x = 2 entao
    escreval("dois")
  fimse
fimalgoritmo
```

Resultado atual: erro `Esperado fimse`.  
A fazer:

- Decidir se `senao se` será suportado como açúcar sintático.
- Se não for, documentar a forma correta com `senao` seguido de `se` e dois `fimse`.
- Se for, ajustar parser para gerar bloco `else if`.

### 13. Funções sem parâmetros não podem ser chamadas sem parênteses

O parser aceita declarar `funcao f: inteiro`, mas `x <- f` é interpretado como variável, não chamada de função.

Resultado atual: `Variavel "f" nao declarada`.  
A fazer:

- Decidir se chamadas sem parênteses devem ser compatíveis com VisuAlg clássico.
- Se sim, resolver `VarRef` para função sem parâmetros quando o nome existir em `functions`.
- Se não, padronizar docs e mensagens: `use f()`.

### 14. Funções internas exigem parênteses, inclusive `pi`

`pi` sozinho é tratado como variável não declarada. Se o alvo for VisuAlg clássico, isso precisa ser comparado com o comportamento esperado.

A fazer:

- Decidir entre `pi` constante e `pi()` função.
- Atualizar documentação, autocomplete futuro e parser conforme decisão.

### 15. Compatibilidade de comandos especiais está indefinida

Atualmente `limpatela` e `interrompa` existem. `arquivo`, `aleatorio`, `timer`, `pausa`, `debug`, `eco` e `cronometro` não existem como linguagem.

A fazer:

- Decidir quais comandos do VisuAlg desktop entram no Web.
- Para comandos que dependem de arquivo/sistema, criar equivalentes web seguros.
- Para comandos não planejados, gerar erro explícito.

### 16. Operadores e precedência precisam ser validados contra o VisuAlg

Pontos a verificar:

- Associatividade de `^` está à esquerda no parser atual; muitas linguagens tratam potência à direita.
- `e`, `ou` e `xou` avaliam os dois lados sempre; não há curto-circuito.
- Comparações encadeadas podem produzir resultados JavaScript inesperados.
- Operações entre tipos diferentes usam semântica JS em vários casos.

A fazer:

- Montar matriz de precedência e associatividade baseada no VisuAlg 3.0.7.
- Criar testes para cada operador.
- Evitar que JS defina a regra por acidente.

### 17. Funções internas precisam de validação de aridade, domínio e tipo

Problemas prováveis:

- Chamar função sem argumento retorna erro JS ou `NaN`.
- `log(0)`, `log(-1)`, `arccos(2)` e casos similares não têm mensagens didáticas.
- `randi(0)` e limites negativos precisam de regra clara.
- `pos()` é case-sensitive por usar `String.indexOf`, enquanto comparações de string são case-insensitive.

A fazer:

- Validar número de argumentos por função.
- Validar domínio matemático.
- Padronizar sensibilidade a maiúsculas/minúsculas.
- Documentar diferenças inevitáveis.

### 18. Leitura (`leia`) precisa de semântica mais próxima da experiência didática

Hoje `leia` não mostra prompt próprio; depende do usuário escrever `escreva` antes. O modal mostra texto genérico.

A fazer:

- Mostrar o nome da variável que está sendo lida.
- Mostrar tipo esperado.
- Tratar cancelamento como interrupção controlada.
- Validar entrada por tipo antes de atribuir.
- Definir se entradas inválidas devem repetir pergunta ou gerar erro.

### 19. `escreva` e `escreval` exigem parênteses

Muitos materiais de Portugol aceitam variações sem parênteses. Se alunos trouxerem código de fora, isso pode gerar fricção.

A fazer:

- Confirmar regra do VisuAlg 3.0.7.
- Se for permitido, aceitar `escreval "texto"` e `leia x`.
- Se não for, melhorar a mensagem de erro.

### 20. Comentários e strings são muito permissivos em alguns casos e pouco completos em outros

A fazer:

- Erro para comentário em bloco sem fechamento.
- Erro para string sem fechamento.
- Definir suporte a aspas escapadas dentro de string.
- Garantir que comentário não altere contagem de linhas/colunas.

---

## P2 - Experiência do usuário e depuração

### 21. Mensagens de erro precisam apontar linha, coluna e trecho

Hoje alguns erros têm linha, outros não. Erros de execução geralmente não destacam a linha no editor.

A fazer:

- Adicionar coluna aos tokens.
- Propagar `line` para todos os nós da AST.
- Destacar linha de erro.
- Mostrar mensagem no console com formato consistente.
- Oferecer textos didáticos: causa provável e correção sugerida.

### 22. Passo a passo precisa ser mais previsível

A fazer:

- Indicar claramente a próxima linha antes de executar ou a linha recém-executada.
- Mostrar call stack quando entrar em função/procedimento.
- Permitir continuar execução normal a partir do modo passo a passo.
- Permitir parar uma leitura pendente sem deixar Promise aberta.

### 23. Faltam breakpoints e depuração condicional

Como o app se apresenta como ambiente de depuração, breakpoints seriam naturais.

A fazer:

- Clique na margem para breakpoint.
- Breakpoint condicional opcional.
- Painel de breakpoints.
- Integração com `debug <expressao>` se esse comando for implementado.

### 24. Painel de variáveis é limitado

Problemas:

- Vetores aparecem como `[object Object]` ou não são inspecionáveis de forma útil.
- Não há separação de escopo global/local.
- Não há call stack.
- Variáveis locais somem ou aparecem conforme execução sem explicação.

A fazer:

- Mostrar escopos: global, procedimento/função atual.
- Expandir vetores e matrizes.
- Mostrar alteração anterior/atual de forma persistente no passo a passo.
- Exibir tipo base de vetor separadamente.

### 25. UX mobile tem problemas visuais

Na captura mobile atual:

- O editor abre com rolagem horizontal grande.
- O handle vertical aparece sobre a barra horizontal do CodeMirror.
- Header e botões ficam muito comprimidos.
- Footer ocupa área relevante e quebra em duas linhas.
- Documentação e configurações precisam ser testadas em largura pequena.

A fazer:

- Considerar `lineWrapping` ligado por padrão no mobile.
- Reposicionar ou redesenhar o handle de resize mobile.
- Transformar footer em status compacto no mobile.
- Testar modal de documentação e configurações em 390px.
- Validar que botões têm área de toque suficiente.

### 26. Salvamento, abertura e estado de abas precisam de modelo de "arquivo modificado"

Hoje a confirmação de fechar aba compara o conteúdo com o template padrão. Isso não equivale a "foi modificado" nem "foi salvo".

A fazer:

- Rastrear `dirty` por aba.
- Marcar aba com indicador visual quando houver alteração não salva.
- Limpar `dirty` após salvar/abrir arquivo.
- Guardar nome de arquivo original quando possível.
- Evitar pedir confirmação para código salvo, mesmo que seja diferente do template.

### 27. Abertura de arquivo usa filtro de JavaScript pouco adequado

O app bloqueia texto com `<script>`, `onclick=`, `<style>` etc. Como arquivos `.alg` são tratados como texto e inseridos no CodeMirror, esse filtro pode gerar falso positivo em comentários ou strings.

A fazer:

- Remover filtro se não houver renderização HTML do código aberto.
- Se houver risco real, explicar ao usuário qual padrão foi bloqueado.
- Tratar encoding e arquivos grandes.

### 28. Configurações têm inconsistências de experiência

Pontos observados:

- Botão de tema alterna apenas dark/light, ignorando Monokai e alto contraste.
- Controle global de fonte altera editor, console e variáveis, mas não necessariamente documentação/modais.
- Inputs permitem valores extremos que podem quebrar layout.
- Preferências não têm botão de reset.

A fazer:

- Criar reset de configurações.
- Definir limites de fonte por área.
- Sincronizar tema do botão com tema selecionado.
- Aplicar fonte global de forma previsível ou renomear o recurso.

### 29. Documentação melhorou, mas ainda precisa virar contrato testado

A fazer:

- Rodar automaticamente todos os exemplos completos dos Markdown em CI.
- Documentar comandos não suportados em uma tabela geral.
- Adicionar seção "Diferenças para o VisuAlg desktop".
- Garantir que o README não contradiga `src/docs`.

---

## P3 - Dívida técnica e arquitetura

### 30. Não existe suíte de testes real

Esse é um dos maiores riscos do projeto. O interpretador é o núcleo do app e não há testes versionados.

A fazer:

- Criar testes unitários para lexer, parser e executor.
- Criar fixtures `.alg` com saída esperada.
- Testar erros esperados, não só casos felizes.
- Testar exemplos da documentação automaticamente.
- Adicionar testes de UI com Playwright ou equivalente para executar, parar, ler entrada e abrir docs.

### 31. `npm run lint` não valida código

A fazer:

- Configurar ESLint ou Biome.
- Padronizar estilo de JS.
- Validar HTML/CSS quando possível.
- Adicionar `npm run test` e `npm run check`.

### 32. Código usa muitos globais e IIFEs

Os módulos expõem objetos em `window` e dependem da ordem de scripts no HTML.

A fazer:

- Migrar gradualmente para módulos ES.
- Separar `core` do interpretador da UI.
- Permitir testar o interpretador no Node sem simular `window`.
- Evitar estado global compartilhado entre abas.

### 33. Script de resize está inline no HTML

O resize funciona, mas vive dentro de `src/index.html`, enquanto o resto da lógica está em `src/js`.

A fazer:

- Mover para `src/js/layout.js` ou módulo similar.
- Testar desktop e mobile.
- Salvar preferências de tamanho se isso for desejado.

### 34. Assets e build geram avisos

O build avisa que as fontes abaixo não existem:

- `src/fonts/MesloLGS-Regular.woff2`
- `src/fonts/MesloLGS-Bold.woff2`
- `src/fonts/FiraCode-Regular.woff2`
- `src/fonts/FiraCode-Bold.woff2`

Também há aviso de sourcemap ausente para `lucide.min.js.map` no servidor Vite.

A fazer:

- Adicionar as fontes ou remover os `@font-face`.
- Adicionar sourcemap vendor ou remover referência do arquivo minificado, se possível.
- Decidir se scripts vendor devem continuar copiados manualmente ou entrar no pipeline npm.

### 35. Vite não empacota os scripts da aplicação

O build mostra avisos porque os scripts são carregados como scripts clássicos, sem `type="module"`. O plugin copia diretórios manualmente para `dist`.

A fazer:

- Decidir se manter arquitetura "arquivos estáticos" ou migrar para módulos empacotados.
- Se manter, aceitar e documentar o aviso.
- Se migrar, importar módulos pelo Vite e reduzir cópia manual.

### 36. README está desatualizado

O README diz que os arquivos de documentação "não estão presentes", mas eles existem em `src/docs`.

A fazer:

- Atualizar seção de documentação interna.
- Adicionar status real do subconjunto da linguagem.
- Adicionar instrução de testes quando forem criados.
- Remover informações obsoletas ou transformar em histórico.

### 37. Electron está muito próximo do scaffold padrão

O app desktop funciona como wrapper básico, mas ainda faltam decisões de produto.

A fazer:

- Definir tamanho inicial mais adequado que `800x600`.
- Definir ícone de app no empacotamento.
- Definir menu do aplicativo.
- Definir política de segurança: CSP, permissões, navegação externa, links.
- Avaliar `contextIsolation`, `sandbox`, `nodeIntegration` e preload real.
- Testar `npm start`, `npm run package` e instaladores em cada plataforma alvo.

### 38. `dist/` existe no repositório de trabalho

Não está claro se `dist/` deve ser versionado. Se for artefato de build, tende a gerar ruído.

A fazer:

- Verificar `.gitignore` e política de publicação.
- Se `dist/` for artefato, garantir que não entre em commits.
- Se `dist/` for deploy estático, documentar fluxo de atualização.

---

## P4 - Polimento e produto

### 39. Changelog e versão estão hardcoded

O footer mostra `Visualg.dev v0.10`, enquanto `package.json` está em `1.0.0`.

A fazer:

- Definir uma única fonte de versão.
- Gerar versão no HTML a partir do build ou arquivo de metadata.
- Manter changelog em Markdown ou JSON.

### 40. Falta autocomplete e ajuda contextual

A fazer:

- Autocomplete de palavras-chave, tipos, funções internas e variáveis declaradas.
- Tooltips para funções internas.
- Inserção de snippets para `se`, `para`, `enquanto`, `funcao`, `procedimento`.

### 41. Falta formatação/indentação robusta

O autoindent atual é simples e reescreve todas as linhas. Ele pode mexer em alinhamentos e comentários.

A fazer:

- Criar formatador baseado em tokens/AST.
- Preservar comentários e linhas em branco.
- Testar casos com `escolha`, subprogramas e aninhamentos.

### 42. Falta persistência local de abas

A fazer:

- Salvar abas no `localStorage` ou IndexedDB.
- Recuperar sessão anterior.
- Oferecer "restaurar padrão" quando necessário.

### 43. Acessibilidade precisa de revisão

A fazer:

- Verificar navegação por teclado em modais e menus.
- Usar foco inicial e armadilha de foco nos modais.
- Adicionar `aria-label` em botões só com ícone.
- Validar contraste real em todos os temas.

### 44. Segurança da documentação Markdown precisa de decisão

Os Markdown são locais, mas `marked.parse` permite HTML por padrão dependendo da configuração da lib.

A fazer:

- Decidir se Markdown pode conter HTML.
- Sanitizar HTML se houver qualquer conteúdo editável/externo no futuro.
- Tratar erro de fetch com `response.ok`.

---

## Ordem sugerida de execução

1. Criar testes automatizados mínimos para lexer/parser/executor antes de refatorar.
2. Corrigir lexer para erro em token desconhecido, string aberta e comentário aberto.
3. Adicionar analisador semântico: escopos, tipos, aridade, contexto de `retorne`/`interrompa`.
4. Corrigir vetores, divisão por zero e coerções silenciosas.
5. Definir oficialmente o subconjunto de compatibilidade com VisuAlg 3.0.7.
6. Atualizar editor/docs/README para refletir exatamente o que roda.
7. Melhorar mensagens de erro e highlight da linha problemática.
8. Resolver estado por aba e leituras pendentes.
9. Revisar mobile e painéis de debug.
10. Limpar build/assets, mover resize inline e configurar lint/CI.

## Critério mínimo para considerar o projeto mais estável

- Nenhum token inválido passa silenciosamente.
- Nenhum comando não suportado passa silenciosamente.
- Erros de tipo, aridade, divisão por zero e vetor fora do limite são reportados.
- Todos os exemplos da documentação são testados automaticamente.
- README, docs, editor e executor descrevem o mesmo conjunto de recursos.
- Build não emite avisos inesperados.
- Há pelo menos uma suíte de regressão para programas `.alg`.
