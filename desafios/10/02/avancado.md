# Estoque de abóboras

**Data:** 2 de outubro · **Nível:** Avançado

## Objetivo

Gerencie entradas, vendas e perdas em três tamanhos diferentes.

## Como funciona

Controle três tamanhos de abóbora. Entrada aumenta saldo; venda e perda reduzem apenas se houver unidades suficientes.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Tamanho M com 5; vende 2 e perde 1 → saldo 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Saída maior que o estoque é recusada sem saldo negativo.

## Dicas para resolução

1. Associe cada tamanho a índice.
2. Valide saídas.
3. Atualize o contador correto.

## Solução

```visualg
algoritmo "Desafio1002A"
var
estoque: vetor[1..3] de inteiro
  i, acao, tamanho, quantidade, perdas, vendas: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Estoque inicial tamanho ", i, " (1 P, 2 M, 3 G): ")
    leia(estoque[i])
  fimpara
  vendas <- 0
  perdas <- 0
  escreva("Ação (1 entrada, 2 venda, 3 perda, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Tamanho (1 a 3): ")
    leia(tamanho)
    escreva("Quantidade: ")
    leia(quantidade)
    se (tamanho >= 1) e (tamanho <= 3) e (quantidade > 0) entao
      se acao = 1 entao
        estoque[tamanho] <- estoque[tamanho] + quantidade
      senao
        se (acao = 2) ou (acao = 3) entao
          se quantidade <= estoque[tamanho] entao
            estoque[tamanho] <- estoque[tamanho] - quantidade
            se acao = 2 entao
              vendas <- vendas + quantidade
            senao
              perdas <- perdas + quantidade
            fimse
          senao
            escreval("Estoque insuficiente")
          fimse
        fimse
      fimse
    fimse
    escreva("Ação (1 entrada, 2 venda, 3 perda, 0 sair): ")
    leia(acao)
  fimenquanto
  para i de 1 ate 3 faca
    escreval("Tamanho ", i, ": ", estoque[i])
  fimpara
  escreval("Vendidas: ", vendas, "; perdidas: ", perdas)
fimalgoritmo
```

Um vetor guarda saldo por tamanho e contadores distinguem vendas de perdas.
