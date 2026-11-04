# Loja de casacos

**Data:** 7 de julho · **Nível:** Avançado

## Objetivo

Organize modelos por tamanho, estoque e descontos e filtre itens disponíveis.

## Como funciona

Cadastre cinco modelos com tamanho, estoque, preço e desconto. Filtre por tamanho e mostre somente modelos em estoque com preço final.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Casaco M, estoque 2, preço R$ 100, desconto 20% → disponível por R$ 80
```

**Como ler o exemplo:** a seta → significa "resulta em".

Modelo sem estoque não aparece. Desconto fora de 0–100% invalida o preço.

## Dicas para resolução

1. Guarde todos os campos no mesmo índice.
2. Filtre tamanho e estoque.
3. Aplique o desconto para exibir.

## Solução

```visualg
algoritmo "Desafio0707A"
var
modelo: vetor[1..5] de caractere
  tamanho, estoque: vetor[1..5] de inteiro
  preco, desconto: vetor[1..5] de real
  i, filtro, encontrados: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Modelo ", i, ": ")
    leia(modelo[i])
    escreva("Tamanho (1 P, 2 M, 3 G): ")
    leia(tamanho[i])
    escreva("Estoque: ")
    leia(estoque[i])
    escreva("Preço: ")
    leia(preco[i])
    escreva("Desconto percentual: ")
    leia(desconto[i])
  fimpara
  escreva("Tamanho desejado (1 P, 2 M, 3 G): ")
  leia(filtro)
  encontrados <- 0
  para i de 1 ate 5 faca
    se (tamanho[i] = filtro) e (estoque[i] > 0) e (preco[i] >= 0) e (desconto[i] >= 0) e (desconto[i] <= 100) entao
      escreval(modelo[i], ": R$ ", preco[i] * (1 - desconto[i] / 100), ", ", estoque[i], " disponível(is)")
      encontrados <- encontrados + 1
    fimse
  fimpara
  escreval("Modelos disponíveis no tamanho: ", encontrados)
fimalgoritmo
```

Vetores paralelos mantêm os atributos de cada modelo associados.
