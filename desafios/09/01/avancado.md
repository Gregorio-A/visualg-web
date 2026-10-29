# Viveiro de mudas

**Data:** 1 de setembro · **Nível:** Avançado

## Objetivo

Controle espécies, estoques e distribuição para áreas de reflorestamento.

## Como funciona

Cadastre três espécies e respectivos estoques. Quatro áreas solicitam uma espécie e quantidade; entregue pedidos inteiros somente quando houver saldo.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Estoque 10; área solicita 4 → entrega 4, saldo 6
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pedido acima do estoque é recusado sem entrega parcial.

## Dicas para resolução

1. Guarde espécies e quantidades.
2. Valide o tipo solicitado.
3. Confira saldo antes de entregar.

## Solução

```visualg
algoritmo "Desafio0901A"
var
especie: vetor[1..3] de caractere
  estoque: vetor[1..3] de inteiro
  i, area, tipo, quantidade: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Espécie ", i, ": ")
    leia(especie[i])
    escreva("Estoque de mudas: ")
    leia(estoque[i])
  fimpara
  para area de 1 ate 4 faca
    escreva("Espécie solicitada para área ", area, " (1 a 3): ")
    leia(tipo)
    escreva("Quantidade: ")
    leia(quantidade)
    se (tipo >= 1) e (tipo <= 3) e (quantidade > 0) entao
      se quantidade <= estoque[tipo] entao
        estoque[tipo] <- estoque[tipo] - quantidade
        escreval("Área ", area, " recebeu ", quantidade, " muda(s) de ", especie[tipo])
      senao
        escreval("Estoque insuficiente; faltam ", quantidade - estoque[tipo])
      fimse
    senao
      escreval("Pedido inválido")
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval(especie[i], ": ", estoque[i], " muda(s) restantes")
  fimpara
fimalgoritmo
```

O índice da espécie vincula o nome ao estoque que é reduzido após a distribuição.
