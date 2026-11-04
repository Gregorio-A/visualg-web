# Plano alternativo

**Data:** 24 de fevereiro · **Nível:** Avançado

## Objetivo

Avalie capacidade de ambientes e redistribua grupos quando a opção externa fechar.

## Como funciona

Leia as capacidades de dois ambientes e quatro grupos. Priorize o espaço coberto; se não couber, use a área aberta somente quando estiver disponível. Não divida um grupo entre ambientes.

## Exemplo de execução

```text
Coberto: 5 vagas; aberto: 10 vagas; área aberta fechada
Grupos de 3 e 4 pessoas
Grupo 1 no coberto; grupo 2 sem espaço
```

Um grupo que cabe exatamente nas vagas restantes pode entrar. Grupo maior que a capacidade restante não é dividido.

## Dicas para resolução

1. Calcule vagas restantes antes de alocar.
2. Considere o fechamento do ambiente externo.
3. Preserve grupos inteiros.

## Solução

```visualg
algoritmo "Desafio0224A"
var
grupo: vetor[1..4] de inteiro
  capacidadeCoberta, capacidadeAberta, fechado, i, coberto, aberto: inteiro
inicio
escreva("Capacidade do ambiente coberto: ")
  leia(capacidadeCoberta)
  escreva("Capacidade da área aberta: ")
  leia(capacidadeAberta)
  escreva("Área aberta fechou? (1 sim, 0 não): ")
  leia(fechado)
  coberto <- 0
  aberto <- 0
  para i de 1 ate 4 faca
    escreva("Pessoas do grupo ", i, ": ")
    leia(grupo[i])
    se grupo[i] < 0 entao
      escreval("Grupo inválido")
    senao
      se grupo[i] <= capacidadeCoberta - coberto entao
      coberto <- coberto + grupo[i]
      escreval("Grupo ", i, " no ambiente coberto")
      senao
        se (fechado = 0) e (grupo[i] <= capacidadeAberta - aberto) entao
        aberto <- aberto + grupo[i]
        escreval("Grupo ", i, " na área aberta")
        senao
          escreval("Grupo ", i, " sem espaço")
        fimse
      fimse
    fimse
  fimpara
  escreval("Coberto: ", coberto, "; aberto: ", aberto)
fimalgoritmo
```

A variável `fechado` bloqueia a alocação na área externa; os contadores mantêm a ocupação de cada ambiente.
