# Estatísticas de temporada

**Data:** 31 de agosto · **Nível:** Avançado

## Objetivo

Processe resultados em vetor e gere sequência máxima, aproveitamento e pontuação.

## Como funciona

Leia doze resultados: vitória vale 3 pontos, empate 1 e derrota 0. Relate contagens, maior sequência de vitórias, percentual de vitórias e pontos.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Vitória, vitória, empate → 7 pontos e sequência máxima 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Entrada diferente de 1 ou 2 é tratada como derrota.

## Dicas para resolução

1. Conte os três resultados.
2. Reinicie sequência no empate ou derrota.
3. Calcule percentual e pontos no final.

## Solução

```visualg
algoritmo "Desafio0831A"
var
resultado: vetor[1..12] de inteiro
  i, vitorias, empates, sequencia, maior, pontos: inteiro
inicio
vitorias <- 0
  empates <- 0
  sequencia <- 0
  maior <- 0
  pontos <- 0
  para i de 1 ate 12 faca
    escreva("Resultado da partida ", i, " (1 vitória, 2 empate, 0 derrota): ")
    leia(resultado[i])
    se resultado[i] = 1 entao
      vitorias <- vitorias + 1
      pontos <- pontos + 3
      sequencia <- sequencia + 1
      se sequencia > maior entao
        maior <- sequencia
      fimse
    senao
      sequencia <- 0
      se resultado[i] = 2 entao
        empates <- empates + 1
        pontos <- pontos + 1
      fimse
    fimse
  fimpara
  escreval("Vitórias: ", vitorias, "; empates: ", empates, "; derrotas: ", 12 - vitorias - empates)
  escreval("Maior sequência de vitórias: ", maior)
  escreval("Aproveitamento em vitórias: ", 100 * vitorias / 12, "%")
  escreval("Pontos de temporada: ", pontos)
fimalgoritmo
```

Um percurso do histórico mantém todos os acumuladores e reinicia a sequência fora de vitória.
