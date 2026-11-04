# Mensagem invertida

**Data:** 29 de abril · **Nível:** Simples

## Objetivo

Inverta uma palavra com laço e funções de texto.

## Como funciona

Leia uma palavra e imprima seus caracteres do último para o primeiro.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.
- **Função:** É um bloco de comandos com nome que devolve um valor.

## Exemplo de execução

```text
Palavra: mapa
apam
```

Uma palavra de um caractere não muda.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0429S"
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

`compr` fornece a posição final e `copia` extrai um caractere em cada passo decrescente.
