# Avaliador de hospedagens

**Data:** 18 de janeiro · **Nível:** Avançado

## Objetivo

Calcule médias ponderadas de critérios para cinco hotéis e gere ranking.

Avalie cinco hotéis por critérios com pesos e gere um ranking decrescente.

## Como funciona

Leia notas de limpeza, conforto e atendimento, todas de 0 a 10. Use pesos 4, 3 e 3, respectivamente. Calcule a média ponderada dividindo por 10 e ordene do maior resultado para o menor.

### Palavras úteis

- **Média ponderada:** É uma média em que algumas notas têm mais importância, definida pelos pesos.

## Exemplo de execução

```text
Hotel A: 10, 8, 8 → média 8,8
Hotel B: 8, 10, 10 → média 9,2
Ranking: 1º B; 2º A; demais hotéis conforme as notas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empates conservam a ordem inicial dos hotéis porque a troca só acontece se outra média for maior.

## Dicas para resolução

1. Calcule uma média ponderada com soma dos pesos igual a dez.
2. Ordene de modo decrescente.
3. Mova nome e média juntos em cada troca.

## Solução

```visualg
algoritmo "Desafio0118A"
var
nomes: vetor[1..5] de caractere
  medias: vetor[1..5] de real
  limpeza, conforto, atendimento, temporario: real
  nomeTemporario: caractere
  i, j: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Hotel ", i, ": ")
    leia(nomes[i])
    escreva("Limpeza (0 a 10): ")
    leia(limpeza)
    escreva("Conforto (0 a 10): ")
    leia(conforto)
    escreva("Atendimento (0 a 10): ")
    leia(atendimento)
    medias[i] <- (limpeza * 4 + conforto * 3 + atendimento * 3) / 10
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se medias[j] > medias[i] entao
        temporario <- medias[i]
        medias[i] <- medias[j]
        medias[j] <- temporario
        nomeTemporario <- nomes[i]
        nomes[i] <- nomes[j]
        nomes[j] <- nomeTemporario
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º: ", nomes[i], " — média ", medias[i])
  fimpara
fimalgoritmo
```

Ao trocar as médias durante a ordenação, o algoritmo troca também os nomes para manter cada nota ligada ao hotel correto.
