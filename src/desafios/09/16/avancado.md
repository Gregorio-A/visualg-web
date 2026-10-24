# Crescimento das folhas

**Data:** 16 de setembro · **Nível:** Avançado

## Objetivo

Acompanhe medições de várias plantas em matriz e calcule tendências.

## Como funciona

Registre quatro medições de três plantas. Mostre variação entre primeira e última semana e diferenças semanais para analisar tendência.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Planta 10, 12, 14, 15 cm → variação geral +5 cm
```

**Como ler o exemplo:** a seta → significa "resulta em".

Variação zero entre início e fim é estável nesse resumo, mesmo se houve oscilação intermediária.

## Dicas para resolução

1. Leia cada linha da matriz.
2. Subtraia última menos primeira.
3. Compare semanas adjacentes.

## Solução

```visualg
algoritmo "Desafio0916A"
var
medida: vetor[1..3, 1..4] de real
  planta, semana: inteiro
  variacao, soma: real
inicio
para planta de 1 ate 3 faca
    para semana de 1 ate 4 faca
      escreva("Comprimento da planta ", planta, " semana ", semana, " (cm): ")
      leia(medida[planta, semana])
    fimpara
    variacao <- medida[planta, 4] - medida[planta, 1]
    escreval("Planta ", planta, ": variação total ", variacao, " cm")
    se variacao > 0 entao
      escreval("Tendência geral de crescimento")
    senao
      se variacao < 0 entao
        escreval("Tendência geral de redução")
      senao
        escreval("Estável no início e fim")
      fimse
    fimse
    para semana de 2 ate 4 faca
      escreval("Semana ", semana - 1, " para ", semana, ": ", medida[planta, semana] - medida[planta, semana - 1], " cm")
    fimpara
  fimpara
fimalgoritmo
```

A matriz mantém medições por planta e semana; diferenças revelam evolução.
