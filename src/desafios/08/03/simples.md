# Teclas do comando

**Data:** 3 de agosto · **Nível:** Simples

## Objetivo

Exiba uma ação para W, A, S ou D.

## Como funciona

Associe W a cima, A a esquerda, S a baixo e D a direita.

## Exemplo de execução

```text
Tecla D → mover para a direita
```

**Como ler o exemplo:** a seta → significa "resulta em".

Aceite minúsculas convertendo a entrada.

## Dicas para resolução

1. Leia um texto.
2. Converta para maiúsculas.
3. Use escolha.

## Solução

```visualg
algoritmo "Desafio0803S"
var
tecla: caractere
inicio
escreva("Tecla W, A, S ou D: ")
  leia(tecla)
  escolha maiusc(tecla)
    caso "W"
      escreval("Mover para cima")
    caso "A"
      escreval("Mover para a esquerda")
    caso "S"
      escreval("Mover para baixo")
    caso "D"
      escreval("Mover para a direita")
    outrocaso
      escreval("Tecla desconhecida")
  fimescolha
fimalgoritmo
```

A seleção usa a tecla normalizada para escolher uma ação.
