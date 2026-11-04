# Arena de monstros

**Data:** 15 de outubro · **Nível:** Avançado

## Objetivo

Simule combate por turnos com defesa, fraqueza e recursos consumíveis.

## Como funciona

Dois monstros alternam oito turnos. Ataque comum custa uma energia e causa 6 menos defesa. Há duas poções; cada uma causa 4 ou 8 contra alvo fraco, também reduzidas pela defesa.

## Exemplo de execução

```text
Poção contra alvo fraco de defesa 2 → 6 de dano
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sem energia, ataque comum causa zero; vida e dano nunca ficam negativos.

## Dicas para resolução

1. Alterne monstros.
2. Confira energia ou poções.
3. Aplique fraqueza e defesa antes de reduzir vida.

## Solução

```visualg
algoritmo "Desafio1015A"
var
vida, defesa, energia, fraqueza: vetor[1..2] de inteiro
  turno, atacante, alvo, dano, pocao: inteiro
inicio
para atacante de 1 ate 2 faca
    escreva("Monstro ", atacante, " vida, defesa e energia: ")
    leia(vida[atacante], defesa[atacante], energia[atacante])
    escreva("Fraqueza a poção? (0/1): ")
    leia(fraqueza[atacante])
  fimpara
  pocao <- 2
  para turno de 1 ate 8 faca
    atacante <- 1
    alvo <- 2
    se turno mod 2 = 0 entao
      atacante <- 2
      alvo <- 1
    fimse
    se (vida[1] > 0) e (vida[2] > 0) entao
      escreva("Usar poção neste turno? (0/1): ")
      leia(dano)
      se (dano = 1) e (pocao > 0) entao
        pocao <- pocao - 1
        dano <- 4
        se fraqueza[alvo] = 1 entao
          dano <- 8
        fimse
      senao
        dano <- 6
        se energia[atacante] > 0 entao
          energia[atacante] <- energia[atacante] - 1
        senao
          dano <- 0
        fimse
      fimse
      dano <- dano - defesa[alvo]
      se dano < 0 entao
        dano <- 0
      fimse
      vida[alvo] <- vida[alvo] - dano
      se vida[alvo] < 0 entao
        vida[alvo] <- 0
      fimse
      escreval("Turno ", turno, ": dano ", dano, "; vida alvo ", vida[alvo], "; poções ", pocao)
    fimse
  fimpara
  escreval("Vida final: ", vida[1], " x ", vida[2])
fimalgoritmo
```

A escolha de ação usa recursos diferentes e a fraqueza altera apenas a poção.
