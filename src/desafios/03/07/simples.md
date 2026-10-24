# Três matérias

**Data:** 7 de março · **Nível:** Simples

## Objetivo

Leia e imprima os nomes de três disciplinas.

## Como funciona

Leia os nomes de três disciplinas e imprima cada uma em sua própria linha, preservando a ordem.

## Exemplo de execução

```text
Entradas: Matemática, História, Arte
Matemática
História
Arte
```

Nomes com espaços são preservados.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0307S"
var
a, b, c: caractere
inicio
escreva("Disciplina 1: ")
  leia(a)
  escreva("Disciplina 2: ")
  leia(b)
  escreva("Disciplina 3: ")
  leia(c)
  escreval(a)
  escreval(b)
  escreval(c)
fimalgoritmo
```

Não há ordenação: a saída acompanha exatamente a sequência digitada.
