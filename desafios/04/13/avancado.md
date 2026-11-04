# Máquina de estados

**Data:** 13 de abril · **Nível:** Avançado

## Objetivo

Simule estados ABERTO, FECHADO e TRAVADO com transições permitidas.

## Como funciona

Modele uma porta com estados FECHADO, ABERTO e TRAVADO. Abrir só é permitido a partir de FECHADO; fechar a partir de ABERTO; travar a partir de FECHADO; destravar a partir de TRAVADO.

## Exemplo de execução

```text
Estado inicial FECHADO
Ação travar → TRAVADO
Ação abrir → transição recusada, continua TRAVADO
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma transição recusada não muda o estado.

## Dicas para resolução

1. Liste transições permitidas antes de codificar.
2. Altere o estado apenas quando o par atual/ação for válido.
3. Mostre o estado após cada ação.

## Solução

```visualg
algoritmo "Desafio0413A"
var
estado, acao: inteiro
inicio
estado <- 1
  escreval("Estado inicial: FECHADO")
  escreva("Ação (1 abrir, 2 fechar, 3 travar, 4 destravar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (estado = 1) e (acao = 1) entao
      estado <- 2
    senao
      se (estado = 2) e (acao = 2) entao
        estado <- 1
      senao
        se (estado = 1) e (acao = 3) entao
          estado <- 3
        senao
          se (estado = 3) e (acao = 4) entao
            estado <- 1
          senao
            escreval("Transição não permitida.")
          fimse
        fimse
      fimse
    fimse
    se estado = 1 entao
      escreval("FECHADO")
    fimse
    se estado = 2 entao
      escreval("ABERTO")
    fimse
    se estado = 3 entao
      escreval("TRAVADO")
    fimse
    escreva("Ação (1 abrir, 2 fechar, 3 travar, 4 destravar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

A variável `estado` representa o estado atual e cada par estado/ação determina a próxima transição.
