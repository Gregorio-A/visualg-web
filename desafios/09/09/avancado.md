# Rosa dos ventos

**Data:** 9 de setembro · **Nível:** Avançado

## Objetivo

Registre direções e velocidades e identifique direção predominante e média.

## Como funciona

Leia doze observações com direção N/L/S/O e velocidade. Conte ocorrências, calcule média por direção e identifique a direção mais frequente.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
N aparece 4 vezes, L 3 vezes → N é predominante
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empate preserva a menor direção numérica. Direção sem leitura não tem média.

## Dicas para resolução

1. Mapeie direção para índice.
2. Some velocidades e contagens.
3. Compare frequências.

## Solução

```visualg
algoritmo "Desafio0909A"
var
contagem: vetor[1..4] de inteiro
  soma: vetor[1..4] de real
  i, direcao, principal: inteiro
  velocidade: real
inicio
para i de 1 ate 4 faca
    contagem[i] <- 0
    soma[i] <- 0
  fimpara
  para i de 1 ate 12 faca
    escreva("Direção do vento (1 N, 2 L, 3 S, 4 O): ")
    leia(direcao)
    escreva("Velocidade: ")
    leia(velocidade)
    se (direcao >= 1) e (direcao <= 4) e (velocidade >= 0) entao
      contagem[direcao] <- contagem[direcao] + 1
      soma[direcao] <- soma[direcao] + velocidade
    fimse
  fimpara
  principal <- 1
  para i de 1 ate 4 faca
    escreval("Direção ", i, ": ", contagem[i], " leitura(s)")
    se contagem[i] > 0 entao
      escreval("Velocidade média: ", soma[i] / contagem[i])
    fimse
    se contagem[i] > contagem[principal] entao
      principal <- i
    fimse
  fimpara
  escreval("Direção predominante: ", principal)
fimalgoritmo
```

Vetores por direção mantêm contagem e soma de velocidades para o relatório.
