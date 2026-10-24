# Explorador noturno

**Data:** 21 de outubro · **Nível:** Avançado

## Objetivo

Administre energia da lanterna e escolhas de trajeto com custos diferentes.

## Como funciona

Lanterna começa com 20 unidades. Trajeto curto custa 3, longo custa 5; recarga acrescenta até 10 sem exceder 20. Só avance se houver energia.

## Exemplo de execução

```text
Carga 4: trajeto longo é recusado; curto avança e deixa carga 1
```

Carga nunca desce abaixo de zero nem supera 20.

## Dicas para resolução

1. Associe ação a custo.
2. Compare custo com carga.
3. Atualize posição só após gastar energia.

## Solução

```visualg
algoritmo "Desafio1021A"
var
carga, acao, custo, posicao: inteiro
inicio
carga <- 20
  posicao <- 1
  escreva("Trajeto (1 curto custa 3, 2 longo custa 5, 3 recarregar 10, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    custo <- 0
    se acao = 1 entao
      custo <- 3
    fimse
    se acao = 2 entao
      custo <- 5
    fimse
    se custo > 0 entao
      se carga >= custo entao
        carga <- carga - custo
        posicao <- posicao + 1
        escreval("Avançou ao ponto ", posicao)
      senao
        escreval("Carga insuficiente")
      fimse
    fimse
    se acao = 3 entao
      carga <- carga + 10
      se carga > 20 entao
        carga <- 20
      fimse
    fimse
    escreval("Carga ", carga, "/20, ponto ", posicao)
    escreva("Próximo trajeto (0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

O custo do trajeto é validado antes de atualizar carga e posição.
