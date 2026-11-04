# Som ou silêncio

**Data:** 19 de fevereiro · **Nível:** Simples

## Objetivo

Verifique se um volume numérico ultrapassa o limite.

## Como funciona

Compare um volume numérico com o limite fornecido.

## Exemplo de execução

```text
Volume medido: 81
Limite permitido: 80
Volume acima do limite.
```

Valor igual ao limite não o ultrapassa.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0219S"
var
volume, limite: real
inicio
escreva("Volume medido: ")
  leia(volume)
  escreva("Limite permitido: ")
  leia(limite)
  se volume > limite entao
    escreval("Volume acima do limite.")
  senao
    escreval("Volume dentro do limite.")
  fimse
fimalgoritmo
```

A condição estrita `>` separa excesso de conformidade.
