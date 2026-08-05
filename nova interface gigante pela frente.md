## Diagnóstico geral

**Estado atual:** a interface já funciona bem como editor educacional de VisuAlg, mas ainda está organizada como uma aplicação de linguagem única, não como uma IDE expansível.

**Principal mudança necessária:** separar visualmente e tecnicamente o **núcleo da IDE** das funcionalidades específicas do VisuAlg.

A interface não precisa copiar o VS Code, mas deve adotar a mesma lógica estrutural: área de arquivos, editor central, painéis de execução e uma barra de status contextual. IDEs consolidadas permitem mover, recolher, redimensionar e restaurar painéis, além de persistir o layout do workspace. ([Visual Studio Code][1])

---

# 1. O que já está funcionando bem

**Editor como elemento principal:** o código ocupa a maior parte da tela, sem elementos decorativos desnecessários.

**Execução visível:** Executar, Passo a passo e Parar estão agrupados e fáceis de localizar.

**Painel de variáveis:** adequado para o objetivo educacional do VisuAlg.

**Console separado:** mantém a saída do programa fora do editor.

**Tema claro e escuro:** os dois mantêm a mesma estrutura e identidade.

**Barra de status:** já existe uma base para informar estado de execução, salvamento e versão.

**Interface pouco intimidadora:** importante para alunos que estão começando a programar.

O problema não está na identidade visual. Está na organização das funcionalidades e na capacidade de crescimento.

---

# 2. Problemas atuais da interface

| Área           | Problema                                                      | Alteração recomendada                                        |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| Barra superior | Muitos botões permanentes ocupando uma única linha            | Separar comandos em menus, grupos e paleta de comandos       |
| Arquivos       | Não existe explorador de projeto                              | Adicionar painel lateral de arquivos e pastas                |
| Aba            | “Nome do Aluno” parece um campo de formulário, não um arquivo | Usar nome de arquivo, extensão e indicador de modificação    |
| Editor         | Fonte muito grande para uso normal                            | Criar modos de densidade e zoom                              |
| Painel direito | Variáveis e console ficam sempre abertos                      | Torná-los recolhíveis, redimensionáveis e contextuais        |
| Console        | Não há uma área clara para entrada de dados                   | Criar entrada interativa quando `leia()` for executado       |
| Erros          | Não existe painel dedicado de problemas                       | Adicionar Problemas com erros, avisos e linha correspondente |
| Depuração      | Não aparecem pilha, escopo, observação ou linha atual         | Criar ambiente completo de depuração                         |
| Barra inferior | Informações estáticas ocupam espaço                           | Mostrar informações relacionadas ao arquivo e execução       |
| Escalabilidade | A interface pressupõe apenas VisuAlg                          | Introduzir linguagem, runtime e capacidades por adaptador    |
| Acessibilidade | Alguns textos e divisões possuem pouco contraste              | Ajustar tokens de contraste, foco e tamanho de controles     |
| Responsividade | A estrutura depende de tela larga                             | Transformar painéis em abas ou gavetas em telas menores      |

---

# 3. Barra superior

Atualmente existem três grupos misturados:

* execução;
* gerenciamento de arquivos;
* aprendizado e configuração.

Eles precisam ser separados.

## Estrutura recomendada

```text
Arquivo  Editar  Seleção  Executar  Exibir  Ajuda

[ Nome do projeto ]        [ Pesquisar comandos... ]

                    ▶ Executar  ▷ Depurar  ■ Parar

                                    Tema  Configurações  Conta
```

## Menu Arquivo

```text
Novo arquivo
Novo projeto
Abrir arquivo
Abrir pasta
Arquivos recentes
Salvar
Salvar como
Exportar projeto
```

## Menu Executar

```text
Executar arquivo
Executar projeto
Executar sem depuração
Iniciar depuração
Parar
Reiniciar
Passar para próxima linha
Entrar na função
Sair da função
```

## Menu Exibir

