# Sorveteria em funcionamento

**Data:** 3 de janeiro · **Nível:** Avançado

## Objetivo

Simule pedidos de três sabores, controle quantidades e total arrecadado.

Simule a venda de três sabores de sorvete e apresente quantidades e receita.

## Como funciona

Cadastre os preços de três sabores. Depois leia pedidos com sabor e quantidade; o código 0 encerra. Ignore quantidades não positivas e sabores fora de 1 a 3.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Preços: 5, 6, 7
Pedidos: sabor 1 × 2; sabor 3 × 1; 0
Sabor 1: 2 unidade(s)
Sabor 2: 0 unidade(s)
Sabor 3: 1 unidade(s)
Total arrecadado: 17
```

Encerrar sem pedidos gera receita e contagens iguais a zero.

## Dicas para resolução

1. Use vetores de tamanho três para preços e unidades vendidas.
2. Repita a leitura até receber o código de parada.
3. Acumule receita e quantidades apenas para pedidos válidos.

## Solução

```visualg
algoritmo "Desafio0103A"
var
precos: vetor[1..3] de real
  vendidos: vetor[1..3] de inteiro
  sabor, quantidade, i: inteiro
  receita: real
inicio
para i de 1 ate 3 faca
    escreva("Preço do sabor ", i, ": ")
    leia(precos[i])
    vendidos[i] <- 0
  fimpara
  receita <- 0
  escreva("Sabor do pedido (1 a 3; 0 encerra): ")
  leia(sabor)
  enquanto sabor <> 0 faca
    se (sabor >= 1) e (sabor <= 3) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se quantidade > 0 entao
        vendidos[sabor] <- vendidos[sabor] + quantidade
        receita <- receita + quantidade * precos[sabor]
      senao
        escreval("Quantidade inválida.")
      fimse
    senao
      escreval("Sabor inválido.")
    fimse
    escreva("Sabor do pedido (1 a 3; 0 encerra): ")
    leia(sabor)
  fimenquanto
  para i de 1 ate 3 faca
    escreval("Sabor ", i, ": ", vendidos[i], " unidade(s)")
  fimpara
  escreval("Total arrecadado: ", receita)
fimalgoritmo
```

Cada pedido atualiza apenas a posição do sabor selecionado e soma quantidade × preço à receita.
