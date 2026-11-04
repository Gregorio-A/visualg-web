# Estoque mínimo

**Data:** 6 de maio · **Nível:** Avançado

## Objetivo

Registre entradas e saídas e gere relatório de reposição para cinco produtos.

## Como funciona

Cadastre estoque e mínimo de cinco produtos. Registre entradas e saídas válidas; ao encerrar, informe quanto repor para produtos abaixo do mínimo.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Estoque 3, mínimo 5; saída válida de 1
Saldo 2; repor 3 unidades
```

Saída maior que o saldo é recusada sem tornar o estoque negativo.

## Dicas para resolução

1. Associe saldos e mínimos pelo índice do produto.
2. Valide saídas antes de subtrair.
3. Mostre reposição para os saldos abaixo da meta.

## Solução

```visualg
algoritmo "Desafio0506A"
var
nome: vetor[1..5] de caractere
  estoque, minimo: vetor[1..5] de inteiro
  produto, quantidade, acao, i: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Estoque inicial: ")
    leia(estoque[i])
    escreva("Estoque mínimo: ")
    leia(minimo[i])
  fimpara
  escreva("Ação (1 entrada, 2 saída, 0 encerrar): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Produto (1 a 5): ")
    leia(produto)
    escreva("Quantidade: ")
    leia(quantidade)
    se (produto >= 1) e (produto <= 5) e (quantidade > 0) entao
      se acao = 1 entao
        estoque[produto] <- estoque[produto] + quantidade
      senao
        se (acao = 2) e (quantidade <= estoque[produto]) entao
          estoque[produto] <- estoque[produto] - quantidade
        senao
          escreval("Saída recusada.")
        fimse
      fimse
    fimse
    escreva("Ação (1 entrada, 2 saída, 0 encerrar): ")
    leia(acao)
  fimenquanto
  para i de 1 ate 5 faca
    escreval(nome[i], ": saldo ", estoque[i])
    se estoque[i] < minimo[i] entao
      escreval("Repor ", minimo[i] - estoque[i], " unidade(s)")
    fimse
  fimpara
fimalgoritmo
```

O relatório usa a diferença mínimo menos saldo somente quando ela é positiva.