```text
Explorador
Pesquisar
Problemas
Console
Terminal
Variáveis
Depuração
Tela cheia
Modo de apresentação
```

## Paleta de comandos

**Paleta de comandos:** campo central acessível por `Ctrl + Shift + P` que permite localizar qualquer funcionalidade sem manter todos os botões visíveis.

Esse padrão evita que a barra superior cresça cada vez que uma linguagem ou ferramenta for adicionada. O VS Code utiliza a paleta como ponto central para comandos, configurações e alterações de layout. ([Visual Studio Code][2])

### Alterações específicas

**Exemplos:** mover para Ajuda, tela inicial ou painel de aprendizado.

**Documentação:** mover para Ajuda, mantendo um ícone contextual dentro do editor quando necessário.

**Indentar:** substituir por **Formatar documento** e disponibilizar pelo menu, atalho e clique direito.

**Salvar:** manter o botão apenas no modo simplificado; na IDE completa, o estado de salvamento deve aparecer principalmente na aba.

---

# 4. Organização principal da IDE

```text
┌───────────────────────────────────────────────────────────────────────┐
│ Menu        Projeto / comandos             Executar     Configurações │
├────┬────────────────┬──────────────────────────────┬──────────────────┤
│    │ EXPLORADOR     │ arquivo.alg                  │ DEPURAÇÃO        │
│ A  │                ├──────────────────────────────┤ Variáveis locais │
│ T  │ projeto/       │                              │ Observações      │
│ I  │ ├─ principal  │          EDITOR              │ Pilha de chamadas│
│ V  │ ├─ funcoes    │                              │ Breakpoints      │
│ I  │ └─ dados      │                              │                  │
│ D  │                │                              │                  │
│ A  ├────────────────┴──────────────────────────────┴──────────────────┤
│ D  │ PROBLEMAS | CONSOLE | SAÍDA | TERMINAL                          │
│ E  │                                                                │
├────┴─────────────────────────────────────────────────────────────────┤
│ Pronto | 0 erros | VisuAlg | UTF-8 | Ln 8, Col 12 | Salvo localmente│
└───────────────────────────────────────────────────────────────────────┘
```

## Barra lateral de atividades

Use uma barra estreita com poucos itens:

```text
Explorador
Pesquisar
Executar e depurar
Exercícios
Extensões
```

“Extensões” pode permanecer oculto até existir uma arquitetura real de plugins.

## Painel inferior

O console não deveria ocupar permanentemente a lateral direita.

Estrutura recomendada:

```text
Problemas | Console | Saída | Terminal
```

Isso mantém o editor mais largo e permite mostrar apenas o painel necessário.

## Painel direito

Reservar principalmente para depuração:

```text
Variáveis
Observações
Pilha de chamadas
Breakpoints
```

Durante uma execução normal, ele pode permanecer fechado.

---

# 5. Abas e arquivos

A aba atual chamada **Nome do Aluno** não comunica claramente que representa um arquivo.

## Formato recomendado

```text
principal.alg
```

ou:

```text
● principal.alg
```

O ponto indica alterações ainda não salvas.

## Informações necessárias

```text
Ícone da linguagem
Nome do arquivo
Indicador de modificação
Botão de fechar
Menu contextual
```

## Menu contextual da aba

```text
Salvar
Salvar como
Fechar
Fechar outras
Fechar arquivos à direita
Copiar caminho
Renomear
```

O nome do aluno deve ser uma informação do projeto ou exercício, não o nome da aba:

```text
Projeto: Introdução a Variáveis
Aluno: João da Silva
Arquivo: principal.alg
```

---

# 6. Editor de código

## Alterações visuais

**Fonte padrão:** aproximadamente 15 ou 16 px para uso normal.

**Modo Aula:** 20 a 26 px para projeção em sala.

**Altura de linha:** configurável.

**Guias de indentação:** linhas verticais discretas mostrando os blocos.

**Linha atual:** fundo levemente diferente.

