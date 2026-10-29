# Gerador de enigmas

**Data:** 24 de outubro · **Nível:** Avançado

## Objetivo

Crie cinco desafios numéricos com respostas e valide tentativas do jogador.

## Como funciona

Apresente cinco enigmas numéricos fixos, cada um com uma única resposta inteira. Aceite uma tentativa por enigma e conte acertos.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Para 3 vezes 4, resposta 12 → acertou; 11 → errou
```

**Como ler o exemplo:** a seta → significa "resulta em".

Cinco respostas erradas produzem zero acertos.

## Dicas para resolução

1. Defina as cinco respostas.
2. Percorra os enigmas.
3. Some um acerto por resposta correta.

## Solução

```visualg
algoritmo "Desafio1024A"
var
resposta: vetor[1..5] de inteiro
  i, tentativa, acertos: inteiro
inicio
resposta[1] <- 12
  resposta[2] <- 7
  resposta[3] <- 25
  resposta[4] <- 9
  resposta[5] <- 14
  acertos <- 0
  para i de 1 ate 5 faca
    escolha i
      caso 1
        escreval("Enigma 1: 3 vezes 4?")
      caso 2
        escreval("Enigma 2: 10 menos 3?")
      caso 3
        escreval("Enigma 3: 5 ao quadrado?")
      caso 4
        escreval("Enigma 4: metade de 18?")
      caso 5
        escreval("Enigma 5: 2 vezes 7?")
    fimescolha
    escreva("Resposta: ")
    leia(tentativa)
    se tentativa = resposta[i] entao
      acertos <- acertos + 1
      escreval("Acertou")
    senao
      escreval("Errou; resposta: ", resposta[i])
    fimse
  fimpara
  escreval("Acertos: ", acertos, " de 5")
fimalgoritmo
```

O índice liga o enigma apresentado à resposta no vetor; cada tentativa é comparada uma vez.
