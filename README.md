# VisuAlg.dev

IDE web para escrever, executar e depurar algoritmos em pseudocodigo no estilo do VisuAlg 3.0.7, com editor de codigo, console integrado, painel de variaveis e execucao passo a passo.

O projeto possui duas saidas a partir da mesma fonte:

- Web: roda a interface de `src/` no navegador.
- Desktop: empacota a mesma interface com Electron Forge e Vite.

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
- Comandos: `retorne`, `interrompa`, `limpatela`.
- Operadores aritmeticos, relacionais e logicos: `+`, `-`, `*`, `/`, `\`, `div`, `mod`, `%`, `^`, `=`, `<>`, `<`, `>`, `<=`, `>=`, `e`, `ou`, `xou`, `nao`.
- Funcoes nativas: `abs`, `quad`, `raizq`, `exp`, `log`, `logn`, `sen`, `cos`, `tan`, `cotan`, `arcsen`, `arccos`, `arctan`, `grauprad`, `radpgrau`, `int`, `pi`, `rand`, `randi`, `compr`, `copia`, `maiusc`, `minusc`, `asc`, `carac`, `pos`, `caracpnum`, `numpcarac`.

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

## Documentacao interna

O modal de documentacao carrega arquivos Markdown via `docs.js`, nos caminhos:

- `docs/introducao.md`
- `docs/operadores.md`
- `docs/entrada-saida.md`
- `docs/condicionais.md`
- `docs/repeticao.md`
- `docs/subprogramas.md`
- `docs/funcoes.md`
- `docs/comandos.md`
- `docs/historia.md`

Esses arquivos estao em `src/docs/` e sao copiados para a build web por `vite.renderer.config.mjs`, mantendo a mesma documentacao na versao web e no empacotamento Electron.

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

## Desenvolvimento

Nao ha lint real configurado no momento. O script atual apenas imprime uma mensagem:

```bash
npm run lint
```

Antes de publicar uma nova versao, recomenda-se:

1. Testar a execucao de programas simples e programas com `leia`.
2. Testar `F9`, `F8`, `Parar`, abertura e salvamento de `.alg`.
3. Fechar e reabrir a versao web/Electron para confirmar a restauracao das abas.
4. Verificar a versao web em navegador.
5. Verificar a versao Electron com `npm start`.
6. Confirmar que qualquer mudanca visual ou de interpretador foi feita em `src/`.

## Licenca

O pacote declara licenca MIT em `package.json`.
