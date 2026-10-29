# Oficina de reparos

**Data:** 19 de maio · **Nível:** Avançado

## Objetivo

Cadastre ordens por status e calcule tempo médio e custo por tipo.

## Como funciona

Cadastre seis ordens por tipo e status. Calcule custo total e tempo médio apenas das concluídas de cada tipo.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Mecânica concluída em 2 h/R$ 30 e 4 h/R$ 50
Tempo médio 3 h; custo R$ 80
```

Tipo sem ordem concluída apresenta quantidade e custo zero, sem dividir por zero.

## Dicas para resolução

1. Associe tipo a um índice.
2. Ignore ordens abertas nas médias.
3. Divida tempo somado pela quantidade concluída.

## Solução

```visualg
algoritmo "Desafio0519A"
var
quant: vetor[1..3] de inteiro
  somaTempo, somaCusto: vetor[1..3] de real
  i, tipo, status, tempo: inteiro
  custo: real
inicio
para i de 1 ate 3 faca
    quant[i] <- 0
    somaTempo[i] <- 0
    somaCusto[i] <- 0
  fimpara
  para i de 1 ate 6 faca
    escreva("Tipo da ordem (1 mecânica, 2 elétrica, 3 pintura): ")
    leia(tipo)
    escreva("Status (1 concluída, 2 aberta): ")
    leia(status)
    se (tipo >= 1) e (tipo <= 3) e (status = 1) entao
      escreva("Tempo em horas: ")
      leia(tempo)
      escreva("Custo R$: ")
      leia(custo)
      se (tempo >= 0) e (custo >= 0) entao
        quant[tipo] <- quant[tipo] + 1
        somaTempo[tipo] <- somaTempo[tipo] + tempo
        somaCusto[tipo] <- somaCusto[tipo] + custo
      fimse
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Tipo ", i, ": ", quant[i], " concluída(s), custo R$ ", somaCusto[i])
    se quant[i] > 0 entao
      escreval("Tempo médio: ", somaTempo[i] / quant[i], " h")
    fimse
  fimpara
fimalgoritmo
```

Vetores acumulam separadamente quantidade, tempo e custo de cada categoria.
