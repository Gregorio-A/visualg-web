# Folha de pagamento fictícia

**Data:** 24 de maio · **Nível:** Avançado

## Objetivo

Compute salários de equipe com bônus e descontos parametrizados.

## Como funciona

Use um percentual de bônus e um de desconto comuns à equipe. Aplique o desconto sobre o valor após o bônus e some os salários líquidos.

## Exemplo de execução

```text
Base R$ 1000, bônus 10%, desconto 10%
Bruto R$ 1100; líquido R$ 990
```

Salário-base negativo é ignorado. Desconto acima de 100% invalida os parâmetros.

## Dicas para resolução

1. Transforme percentuais em frações.
2. Calcule bruto antes de líquido.
3. Acumule os líquidos da equipe.

## Solução

```visualg
algoritmo "Desafio0524A"
var
i, equipe: inteiro
  base, bonusPct, descontoPct, bruto, liquido, total: real
inicio
escreva("Número de funcionários: ")
  leia(equipe)
  escreva("Bônus percentual: ")
  leia(bonusPct)
  escreva("Desconto percentual: ")
  leia(descontoPct)
  se (equipe < 0) ou (bonusPct < 0) ou (descontoPct < 0) ou (descontoPct > 100) entao
    escreval("Parâmetros inválidos")
  senao
    total <- 0
    para i de 1 ate equipe faca
      escreva("Salário-base do funcionário ", i, ": ")
      leia(base)
      se base >= 0 entao
        bruto <- base * (1 + bonusPct / 100)
        liquido <- bruto * (1 - descontoPct / 100)
        total <- total + liquido
        escreval("Funcionário ", i, ": bruto R$ ", bruto, "; líquido R$ ", liquido)
      senao
        escreval("Salário-base inválido")
      fimse
    fimpara
    escreval("Folha líquida: R$ ", total)
  fimse
fimalgoritmo
```

A ordem das operações importa: primeiro o bônus, depois o desconto sobre o bruto.
