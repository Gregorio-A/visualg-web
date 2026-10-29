# Relatório de vendas

**Data:** 23 de fevereiro · **Nível:** Avançado

## Objetivo

Leia vendas por setor e turno em matriz e informe destaques.

## Como funciona

Registre vendas de três setores em dois turnos por uma matriz. Mostre total de cada setor, total geral e a célula de maior venda.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Setor 1: 10 e 20; setor 2: 5 e 15; setor 3: 0 e 10
Total geral: 60
Maior setor/turno: 1/2 com 20
```

Em empate de maior célula, a primeira na ordem de leitura permanece selecionada.

## Dicas para resolução

1. Percorra as duas dimensões da matriz.
2. Some as duas colunas para o total de cada setor.
3. Compare cada célula para localizar o maior valor.

## Solução

```visualg
algoritmo "Desafio0223A"
var
vendas: vetor[1..3, 1..2] de real
  setor, turno, melhorSetor, melhorTurno: inteiro
  totalSetor, maiorSetor, maiorCelula, total: real
inicio
maiorCelula <- -1
  maiorSetor <- -1
  melhorSetor <- 0
  melhorTurno <- 0
  total <- 0
  para setor de 1 ate 3 faca
    totalSetor <- 0
    para turno de 1 ate 2 faca
      escreva("Vendas do setor ", setor, ", turno ", turno, ": ")
      leia(vendas[setor, turno])
      totalSetor <- totalSetor + vendas[setor, turno]
      total <- total + vendas[setor, turno]
      se vendas[setor, turno] > maiorCelula entao
        maiorCelula <- vendas[setor, turno]
        melhorSetor <- setor
        melhorTurno <- turno
      fimse
    fimpara
    escreval("Total do setor ", setor, ": ", totalSetor)
    se totalSetor > maiorSetor entao
      maiorSetor <- totalSetor
    fimse
  fimpara
  escreval("Total geral: ", total)
  escreval("Maior setor/turno: ", melhorSetor, "/", melhorTurno, " com ", maiorCelula)
fimalgoritmo
```

Cada linha da matriz representa um setor e cada coluna um turno.
