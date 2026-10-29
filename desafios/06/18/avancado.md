# Jogo de saltos

**Data:** 18 de junho · **Nível:** Avançado

## Objetivo

Calcule pontuação por sequência com bônus por acertos consecutivos.

## Como funciona

Oito saltos: acerto vale 10 pontos. A partir do terceiro acerto consecutivo, cada novo acerto da sequência recebe bônus de 5.

## Exemplo de execução

```text
Acertos 1,1,1 → 10 + 10 + 15 = 35 pontos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Erro zera a sequência, sem retirar pontos já ganhos.

## Dicas para resolução

1. Conte acertos seguidos.
2. Some dez por acerto.
3. Dê bônus a partir do terceiro consecutivo.

## Solução

```visualg
algoritmo "Desafio0618A"
var
i, acerto, sequencia, pontos: inteiro
inicio
pontos <- 0
  sequencia <- 0
  para i de 1 ate 8 faca
    escreva("Salto ", i, " correto? (0/1): ")
    leia(acerto)
    se acerto = 1 entao
      sequencia <- sequencia + 1
      pontos <- pontos + 10
      se sequencia >= 3 entao
        pontos <- pontos + 5
      fimse
    senao
      sequencia <- 0
    fimse
    escreval("Pontuação após o salto: ", pontos)
  fimpara
  escreval("Pontuação final: ", pontos)
fimalgoritmo
```

O contador consecutivo determina se o acerto atual recebe bônus.
