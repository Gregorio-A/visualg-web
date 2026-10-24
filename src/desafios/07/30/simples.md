# Dia de chuva

**Data:** 30 de julho · **Nível:** Simples

## Objetivo

Leia SIM ou NÃO e escolha atividade interna ou externa.

## Como funciona

Aceite SIM ou NÃO, com ou sem acento em NÃO; ignore a diferença entre maiúsculas e minúsculas.

## Exemplo de execução

```text
SIM → jogo de tabuleiro; NÃO → caminhada
```

**Como ler o exemplo:** a seta → significa "resulta em".

Outra palavra é inválida.

## Dicas para resolução

1. Leia um texto.
2. Converta para maiúsculas.
3. Use condição para escolher.

## Solução

```visualg
algoritmo "Desafio0730S"
var
resposta: caractere
inicio
escreva("Está chovendo? (SIM/NÃO): ")
  leia(resposta)
  se maiusc(resposta) = "SIM" entao
    escreval("Atividade interna: jogo de tabuleiro")
  senao
    se (maiusc(resposta) = "NÃO") ou (maiusc(resposta) = "NAO") entao
      escreval("Atividade externa: caminhada")
    senao
      escreval("Resposta inválida")
    fimse
  fimse
fimalgoritmo
```

A escolha do local depende da resposta normalizada.
