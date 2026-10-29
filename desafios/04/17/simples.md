# Desenho quadrado

**Data:** 17 de abril · **Nível:** Simples

## Objetivo

Imprima um quadrado de # com lado N.

## Como funciona

Leia N e imprima N linhas de N sinais # para formar um quadrado preenchido.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Lado: 3
###
###
###
```

Com lado zero, nenhuma linha aparece.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0417S"
var
lado, linha, coluna: inteiro
inicio
escreva("Lado do quadrado: ")
  leia(lado)
  para linha de 1 ate lado faca
    para coluna de 1 ate lado faca
      escreva("#")
    fimpara
    escreval("")
  fimpara
fimalgoritmo
```

Os dois laços controlam linhas e colunas independentemente.
