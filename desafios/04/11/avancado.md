# Equações simples

**Data:** 11 de abril · **Nível:** Avançado

## Objetivo

Resolva um sistema de duas equações lineares e trate ausência de solução única.

## Como funciona

Leia coeficientes de `a1*x + b1*y = c1` e `a2*x + b2*y = c2`. Use determinante para achar solução única; se ele for zero, distinga retas coincidentes de incompatíveis.

## Exemplo de execução

```text
Equações x+y=3 e x-y=1
Solução única: x=2, y=1
```

Duas equações iguais têm infinitas soluções; equações como x+y=1 e x+y=2 não têm solução.

## Dicas para resolução

1. Monte o determinante dos coeficientes.
2. Divida somente quando ele for diferente de zero.
3. Quando for zero, compare proporcionalidade dos termos independentes.

## Solução

```visualg
algoritmo "Desafio0411A"
var
a1, b1, c1, a2, b2, c2, determinante, x, y: real
inicio
escreva("a1: ")
  leia(a1)
  escreva("b1: ")
  leia(b1)
  escreva("c1: ")
  leia(c1)
  escreva("a2: ")
  leia(a2)
  escreva("b2: ")
  leia(b2)
  escreva("c2: ")
  leia(c2)
  determinante <- a1 * b2 - a2 * b1
  se determinante <> 0 entao
    x <- (c1 * b2 - c2 * b1) / determinante
    y <- (a1 * c2 - a2 * c1) / determinante
    escreval("Solução única: x=", x, ", y=", y)
  senao
    se ((a1 = 0) e (b1 = 0) e (c1 <> 0)) ou ((a2 = 0) e (b2 = 0) e (c2 <> 0)) entao
      escreval("Sistema sem solução.")
    senao
      se (a1 * c2 = a2 * c1) e (b1 * c2 = b2 * c1) entao
        escreval("Sistema com infinitas soluções.")
      senao
        escreval("Sistema sem solução.")
      fimse
    fimse
  fimse
fimalgoritmo
```

As fórmulas de Cramer calculam x e y quando o determinante principal é não nulo.
