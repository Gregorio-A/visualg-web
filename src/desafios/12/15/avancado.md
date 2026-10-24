# Organização das mesas

**Data:** 15 de dezembro · **Nível:** Avançado

## Objetivo

Distribua grupos familiares por mesas respeitando capacidades e proximidade.

## Como funciona

Cinco grupos familiares ficam juntos em uma de três mesas. Escolha a mesa com menor espaço livre que comporte o grupo; não divida famílias.

## Exemplo de execução

```text
Mesas 4, 6 e 8; primeira família com 5 pessoas → mesa de 6.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se nenhuma mesa comportar um grupo, informe que ele não foi alocado.

## Dicas para resolução

1. Controle ocupação por mesa.
2. Encontre a menor sobra que ainda cabe.
3. Atualize a mesa escolhida.

## Solução

```visualg
algoritmo "Desafio1215A"
var
  familia: vetor[1..5] de inteiro
  tamanho: vetor[1..3] de inteiro
  ocupada: vetor[1..3] de inteiro
  i, j, mesa, livre: inteiro
inicio
  para j de 1 ate 3 faca
    repita
      escreva("Capacidade da mesa ", j, ": ")
      leia(tamanho[j])
    ate tamanho[j] >= 0
    ocupada[j] <- 0
  fimpara
  para i de 1 ate 5 faca
    repita
      escreva("Pessoas da família ", i, ": ")
      leia(familia[i])
    ate familia[i] > 0
    mesa <- 0
    livre <- 9999
    para j de 1 ate 3 faca
      se (tamanho[j]-ocupada[j] >= familia[i]) e (tamanho[j]-ocupada[j] < livre) entao
        mesa <- j
        livre <- tamanho[j]-ocupada[j]
      fimse
    fimpara
    se mesa = 0 entao
      escreval("Família ", i, " não cabe sem separação")
    senao
      ocupada[mesa] <- ocupada[mesa]+familia[i]
      escreval("Família ", i, " na mesa ", mesa)
    fimse
  fimpara
  para j de 1 ate 3 faca
    escreval("Mesa ", j, ": ", ocupada[j], "/", tamanho[j])
  fimpara
fimalgoritmo
```

O encaixe na menor capacidade disponível aproxima os membros e preserva espaço maior para grupos grandes.
