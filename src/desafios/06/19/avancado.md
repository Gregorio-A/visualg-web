# Captura fictícia

**Data:** 19 de junho · **Nível:** Avançado

## Objetivo

Gerencie jogadores em estados livre e preso e operações de libertação.

## Como funciona

Dez jogadores começam livres. Capture somente quem está livre; liberte somente quem está preso. A consulta mostra quantos estão em cada estado.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Capture jogador 2; consulte → 1 preso, 9 livres; liberte 2 → 0 presos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Operação repetida sobre o mesmo estado não altera contagens.

## Dicas para resolução

1. Inicialize todos livres.
2. Valide o número do jogador.
3. Mude estado só quando fizer sentido.

## Solução

```visualg
algoritmo "Desafio0619A"
var
estado: vetor[1..10] de inteiro
  i, acao, jogador, presos: inteiro
inicio
para i de 1 ate 10 faca
    estado[i] <- 0
  fimpara
  escreva("Ação (1 capturar, 2 libertar, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao = 1) ou (acao = 2) entao
      escreva("Jogador (1 a 10): ")
      leia(jogador)
      se (jogador < 1) ou (jogador > 10) entao
        escreval("Jogador inválido")
      senao
        se (acao = 1) e (estado[jogador] = 0) entao
          estado[jogador] <- 1
          escreval("Capturado")
        senao
          se (acao = 2) e (estado[jogador] = 1) entao
            estado[jogador] <- 0
            escreval("Libertado")
          senao
            escreval("Operação sem mudança")
          fimse
        fimse
      fimse
    senao
      se acao = 3 entao
        presos <- 0
        para i de 1 ate 10 faca
          se estado[i] = 1 entao
            presos <- presos + 1
          fimse
        fimpara
        escreval("Presos: ", presos, "; livres: ", 10 - presos)
      fimse
    fimse
    escreva("Ação (1 capturar, 2 libertar, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Um vetor de zeros e uns guarda o estado de cada jogador.
