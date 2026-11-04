# Jogo por turnos

**Data:** 2 de agosto · **Nível:** Avançado

## Objetivo

Controle vida, defesa e pontos de energia de dois personagens.

## Como funciona

Dois personagens alternam seis turnos. Ataque custa 2 de energia e causa máximo entre 0 e 5 menos defesa do alvo; sem energia, recupera 1.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Alvo com defesa 2 recebe 3 de dano de ataque normal
```

Vida não desce abaixo de zero. Sem personagens vivos, os turnos restantes não alteram o estado.

## Dicas para resolução

1. Alterne atacante por paridade.
2. Consuma energia antes do ataque.
3. Limite dano e vida inferiormente.

## Solução

```visualg
algoritmo "Desafio0802A"
var
vida, defesa, energia: vetor[1..2] de inteiro
  turno, atacante, alvo, dano, bloqueio: inteiro
inicio
para atacante de 1 ate 2 faca
    escreva("Vida do personagem ", atacante, ": ")
    leia(vida[atacante])
    escreva("Defesa: ")
    leia(defesa[atacante])
    escreva("Energia: ")
    leia(energia[atacante])
  fimpara
  para turno de 1 ate 6 faca
    atacante <- 1
    alvo <- 2
    se turno mod 2 = 0 entao
      atacante <- 2
      alvo <- 1
    fimse
    se (vida[1] > 0) e (vida[2] > 0) entao
      se energia[atacante] >= 2 entao
        energia[atacante] <- energia[atacante] - 2
        dano <- 5 - defesa[alvo]
        se dano < 0 entao
          dano <- 0
        fimse
        vida[alvo] <- vida[alvo] - dano
        se vida[alvo] < 0 entao
          vida[alvo] <- 0
        fimse
        escreval("Turno ", turno, ": personagem ", atacante, " causou ", dano, " de dano")
      senao
        energia[atacante] <- energia[atacante] + 1
        escreval("Turno ", turno, ": personagem ", atacante, " recuperou 1 energia")
      fimse
    fimse
  fimpara
  escreval("Vida final: P1 ", vida[1], ", P2 ", vida[2])
fimalgoritmo
```

Vetores guardam atributos dos dois personagens e os índices alternam a cada turno.
