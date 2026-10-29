# Painel de produtividade

**Data:** 10 de maio · **Nível:** Avançado

## Objetivo

Acompanhe produção diária em vetor e destaque sequências acima da meta.

## Como funciona

Leia meta e sete produções. Destaque a maior sequência de dias consecutivos com produção estritamente acima da meta.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Meta 10; dias 11,12,8,13,14,15,7
Maior sequência: 3 dias, do dia 4 ao 6
```

Dia exatamente igual à meta interrompe a sequência.

## Dicas para resolução

1. Compare cada dia com a meta.
2. Conte apenas dias consecutivos acima dela.
3. Guarde o início da melhor sequência.

## Solução

```visualg
algoritmo "Desafio0510A"
var
producao: vetor[1..7] de inteiro
  meta, i, atual, maior, inicioAtual, inicioMaior: inteiro
inicio
escreva("Meta diária: ")
  leia(meta)
  atual <- 0
  maior <- 0
  para i de 1 ate 7 faca
    escreva("Produção do dia ", i, ": ")
    leia(producao[i])
    se producao[i] > meta entao
      se atual = 0 entao
        inicioAtual <- i
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Maior sequência acima da meta: ", maior)
  se maior > 0 entao
    escreval("Dias ", inicioMaior, " a ", inicioMaior + maior - 1)
  fimse
fimalgoritmo
```

O contador de sequência atual zera fora da meta; o maior preserva o melhor trecho.
