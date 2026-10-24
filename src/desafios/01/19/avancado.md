# Distribuição de água

**Data:** 19 de janeiro · **Nível:** Avançado

## Objetivo

Calcule quantas caixas de tamanhos diferentes atendem um grupo com menor sobra.

Escolha entre três tamanhos de caixa para fornecer ao menos uma garrafa por pessoa com a menor sobra.

## Como funciona

Leia o tamanho do grupo e a quantidade de garrafas de cada tipo de caixa. Use apenas um tipo por escolha. Calcule quantas caixas inteiras são necessárias para cobrir o grupo e compare a sobra. Em empate, prefira menos caixas.

## Exemplo de execução

```text
Pessoas: 11; capacidades: 4, 6, 8
Tipo 1: 3 caixas, sobra 1; tipo 2: 2 caixas, sobra 1; tipo 3: 2 caixas, sobra 5
Escolha: tipo 2, duas caixas, sobra 1
```

Capacidades nulas ou negativas são descartadas. O grupo deve ter pelo menos uma pessoa.

## Dicas para resolução

1. Para cada tamanho, encontre o menor número inteiro de caixas suficiente.
2. Calcule a sobra após atender o grupo.
3. Compare primeiro a sobra, depois o número de caixas.

## Solução

```visualg
algoritmo "Desafio0119A"
var
capacidade: vetor[1..3] de inteiro
  pessoas, quantidade, sobra, melhorQuantidade, melhorSobra, melhorCaixa, i: inteiro
inicio
escreva("Pessoas a atender: ")
  leia(pessoas)
  para i de 1 ate 3 faca
    escreva("Garrafas por caixa do tipo ", i, ": ")
    leia(capacidade[i])
  fimpara
  melhorCaixa <- 0
  melhorSobra <- 999999999
  melhorQuantidade <- 999999999
  se pessoas > 0 entao
    para i de 1 ate 3 faca
      se capacidade[i] > 0 entao
        quantidade <- pessoas div capacidade[i]
        se quantidade * capacidade[i] < pessoas entao
          quantidade <- quantidade + 1
        fimse
        sobra <- quantidade * capacidade[i] - pessoas
        se (sobra < melhorSobra) ou ((sobra = melhorSobra) e (quantidade < melhorQuantidade)) entao
          melhorCaixa <- i
          melhorSobra <- sobra
          melhorQuantidade <- quantidade
        fimse
      fimse
    fimpara
  fimse
  se melhorCaixa > 0 entao
    escreval("Tipo de caixa: ", melhorCaixa)
    escreval("Caixas necessárias: ", melhorQuantidade)
    escreval("Garrafas restantes: ", melhorSobra)
  senao
    escreval("Informe pessoas e capacidades positivas.")
  fimse
fimalgoritmo
```

A divisão inteira calcula o mínimo de caixas completas, com acréscimo de uma quando ainda faltam garrafas.
