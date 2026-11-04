# Sensores de névoa

**Data:** 20 de outubro · **Nível:** Avançado

## Objetivo

Compare leituras consecutivas e acione alerta após três valores críticos.

## Como funciona

Em doze leituras, acione um alerta quando se completarem três valores críticos consecutivos abaixo do limite. Um período longo gera apenas um alerta.

## Exemplo de execução

```text
Leituras 50,40,30 com limite 60 → alerta na terceira
```

**Como ler o exemplo:** a seta → significa "resulta em".

Leitura no limite interrompe a sequência.

## Dicas para resolução

1. Conte leituras críticas seguidas.
2. Zere no valor seguro.
3. Dispare ao chegar a três.

## Solução

```visualg
algoritmo "Desafio1020A"
var
i, consecutivas, alertas: inteiro
  visibilidade, limite: real
inicio
escreva("Limite crítico de visibilidade (m): ")
  leia(limite)
  consecutivas <- 0
  alertas <- 0
  para i de 1 ate 12 faca
    escreva("Visibilidade da leitura ", i, ": ")
    leia(visibilidade)
    se visibilidade < limite entao
      consecutivas <- consecutivas + 1
      se consecutivas = 3 entao
        alertas <- alertas + 1
        escreval("Alerta de névoa acionado")
      fimse
    senao
      consecutivas <- 0
    fimse
  fimpara
  escreval("Períodos com alerta: ", alertas)
fimalgoritmo
```

O alerta dispara ao atingir exatamente três; o contador segue acima de três sem novo disparo até sair da faixa.