**Margem de depuração:** espaço à esquerda para breakpoints e indicador de execução.

**Rolagem:** reduzir o grande espaço vazio depois da última linha ou torná-lo configurável.

**Minimapa:** opcional e desabilitado por padrão para iniciantes.

## Recursos faltantes

```text
Busca e substituição
Desfazer e refazer
Seleção múltipla
Autocomplete
Snippets
Destaque de pares
Fechamento automático de parênteses e aspas
Formatação
Renomeação de símbolos
Ir para definição
Hover com documentação
Erros diretamente na linha
Ações rápidas
```

O Monaco já fornece opções para acessibilidade, guias, autocomplete, formatação, destaque semântico, dobramento, minimapa, indicadores de erro e suporte a leitores de tela. A aplicação deve centralizar essas configurações em um serviço do editor, em vez de configurá-las diretamente em cada linguagem. ([Microsoft no GitHub][3])

---

# 7. Console

O console atual possui aparência de painel, mas ainda não comunica claramente como o usuário interage com ele.

## Estrutura recomendada

```text
CONSOLE                                         Limpar  Copiar  Maximizar

> Programa iniciado

Qual é o seu nome?
> João

Olá João

> Processo finalizado com código 0 em 0,04 s
```

## Estados visuais

**Saída normal:** texto padrão.

**Entrada do usuário:** campo ou linha destacada.

**Erro:** mensagem acompanhada de arquivo, linha e coluna.

**Aviso:** informação não bloqueante.

**Execução:** indicador animado discreto.

**Finalização:** código de saída e tempo.

Quando o programa executar `leia()`, o foco deve ir automaticamente para a entrada do console, sem exigir que o aluno procure onde digitar.

## Controles necessários

```text
Limpar console
Copiar saída
Interromper
Reiniciar
Maximizar painel
Manter console aberto
Rolagem automática
```

---

# 8. Painel de problemas

Este é um dos maiores recursos ausentes.

```text
PROBLEMAS

Erro    principal.alg:4:10
        Era esperado um tipo após o nome da variável.

Aviso   principal.alg:11:5
        A variável "nome" pode não ter sido inicializada.
```

Ao clicar no problema:

1. abrir o arquivo;
2. mover o cursor para a linha;
3. destacar o trecho;
4. mostrar uma explicação curta;
5. oferecer correção quando possível.

Para alunos iniciantes, uma mensagem como:

```text
Erro de sintaxe: token inesperado
```

é menos útil do que:

```text
A declaração da variável está incompleta.

Formato esperado:
nome: caractere
```

A IDE deve possuir dois níveis de mensagem:

```text
Mensagem técnica
Explicação educacional
```

---

# 9. Depuração

O VisuAlg já possui um forte potencial educacional para depuração, mas a interface atual mostra apenas uma tabela simples de variáveis.

## Estrutura completa

### Variáveis

```text
NOME       TIPO        VALOR        ESCOPO
nome       caractere   "João"       principal
idade      inteiro     24           principal
notas      vetor       [8, 7, 9]    principal
```

Vetores e registros devem ser expansíveis.

### Observações

Permitir que o aluno acompanhe expressões:

```text
idade >= 18
media
contador + 1
```

### Pilha de chamadas

```text
calcularMedia()
principal()
```

### Breakpoints

```text
principal.alg:8
funcoes.alg:15
```

### Indicadores no editor

```text
● Breakpoint
▶ Linha atual
! Exceção
```

Para suportar diferentes linguagens, a interface de depuração deve ser genérica. O Debug Adapter Protocol existe exatamente para separar a interface da IDE do depurador específico de cada runtime. ([Microsoft no GitHub][4])

---

# 10. Barra de status

A barra atual possui muitas informações institucionais e poucas informações do arquivo.

## Barra recomendada

### Lado esquerdo

```text
Pronto
0 erros
0 avisos
Execução local
```

### Lado direito

```text
VisuAlg
VisuAlg 3.0.7
Ln 8, Col 12
Espaços: 4
UTF-8
LF
Salvo localmente
```

