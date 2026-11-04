# Projeto de jardim

**Data:** 5 de setembro · **Nível:** Avançado

## Objetivo

Distribua plantas em matriz respeitando distância mínima entre espécies.

## Como funciona

Jardim 5×5 aceita oito tentativas. A célula precisa estar vazia e nenhuma vizinha ortogonal pode conter a mesma espécie; espécies diferentes podem ficar adjacentes.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Diagonal:** É uma sequência de posições que atravessa uma tabela de um canto a outro.

## Exemplo de execução

```text
Espécie 1 em (2,2) impede outra espécie 1 em (2,3)
```

Células diagonais não contam como vizinhas neste modelo.

## Dicas para resolução

1. Valide coordenadas.
2. Cheque a célula e os quatro vizinhos.
3. Grave somente se estiver livre.

## Solução

```visualg
algoritmo "Desafio0905A"
var
planta: vetor[1..5, 1..5] de inteiro
  linha, coluna, especie, vizinho, ocupadas: inteiro
inicio
para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      planta[linha, coluna] <- 0
    fimpara
  fimpara
  para ocupadas de 1 ate 8 faca
    escreva("Linha e coluna da nova planta: ")
    leia(linha, coluna)
    escreva("Espécie (1 ou 2): ")
    leia(especie)
    se (linha >= 1) e (linha <= 5) e (coluna >= 1) e (coluna <= 5) e (especie >= 1) e (especie <= 2) entao
      vizinho <- 0
      se planta[linha, coluna] <> 0 entao
        vizinho <- 1
      fimse
      se linha > 1 entao
        se planta[linha - 1, coluna] = especie entao
          vizinho <- 1
        fimse
      fimse
      se linha < 5 entao
        se planta[linha + 1, coluna] = especie entao
          vizinho <- 1
        fimse
      fimse
      se coluna > 1 entao
        se planta[linha, coluna - 1] = especie entao
          vizinho <- 1
        fimse
      fimse
      se coluna < 5 entao
        se planta[linha, coluna + 1] = especie entao
          vizinho <- 1
        fimse
      fimse
      se vizinho = 0 entao
        planta[linha, coluna] <- especie
        escreval("Plantio aceito")
      senao
        escreval("Plantio recusado")
      fimse
    senao
      escreval("Posição ou espécie inválida")
    fimse
  fimpara
fimalgoritmo
```

Checar quatro vizinhos antes de gravar mantém a distância mínima definida.
