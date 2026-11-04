# Lógica binária

**Data:** 2 de novembro · **Nível:** Simples

## Objetivo

Diga se um número inteiro é par ou ímpar.

## Como funciona

Número par deixa resto zero na divisão por dois.

### Palavras úteis

- **Resto da divisão:** É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
8 → par; 7 → ímpar
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero é par; números negativos também podem ser classificados.

## Dicas para resolução

1. Leia inteiro.
2. Use mod 2.
3. Compare com zero.

## Solução

```visualg
algoritmo "Desafio1102S"
var
numero: inteiro
inicio
escreva("Número inteiro: ")
  leia(numero)
  se numero mod 2 = 0 entao
    escreval("Par")
  senao
    escreval("Ímpar")
  fimse
fimalgoritmo
```

O operador mod fornece o resto da divisão.
