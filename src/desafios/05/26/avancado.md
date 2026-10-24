# Fábrica em turnos

**Data:** 26 de maio · **Nível:** Avançado

## Objetivo

Acompanhe produção e perdas por máquina numa matriz e gere relatórios.

## Como funciona

Registre três máquinas em dois turnos. Peças boas = produção menos perdas. Mostre peças boas por máquina e totais da fábrica.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Máquina 1: turnos 10/1 e 12/2 (produção/perdas)
19 peças boas
```

Perda maior que produção invalida somente a célula correspondente.

## Dicas para resolução

1. Percorra máquina e turno.
2. Subtraia perdas em cada célula válida.
3. Acumule por máquina e no total.

## Solução

```visualg
algoritmo "Desafio0526A"
var
producao, perdas: vetor[1..3, 1..2] de inteiro
  maquina, turno, bom, totalBom, totalPerdas: inteiro
inicio
totalBom <- 0
  totalPerdas <- 0
  para maquina de 1 ate 3 faca
    bom <- 0
    para turno de 1 ate 2 faca
      escreva("Produção da máquina ", maquina, " turno ", turno, ": ")
      leia(producao[maquina, turno])
      escreva("Perdas: ")
      leia(perdas[maquina, turno])
      se (producao[maquina, turno] >= 0) e (perdas[maquina, turno] >= 0) e (perdas[maquina, turno] <= producao[maquina, turno]) entao
        bom <- bom + producao[maquina, turno] - perdas[maquina, turno]
        totalPerdas <- totalPerdas + perdas[maquina, turno]
      senao
        escreval("Registro inválido ignorado")
      fimse
    fimpara
    escreval("Máquina ", maquina, ": ", bom, " peças boas")
    totalBom <- totalBom + bom
  fimpara
  escreval("Total bom: ", totalBom, "; perdas: ", totalPerdas)
fimalgoritmo
```

Matrizes associam cada registro ao par máquina e turno.
