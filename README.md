# VisuAlg Web

IDE web para escrever, executar e depurar algoritmos em pseudocodigo no estilo do VisuAlg 3.0.7, com editor de codigo, console integrado, painel de variaveis e execucao passo a passo.

Esta versão `0.2.0` é um fork do projeto **VisuAlg.dev**. A nova identidade
evita confundir este produto com a aplicação de origem e preserva seus créditos
no [histórico do projeto](src/docs/historia.md). Contato público:
`contato@conradosal.com`.

O projeto possui duas saidas a partir da mesma fonte:

- Web: roda a interface de `src/` no navegador.
- Desktop: empacota a mesma interface com Electron Forge e Vite.

O alvo pratico e manter a experiencia o mais proxima possivel do VisuAlg 3.0.7, deixando em `docs/compatibilidade.md` o que ja e suportado, o que ainda e parcial e o que e extensao do Web.

## Recursos

- Editor baseado em CodeMirror 5 com destaque de sintaxe para VisuAlg.
- Template inicial de algoritmo em portugues.
- Multiplas abas com renomeacao automatica pelo nome do algoritmo.
- Execucao completa com `F9` e execucao passo a passo com `F8`.
- Realce da linha atual durante a execucao passo a passo.
- Console integrado com entrada por campo inline ou modal.
- Painel de variaveis com nome, tipo e valor.
- Abertura de arquivos `.alg` e `.txt`.
- Salvamento do codigo como `.alg` ou `.txt`.
- Persistencia automatica das abas e dos codigos no armazenamento local do navegador/Electron.
- Indicador visivel de autosave e restauracao de uma copia de recuperacao.
- Onboarding de primeira visita e galeria com cinco exemplos executaveis.
- Erros clicaveis com navegacao direta para a linha e coluna no editor.
- Menu persistente para mostrar ou esconder editor, variaveis e console.
- Autoindentacao do codigo.
- Comentario/descomentario com `Ctrl+/` ou `Cmd+/`.
- Temas escuro, claro e alto contraste.
- Configuracoes persistidas no `localStorage`.
- Deteccao de possivel loop infinito apos 1.000 iteracoes, com opcao de continuar ou parar.

## Linguagem suportada

O interpretador roda no cliente, em JavaScript, e cobre os principais elementos de pseudocodigo usados no VisuAlg:

- Tipos: `inteiro`, `real`, `caractere`, `logico` e `vetor`.
- Variaveis globais e locais.
- Entrada e saida: `leia`, `escreva`, `escreval`.
- Condicionais: `se`, `entao`, `senao`, `fimse`.
- Repeticoes: `enquanto`, `para`, `repita`.
- Escolha de casos: `escolha`, `caso`, `outrocaso`.
- Subprogramas: `procedimento`, `funcao`, parametros por valor e por referencia com `var`.
- Comandos: `retorne`, `interrompa`, `limpatela`, `aleatorio`, `arquivo`, `timer`, `pausa`, `debug`, `eco` e `cronometro`.
- Operadores aritmeticos, relacionais e logicos: `+`, `-`, `*`, `/`, `\`, `div`, `mod`, `%`, `^`, `=`, `<>`, `<`, `>`, `<=`, `>=`, `e`, `ou`, `xou`, `nao`.
- Funcoes nativas: `abs`, `quad`, `raizq`, `exp`, `log`, `logn`, `sen`, `cos`, `tan`, `cotan`, `arcsen`, `arccos`, `arctan`, `grauprad`, `radpgrau`, `int`, `pi`, `rand`, `randi`, `compr`, `copia`, `maiusc`, `minusc`, `asc`, `carac`, `pos`, `caracpnum`, `numpcarac`.
- Compatibilidade especial: `senao se` na mesma linha, `escreva`/`escreval`/`leia` sem parênteses, `pi` como constante, chamadas de funcoes sem parametros sem `()`, curto-circuito lógico, comparações encadeadas e repetição de entrada inválida.
- `arquivo`: persistência isolada no navegador e arquivo de texto físico na pasta de dados do aplicativo Electron.

Exemplo:

```alg
Algoritmo "Soma"

Var
  a, b, resultado: inteiro

Inicio
  escreva("Digite o primeiro numero: ")
  leia(a)

  escreva("Digite o segundo numero: ")
  leia(b)

  resultado <- a + b
  escreval("Resultado: ", resultado)
