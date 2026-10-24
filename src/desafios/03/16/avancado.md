# Simulador de recuperação

**Data:** 16 de março · **Nível:** Avançado

## Objetivo

Calcule a nota necessária e teste diferentes cenários de resultado.

## Como funciona

Leia nota atual, seus pesos e média mínima. Calcule a nota necessária na avaliação final e permita testar três notas finais hipotéticas.

### Palavras úteis

- **Média ponderada:** É uma média em que algumas notas têm mais importância, definida pelos pesos.

## Exemplo de execução

```text
Nota atual 6, peso 1; final peso 1; mínimo 7
Nota necessária: 8
Cenário final 8 → média 7, aprovado
```

**Como ler o exemplo:** a seta → significa "resulta em".

Nota necessária acima de dez indica que a meta não seria alcançável em uma avaliação limitada a dez pontos.

## Dicas para resolução

1. Escreva a fórmula da média ponderada.
2. Isole a nota final desconhecida.
3. Recalcule a média para cada cenário digitado.

## Solução

```visualg
algoritmo "Desafio0316A"
var
notaAtual, pesoAtual, pesoFinal, minimo, precisa, simulada, media: real
  i: inteiro
inicio
escreva("Nota já obtida: ")
  leia(notaAtual)
  escreva("Peso da nota já obtida: ")
  leia(pesoAtual)
  escreva("Peso da avaliação final: ")
  leia(pesoFinal)
  escreva("Média mínima: ")
  leia(minimo)
  se pesoFinal > 0 entao
    precisa <- (minimo * (pesoAtual + pesoFinal) - notaAtual * pesoAtual) / pesoFinal
    escreval("Nota necessária na avaliação final: ", precisa)
    para i de 1 ate 3 faca
      escreva("Cenário ", i, " — nota final simulada: ")
      leia(simulada)
      media <- (notaAtual * pesoAtual + simulada * pesoFinal) / (pesoAtual + pesoFinal)
      escreval("Média do cenário: ", media)
      se media >= minimo entao
        escreval("Aprovado neste cenário.")
      senao
        escreval("Ainda abaixo da média.")
      fimse
    fimpara
  senao
    escreval("O peso final deve ser positivo.")
  fimse
fimalgoritmo
```

A equação da média ponderada é isolada para encontrar a nota final; cada cenário reaplica a fórmula completa.
