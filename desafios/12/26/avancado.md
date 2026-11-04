# Campanha solidária

**Data:** 26 de dezembro · **Nível:** Avançado

## Objetivo

Registre doações por categoria, distribua kits e mostre faltas de materiais.

## Como funciona

Cada kit exige quantidades positivas de alimento, higiene e roupa. O número de kits é limitado pela categoria mais escassa.

## Exemplo de execução

```text
10 alimentos (2/kit), 6 higienes (2/kit), 8 roupas (1/kit) → 3 kits.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma categoria sem estoque impede qualquer kit completo.

## Dicas para resolução

1. Leia estoque e consumo por kit.
2. Calcule a divisão inteira de cada categoria.
3. Mostre kits, sobras e faltas para o próximo.

## Solução

```visualg
algoritmo "Desafio1226A"
var
  estoque, kit: vetor[1..3] de inteiro
  nomes: vetor[1..3] de caractere
  i, kits, capacidade, falta: inteiro
inicio
  nomes[1] <- "alimento"
  nomes[2] <- "higiene"
  nomes[3] <- "roupa"
  para i de 1 ate 3 faca
    escreva("Unidades recebidas de ", nomes[i], ": ")
    leia(estoque[i])
    escreva("Unidades de ", nomes[i], " por kit: ")
    leia(kit[i])
  fimpara
  se (kit[1] <= 0) ou (kit[2] <= 0) ou (kit[3] <= 0) ou (estoque[1] < 0) ou (estoque[2] < 0) ou (estoque[3] < 0) entao
    escreval("Dados inválidos")
  senao
    kits <- estoque[1] div kit[1]
    para i de 2 ate 3 faca
      capacidade <- estoque[i] div kit[i]
      se capacidade < kits entao
        kits <- capacidade
      fimse
    fimpara
    escreval("Kits completos: ", kits)
    para i de 1 ate 3 faca
      falta <- (kits+1)*kit[i]-estoque[i]
      se falta < 0 entao
        falta <- 0
      fimse
      escreval(nomes[i], ": sobra ", estoque[i]-kits*kit[i], "; faltam ", falta, " para mais um kit")
    fimpara
  fimse
fimalgoritmo
```

Calcule quantos kits cada estoque permite; use o menor resultado.
