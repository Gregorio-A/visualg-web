# Bônus de produtividade

**Data:** 10 de maio · **Nível:** Simples

## Objetivo

Adicione bônus fixo quando a meta for atingida.

## Como funciona

Leia produção, meta, pagamento base e bônus fixo. Some o bônus somente quando a produção alcançar a meta.

## Exemplo de execução

```text
Produção: 10; meta: 10; base: 100; bônus: 20
Pagamento final: 120
```

Produção igual à meta recebe bônus.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0510S"
var
producao, meta, salario, bonus: real
inicio
escreva("Produção alcançada: ")
  leia(producao)
  escreva("Meta: ")
  leia(meta)
  escreva("Pagamento base: ")
  leia(salario)
  escreva("Bônus fixo: ")
  leia(bonus)
  se producao >= meta entao
    salario <- salario + bonus
  fimse
  escreval("Pagamento final: ", salario)
fimalgoritmo
```

O pagamento base é preservado quando a condição da meta é falsa.
