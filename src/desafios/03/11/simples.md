# Página de leitura

**Data:** 11 de março · **Nível:** Simples

## Objetivo

Exiba os números de página de 1 até N.

## Como funciona

Leia N e imprima os números das páginas de 1 até N.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Última página: 3
Página 1
Página 2
Página 3
```

Se N for zero, não existe página a mostrar.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0311S"
var
quantidade, pagina: inteiro
inicio
escreva("Última página: ")
  leia(quantidade)
  para pagina de 1 ate quantidade faca
    escreval("Página ", pagina)
  fimpara
fimalgoritmo
```

O contador do laço representa diretamente o número da página.
