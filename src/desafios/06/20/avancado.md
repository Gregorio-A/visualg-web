# Controle de rifas

**Data:** 20 de junho · **Nível:** Avançado

## Objetivo

Valide números de bilhete, impeça duplicações e confira lotes vendidos.

## Como funciona

Bilhetes são numerados de 1 a 100. Cada venda informa um número; recuse números fora da faixa e duplicatas. Zero encerra.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Entradas 5, 5, 0 → uma venda, uma duplicata, 99 disponíveis
```

**Como ler o exemplo:** a seta → significa "resulta em".

Bilhete 101 é inválido e não altera o lote.

## Dicas para resolução

1. Use vetor de 100 estados.
2. Valide a faixa antes de acessar.
3. Conte somente novas vendas.

## Solução

```visualg
algoritmo "Desafio0620A"
var
vendido: vetor[1..100] de inteiro
  i, acao, numero, total: inteiro
inicio
para i de 1 ate 100 faca
    vendido[i] <- 0
  fimpara
  total <- 0
  escreva("Número de bilhete (1 a 100; 0 encerra): ")
  leia(numero)
  enquanto numero <> 0 faca
    se (numero < 1) ou (numero > 100) entao
      escreval("Número inválido")
    senao
      se vendido[numero] = 1 entao
        escreval("Bilhete já vendido")
      senao
        vendido[numero] <- 1
        total <- total + 1
        escreval("Venda registrada")
      fimse
    fimse
    escreva("Número de bilhete (1 a 100; 0 encerra): ")
    leia(numero)
  fimenquanto
  escreval("Bilhetes vendidos: ", total)
  escreval("Ainda disponíveis: ", 100 - total)
fimalgoritmo
```

A posição do vetor corresponde ao número do bilhete e registra sua situação.