## Mover para “Sobre”

```text
VisuAlg Web v0.14
Origem e créditos
Autores
Licenças
Repositório
```

Essas informações não precisam permanecer visíveis durante toda a programação.

---

# 11. Temas claro e escuro

## Tema claro

O fundo atual utiliza muitos tons azulados próximos. Isso reduz a separação entre:

* editor;
* painel;
* cabeçalho;
* abas;
* barra inferior.

Use uma escala de superfícies:

```text
background-page
background-toolbar
background-editor
background-panel
background-hover
background-selected
```

## Tema escuro

No tema escuro, editor, console e painel lateral possuem valores muito próximos. A interface fica visualmente plana.

Use:

```text
Diferença sutil de luminosidade
Bordas de 1 px
Estado hover
Estado selecionado
Sombras apenas em elementos flutuantes
```

## Cores de sintaxe

Algumas cores claras, especialmente cinza, azul e roxo, podem perder contraste dependendo da tela.

A WCAG 2.2 recomenda contraste mínimo de 4,5:1 para textos comuns, contraste perceptível para componentes não textuais e foco de teclado visível. Os alvos interativos também precisam manter tamanho e espaçamento suficientes. ([W3C][5])

## Tokens semânticos

Evite valores espalhados diretamente pelo CSS.

```css
--surface-app
--surface-toolbar
--surface-editor
--surface-panel
--surface-selected

--text-primary
--text-secondary
--text-disabled

--border-default
--border-active

--status-success
--status-warning
--status-error
--status-info

--syntax-keyword
--syntax-string
--syntax-number
--syntax-type
--syntax-comment
```

Isso permite criar novos temas sem reescrever componentes.

---

# 12. Modos de interface

Uma IDE educacional não deve obrigar um iniciante a utilizar a mesma interface de um desenvolvedor avançado.

## Modo Aula

```text
Editor grande
Console
Executar
Passo a passo
Parar
Fonte ampliada
Poucos menus
```

## Modo Padrão

```text
Explorador
Editor
Problemas
Console
Barra de status completa
```

## Modo Depuração

```text
Editor
Variáveis
Observações
Pilha de chamadas
Breakpoints
Console
```

## Modo Apresentação

```text
Fonte ampliada
Menus reduzidos
Painéis ocultos
Contraste elevado
Atalhos simplificados
```

Essa abordagem mantém o piso baixo para iniciantes sem limitar o teto da aplicação.

---

# 13. Estrutura para várias linguagens

A interface não deve conhecer detalhes internos do VisuAlg.

## Estrutura recomendada

```text
Workbench
├── CommandService
├── WorkspaceService
├── EditorService
├── PanelService
├── ThemeService
├── StorageService
├── DiagnosticService
├── ExecutionService
├── DebugService
└── LanguageRegistry
    ├── VisuAlgAdapter
    ├── PythonAdapter
    ├── JavaScriptAdapter
    └── FutureLanguageAdapter
```

## Adaptador de linguagem

```ts
interface LanguageAdapter {
  id: string;
  name: string;
  extensions: string[];

  syntax: SyntaxProvider;
  diagnostics?: DiagnosticsProvider;
  completion?: CompletionProvider;
  formatter?: FormatterProvider;
  runner?: RunnerProvider;
  debugger?: DebuggerProvider;
  templates?: TemplateProvider;

  capabilities: {
    execution: boolean;
    debugging: boolean;
    packages: boolean;
    multipleFiles: boolean;
    terminal: boolean;
  };
}
```

## Responsabilidades

**SyntaxProvider:** cores, tokens e estrutura básica.

**DiagnosticsProvider:** erros e avisos.

**CompletionProvider:** sugestões e documentação.

**FormatterProvider:** indentação e formatação.

**RunnerProvider:** execução do código.

**DebuggerProvider:** passo a passo, variáveis e breakpoints.

**TemplateProvider:** exemplos e projetos iniciais.

