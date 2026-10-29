# Gerenciador de prendas

**Data:** 21 de junho · **Nível:** Avançado

## Objetivo

Distribua desafios entre participantes sem repetir até esgotar a lista.

## Como funciona

Cadastre quatro prendas. Em seis solicitações, um número válido só pode ser atribuído uma vez por rodada; quando as quatro forem usadas, reinicie a lista.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Prendas 1,2,3,4 são atribuídas; a próxima solicitação inicia nova rodada
```

Solicitação repetida consome a vez do participante sem atribuição; ele pode tentar novamente fora desta simulação fixa.

## Dicas para resolução

1. Marque cada prenda entregue.
2. Recuse repetição na rodada.
3. Reinicie após usar todas.

## Solução

```visualg
algoritmo "Desafio0621A"
var
nome: vetor[1..4] de caractere
  usado: vetor[1..4] de inteiro
  participante, sorteio, restante, i: inteiro
inicio
para i de 1 ate 4 faca
    escreva("Prenda ", i, ": ")
    leia(nome[i])
    usado[i] <- 0
  fimpara
  restante <- 4
  para participante de 1 ate 6 faca
    se restante = 0 entao
      para i de 1 ate 4 faca
        usado[i] <- 0
      fimpara
      restante <- 4
      escreval("Nova rodada de prendas")
    fimse
    escreva("Número da prenda para participante ", participante, " (1 a 4): ")
    leia(sorteio)
    se (sorteio < 1) ou (sorteio > 4) entao
      escreval("Número inválido")
    senao
      se usado[sorteio] = 1 entao
        escreval("Prenda já atribuída nesta rodada; tente outro número")
      senao
        usado[sorteio] <- 1
        restante <- restante - 1
        escreval("Participante ", participante, ": ", nome[sorteio])
      fimse
    fimse
  fimpara
fimalgoritmo
```

Um vetor registra prendas já usadas; ao esgotar as quatro, ele é zerado.
