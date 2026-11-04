# Mixer virtual

**Data:** 15 de agosto · **Nível:** Avançado

## Objetivo

Gerencie níveis de três canais, aplique mudo e calcule volume médio.

## Como funciona

Controle três canais de 0 a 100. Mudo alterna entre ligado e desligado sem apagar o ajuste. A média efetiva inclui canais mudos como zero.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Canais 30, 60 e 90; terceiro mudo → média efetiva 30
```

**Como ler o exemplo:** a seta → significa "resulta em".

Volume fora de 0–100 é recusado e mantém o ajuste anterior.

## Dicas para resolução

1. Guarde nível e mudo separadamente.
2. Alterne mudo com 1 menos estado.
3. Some zero para canal mudo.

## Solução

```visualg
algoritmo "Desafio0815A"
var
volume: vetor[1..3] de inteiro
  mudo: vetor[1..3] de inteiro
  i, acao, canal, valor, soma: inteiro
inicio
para i de 1 ate 3 faca
    volume[i] <- 50
    mudo[i] <- 0
  fimpara
  escreva("Ação (1 volume, 2 mudo, 3 relatório, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao = 1) ou (acao = 2) entao
      escreva("Canal (1 a 3): ")
      leia(canal)
      se (canal >= 1) e (canal <= 3) entao
        se acao = 1 entao
          escreva("Novo volume (0 a 100): ")
          leia(valor)
          se (valor >= 0) e (valor <= 100) entao
            volume[canal] <- valor
          fimse
        senao
          mudo[canal] <- 1 - mudo[canal]
        fimse
      fimse
    senao
      se acao = 3 entao
        soma <- 0
        para i de 1 ate 3 faca
          se mudo[i] = 0 entao
            soma <- soma + volume[i]
            escreval("Canal ", i, ": ", volume[i])
          senao
            escreval("Canal ", i, ": mudo")
          fimse
        fimpara
        escreval("Volume médio efetivo: ", soma / 3)
      fimse
    fimse
    escreva("Ação (1 volume, 2 mudo, 3 relatório, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Dois vetores separam nível configurado e estado de mudo.