**Capabilities:** informa à interface quais botões e painéis devem aparecer.

Não use verificações espalhadas como:

```ts
if (language === "python") {
}
```

Esse padrão cresce mal e produz dependências entre todos os componentes.

Use:

```ts
activeLanguage.capabilities.debugging
```

---

# 14. LSP e DAP

## LSP

**Language Server Protocol:** padrão de comunicação entre a IDE e o componente responsável por autocomplete, erros, símbolos, referências e documentação.

A IDE implementa um único cliente LSP. Cada linguagem fornece seu servidor ou adaptador. O protocolo usa mensagens JSON-RPC e evita implementar uma integração completamente diferente para cada linguagem. ([Microsoft no GitHub][6])

## DAP

**Debug Adapter Protocol:** padrão equivalente para depuração, variáveis, breakpoints, pilha de chamadas e execução passo a passo. ([Microsoft no GitHub][4])

## Limitação importante

Nem todo servidor LSP ou depurador pode ser executado diretamente no navegador.

Possibilidades:

```text
Servidor compilado para WebAssembly
Servidor executado em Web Worker
Servidor remoto
Implementação simplificada própria
```

O VisuAlg pode inicialmente usar providers próprios e adotar interfaces compatíveis com os conceitos do LSP e DAP.

---

# 15. Execução das linguagens

## VisuAlg

```text
Interpretador atual
Execução local
Depuração controlada
Sem dependência de servidor
```

## JavaScript

```text
Web Worker
Limite de tempo
Console interceptado
DOM bloqueado ou disponibilizado apenas em projetos específicos
```

## Python

Python pode ser executado localmente com Pyodide.

```text
Pyodide
Web Worker
Sistema de arquivos virtual
Pacotes compatíveis com WebAssembly
```

A documentação do Pyodide recomenda Web Workers para impedir que execuções longas bloqueiem a interface. Interrupções também dependem de worker e de configurações específicas de isolamento entre origens. ([Pyodide][7])

## C, C++, Java e outras linguagens

Duas estratégias:

```text
Compilador convertido para WebAssembly
Execução remota em ambiente isolado
```

Nem todas as bibliotecas, chamadas de sistema, sockets ou pacotes funcionarão no navegador. WASI padroniza parte da interface entre aplicações WebAssembly e ambientes de execução, mas não transforma automaticamente qualquer linguagem ou biblioteca em uma aplicação web compatível. ([WASI][8])

---

# 16. Segurança da execução remota

Nunca execute o código enviado pelo usuário:

```text
No mesmo processo do servidor
Com acesso ao sistema de arquivos real
Com acesso às variáveis de ambiente
Com acesso ao banco de dados
Com acesso irrestrito à rede
Como root
```

Cada execução deve possuir:

```text
Ambiente descartável
Usuário sem privilégios
Diretório temporário isolado
Rede desabilitada por padrão
Limite de CPU
Limite de memória
Limite de tempo
Limite de processos
Limite de saída
Limite de tamanho dos arquivos
Remoção após a execução
```

Para isolamento mais forte, podem ser usados containers rootless combinados com tecnologias como gVisor ou microVMs. O gVisor foi projetado especificamente para executar código não confiável com uma camada adicional entre o programa e o kernel do host; a própria documentação ressalta que sandbox não substitui uma arquitetura segura completa. ([gVisor][9])

---

# 17. Tela inicial

Ao abrir a IDE sem arquivos:

```text
VISUALG WEB

Novo arquivo
Novo projeto
Abrir arquivo
Abrir pasta

Projetos recentes

Aprender
├─ Primeiro algoritmo
├─ Variáveis
├─ Condições
├─ Repetições
└─ Funções

Modelos
├─ Programa vazio
├─ Entrada e saída
├─ Média de notas
└─ Jogo de adivinhação
```

Para outras linguagens:

```text
Novo projeto

VisuAlg
Python
JavaScript
HTML, CSS e JavaScript
C
C++
```

