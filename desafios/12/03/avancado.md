# Planejador de presentes

**Data:** 3 de dezembro · **Nível:** Avançado

## Objetivo

Associe pessoas, itens e orçamento máximo, evitando presentes duplicados.

## Como funciona

Cadastre cinco pessoas e cinco itens distintos; preços não negativos. Um item com nome já usado deve ser trocado.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.

## Exemplo de execução

```text
Ana: Livro R$ 20; Bia: Jogo R$ 30; orçamento R$ 60 → sobra R$ 10 (considerando as demais entradas a R$ 0).
```

**Como ler o exemplo:** a seta → significa "resulta em".

Orçamento negativo não é significativo; informe zero ou mais.

## Dicas para resolução

1. Use vetores paralelos para pessoa, item e preço.
2. Procure duplicatas antes de aceitar.
3. Some os preços e compare com o orçamento.

## Solução

```visualg
algoritmo "Desafio1203A"
var
  pessoa, item: vetor[1..5] de caractere
  preco: vetor[1..5] de real
  i, j: inteiro
  orcamento, total: real
  repetido: logico
inicio
  repita
    escreva("Orçamento máximo: ")
    leia(orcamento)
  ate orcamento >= 0
  total <- 0
  para i de 1 ate 5 faca
    escreva("Pessoa ", i, ": ")
    leia(pessoa[i])
    repita
      escreva("Item para ", pessoa[i], ": ")
      leia(item[i])
      repetido <- falso
      para j de 1 ate i-1 faca
        se item[j] = item[i] entao
          repetido <- verdadeiro
        fimse
      fimpara
      se repetido entao
        escreval("Item já escolhido; escolha outro")
      fimse
    ate nao repetido
    repita
      escreva("Preço: ")
      leia(preco[i])
    ate preco[i] >= 0
    total <- total + preco[i]
  fimpara
  para i de 1 ate 5 faca
    escreval(pessoa[i], ": ", item[i], " — R$ ", preco[i]:0:2)
  fimpara
  escreval("Total: R$ ", total:0:2)
  se total > orcamento entao
    escreval("Acima do orçamento em R$ ", total-orcamento:0:2)
  senao
    escreval("Dentro do orçamento; sobra R$ ", orcamento-total:0:2)
  fimse
fimalgoritmo
```

Antes de aceitar um item, compare-o aos anteriores; depois some o preço e compare com o limite.
