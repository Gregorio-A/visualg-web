# Materiais de obra

**Data:** 16 de maio · **Nível:** Avançado

## Objetivo

Calcule pacotes inteiros necessários para áreas de cômodos e sobras.

## Como funciona

Três cômodos são cobertos separadamente com pacotes inteiros de rendimento fixo. Arredonde cada cômodo para cima e reporte sobra por cômodo e total.

## Exemplo de execução

```text
Cobertura 2 m²; áreas 3, 4 e 1 m²
2, 2 e 1 pacotes; total 5; sobra total 2 m²
```

Área zero usa zero pacote. Cobertura não positiva impede o cálculo.

## Dicas para resolução

1. Divida a área pela cobertura.
2. Adicione um pacote quando restar fração.
3. Some as sobras calculadas.

## Solução

```visualg
algoritmo "Desafio0516A"
var
i, pacotes, totalPacotes: inteiro
  area, cobertura, usado, sobra: real
inicio
escreva("Cobertura de cada pacote (m2): ")
  leia(cobertura)
  se cobertura <= 0 entao
    escreval("Cobertura inválida")
  senao
    totalPacotes <- 0
    usado <- 0
    para i de 1 ate 3 faca
      escreva("Área do cômodo ", i, " (m2): ")
      leia(area)
      se area >= 0 entao
        pacotes <- int(area / cobertura)
        se pacotes * cobertura < area entao
          pacotes <- pacotes + 1
        fimse
        sobra <- pacotes * cobertura - area
        escreval("Cômodo ", i, ": ", pacotes, " pacote(s); sobra ", sobra, " m2")
        totalPacotes <- totalPacotes + pacotes
        usado <- usado + area
      fimse
    fimpara
    escreval("Total comprado: ", totalPacotes, " pacote(s); sobra total ", totalPacotes * cobertura - usado, " m2")
  fimse
fimalgoritmo
```

O arredondamento é feito em cada cômodo, pois sobras não são reaproveitadas entre eles.
