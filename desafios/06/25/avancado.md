# Torneio de argolas

**Data:** 25 de junho · **Nível:** Avançado

## Objetivo

Registre resultados por rodada e produza classificação de jogadores.

## Como funciona

Quatro jogadores disputam três rodadas. Some pontos não negativos de cada rodada e ordene o ranking do maior para o menor.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Ana faz 2+3+4=9; Beto faz 1+2+3=6 → Ana à frente
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pontuação negativa de uma rodada é ignorada. Empate preserva cadastro.

## Dicas para resolução

1. Some pontos por jogador.
2. Ignore valores negativos.
3. Ordene os totais com seus nomes.

## Solução

```visualg
algoritmo "Desafio0625A"
var
pontos: vetor[1..4] de inteiro
  nome: vetor[1..4] de caractere
  i, rodada, valor, j, troca: inteiro
  nomeTroca: caractere
inicio
para i de 1 ate 4 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
    para rodada de 1 ate 3 faca
      escreva("Pontos da rodada ", rodada, ": ")
      leia(valor)
      se valor >= 0 entao
        pontos[i] <- pontos[i] + valor
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se pontos[j] > pontos[i] entao
        troca <- pontos[i]
        pontos[i] <- pontos[j]
        pontos[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", pontos[i], " pontos")
  fimpara
fimalgoritmo
```

O vetor de totais acumula rodadas; a ordenação move nome e total juntos.
