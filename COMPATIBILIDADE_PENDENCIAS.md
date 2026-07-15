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
- matriz legada com todas as funções internas e comandos especiais.

O contrato detalhado está em `src/docs/compatibilidade.md`. Diferenças futuras encontradas contra o binário 3.0.7 devem entrar primeiro como teste de reprodução e só então como alteração do runtime.
