# Estado da compatibilidade com VisuAlg 3.0.7

Os itens de linguagem que antes estavam classificados como parciais ou não suportados foram implementados no runtime compartilhado pelo navegador e pelo Electron.

## Fechado

- Funções internas matemáticas, trigonométricas, de conversão e texto, com validação de aridade, tipo e domínio.
- `pi`/`pi()` e `rand`/`rand()` como funções internas sem parâmetros.
- Curto-circuito de `e` e `ou`; `xou` avalia os dois operandos porque depende de ambos.
- Comparações encadeadas por pares adjacentes, com avaliação única dos operandos.
- Repetição automática de `leia` após entrada inválida.
- Aspas duplicadas dentro de strings; escapes com barra invertida continuam disponíveis como extensão Web.
- `aleatorio`, incluindo `on`, `off`, faixa padrão, limite único e intervalo mínimo/máximo.
- `timer`, `pausa`, `debug`, `eco` e `cronometro`.
- `arquivo`, com leitura sequencial e gravação das primeiras entradas.
- Semântica clássica de `retorne`: define o retorno sem encerrar antecipadamente o restante da função.
- Aliases `função`, `caracter`, `caráter`, `literal`, `numerico` e `declare`.

## Adaptação de plataforma

O navegador não tem autorização para abrir silenciosamente um caminho arbitrário do computador. Por isso, `arquivo "nome.txt"` usa uma área persistente da origem Web. No Electron, o mesmo comando usa um arquivo de texto físico na pasta de dados do aplicativo. Lexer, parser, análise semântica e executor são os mesmos nas duas plataformas.

## Verificação automatizada

`npm run test:p0` executa:

- regressões semânticas e todos os exemplos completos da documentação;
- programas padrão de entrada, saída, controle de fluxo, vetores e subprogramas;
- matriz legada com todas as funções internas e comandos especiais;
- isolamento Electron, CSP, IPC e proteção de caminhos/links simbólicos.

O contrato detalhado está em `src/docs/compatibilidade.md`. Diferenças futuras encontradas contra o binário 3.0.7 devem entrar primeiro como teste de reprodução e só então como alteração do runtime.


• Minha leitura: o núcleo do VisuAlg Web está próximo de 1.0, mas eu ainda não removeria o “Beta”. A linguagem está forte; o que falta é maturidade de lançamento.

  Hoje eu estimaria:

  - Núcleo funcional: aproximadamente 85%.
  - Preparação para produção: aproximadamente 60%.
  - Desktop distribuível: aproximadamente 40%.

  ## Bloqueadores para a versão 1.0

  1. Testes reais da interface — concluído para a v0.14

  A suíte Playwright cobre abertura/execução de exemplos, F8, F9, Parar, `leia`
  inline e modal, abertura/salvamento `.alg`, abas e recuperação, visibilidade
  dos painéis, navegação de erros e onboarding. O workflow
  `.github/workflows/ci.yml` executa os testes no Chrome, Edge e Firefox. O
  comando `npm run lint` agora executa ESLint de verdade.

  2. Garantia contra perda de código

  Autosave e recuperação já existem, mas para 1.0 eu exigiria:

  - Teste com armazenamento cheio ou indisponível.
  - Aviso persistente quando o salvamento falhar.
  - Exportação de todas as abas como backup.
  - Recuperação de workspace corrompido.
  - Migração versionada do formato do workspace.
  - Teste de fechamento inesperado do navegador/aplicativo.

  3. Segurança da versão Electron — concluído

  A camada Electron agora possui CSP, isolamento e sandbox explícitos, bloqueio
  de navegação/pop-ups/permissões, inventário mínimo de IPC e validação do
  comando `arquivo` contra travessia e links simbólicos. A configuração está em
  `electron/main.js`, a camada de arquivos em `electron/data-files.mjs` e a
  regressão em `scripts/electron-security-check.mjs`.

  4. Distribuição desktop real

  O Electron empacota, mas isso ainda não significa um aplicativo pronto para o público.

  Para chamar o desktop de 1.0 faltam:

  - Instalador Windows testado em Windows 10 e 11.
  - Ícone, nome do publicador e metadados finais.
  - Assinatura digital do executável.
  - Associação opcional com arquivos .alg.
  - Processo de atualização.
  - Teste de instalação, atualização e desinstalação.
  - Artefatos com checksums.
  - Processo de release reproduzível.

  Os makers existem em forge.config.js:8, mas não há assinatura ou atualização configurada.

  5. Acessibilidade

  A interface possui alguns atributos ARIA, mas ainda falta uma revisão completa:

  - Navegação integral por teclado.
  - Foco preso corretamente dentro dos modais.
  - Retorno do foco ao fechar modal.
  - Leitura adequada por leitor de tela.
  - Contraste em todos os temas.
  - Tamanho mínimo de áreas clicáveis.
  - Uso com zoom de 200%.
  - Mensagens que não dependam apenas de cor.

  6. Validação com alunos e professores

  “1.0” precisa ser validada fora do ambiente de desenvolvimento.

  Critério recomendado:

  - Pelo menos 10 alunos e 3 professores.
  - Primeiro algoritmo executado sem ajuda.
  - Aula completa sem perda de código.
  - Arquivos .alg reais abertos e executados.
  - Registro e correção dos problemas encontrados.
  - Nenhum erro crítico durante pelo menos duas semanas de uso.

  7. Documentação e governança — base concluída

  A raiz agora inclui `LICENSE`, `SECURITY.md`, `SUPPORT.md`,
  `COMPATIBILITY.md`, `PRIVACY.md` e `RELEASE_CHECKLIST.md`. O GitHub possui
  formulário estruturado para bugs e canal privado indicado para
  vulnerabilidades. Permanecem para o lançamento apenas as notas específicas
  da versão 1.0.

  8. Limpeza da identidade de versão — concluída para a v0.14

  O fork agora se chama VisuAlg Web, usa a versão `0.14.0` e preserva a
  continuidade da manutenção iniciada na `0.10`. As versões `0.9` e anteriores
  formam o legado do projeto-base. O projeto possui changelog próprio e mantém
  VisuAlg.dev como atribuição de origem. Para a
  futura 1.0 ainda será necessário remover a etiqueta “Beta” e automatizar a
  versão da interface a partir de uma única fonte.

  ## Corte recomendado

  Eu faria dois lançamentos separados:

  - VisuAlg Web 1.0: navegador estável e oficialmente suportado.
  - VisuAlg Desktop Preview: Electron ainda em validação.

  Para lançar o Web 1.0, os requisitos mínimos seriam:

  - CI e testes E2E.
  - Auditoria de perda de dados.
  - Revisão de acessibilidade.
  - Teste com alunos e professores.
  - Documentação legal e de suporte.
  - Duas semanas sem bugs críticos.
  - Changelog, versão e identidade atualizados.

  Recursos como conta, nuvem, colaboração e inteligência artificial não são necessários para a 1.0. Eles aumentariam o produto, mas não são bloqueadores. O que falta agora é confiança
  operacional, não mais funcionalidades da linguagem.
