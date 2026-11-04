# Vitrine automática

**Data:** 29 de maio · **Nível:** Avançado

## Objetivo

Filtre produtos por percentual de desconto e ordene pelo valor economizado.

## Como funciona

Filtre cinco produtos por desconto percentual mínimo e ordene os elegíveis pela economia em reais, da maior para a menor.

## Exemplo de execução

```text
Mínimo 10%; A: R$ 100 com 20% → R$ 20; B: R$ 300 com 10% → R$ 30
B aparece antes de A
```

**Como ler o exemplo:** a seta → significa "resulta em".

Preço negativo ou desconto fora de 0–100% exclui o produto.

## Dicas para resolução

1. Calcule economia = preço × desconto/100.
2. Marque inelegíveis.
3. Ordene economia e nome juntos.

## Solução

```visualg
algoritmo "Desafio0529A"
var
nome: vetor[1..5] de caractere
  economia: vetor[1..5] de real
  i, j: inteiro
  preco, desconto, limite, troca: real
  nomeTroca: caractere
inicio
escreva("Desconto mínimo percentual: ")
  leia(limite)
  para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Preço: ")
    leia(preco)
    escreva("Desconto percentual: ")
    leia(desconto)
    economia[i] <- -1
    se (preco >= 0) e (desconto >= limite) e (desconto <= 100) e (desconto >= 0) entao
      economia[i] <- preco * desconto / 100
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se economia[j] > economia[i] entao
        troca <- economia[i]
        economia[i] <- economia[j]
        economia[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    se economia[i] >= 0 entao
      escreval(nome[i], ": economia R$ ", economia[i])
    fimse
  fimpara
fimalgoritmo
```

O filtro usa percentual; a ordenação usa o dinheiro efetivamente economizado.
