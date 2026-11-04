# Precificação da barraca

**Data:** 23 de junho · **Nível:** Avançado

## Objetivo

Calcule preço de produtos com custo, perdas e margem desejada.

## Como funciona

Para cada produto, informe custo, perda percentual estimada e margem percentual sobre o custo ajustado. A perda aumenta o custo por unidade vendável.

## Exemplo de execução

```text
Custo R$ 9, perda 10%, margem 20% → custo ajustado R$ 10, preço R$ 12
```

**Como ler o exemplo:** a seta → significa "resulta em".

Perda de 100% impossibilita venda e é recusada.

## Dicas para resolução

1. Calcule a fração vendável.
2. Divida custo por ela.
3. Aplique a margem ao custo ajustado.

## Solução

```visualg
algoritmo "Desafio0623A"
var
i, produtos: inteiro
  custo, perdasPct, margemPct, custoAjustado, preco: real
inicio
escreva("Quantidade de produtos: ")
  leia(produtos)
  se produtos <= 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate produtos faca
      escreva("Custo unitário do produto ", i, ": ")
      leia(custo)
      escreva("Perda estimada em %: ")
      leia(perdasPct)
      escreva("Margem desejada em % do custo ajustado: ")
      leia(margemPct)
      se (custo < 0) ou (perdasPct < 0) ou (perdasPct >= 100) ou (margemPct < 0) entao
        escreval("Parâmetros inválidos")
      senao
        custoAjustado <- custo / (1 - perdasPct / 100)
        preco <- custoAjustado * (1 + margemPct / 100)
        escreval("Preço sugerido: R$ ", preco)
      fimse
    fimpara
  fimse
fimalgoritmo
```

Dividir pelo percentual aproveitável cobre perdas; a margem é aplicada em seguida.
