# Livros emprestados

**Data:** 9 de março · **Nível:** Simples

## Objetivo

Calcule quantos livros continuam disponíveis.

## Como funciona

Subtraia os livros emprestados dos exemplares disponíveis antes dos empréstimos.

## Exemplo de execução

```text
Disponíveis: 30
Emprestados: 8
Livros restantes: 22
```

Emprestar todos os exemplares deixa zero livro disponível.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0309S"
var
disponiveis, emprestados, restantes: inteiro
inicio
escreva("Livros disponíveis inicialmente: ")
  leia(disponiveis)
  escreva("Livros emprestados: ")
  leia(emprestados)
  se (emprestados >= 0) e (emprestados <= disponiveis) entao
    restantes <- disponiveis - emprestados
    escreval("Livros restantes: ", restantes)
  senao
    escreval("Contagens inválidas.")
  fimse
fimalgoritmo
```

A validação impede que a contagem final fique negativa.
