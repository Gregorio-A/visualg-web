# Separador de meias

**Data:** 18 de julho · **Nível:** Avançado

## Objetivo

Conte cores em vetor e calcule pares e peças sem par.

## Como funciona

Leia dez meias classificadas em três cores. Forme pares apenas com a mesma cor e mostre pares e sobras por cor e no total.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
Cores 1,1,1,2 → cor 1 tem um par e uma sobra; cor 2 tem uma sobra
```

**Como ler o exemplo:** a seta → significa "resulta em".

Código de cor fora de 1–3 é ignorado.

## Dicas para resolução

1. Conte cada cor.
2. Use div por dois.
3. Use mod para sobras.

## Solução

```visualg
algoritmo "Desafio0718A"
var
cor: vetor[1..10] de inteiro
  contagem: vetor[1..3] de inteiro
  i, pares, soltas: inteiro
inicio
para i de 1 ate 3 faca
    contagem[i] <- 0
  fimpara
  para i de 1 ate 10 faca
    escreva("Cor da meia ", i, " (1, 2 ou 3): ")
    leia(cor[i])
    se (cor[i] >= 1) e (cor[i] <= 3) entao
      contagem[cor[i]] <- contagem[cor[i]] + 1
    senao
      escreval("Cor inválida ignorada")
    fimse
  fimpara
  pares <- 0
  soltas <- 0
  para i de 1 ate 3 faca
    escreval("Cor ", i, ": ", contagem[i] div 2, " par(es), ", contagem[i] mod 2, " sem par")
    pares <- pares + contagem[i] div 2
    soltas <- soltas + contagem[i] mod 2
  fimpara
  escreval("Total: ", pares, " pares e ", soltas, " meias soltas")
fimalgoritmo
```

A divisão inteira por dois encontra pares de cada cor; o resto encontra meias soltas.
