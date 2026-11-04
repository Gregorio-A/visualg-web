# Divisor de orçamento

**Data:** 21 de janeiro · **Nível:** Avançado

## Objetivo

Distribua despesas entre participantes com diferentes participações e determine saldos.

Rateie despesas pagas por quatro pessoas conforme participações diferentes.

## Como funciona

Leia quanto cada pessoa pagou e um peso não negativo para sua participação. A cota individual é o total pago multiplicado pelo peso dividido pela soma dos pesos. Saldo positivo indica crédito; saldo negativo indica valor ainda devido.

## Exemplo de execução

```text
Ana pagou 80, peso 1; Bia pagou 0, peso 1; Caio pagou 0, peso 0; Davi pagou 0, peso 0
Cotas: 40, 40, 0, 0
Saldos: +40, -40, 0, 0
```

Se a soma dos pesos for zero, o rateio não pode ser calculado.

## Dicas para resolução

1. Some todos os pagamentos para encontrar a despesa total.
2. Some também os pesos das participações.
3. Para cada pessoa, subtraia a cota proporcional do valor já pago.

## Solução

```visualg
algoritmo "Desafio0121A"
var
nome: vetor[1..4] de caractere
  contribuicao, peso: vetor[1..4] de real
  total, somaPesos, cota, saldo: real
  i: inteiro
inicio
total <- 0
  somaPesos <- 0
  para i de 1 ate 4 faca
    escreva("Participante ", i, ": ")
    leia(nome[i])
    escreva("Valor que já pagou: ")
    leia(contribuicao[i])
    escreva("Peso da participação: ")
    leia(peso[i])
    total <- total + contribuicao[i]
    somaPesos <- somaPesos + peso[i]
  fimpara
  se somaPesos > 0 entao
    para i de 1 ate 4 faca
      cota <- total * peso[i] / somaPesos
      saldo <- contribuicao[i] - cota
      escreval(nome[i], ": cota ", cota, "; saldo ", saldo)
    fimpara
  senao
    escreval("A soma dos pesos deve ser positiva.")
  fimse
fimalgoritmo
```

O total de saldos é zero quando todas as participações são válidas: créditos compensam dívidas.
