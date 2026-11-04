# Rodízio de letras

**Data:** 22 de abril · **Nível:** Simples

## Objetivo

Transforme uma letra maiúscula em sua próxima letra, com Z voltando a A.

## Como funciona

Leia uma letra maiúscula de A a Z e mostre a próxima no alfabeto, com Z retornando a A.

## Exemplo de execução

```text
Letra: Z
A
```

Um texto de mais de uma letra é rejeitado.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0422S"
var
letra: caractere
  codigo: inteiro
inicio
escreva("Letra maiúscula: ")
  leia(letra)
  se compr(letra) = 1 entao
    codigo <- asc(letra)
    se (codigo >= 65) e (codigo <= 90) entao
      se letra = "Z" entao
        escreval("A")
      senao
        escreval(carac(codigo + 1))
      fimse
    senao
      escreval("Não é letra maiúscula de A a Z")
    fimse
  senao
    escreval("Informe exatamente uma letra")
  fimse
fimalgoritmo
```

O código do caractere seguinte é uma unidade maior, exceto na volta de Z a A.
