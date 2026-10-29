# Mapeamento de caixas

**Data:** 12 de maio · **Nível:** Avançado

## Objetivo

Encontre um produto em matriz de prateleiras e indique posição e quantidade.

## Como funciona

Cadastre código e quantidade nas doze posições de uma matriz 3×4. Procure todas as caixas de um código e informe posição e soma das unidades.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Código 7 nas posições (1,2) com 3 e (3,4) com 5
Duas caixas; 8 unidades
```

Se o código não existir, mostre zero caixas e zero unidades.

## Dicas para resolução

1. Guarde código e quantidade na mesma posição de duas matrizes.
2. Percorra linhas e colunas.
3. Acumule todas as correspondências.

## Solução

```visualg
algoritmo "Desafio0512A"
var
codigo, quantidade: vetor[1..3, 1..4] de inteiro
  linha, coluna, procurado, encontrados, total: inteiro
inicio
para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      escreva("Código da caixa ", linha, ",", coluna, ": ")
      leia(codigo[linha, coluna])
      escreva("Quantidade: ")
      leia(quantidade[linha, coluna])
    fimpara
  fimpara
  escreva("Código procurado: ")
  leia(procurado)
  encontrados <- 0
  total <- 0
  para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      se codigo[linha, coluna] = procurado entao
        escreval("Prateleira ", linha, ", posição ", coluna, ": ", quantidade[linha, coluna], " unidade(s)")
        encontrados <- encontrados + 1
        total <- total + quantidade[linha, coluna]
      fimse
    fimpara
  fimpara
  escreval("Caixas localizadas: ", encontrados, "; unidades: ", total)
fimalgoritmo
```

A varredura da matriz encontra inclusive códigos repetidos em prateleiras diferentes.
