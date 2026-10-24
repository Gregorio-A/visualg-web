# Jornada reduzida

**Data:** 14 de maio · **Nível:** Simples

## Objetivo

Diga se as horas trabalhadas ultrapassam a carga contratada.

## Como funciona

Compare horas trabalhadas e carga contratada. Há excesso somente se o primeiro valor for maior.

## Exemplo de execução

```text
Horas trabalhadas: 9
Carga contratada: 8
Horas acima da carga contratada.
```

Trabalhar exatamente a carga contratada não a ultrapassa.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0514S"
var
trabalhadas, contratadas: real
inicio
escreva("Horas trabalhadas: ")
  leia(trabalhadas)
  escreva("Carga contratada: ")
  leia(contratadas)
  se trabalhadas > contratadas entao
    escreval("Horas acima da carga contratada.")
  senao
    escreval("Carga não ultrapassada.")
  fimse
fimalgoritmo
```

A condição estrita `>` separa excesso de igualdade.
