# Caminho do tabuleiro

**Data:** 7 de abril · **Nível:** Avançado

## Objetivo

Simule um personagem em grade, bloqueando movimentos em obstáculos.

## Como funciona

Leia uma grade 5 × 5, com 0 para célula livre e 1 para obstáculo. O personagem começa em 1,1. Execute comandos cardeais, rejeitando saída da grade ou entrada em obstáculo.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Mapa livre, exceto obstáculo em 1,2; comando L
Movimento bloqueado; posição permanece 1,1
```

Um movimento bloqueado não muda a posição do personagem.

## Dicas para resolução

1. Modele o mapa por matriz.
2. Calcule linha e coluna candidatas.
3. Valide limites e obstáculo antes de mover.

## Solução

```visualg
algoritmo "Desafio0407A"
var
mapa: vetor[1..5, 1..5] de inteiro
  linha, coluna, novaLinha, novaColuna, passos, i, j: inteiro
  comando: caractere
inicio
para i de 1 ate 5 faca
    para j de 1 ate 5 faca
      escreva("Mapa ", i, ",", j, " (0 livre, 1 obstáculo): ")
      leia(mapa[i, j])
    fimpara
  fimpara
  linha <- 1
  coluna <- 1
  escreva("Número de movimentos: ")
  leia(passos)
  para i de 1 ate passos faca
    escreva("Movimento N/S/L/O: ")
    leia(comando)
    novaLinha <- linha
    novaColuna <- coluna
    se comando = "N" entao
      novaLinha <- linha - 1
    fimse
    se comando = "S" entao
      novaLinha <- linha + 1
    fimse
    se comando = "L" entao
      novaColuna <- coluna + 1
    fimse
    se comando = "O" entao
      novaColuna <- coluna - 1
    fimse
    se (novaLinha >= 1) e (novaLinha <= 5) e (novaColuna >= 1) e (novaColuna <= 5) entao
      se mapa[novaLinha, novaColuna] = 0 entao
        linha <- novaLinha
        coluna <- novaColuna
      senao
        escreval("Obstáculo: movimento bloqueado.")
      fimse
    senao
      escreval("Borda do mapa: movimento bloqueado.")
    fimse
    escreval("Posição: ", linha, ",", coluna)
  fimpara
fimalgoritmo
```

O algoritmo calcula uma posição candidata antes de atualizar a posição real.
