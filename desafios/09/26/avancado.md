# Projeto de iluminação

**Data:** 26 de setembro · **Nível:** Avançado

## Objetivo

Avalie conjuntos de lâmpadas por consumo, custo e prazo de economia.

## Como funciona

Compare um conjunto de lâmpadas antigas e novas sob o mesmo uso diário. Calcule economia em R$/dia e investimento dividido por essa economia.

## Exemplo de execução

```text
10 lâmpadas economizam R$ 2/dia; investimento R$ 100 → retorno em 50 dias
```

**Como ler o exemplo:** a seta → significa "resulta em".

Economia zero não tem prazo finito de retorno.

## Dicas para resolução

1. Subtraia potências.
2. Multiplique quantidade, horas e tarifa.
3. Divida investimento pela economia diária.

## Solução

```visualg
algoritmo "Desafio0926A"
var
quantidade, dias: inteiro
  antigaW, novaW, horasDia, tarifa, precoNova, economiaDia, retorno: real
inicio
escreva("Número de lâmpadas: ")
  leia(quantidade)
  escreva("Potência antiga e nova em W: ")
  leia(antigaW, novaW)
  escreva("Horas acesas por dia: ")
  leia(horasDia)
  escreva("Tarifa R$/kWh: ")
  leia(tarifa)
  escreva("Investimento total nas novas lâmpadas R$: ")
  leia(precoNova)
  se (quantidade <= 0) ou (antigaW < novaW) ou (novaW < 0) ou (horasDia < 0) ou (tarifa < 0) ou (precoNova < 0) entao
    escreval("Dados inválidos")
  senao
    economiaDia <- quantidade * (antigaW - novaW) * horasDia * tarifa / 1000
    escreval("Economia diária: R$ ", economiaDia)
    se economiaDia > 0 entao
      retorno <- precoNova / economiaDia
      escreval("Prazo estimado para recuperar investimento: ", retorno, " dias")
    senao
      escreval("Sem economia diária para recuperar investimento")
    fimse
  fimse
fimalgoritmo
```

Diferença de potência vira kWh economizados por dia e depois valor monetário.
