# Simulador de energia

**Data:** 9 de julho · **Nível:** Avançado

## Objetivo

Compare custo semanal de três aquecedores em diferentes ciclos de funcionamento.

## Como funciona

Compare três aquecedores. Para cada um, leia potência, horas por dia e dias na semana; use a mesma tarifa por kWh.

## Exemplo de execução

```text
1000 W por 2 h/dia em 7 dias, tarifa R$ 1/kWh → R$ 14
```

**Como ler o exemplo:** a seta → significa "resulta em".

Horas acima de 24 ou dias acima de 7 invalidam o ciclo. Empate preserva o primeiro.

## Dicas para resolução

1. Calcule W×horas×dias.
2. Divida por 1000.
3. Compare os custos.

## Solução

```visualg
algoritmo "Desafio0709A"
var
nome: vetor[1..3] de caractere
  watts, horasDia, dias, tarifa, custo, menor: real
  i, escolhido: inteiro
inicio
escreva("Tarifa em R$/kWh: ")
  leia(tarifa)
  se tarifa < 0 entao
    escreval("Tarifa inválida")
  senao
    escolhido <- 0
    para i de 1 ate 3 faca
      escreva("Aquecedor ", i, ": ")
      leia(nome[i])
      escreva("Potência em W: ")
      leia(watts)
      escreva("Horas de uso por dia: ")
      leia(horasDia)
      escreva("Dias de uso na semana: ")
      leia(dias)
      se (watts >= 0) e (horasDia >= 0) e (dias >= 0) e (horasDia <= 24) e (dias <= 7) entao
        custo <- watts * horasDia * dias * tarifa / 1000
        escreval(nome[i], ": R$ ", custo, " por semana")
        se (escolhido = 0) ou (custo < menor) entao
          escolhido <- i
          menor <- custo
        fimse
      senao
        escreval("Ciclo inválido")
      fimse
    fimpara
    se escolhido > 0 entao
      escreval("Menor custo: ", nome[escolhido], " por R$ ", menor)
    fimse
  fimse
fimalgoritmo
```

A fórmula transforma Wh em kWh e multiplica pela tarifa.
