# Fechaduras do castelo

**Data:** 13 de outubro · **Nível:** Avançado

## Objetivo

Valide sequência de chaves e estados de portas dependentes entre si.

## Como funciona

A porta 1 exige chave 1; atrás dela está chave 2; a porta 2 exige que porta 1 esteja aberta e chave 2 tenha sido encontrada.

## Exemplo de execução

```text
Pegar chave 1 → abrir porta 1 → pegar chave 2 → abrir porta 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tentar pegar chave 2 antes de abrir porta 1 é recusado.

## Dicas para resolução

1. Guarde as chaves.
2. Valide pré-requisito de cada porta.
3. Atualize estados após ação válida.

## Solução

```visualg
algoritmo "Desafio1013A"
var
chave1, chave2, porta1, porta2: inteiro
  acao: inteiro
inicio
chave1 <- 0
  chave2 <- 0
  porta1 <- 0
  porta2 <- 0
  escreva("Ação (1 pegar chave 1, 2 abrir porta 1, 3 pegar chave 2, 4 abrir porta 2, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escolha acao
      caso 1
        chave1 <- 1
        escreval("Primeira chave encontrada")
      caso 2
        se chave1 = 1 entao
          porta1 <- 1
          escreval("Porta 1 aberta")
        senao
          escreval("Porta 1 trancada")
        fimse
      caso 3
        se porta1 = 1 entao
          chave2 <- 1
          escreval("Segunda chave encontrada")
        senao
          escreval("A chave 2 está atrás da porta 1")
        fimse
      caso 4
        se (porta1 = 1) e (chave2 = 1) entao
          porta2 <- 1
          escreval("Porta 2 aberta; castelo concluído")
        senao
          escreval("Porta 2 trancada")
        fimse
    fimescolha
    escreva("Próxima ação (0 sair): ")
    leia(acao)
  fimenquanto
  escreval("Portas abertas: ", porta1 + porta2)
fimalgoritmo
```

Quatro estados lógicos inteiros representam chaves obtidas e portas abertas.
