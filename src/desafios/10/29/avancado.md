# Figurinos do baile

**Data:** 29 de outubro · **Nível:** Avançado

## Objetivo

Distribua peças por participantes respeitando tamanhos e quantidades disponíveis.

## Como funciona

Cada participante pede uma peça P, M ou G; entregue apenas quando houver estoque naquele tamanho. Informe atendidos e saldo por tamanho.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Estoque P=1; dois pedidos P → primeiro atendido, segundo sem peça
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tamanho desconhecido não altera estoque.

## Dicas para resolução

1. Associe P, M e G a 1, 2 e 3.
2. Valide índice e saldo.
3. Decremente somente após a entrega.

## Solução

```visualg
algoritmo "Desafio1029A"
var
estoque: vetor[1..3] de inteiro
  i, tamanho, participantes, atendidos: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Peças do tamanho ", i, " (1 P, 2 M, 3 G): ")
    leia(estoque[i])
    se estoque[i] < 0 entao
      estoque[i] <- 0
    fimse
  fimpara
  escreva("Participantes: ")
  leia(participantes)
  atendidos <- 0
  se participantes > 0 entao
    para i de 1 ate participantes faca
      escreva("Tamanho pedido (1 P, 2 M, 3 G): ")
      leia(tamanho)
      se (tamanho >= 1) e (tamanho <= 3) entao
        se estoque[tamanho] > 0 entao
          estoque[tamanho] <- estoque[tamanho] - 1
          atendidos <- atendidos + 1
          escreval("Peça entregue ao participante ", i)
        senao
          escreval("Tamanho esgotado")
        fimse
      senao
        escreval("Tamanho inválido")
      fimse
    fimpara
  fimse
  escreval("Atendidos: ", atendidos)
  para i de 1 ate 3 faca
    escreval("Restante tamanho ", i, ": ", estoque[i])
  fimpara
fimalgoritmo
```

O tamanho é usado como índice do estoque e cada entrega subtrai uma unidade.
