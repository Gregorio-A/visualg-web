# Perseguição dos zumbis

**Data:** 25 de outubro · **Nível:** Avançado

## Objetivo

Simule perseguidor e fugitivo numa linha com velocidades por turno.

## Como funciona

Ambos correm na direção crescente da reta. A cada turno, some a velocidade à posição. A captura ocorre quando o perseguidor iguala ou ultrapassa o fugitivo.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
P=0, F=6, velocidades 3 e 1 → captura no turno 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se já começa à frente ou na mesma posição, a captura é no turno zero.

## Dicas para resolução

1. Guarde duas posições.
2. Atualize as duas em cada turno.
3. Confira se houve alcance.

## Solução

```visualg
algoritmo "Desafio1025A"
var
perseguidor, fugitivo, vp, vf, turnos, i: inteiro
  alcancou: logico
inicio
escreva("Posição inicial do perseguidor: ")
  leia(perseguidor)
  escreva("Posição inicial do fugitivo: ")
  leia(fugitivo)
  escreva("Velocidade por turno do perseguidor: ")
  leia(vp)
  escreva("Velocidade por turno do fugitivo: ")
  leia(vf)
  escreva("Quantidade máxima de turnos: ")
  leia(turnos)
  se (vp < 0) ou (vf < 0) ou (turnos < 0) entao
    escreval("Dados inválidos")
  senao
    alcancou <- perseguidor >= fugitivo
    i <- 0
    enquanto (i < turnos) e (nao alcancou) faca
      i <- i + 1
      perseguidor <- perseguidor + vp
      fugitivo <- fugitivo + vf
      escreval("Turno ", i, ": perseguidor ", perseguidor, "; fugitivo ", fugitivo)
      se perseguidor >= fugitivo entao
        alcancou <- verdadeiro
      fimse
    fimenquanto
    se alcancou entao
      escreval("Alcançado no turno ", i)
    senao
      escreval("Não alcançado em ", turnos, " turnos")
    fimse
  fimse
fimalgoritmo
```

O laço termina ao alcançar ou ao atingir o limite de turnos.
