# Balões na festa

**Data:** 18 de fevereiro · **Nível:** Simples

## Objetivo

Calcule quantos balões restam após estourar alguns.

## Como funciona

Subtraia do total inicial o número de balões estourados.

## Exemplo de execução

```text
Balões iniciais: 20
Balões estourados: 7
Balões restantes: 13
```

Se todos estouraram, restam zero balões; não aceite mais balões estourados que iniciais.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0218S"
var
iniciais, estourados, restantes: inteiro
inicio
escreva("Balões iniciais: ")
  leia(iniciais)
  escreva("Balões estourados: ")
  leia(estourados)
  se (iniciais >= 0) e (estourados >= 0) e (estourados <= iniciais) entao
    restantes <- iniciais - estourados
    escreval("Balões restantes: ", restantes)
  senao
    escreval("Quantidades inválidas.")
  fimse
fimalgoritmo
```

A validação garante uma contagem restante não negativa.
