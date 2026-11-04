# Orçamento da viagem

**Data:** 29 de janeiro · **Nível:** Simples

## Objetivo

Compare um custo previsto com o dinheiro disponível.

Verifique se o dinheiro disponível é suficiente para uma viagem de custo previsto.

## Como funciona

Leia custo e saldo. Se o custo couber no saldo, informe isso; caso contrário, mostre quanto falta.

## Exemplo de execução

```text
Custo previsto: 200
Dinheiro disponível: 150
Faltam: 50
```

Se custo e saldo forem iguais, a viagem cabe exatamente no orçamento.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0129S"
var
custo, disponivel: real
inicio
escreva("Custo previsto: ")
  leia(custo)
  escreva("Dinheiro disponível: ")
  leia(disponivel)
  se custo <= disponivel entao
    escreval("Viagem dentro do orçamento.")
  senao
    escreval("Faltam: ", custo - disponivel)
  fimse
fimalgoritmo
```

A subtração no caso insuficiente quantifica a diferença entre custo e disponibilidade.
