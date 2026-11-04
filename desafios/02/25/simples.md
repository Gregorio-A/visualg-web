# Mensagem embaralhada

**Data:** 25 de fevereiro · **Nível:** Simples

## Objetivo

Apresente uma palavra ao contrário usando um laço.

## Como funciona

Leia uma palavra e mostre seus caracteres na ordem inversa.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Palavra: festa
atsef
```

Uma palavra com um caractere aparece igual.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0225S"
var
palavra: caractere
  i: inteiro
inicio
escreva("Palavra: ")
  leia(palavra)
  para i de compr(palavra) ate 1 passo -1 faca
    escreva(copia(palavra, i, 1))
  fimpara
  escreval("")
fimalgoritmo
```

`compr` encontra a última posição; `copia` extrai um caractere por vez enquanto o laço recua.
