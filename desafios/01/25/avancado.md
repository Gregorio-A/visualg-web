# Bilheteria do parque

**Data:** 25 de janeiro · **Nível:** Avançado

## Objetivo

Gerencie dois tipos de ingressos, capacidade diária e receita por categoria.

Controle a capacidade diária de um parque, dois tipos de ingresso e a receita de cada categoria.

## Como funciona

Leia a lotação máxima e o preço de cada tipo. Aceite pedidos até o código 0. Uma venda só é concluída se a quantidade for positiva e não ultrapassar as vagas restantes.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Capacidade: 3; preços: tipo 1 R$ 20, tipo 2 R$ 10
Venda: dois do tipo 1 e um do tipo 2
Receita tipo 1: 40; tipo 2: 10; total: 50
Vagas restantes: 0
```

Um pedido maior que as vagas restantes é recusado integralmente.

## Dicas para resolução

1. Mantenha um contador de vagas restantes.
2. Verifique a capacidade antes de registrar a venda.
3. Calcule receita por tipo usando unidades vendidas vezes preço.

## Solução

```visualg
algoritmo "Desafio0125A"
var
preco: vetor[1..2] de real
  vendidos: vetor[1..2] de inteiro
  capacidade, restantes, tipo, quantidade, i: inteiro
  receita, total: real
inicio
escreva("Capacidade diária: ")
  leia(capacidade)
  para i de 1 ate 2 faca
    escreva("Preço do ingresso tipo ", i, ": ")
    leia(preco[i])
    vendidos[i] <- 0
  fimpara
  restantes <- capacidade
  escreva("Tipo (1 ou 2; 0 encerra): ")
  leia(tipo)
  enquanto tipo <> 0 faca
    se (tipo = 1) ou (tipo = 2) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se (quantidade > 0) e (quantidade <= restantes) entao
        vendidos[tipo] <- vendidos[tipo] + quantidade
        restantes <- restantes - quantidade
      senao
        escreval("Pedido sem capacidade suficiente.")
      fimse
    senao
      escreval("Tipo inválido.")
    fimse
    escreva("Tipo (1 ou 2; 0 encerra): ")
    leia(tipo)
  fimenquanto
  total <- 0
  para i de 1 ate 2 faca
    receita <- vendidos[i] * preco[i]
    escreval("Tipo ", i, ": ", vendidos[i], " vendido(s), receita ", receita)
    total <- total + receita
  fimpara
  escreval("Receita total: ", total)
  escreval("Vagas restantes: ", restantes)
fimalgoritmo
```

O estoque é compartilhado entre os tipos; o vetor de vendas permite calcular a receita por categoria no encerramento.
