# Organizador de convidados

**Data:** 8 de dezembro · **Nível:** Avançado

## Objetivo

Cadastre confirmações, acompanhantes e calcule capacidade necessária.

## Como funciona

Cadastre seis convites; somente confirmados e seus acompanhantes contam para a capacidade.

## Exemplo de execução

```text
Três confirmações sem acompanhantes e uma com dois acompanhantes → 5 pessoas.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Convidado que recusou não leva acompanhantes.

## Dicas para resolução

1. Leia confirmação antes dos acompanhantes.
2. Conte apenas quem irá.
3. Compare o total com a sala.

## Solução

```visualg
algoritmo "Desafio1208A"
var
  resposta, acompanhantes, i, pessoas, capacidade: inteiro
inicio
  pessoas <- 0
  para i de 1 ate 6 faca
    repita
      escreva("Convidado ", i, " confirmou? (1 sim, 0 não): ")
      leia(resposta)
    ate (resposta = 0) ou (resposta = 1)
    se resposta = 1 entao
      repita
        escreva("Acompanhantes: ")
        leia(acompanhantes)
      ate acompanhantes >= 0
      pessoas <- pessoas + 1 + acompanhantes
    fimse
  fimpara
  repita
    escreva("Capacidade da sala: ")
    leia(capacidade)
  ate capacidade >= 0
  escreval("Presenças previstas: ", pessoas)
  se capacidade < pessoas entao
    escreval("Faltam ", pessoas-capacidade, " lugares")
  senao
    escreval("Lugares livres: ", capacidade-pessoas)
  fimse
fimalgoritmo
```

Para cada confirmação, some um mais seus acompanhantes e compare à capacidade.
