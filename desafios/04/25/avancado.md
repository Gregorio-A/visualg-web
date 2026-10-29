# Catálogo de triangulares

**Data:** 25 de abril · **Nível:** Avançado

## Objetivo

Gere termos da sequência e encontre quais pertencem a um intervalo.

## Como funciona

Gere os trinta primeiros números triangulares pela fórmula `n(n+1)/2` e mostre os que pertencem a um intervalo inclusivo.

## Exemplo de execução

```text
Faixa 5 a 15
Triangulares: 6, 10, 15
```

Uma faixa sem termos triangulares produz contagem zero.

## Dicas para resolução

1. Use a fórmula do n-ésimo triangular.
2. Percorra n de 1 a 30.
3. Compare o termo com os dois limites.

## Solução

```visualg
algoritmo "Desafio0425A"
var
inicioFaixa, fimFaixa, n, termo, quantidade: inteiro
inicio
escreva("Início da faixa: ")
  leia(inicioFaixa)
  escreva("Fim da faixa: ")
  leia(fimFaixa)
  quantidade <- 0
  para n de 1 ate 30 faca
    termo <- n * (n + 1) div 2
    se (termo >= inicioFaixa) e (termo <= fimFaixa) entao
      escreval("Triangular ", n, ": ", termo)
      quantidade <- quantidade + 1
    fimse
  fimpara
  escreval("Triangulares na faixa: ", quantidade)
fimalgoritmo
```

Cada termo é calculado diretamente; as comparações inclusivas filtram a faixa.
