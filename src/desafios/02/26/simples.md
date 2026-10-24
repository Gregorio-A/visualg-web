# Copos reutilizáveis

**Data:** 26 de fevereiro · **Nível:** Simples

## Objetivo

Multiplique convidados por copos por pessoa.

## Como funciona

Multiplique o número de convidados pela quantidade de copos prevista para cada um.

## Exemplo de execução

```text
Convidados: 20
Copos por pessoa: 2
Copos necessários: 40
```

Com zero convidados, não são necessários copos.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0226S"
var
convidados, coposPorPessoa, total: inteiro
inicio
escreva("Convidados: ")
  leia(convidados)
  escreva("Copos por pessoa: ")
  leia(coposPorPessoa)
  se (convidados >= 0) e (coposPorPessoa >= 0) entao
    total <- convidados * coposPorPessoa
    escreval("Copos necessários: ", total)
  senao
    escreval("Quantidades inválidas.")
  fimse
fimalgoritmo
```

A multiplicação calcula a necessidade total supondo a mesma quantidade por convidado.
