# Robô de entrega

**Data:** 9 de novembro · **Nível:** Avançado

## Objetivo

Navegue por grade, evite obstáculos e registre pontos atendidos.

## Como funciona

Robô percorre grade 5×5 por doze comandos. Obstáculos em (2,2) e (4,4); pontos de entrega em (1,5) e (5,1) contam somente na primeira visita.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
De (1,1), quatro movimentos à direita alcançam (1,5) e registram uma entrega
```

Tentativa de sair da grade ou atravessar obstáculo não move o robô.

## Dicas para resolução

1. Calcule nova célula.
2. Valide limites e obstáculo.
3. Marque destino atendido.

## Solução

```visualg
algoritmo "Desafio1109A"
var
obstaculo, entregue: vetor[1..5, 1..5] de inteiro
  linha, coluna, novaL, novaC, i, direcao, entregas: inteiro
inicio
para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      obstaculo[linha, coluna] <- 0
      entregue[linha, coluna] <- 0
    fimpara
  fimpara
  obstaculo[2, 2] <- 1
  obstaculo[4, 4] <- 1
  linha <- 1
  coluna <- 1
  entregas <- 0
  para i de 1 ate 12 faca
    escreva("Direção (1 cima, 2 direita, 3 baixo, 4 esquerda): ")
    leia(direcao)
    novaL <- linha
    novaC <- coluna
    escolha direcao
      caso 1
        novaL <- novaL - 1
      caso 2
        novaC <- novaC + 1
      caso 3
        novaL <- novaL + 1
      caso 4
        novaC <- novaC - 1
    fimescolha
    se (novaL >= 1) e (novaL <= 5) e (novaC >= 1) e (novaC <= 5) entao
      se obstaculo[novaL, novaC] = 0 entao
        linha <- novaL
        coluna <- novaC
      fimse
    fimse
    se ((linha = 1) e (coluna = 5)) ou ((linha = 5) e (coluna = 1)) entao
      se entregue[linha, coluna] = 0 entao
        entregue[linha, coluna] <- 1
        entregas <- entregas + 1
      fimse
    fimse
    escreval("Robô em (", linha, ",", coluna, "); entregas ", entregas)
  fimpara
fimalgoritmo
```

Uma matriz de estado impede contar o mesmo destino novamente.
