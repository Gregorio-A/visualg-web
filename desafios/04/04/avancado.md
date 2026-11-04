# Espelhos da matriz

**Data:** 4 de abril · **Nível:** Avançado

## Objetivo

Verifique simetria horizontal e vertical de uma grade de símbolos.

## Como funciona

Leia uma grade 3 × 3 de símbolos. Compare posições refletidas em relação ao eixo horizontal e ao vertical.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Grade AAA / ABA / AAA
Simetria horizontal: verdadeiro
Simetria vertical: verdadeiro
```

Uma grade pode ser simétrica em apenas um dos eixos, em ambos ou em nenhum.

## Dicas para resolução

1. Use matriz 3 × 3.
2. Compare cada célula com a célula espelhada em cada eixo.
3. Mantenha um resultado lógico separado por eixo.

## Solução

```visualg
algoritmo "Desafio0404A"
var
grade: vetor[1..3, 1..3] de caractere
  horizontal, vertical: logico
  i, j: inteiro
inicio
para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      escreva("Símbolo ", i, ",", j, ": ")
      leia(grade[i, j])
    fimpara
  fimpara
  horizontal <- verdadeiro
  vertical <- verdadeiro
  para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      se grade[i, j] <> grade[4 - i, j] entao
        horizontal <- falso
      fimse
      se grade[i, j] <> grade[i, 4 - j] entao
        vertical <- falso
      fimse
    fimpara
  fimpara
  escreval("Simetria horizontal: ", horizontal)
  escreval("Simetria vertical: ", vertical)
fimalgoritmo
```

A posição refletida horizontalmente tem linha `4 - i`; a refletida verticalmente tem coluna `4 - j`.
