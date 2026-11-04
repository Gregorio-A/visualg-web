# Sinal Wi-Fi fictício

**Data:** 22 de novembro · **Nível:** Simples

## Objetivo

Classifique potência por três faixas numéricas definidas.

## Como funciona

Classifique abaixo de 100 W como baixa, de 100 a 500 W como média e acima de 500 W como alta.

## Exemplo de execução

```text
50 W → baixa; 100 W → média; 501 W → alta
```

**Como ler o exemplo:** a seta → significa "resulta em".

Potência negativa é inválida.

## Dicas para resolução

1. Valide não negativa.
2. Teste 100.
3. Depois teste 500.

## Solução

```visualg
algoritmo "Desafio1122S"
var
potencia: real
inicio
escreva("Potência em W: ")
  leia(potencia)
  se potencia < 0 entao
    escreval("Potência inválida")
  senao
    se potencia < 100 entao
      escreval("Baixa")
    senao
      se potencia <= 500 entao
        escreval("Média")
      senao
        escreval("Alta")
      fimse
    fimse
  fimse
fimalgoritmo
```

Condições ordenadas separam as três faixas.
