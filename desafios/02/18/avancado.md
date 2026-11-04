# Reposição de balões

**Data:** 18 de fevereiro · **Nível:** Avançado

## Objetivo

Simule consumo em turnos e calcule o momento em que será necessária reposição.

## Como funciona

Leia estoque inicial e, por turno, consumo previsto e reposição posterior. Registre o primeiro turno cujo consumo excede o estoque disponível e quanto faltou.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Estoque inicial 5; turno 1 consome 3, repõe 0; turno 2 pede 4
Primeiro turno com necessidade: 2
Falta no turno 2: 2
```

Se todos os turnos forem atendidos, o índice da primeira necessidade fica zero.

## Dicas para resolução

1. Compare consumo com estoque antes de subtrair.
2. Guarde o primeiro turno insuficiente.
3. Aplique reposições somente depois de cada turno.

## Solução

```visualg
algoritmo "Desafio0218A"
var
estoque, consumo, reposicao: inteiro
  turnos, i, primeiraNecessidade: inteiro
inicio
escreva("Balões iniciais: ")
  leia(estoque)
  escreva("Número de turnos: ")
  leia(turnos)
  primeiraNecessidade <- 0
  para i de 1 ate turnos faca
    escreva("Consumo previsto do turno ", i, ": ")
    leia(consumo)
    se consumo < 0 entao
      escreval("Consumo inválido.")
    senao
      se consumo > estoque entao
      se primeiraNecessidade = 0 entao
        primeiraNecessidade <- i
      fimse
      escreval("Reposição necessária no turno ", i, ": ", consumo - estoque)
      estoque <- 0
      senao
        estoque <- estoque - consumo
      fimse
    fimse
    escreva("Reposição após o turno: ")
    leia(reposicao)
    se reposicao > 0 entao
      estoque <- estoque + reposicao
    fimse
  fimpara
  escreval("Primeiro turno com necessidade de reposição: ", primeiraNecessidade)
  escreval("Estoque final: ", estoque)
fimalgoritmo
```

O programa consome somente o estoque disponível e mostra a quantidade que precisaria ser reposta para atender integralmente o turno.
