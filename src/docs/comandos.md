# Comandos Especiais

Esta aba lista comandos da linguagem que não se encaixam diretamente nas seções de entrada, saída, repetição ou condicionais.

## limpatela

`limpatela` limpa o console do VisuAlg Web.

```visualg
algoritmo "LimparConsole"
inicio
  escreval("Esta linha aparece primeiro")
  limpatela
  escreval("Depois do limpatela")
fimalgoritmo
```

## interrompa

`interrompa` encerra imediatamente o laço atual. Ele pode ser usado em `para`, `enquanto`, `repita...ate` e `repita...fimrepita`.

```visualg
algoritmo "Busca"
var
  i: inteiro
inicio
  para i de 1 ate 10 faca
    se i = 4 entao
      escreval("Encontrado: ", i)
      interrompa
    fimse
  fimpara
fimalgoritmo
```

## Recursos da interface

Algumas ações de depuração são recursos da interface, não comandos da linguagem:

| Ação | Onde usar |
| --- | --- |
| Executar | Botão `Executar` ou atalho indicado na interface. |
| Passo a passo | Botão `Passo a passo`. |
| Parar | Botão `Parar` durante a execução. |
| Limpar console | Botão de limpeza no painel `Console` ou comando `limpatela`. |
| Detecção de loop infinito | `Configurações > Gerais > Detecção de loop infinito`. |

## Comandos do VisuAlg desktop não disponíveis no Web

Os comandos abaixo aparecem em materiais do VisuAlg desktop, mas não são executados pelo interpretador web atual. Quando usados como comandos da linguagem, eles geram erro explícito para evitar que o programa siga com comportamento diferente do esperado.

| Comando desktop | Situação no Web |
| --- | --- |
| `aleatorio` | Use as funções `rand()` e `randi(limite)`. |
| `arquivo` | Entrada por arquivo ainda não é suportada pela linguagem. Use `Abrir` para carregar o código-fonte `.alg` ou `.txt`. |
| `timer` | Use o modo `Passo a passo` para acompanhar a execução. |
| `pausa` | Use o modo `Passo a passo` ou o botão `Parar`. |
| `debug` | Breakpoint condicional por comando ainda não está disponível. |
| `eco` | O console não possui modo de eco configurável por comando. |
| `cronometro` | Cronômetro interno por comando ainda não está disponível. |
