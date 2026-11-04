# Planejamento de visitas

**Data:** 25 de dezembro · **Nível:** Avançado

## Objetivo

Organize paradas em ordem, calcule distância total e restrições de horário.

## Como funciona

Saia às 08:00 e visite quatro paradas na ordem cadastrada. Use velocidade média constante, arredondando cada trecho para cima em minutos.

## Exemplo de execução

```text
Trecho 30 km a 60 km/h → primeira chegada às 08:30; prazo 08:20 gera 10 minutos de atraso.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma parada com distância zero tem o mesmo horário da anterior.

## Dicas para resolução

1. Fixe partida às 08:00.
2. Converta km/velocidade em minutos.
3. Compare chegada e prazo de cada parada.

## Solução

```visualg
algoritmo "Desafio1225A"
var
  distancia: vetor[1..4] de real
  i, hora, minuto, chegada, tempo: inteiro
  velocidade, total, minutosTrecho: real
inicio
  total <- 0
  tempo <- 8*60
  escreva("Velocidade média em km/h: ")
  leia(velocidade)
  se velocidade <= 0 entao
    escreval("Velocidade inválida")
  senao
    para i de 1 ate 4 faca
      repita
        escreva("Distância até parada ", i, " (km): ")
        leia(distancia[i])
        escreva("Horário máximo da chegada (hora e minuto): ")
        leia(hora, minuto)
      ate (distancia[i] >= 0) e (hora >= 0) e (hora < 24) e (minuto >= 0) e (minuto < 60)
      total <- total+distancia[i]
      minutosTrecho <- distancia[i]*60/velocidade
      tempo <- tempo+int(minutosTrecho)
      se minutosTrecho > int(minutosTrecho) entao
        tempo <- tempo+1
      fimse
      chegada <- hora*60+minuto
      escreval("Parada ", i, " chega às ", tempo div 60, ":", tempo mod 60)
      se tempo > chegada entao
        escreval("Atraso de ", tempo-chegada, " minuto(s)")
      fimse
    fimpara
    escreval("Distância total: ", total:0:2, " km")
  fimse
fimalgoritmo
```

Acumule as distâncias e os minutos de deslocamento; compare cada chegada ao respectivo limite.
