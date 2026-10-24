# Oficina de máscaras

**Data:** 1 de fevereiro · **Nível:** Avançado

## Objetivo

Cadastre pedidos por cor e tamanho e gere totais por combinação em matriz.

## Como funciona

Use três cores e três tamanhos identificados por números de 1 a 3. Cada pedido informa uma combinação e uma quantidade positiva. A célula da matriz acumula pedidos iguais.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Pedidos: cor 1/tamanho 2/3 unidades; cor 1/tamanho 2/2 unidades
Total da combinação cor 1/tamanho 2: 5
```

Uma combinação nunca pedida permanece com total zero.

## Dicas para resolução

1. Inicialize as nove células da matriz.
2. Valide cor e tamanho antes de usar como índices.
3. Some novas unidades à célula já existente.

## Solução

```visualg
algoritmo "Desafio0201A"
var
pedidos: vetor[1..3, 1..3] de inteiro
  cor, tamanho, quantidade, i, j, total: inteiro
inicio
para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      pedidos[i, j] <- 0
    fimpara
  fimpara
  escreva("Quantidade de pedidos: ")
  leia(total)
  para i de 1 ate total faca
    escreva("Cor (1 a 3): ")
    leia(cor)
    escreva("Tamanho (1 a 3): ")
    leia(tamanho)
    escreva("Unidades: ")
    leia(quantidade)
    se (cor >= 1) e (cor <= 3) e (tamanho >= 1) e (tamanho <= 3) e (quantidade > 0) entao
      pedidos[cor, tamanho] <- pedidos[cor, tamanho] + quantidade
    senao
      escreval("Pedido inválido.")
    fimse
  fimpara
  para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      escreval("Cor ", i, ", tamanho ", j, ": ", pedidos[i, j])
    fimpara
  fimpara
fimalgoritmo
```

A posição `[cor, tamanho]` da matriz representa exatamente uma combinação e é incrementada a cada pedido válido.
