# Quadro de pistas

**Data:** 24 de abril · **Nível:** Avançado

## Objetivo

Registre dez observações e filtre as que atendem a duas condições numéricas.

## Como funciona

Leia dez observações e duas condições numéricas: superar um limite inferior e ficar abaixo de um superior. Mostre apenas observações que atendem às duas.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Limites 10 e 20; observações 9, 10, 15, 20, 21 e mais cinco valores fora
Compatível: 15
```

Valores exatamente iguais aos limites não passam no filtro.

## Dicas para resolução

1. Leia os limites antes das observações.
2. Use duas comparações estritas.
3. Conte somente os valores apresentados.

## Solução

```visualg
algoritmo "Desafio0424A"
var
observacao: vetor[1..10] de real
  limiteInferior, limiteSuperior: real
  i, encontrados: inteiro
inicio
escreva("Limite inferior exclusivo: ")
  leia(limiteInferior)
  escreva("Limite superior exclusivo: ")
  leia(limiteSuperior)
  encontrados <- 0
  para i de 1 ate 10 faca
    escreva("Observação ", i, ": ")
    leia(observacao[i])
  fimpara
  para i de 1 ate 10 faca
    se (observacao[i] > limiteInferior) e (observacao[i] < limiteSuperior) entao
      escreval("Observação ", i, " compatível: ", observacao[i])
      encontrados <- encontrados + 1
    fimse
  fimpara
  escreval("Total compatível: ", encontrados)
fimalgoritmo
```

As duas comparações são combinadas com `e`; o vetor permite filtrar após todas as leituras.
