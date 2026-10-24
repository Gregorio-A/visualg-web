# Par misterioso

**Data:** 8 de abril · **Nível:** Simples

## Objetivo

Verifique se dois números possuem a mesma paridade.

## Como funciona

Dois inteiros têm a mesma paridade quando ambos são pares ou ambos são ímpares.

## Exemplo de execução

```text
Primeiro: 4; segundo: 8
Mesma paridade
```

Números negativos também são pares ou ímpares; use a comparação entre restos com cuidado.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0408S"
var
a, b: inteiro
inicio
escreva("Primeiro inteiro: ")
  leia(a)
  escreva("Segundo inteiro: ")
  leia(b)
  se ((a mod 2 = 0) e (b mod 2 = 0)) ou ((a mod 2 <> 0) e (b mod 2 <> 0)) entao
    escreval("Mesma paridade")
  senao
    escreval("Paridades diferentes")
  fimse
fimalgoritmo
```

Comparar os restos por dois identifica se ambos pertencem à mesma classe.
