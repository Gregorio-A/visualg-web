# Limite da mala

**Data:** 7 de janeiro · **Nível:** Simples

## Objetivo

Informe se o peso de uma bagagem ultrapassa um limite informado.

Verifique se a bagagem excede o limite de peso fornecido.

## Como funciona

Leia peso e limite na mesma unidade. O excesso existe somente quando peso é maior que limite.

## Exemplo de execução

```text
Peso da bagagem (kg): 24
Limite (kg): 23
Bagagem acima do limite.
```

Se peso e limite forem iguais, a bagagem está dentro do limite.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0107S"
var
peso, limite: real
inicio
escreva("Peso da bagagem (kg): ")
  leia(peso)
  escreva("Limite (kg): ")
  leia(limite)
  se peso > limite entao
    escreval("Bagagem acima do limite.")
  senao
    escreval("Bagagem dentro do limite.")
  fimse
fimalgoritmo
```

A condição `peso > limite` preserva a igualdade como caso permitido.
