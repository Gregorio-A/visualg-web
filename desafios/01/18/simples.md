# Nota do hotel

**Data:** 18 de janeiro · **Nível:** Simples

## Objetivo

Leia uma nota de 0 a 10 e diga se é pelo menos 8.

Informe se uma nota válida alcança o limite de 8 pontos.

## Como funciona

Leia um valor de 0 a 10. Rejeite valores fora dessa faixa; depois compare com 8 de forma inclusiva.

## Exemplo de execução

```text
Nota de 0 a 10: 8
Nota pelo menos 8.
```

A nota 7,9 fica abaixo de 8; a nota 11 é inválida.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0118S"
var
nota: real
inicio
escreva("Nota de 0 a 10: ")
  leia(nota)
  se (nota < 0) ou (nota > 10) entao
    escreval("Nota inválida.")
  senao
    se nota >= 8 entao
      escreval("Nota pelo menos 8.")
    senao
      escreval("Nota abaixo de 8.")
    fimse
  fimse
fimalgoritmo
```

A primeira condição valida a entrada e a segunda avalia o limite solicitado.