---

# 18. Configurações

Organize por categorias pesquisáveis:

```text
Editor
Aparência
Arquivos
Execução
Depuração
Linguagens
Atalhos
Acessibilidade
Privacidade
Armazenamento
```

## Configurações importantes

```text
Tamanho da fonte
Altura da linha
Quebra automática
Minimapa
Guias de indentação
Fechamento automático
Formatação ao salvar
Salvamento automático
Tema
Contraste
Redução de animações
Atalhos
Modo Aula
```

Configurações globais e configurações específicas do projeto devem ser separadas. IDEs como o VS Code mantêm distinção entre preferências do usuário e preferências do workspace. ([Visual Studio Code][10])

---

# 19. Ordem recomendada de implementação

## Etapa 1 — Reorganização visual

```text
Painel inferior
Painéis recolhíveis
Redimensionamento
Nova barra de status
Abas com nomes de arquivos
Limpeza da barra superior
Tokens de tema
```

## Etapa 2 — Experiência educacional

```text
Console interativo
Painel de problemas
Mensagens educacionais
Modo Aula
Modo Depuração
Indicador da linha atual
Breakpoints
```

## Etapa 3 — Workspace

```text
Arquivos e pastas
Projetos
Renomear arquivos
Múltiplas abas
Salvamento automático
Recuperação após falha
Projetos recentes
```

## Etapa 4 — Arquitetura multilíngue

```text
LanguageRegistry
LanguageAdapter
ExecutionService
DiagnosticService
CommandRegistry
Capabilities
```

## Etapa 5 — Primeira linguagem adicional

Use Python como teste porque ele exige:

```text
Novo runtime
Entrada e saída
Sistema de arquivos
Pacotes
Interrupção
Erros diferentes
Formatação diferente
```

Executar Python pelo Pyodide em Web Worker expõe rapidamente falhas na arquitetura sem exigir inicialmente uma infraestrutura completa de compilação remota.

## Etapa 6 — Execução remota

```text
Fila de execução
Sandboxes descartáveis
Limites de recursos
Logs
Rate limiting
Controle de abuso
Monitoramento
```

---

# Direção visual recomendada

A identidade atual deve ser mantida, mas com esta mudança de modelo:

```text
Editor VisuAlg com painéis fixos
                ↓
Workbench educacional modular
                ↓
IDE web multilíngue
```

A decisão mais importante é implementar primeiro uma **shell de IDE independente de linguagem**. Adicionar Python diretamente à estrutura atual criaria botões condicionais, componentes duplicados e dependências difíceis de remover posteriormente.

[1]: https://code.visualstudio.com/docs/editing/userinterface?utm_source=chatgpt.com "User interface"
[2]: https://code.visualstudio.com/docs/editing/tips-and-tricks?utm_source=chatgpt.com "Visual Studio Code tips and tricks"
[3]: https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor_editor_api.editor.IEditorOptions.html?utm_source=chatgpt.com "IEditorOptions | Monaco Editor API"
[4]: https://microsoft.github.io/debug-adapter-protocol//?utm_source=chatgpt.com "Official page for Debug Adapter Protocol"
[5]: https://www.w3.org/TR/WCAG22/?utm_source=chatgpt.com "Web Content Accessibility Guidelines (WCAG) 2.2"
[6]: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/?utm_source=chatgpt.com "Language Server Protocol Specification - 3.17"
[7]: https://pyodide.org/en/stable/usage/webworker.html?utm_source=chatgpt.com "Using Pyodide in a web worker — Version 314.0.3"
[8]: https://wasi.dev/?utm_source=chatgpt.com "Introduction · WASI.dev"
[9]: https://gvisor.dev/docs/architecture_guide/intro/?utm_source=chatgpt.com "Introduction to gVisor security - gVisor"
[10]: https://code.visualstudio.com/docs/editing/workspaces/workspaces?utm_source=chatgpt.com "What is a VS Code workspace?"
