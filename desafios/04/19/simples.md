# Charada da idade

**Data:** 19 de abril · **Nível:** Simples

## Objetivo

Calcule em quantos anos alguém terá o dobro da idade atual.

## Como funciona

Leia idade atual e determine quantos anos devem transcorrer para que a idade seja o dobro da atual.

## Exemplo de execução

```text
Idade atual: 12
Daqui a 12 anos terá 24 anos
```

Para idade atual zero, o dobro também é zero e a diferença é zero ano.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0419S"
var
idade, dobro, anos: inteiro
inicio
escreva("Idade atual: ")
  leia(idade)
  se idade >= 0 entao
    dobro <- idade * 2
    anos <- dobro - idade
    escreval("Daqui a ", anos, " ano(s) terá ", dobro, " anos")
  senao
    escreval("Idade inválida")
  fimse
fimalgoritmo
```

Dobro menos idade atual é igual à própria idade atual.
