# Combate com atributos

**Data:** 21 de agosto · **Nível:** Avançado

## Objetivo

Simule ataque, defesa, chance crítica pré-definida e efeitos em turnos.

## Como funciona

Dois personagens alternam oito turnos. Ataque custa 2 de energia e causa 6 de dano base ou 12 se o crítico informado ocorrer, menos a defesa do alvo.

## Exemplo de execução

```text
Ataque crítico contra defesa 3 → dano 9
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sem energia, o turno recupera uma unidade. Vida não cai abaixo de zero.

## Dicas para resolução

1. Alterne atacante e alvo.
2. Leia o crítico só em ataque.
3. Subtraia defesa e limite dano inferiormente.

## Solução

```visualg
algoritmo "Desafio0821A"
var
vida, defesa, energia: vetor[1..2] de inteiro
  turno, atacante, alvo, critico, dano, efeito: inteiro
inicio
para atacante de 1 ate 2 faca
    escreva("Vida do personagem ", atacante, ": ")
    leia(vida[atacante])
    escreva("Defesa: ")
    leia(defesa[atacante])
    escreva("Energia: ")
    leia(energia[atacante])
  fimpara
  efeito <- 0
  para turno de 1 ate 8 faca
    atacante <- 1
    alvo <- 2
    se turno mod 2 = 0 entao
      atacante <- 2
      alvo <- 1
    fimse
    se (vida[1] > 0) e (vida[2] > 0) entao
      se energia[atacante] >= 2 entao
        energia[atacante] <- energia[atacante] - 2
        escreva("Golpe crítico pré-definido? (0/1): ")
        leia(critico)
        dano <- 6
        se critico = 1 entao
          dano <- 12
        fimse
        dano <- dano - defesa[alvo]
        se dano < 0 entao
          dano <- 0
        fimse
        vida[alvo] <- vida[alvo] - dano
        se vida[alvo] < 0 entao
          vida[alvo] <- 0
        fimse
        escreval("Turno ", turno, ": dano ", dano, "; vida alvo ", vida[alvo])
      senao
        energia[atacante] <- energia[atacante] + 1
        escreval("Turno ", turno, ": recupera 1 energia")
      fimse
    fimse
  fimpara
  escreval("Vida final: ", vida[1], " x ", vida[2])
fimalgoritmo
```

A chance crítica é representada por entrada 0/1, tornando a simulação reproduzível.
