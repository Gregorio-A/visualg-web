# Fogueira de acampamento

**Data:** 13 de julho · **Nível:** Simples

## Objetivo

Calcule quantos gravetos serão usados em N pacotes iguais.

## Como funciona

Leia quantos pacotes existem e quantos gravetos há em cada pacote. Multiplique os dois números para encontrar o total.

## Exemplo de execução

```text
7 pacotes com 4 gravetos → 28
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pacotes fornece zero gravetos.

## Dicas para resolução

1. Leia pacotes.
2. Leia conteúdo.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0713S"
var
pacotes, porPacote: inteiro
inicio
escreva("Pacotes: ")
  leia(pacotes)
  escreva("Gravetos por pacote: ")
  leia(porPacote)
  se (pacotes < 0) ou (porPacote < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Gravetos: ", pacotes * porPacote)
  fimse
fimalgoritmo
```

Multiplicar quantidade de pacotes pelo conteúdo de um encontra o total.
