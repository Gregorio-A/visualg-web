# Caixa de ferramentas

**Data:** 23 de maio · **Nível:** Simples

## Objetivo

Diga se a quantidade de ferramentas alcança a necessidade.

## Como funciona

Compare ferramentas disponíveis com a quantidade necessária.

## Exemplo de execução

```text
Disponíveis: 3
Necessárias: 5
Faltam 2 ferramenta(s).
```

Igualdade entre disponível e necessário significa quantidade suficiente.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0523S"
var
ferramentas, necessidade: inteiro
inicio
escreva("Ferramentas disponíveis: ")
  leia(ferramentas)
  escreva("Ferramentas necessárias: ")
  leia(necessidade)
  se ferramentas >= necessidade entao
    escreval("Quantidade suficiente.")
  senao
    escreval("Faltam ", necessidade - ferramentas, " ferramenta(s).")
  fimse
fimalgoritmo
```

A diferença é exibida somente quando há falta.
