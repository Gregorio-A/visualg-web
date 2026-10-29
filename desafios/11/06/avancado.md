# Controlador de luminosidade

**Data:** 6 de novembro · **Nível:** Avançado

## Objetivo

Simule ajuste automático de brilho com faixa morta e estados.

## Como funciona

Comece com brilho 50. Em oito leituras, aumente 10 abaixo de mínimo−margem, reduza 10 acima de máximo+margem e mantenha dentro da faixa morta.

## Exemplo de execução

```text
Mínimo 30, margem 5, leitura 20 → brilho passa de 50 a 60
```

**Como ler o exemplo:** a seta → significa "resulta em".

Brilho fica limitado a 0–100.

## Dicas para resolução

1. Compare com faixas ampliadas pela margem.
2. Ajuste em passos de dez.
3. Limite a escala.

## Solução

```visualg
algoritmo "Desafio1106A"
var
brilho, i: inteiro
  leitura, minimo, maximo, margem: real
inicio
escreva("Luminosidade mínima e máxima desejadas: ")
  leia(minimo, maximo)
  escreva("Margem morta: ")
  leia(margem)
  brilho <- 50
  se (minimo > maximo) ou (margem < 0) entao
    escreval("Parâmetros inválidos")
  senao
    para i de 1 ate 8 faca
      escreva("Luminosidade ambiente ", i, ": ")
      leia(leitura)
      se leitura < minimo - margem entao
        brilho <- brilho + 10
      fimse
      se leitura > maximo + margem entao
        brilho <- brilho - 10
      fimse
      se brilho > 100 entao
        brilho <- 100
      fimse
      se brilho < 0 entao
        brilho <- 0
      fimse
      escreval("Brilho ajustado: ", brilho)
    fimpara
  fimse
fimalgoritmo
```

A margem evita ajustes por pequenas oscilações de luz.