fimalgoritmo
```

## Estrutura do projeto

```text
.
|-- src/
|   |-- index.html
|   |-- js/
|   |   |-- editor.js
|   |   |-- interpreter.js
|   |   |-- main.js
|   |   |-- tabs.js
|   |   |-- terminal.js
|   |   |-- variables.js
|   |   `-- docs.js
|   |-- css/
|   |-- images/
|   |-- jsdelivr/
|   |-- unpk/
|   `-- vendor/
|-- electron/
|   |-- main.js
|   `-- preload.js
|-- forge.config.js
|-- package.json
|-- package-lock.json
|-- vite.main.config.mjs
|-- vite.preload.config.mjs
`-- vite.renderer.config.mjs
```

`src/` e a fonte unica da interface. O Electron apenas carrega/empacota essa mesma interface por meio de `electron/` e das configuracoes Vite/Forge da raiz.

## Rodando a versao web

Instale as dependencias, se necessario:

```bash
npm install
```

Inicie o servidor web de desenvolvimento:

```bash
npm run dev:web
```

Depois acesse a URL indicada pelo Vite, normalmente:

```text
http://localhost:5173
```

Para gerar uma build estatica:

```bash
npm run build:web
```

Tambem e possivel servir `src/` diretamente sem build:

```bash
python -m http.server 8080 -d src
```

## Rodando a versao desktop

Instale as dependencias, se necessario:

```bash
npm install
```

Inicie em modo desenvolvimento:

```bash
npm start
```

Gere um pacote local:

```bash
npm run package
```

Gere instaladores conforme os makers configurados no Electron Forge:

```bash
npm run make
```

Durante o desenvolvimento, a janela Electron abre o DevTools automaticamente. Em builds empacotadas, o DevTools nao e aberto por padrao.

## Anexo: Documentacao interna

O modal de documentacao carrega arquivos Markdown via `docs.js`, nos caminhos:

- `docs/introducao.md`
- `docs/compatibilidade.md`
- `docs/operadores.md`
- `docs/entrada-saida.md`
- `docs/condicionais.md`
- `docs/repeticao.md`
- `docs/subprogramas.md`
- `docs/funcoes.md`
- `docs/comandos.md`
- `docs/historia.md`

Esses arquivos estao em `src/docs/` e sao copiados para a build web por `vite.renderer.config.mjs`, mantendo a mesma documentacao na versao web e no empacotamento Electron.

`docs/historia.md` e o anexo historico do projeto. Ele conta a origem do VisuAlg, o caminho ate esta base web e o lugar que a manutencao atual ocupa nessa linha de continuidade.

## Principais arquivos

- `src/js/interpreter.js`: lexer, parser e executor do pseudocodigo.
- `src/js/editor.js`: configuracao do CodeMirror e modo de sintaxe VisuAlg.
- `src/js/main.js`: inicializacao da UI, execucao, configuracoes, abrir/salvar arquivos e atalhos.
- `src/js/tabs.js`: gerenciamento de abas.
- `src/js/terminal.js`: console e leitura de entradas.
- `src/js/variables.js`: renderizacao do painel de variaveis.
- `electron/main.js`: processo principal do Electron.
- `electron/preload.js`: preload do Electron.
- `forge.config.js`: empacotamento com Electron Forge.

## Suporte, bugs e governança

- Bugs reproduzíveis: [abra um relato pelo formulário do projeto](https://github.com/Gregorio-A/visualg-web/issues/new?template=bug_report.yml).
- Vulnerabilidades: use somente o canal privado descrito em [`SECURITY.md`](SECURITY.md).
- Navegadores e sistemas suportados: [`SUPPORT.md`](SUPPORT.md).
- Compromissos de linguagem e mudanças incompatíveis: [`COMPATIBILITY.md`](COMPATIBILITY.md).
- Tratamento e armazenamento de dados: [`PRIVACY.md`](PRIVACY.md).
- Processo de publicação: [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md).

Ao relatar um bug, informe versão, ambiente, passos, resultado esperado e um
programa `.alg` mínimo. Não publique segredos ou dados pessoais.

## Desenvolvimento

Para executar o lint de corretude sobre a interface, Electron e testes:

```bash
npm run lint
```

Para instalar os navegadores e executar os testes reais da interface:

```bash
npx playwright install chromium firefox chrome msedge
npm run test:e2e
```

Para uma verificação local mais rápida somente no Chromium:

```bash
npm run test:e2e:chromium
```

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa lint,
regressões e build, além da suíte E2E no Chrome, Edge e Firefox.

Para validar programas padrao sem abrir a interface, use a ferramenta interna:

```bash
npm run test:standard
```

Para validar a matriz de compatibilidade legada e todas as funções internas:

```bash
npm run test:compat
```

Para executar os cinco programas publicados na galeria de exemplos:

```bash
npm run test:examples
```

Para validar o isolamento Electron, os canais IPC e a proteção do comando
`arquivo` contra travessia e links simbólicos:

```bash
npm run test:security
```

Ela executa a lista em `scripts/standard-programs.js` e compara a saida do interpretador com os resultados esperados. O `npm run test:p0` tambem roda essa validacao junto da regressao principal.

Antes de publicar uma nova versão, siga o
[`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md). O `npm run test:p0` inclui as
regressões da linguagem, workspace, exemplos e segurança Electron.

## Licenca

Distribuído sob a licença MIT. Consulte [`LICENSE`](LICENSE).
