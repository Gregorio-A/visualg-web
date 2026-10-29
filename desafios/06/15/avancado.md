# Receita em lote

**Data:** 15 de junho · **Nível:** Avançado

## Objetivo

Ajuste ingredientes de várias receitas e consolide uma lista de compras.

## Como funciona

Cadastre três receitas, cada uma com fator de porções e dois ingredientes. Consolide até seis ingredientes distintos, usando a mesma unidade de medida por nome.

## Exemplo de execução

```text
Receita A: milho 2 × fator 2; receita B: milho 3 × fator 1 → milho 7
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se os seis ingredientes forem diferentes, todos cabem na lista; nomes iguais são somados.

## Dicas para resolução

1. Multiplique quantidade pelo fator.
2. Procure o nome na lista consolidada.
3. Some na mesma posição.

## Solução

```visualg
algoritmo "Desafio0615A"
var
nome: vetor[1..6] de caractere
  total: vetor[1..6] de real
  i, receita, ingrediente, encontrado: inteiro
  quantidade, fator: real
  busca: caractere
inicio
para i de 1 ate 6 faca
    nome[i] <- ""
    total[i] <- 0
  fimpara
  para receita de 1 ate 3 faca
    escreva("Fator de porções da receita ", receita, ": ")
    leia(fator)
    para ingrediente de 1 ate 2 faca
      escreva("Ingrediente (sem espaços): ")
      leia(busca)
      escreva("Quantidade base: ")
      leia(quantidade)
      encontrado <- 0
      para i de 1 ate 6 faca
        se nome[i] = busca entao
          encontrado <- i
        fimse
      fimpara
      se encontrado = 0 entao
        para i de 6 ate 1 passo -1 faca
          se nome[i] = "" entao
            encontrado <- i
          fimse
        fimpara
      fimse
      se (encontrado > 0) e (fator >= 0) e (quantidade >= 0) entao
        nome[encontrado] <- busca
        total[encontrado] <- total[encontrado] + quantidade * fator
      senao
        escreval("Ingrediente inválido ou lista cheia")
      fimse
    fimpara
  fimpara
  para i de 1 ate 6 faca
    se nome[i] <> "" entao
      escreval(nome[i], ": ", total[i], " unidade(s)")
    fimse
  fimpara
fimalgoritmo
```

Cada quantidade ajustada é somada à posição correspondente ao mesmo ingrediente.
