# Índice de poluição fictício

**Data:** 22 de setembro · **Nível:** Simples

## Objetivo

Classifique uma medição por intervalos definidos.

## Como funciona

Classifique 0–50 como baixo, acima de 50 até 100 como moderado e acima de 100 como alto.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
50 → baixo; 75 → moderado; 120 → alto
```

**Como ler o exemplo:** a seta → significa "resulta em".

Índice negativo é inválido.

## Dicas para resolução

1. Valide não negativo.
2. Teste até 50.
3. Depois teste até 100.

## Solução

```visualg
algoritmo "Desafio0922S"
var
indice: real
inicio
escreva("Índice fictício de poluição: ")
  leia(indice)
  se indice < 0 entao
    escreval("Índice inválido")
  senao
    se indice <= 50 entao
      escreval("Baixo")
    senao
      se indice <= 100 entao
        escreval("Moderado")
      senao
        escreval("Alto")
      fimse
    fimse
  fimse
fimalgoritmo
```

Condições ordenadas garantem que cada valor entre em uma única faixa.
