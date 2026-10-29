# Progressão de níveis

**Data:** 9 de agosto · **Nível:** Avançado

## Objetivo

Calcule níveis acumulados a partir de tabela de experiência e registre evolução.

## Como funciona

Cinco custos sucessivos de nível são 10, 20, 30, 40 e 50 XP. Leia oito ganhos e suba quantos níveis a XP acumulada permitir.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Ganho de 35 XP no nível 1 → paga 10 e 20; chega ao nível 3 com 5 XP
```

**Como ler o exemplo:** a seta → significa "resulta em".

Nível máximo 6 não consome XP adicional.

## Dicas para resolução

1. Guarde XP restante.
2. Use tabela de custos.
3. Repita subidas enquanto houver XP suficiente.

## Solução

```visualg
algoritmo "Desafio0809A"
var
limite: vetor[1..5] de inteiro
  nivel, xp, ganho, i: inteiro
inicio
limite[1] <- 10
  limite[2] <- 20
  limite[3] <- 30
  limite[4] <- 40
  limite[5] <- 50
  xp <- 0
  nivel <- 1
  para i de 1 ate 8 faca
    escreva("XP ganho na etapa ", i, ": ")
    leia(ganho)
    se ganho > 0 entao
      xp <- xp + ganho
    fimse
    enquanto nivel <= 5 faca
      se xp >= limite[nivel] entao
        xp <- xp - limite[nivel]
        nivel <- nivel + 1
        escreval("Subiu para nível ", nivel)
      senao
        interrompa
      fimse
    fimenquanto
    escreval("Etapa ", i, ": nível ", nivel, ", XP restante ", xp)
  fimpara
fimalgoritmo
```

O laço interno desconta custos sucessivos até faltar XP ou atingir o máximo.
