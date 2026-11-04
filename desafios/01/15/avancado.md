# Painel climático

**Data:** 15 de janeiro · **Nível:** Avançado

## Objetivo

Receba temperaturas em Celsius e Fahrenheit, normalize e ordene todas em Celsius.

Normalize cinco temperaturas informadas em Celsius ou Fahrenheit e ordene-as em Celsius.

## Como funciona

Para cada medição, leia valor e unidade C ou F. Converta F usando `(F - 32) × 5 / 9`; mantenha C. Ordene os cinco resultados do menor para o maior.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Entradas: 32 F, 10 C, 50 F, 0 C, 68 F
Ordem em Celsius: 0, 0, 10, 10, 20
```

Temperaturas iguais permanecem iguais após a conversão e podem aparecer em qualquer posição do grupo empatado.

## Dicas para resolução

1. Normalize as unidades na leitura.
2. Guarde somente os valores em Celsius no vetor.
3. Depois ordene o vetor por comparação e troca.

## Solução

```visualg
algoritmo "Desafio0115A"
var
celsius: vetor[1..5] de real
  valor, temporario: real
  unidade: caractere
  i, j: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Temperatura ", i, ": ")
    leia(valor)
    escreva("Unidade (C ou F): ")
    leia(unidade)
    se (unidade = "F") ou (unidade = "f") entao
      celsius[i] <- (valor - 32) * 5 / 9
    senao
      celsius[i] <- valor
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se celsius[j] < celsius[i] entao
        temporario <- celsius[i]
        celsius[i] <- celsius[j]
        celsius[j] <- temporario
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º: ", celsius[i], " °C")
  fimpara
fimalgoritmo
```

Converter tudo antes de ordenar evita comparar números em escalas diferentes.
