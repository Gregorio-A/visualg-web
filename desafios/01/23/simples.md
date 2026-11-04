# Rota de bicicleta

**Data:** 23 de janeiro · **Nível:** Simples

## Objetivo

Calcule calorias estimadas com taxa fixa por quilômetro.

Estime calorias gastas em um passeio de bicicleta usando uma taxa fixa por quilômetro.

## Como funciona

Leia distância e taxa de calorias por quilômetro; multiplique as duas entradas.

## Exemplo de execução

```text
Distância (km): 12
Calorias estimadas por km: 30
Calorias estimadas: 360
```

Para distância zero, a estimativa é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0123S"
var
distancia, taxa, calorias: real
inicio
escreva("Distância (km): ")
  leia(distancia)
  escreva("Calorias estimadas por km: ")
  leia(taxa)
  calorias <- distancia * taxa
  escreval("Calorias estimadas: ", calorias)
fimalgoritmo
```

A taxa é configurável; o programa não afirma que a estimativa substitui medição fisiológica.
