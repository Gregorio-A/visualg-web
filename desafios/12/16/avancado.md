# Distribuição de sobremesas

**Data:** 16 de dezembro · **Nível:** Avançado

## Objetivo

Divida porções de vários sabores por preferências e estoques.

## Como funciona

Cada pessoa recebe no máximo uma fatia do sabor preferido; não há substituição automática por outro sabor.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Sabor 1 tem uma fatia; duas pessoas o preferem → primeira recebe, segunda fica sem.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma preferência não disponível não reduz os outros estoques.

## Dicas para resolução

1. Leia estoque por sabor.
2. Para cada pessoa, consulte sua preferência.
3. Diminua somente o sabor solicitado.

## Solução

```visualg
algoritmo "Desafio1216A"
var
  estoque, preferencia: vetor[1..3] de inteiro
  i, j, pessoas, recebidas: inteiro
inicio
  para j de 1 ate 3 faca
    escreva("Fatias disponíveis do sabor ", j, ": ")
    leia(estoque[j])
    se estoque[j] < 0 entao
      estoque[j] <- 0
    fimse
  fimpara
  escreva("Número de pessoas (1 a 10): ")
  leia(pessoas)
  se (pessoas < 1) ou (pessoas > 10) entao
    escreval("Quantidade inválida")
  senao
    recebidas <- 0
    para i de 1 ate pessoas faca
      repita
        escreva("Sabor preferido da pessoa ", i, " (1–3): ")
        leia(j)
      ate (j >= 1) e (j <= 3)
      preferencia[j] <- 0
      se estoque[j] > 0 entao
        estoque[j] <- estoque[j]-1
        recebidas <- recebidas+1
        escreval("Pessoa ", i, " recebeu sabor ", j)
      senao
        escreval("Pessoa ", i, " ficou sem o sabor preferido")
      fimse
    fimpara
    escreval("Atendidas: ", recebidas, "/", pessoas)
    para j de 1 ate 3 faca
      escreval("Restam ", estoque[j], " fatias do sabor ", j)
    fimpara
  fimse
fimalgoritmo
```

O vetor de estoque diminui conforme cada preferência é atendida.
