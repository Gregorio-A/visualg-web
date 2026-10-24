# Bloco da alegria

**Data:** 3 de fevereiro · **Nível:** Simples

## Objetivo

Leia participantes adultos e crianças e calcule o total.

## Como funciona

Some as quantidades de adultos e crianças para encontrar todos os participantes.

## Exemplo de execução

```text
Adultos: 8
Crianças: 5
Participantes: 13
```

A soma de dois grupos vazios é zero. Quantidades negativas são rejeitadas.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0203S"
var
adultos, criancas, total: inteiro
inicio
escreva("Adultos: ")
  leia(adultos)
  escreva("Crianças: ")
  leia(criancas)
  se (adultos >= 0) e (criancas >= 0) entao
    total <- adultos + criancas
    escreval("Participantes: ", total)
  senao
    escreval("Quantidades inválidas.")
  fimse
fimalgoritmo
```

A variável `total` recebe apenas a soma de entradas válidas.
