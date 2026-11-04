# Corrida na areia

**Data:** 13 de janeiro · **Nível:** Simples

## Objetivo

Calcule velocidade média a partir de distância e tempo.

Encontre a velocidade média de uma corrida a partir de distância e tempo.

## Como funciona

Leia quilômetros percorridos e horas gastas. Divida distância por tempo apenas quando o tempo for positivo.

## Exemplo de execução

```text
Distância (km): 12
Tempo (h): 2
Velocidade média (km/h): 6
```

Tempo zero é inválido porque provocaria divisão por zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0113S"
var
distancia, tempo, velocidade: real
inicio
escreva("Distância (km): ")
  leia(distancia)
  escreva("Tempo (h): ")
  leia(tempo)
  se tempo > 0 entao
    velocidade <- distancia / tempo
    escreval("Velocidade média (km/h): ", velocidade)
  senao
    escreval("O tempo deve ser positivo.")
  fimse
fimalgoritmo
```

A unidade km/h decorre das unidades escolhidas para as duas entradas.
