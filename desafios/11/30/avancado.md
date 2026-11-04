# Painel de bugs

**Data:** 30 de novembro · **Nível:** Avançado

## Objetivo

Cadastre falhas por severidade, status e módulo e gere resumo de pendências.

## Como funciona

Cadastre oito falhas por módulo 1–3, severidade 1–3 e status aberto/resolvido. Conte pendências por módulo e graves ainda abertas.

## Exemplo de execução

```text
Uma falha grave aberta no módulo 2 → módulo 2 tem uma pendência e grave aberto total 1
```

**Como ler o exemplo:** a seta → significa "resulta em".

Falha resolvida não entra nas pendências.

## Dicas para resolução

1. Guarde três atributos por falha.
2. Filtre status aberto.
3. Conte por módulo e severidade.

## Solução

```visualg
algoritmo "Desafio1130A"
var
modulo, severidade, status: vetor[1..8] de inteiro
  pendente: vetor[1..3] de inteiro
  i, graves: inteiro
inicio
para i de 1 ate 3 faca
    pendente[i] <- 0
  fimpara
  graves <- 0
  para i de 1 ate 8 faca
    escreva("Módulo da falha ", i, " (1 a 3): ")
    leia(modulo[i])
    escreva("Severidade (1 leve, 2 média, 3 grave): ")
    leia(severidade[i])
    escreva("Status (1 aberto, 2 resolvido): ")
    leia(status[i])
    se (modulo[i] >= 1) e (modulo[i] <= 3) e (status[i] = 1) entao
      pendente[modulo[i]] <- pendente[modulo[i]] + 1
      se severidade[i] = 3 entao
        graves <- graves + 1
      fimse
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Módulo ", i, ": ", pendente[i], " pendência(s)")
  fimpara
  escreval("Falhas graves ainda abertas: ", graves)
fimalgoritmo
```

Somente registros abertos incrementam os contadores.
