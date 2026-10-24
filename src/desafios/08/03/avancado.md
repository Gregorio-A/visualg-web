# Controle em grade

**Data:** 3 de agosto · **Nível:** Avançado

## Objetivo

Interprete uma sequência de teclas e mova um personagem entre obstáculos.

## Como funciona

Mova um personagem dez vezes numa grade 5×5. Comece em (1,1); obstáculos fixos ocupam (2,2), (3,3) e (4,4). Não atravesse bordas nem obstáculos.

## Exemplo de execução

```text
De (1,1), D → (1,2); S tenta (2,2), mas permanece (1,2)
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tecla diferente de W/A/S/D não move o personagem.

## Dicas para resolução

1. Guarde linha e coluna.
2. Calcule a posição candidata.
3. Valide borda e obstáculo antes de mover.

## Solução

```visualg
algoritmo "Desafio0803A"
var
obstaculo: vetor[1..5, 1..5] de inteiro
  linha, coluna, i, novaL, novaC: inteiro
  tecla: caractere
inicio
para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      obstaculo[linha, coluna] <- 0
    fimpara
  fimpara
  obstaculo[2, 2] <- 1
  obstaculo[3, 3] <- 1
  obstaculo[4, 4] <- 1
  linha <- 1
  coluna <- 1
  para i de 1 ate 10 faca
    escreva("Tecla ", i, " (W/A/S/D): ")
    leia(tecla)
    novaL <- linha
    novaC <- coluna
    escolha maiusc(tecla)
      caso "W"
        novaL <- novaL - 1
      caso "S"
        novaL <- novaL + 1
      caso "A"
        novaC <- novaC - 1
      caso "D"
        novaC <- novaC + 1
    fimescolha
    se (novaL >= 1) e (novaL <= 5) e (novaC >= 1) e (novaC <= 5) entao
      se obstaculo[novaL, novaC] = 0 entao
        linha <- novaL
        coluna <- novaC
      senao
        escreval("Obstáculo na posição desejada")
      fimse
    senao
      escreval("Limite da grade")
    fimse
    escreval("Posição: (", linha, ",", coluna, ")")
  fimpara
fimalgoritmo
```

Cada comando propõe uma nova célula; a posição só é atualizada quando a célula é válida e livre.
