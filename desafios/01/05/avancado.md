# Comparador de protetores

**Data:** 5 de janeiro · **Nível:** Avançado

## Objetivo

Cadastre cinco embalagens com volume e preço e ordene por custo por mililitro.

Compare cinco protetores solares pelo custo por mililitro, do menor para o maior.

## Como funciona

Leia nome, volume e preço de cada embalagem. Calcule `preço / volume`, ordene as cinco posições por esse indicador e mostre o resultado. Volumes nulos são enviados ao fim.

## Exemplo de execução

```text
Embalagens: A 100 ml R$ 20; B 200 ml R$ 30; C 50 ml R$ 15; D 100 ml R$ 40; E 250 ml R$ 50
Ordem: B (0,15/ml), A (0,20/ml), E (0,20/ml), C (0,30/ml), D (0,40/ml)
```

Em caso de custo por ml igual, a ordem original é preservada porque a troca ocorre apenas com `<`.

## Dicas para resolução

1. Calcule um indicador comparável para cada produto.
2. Não divida por volume zero.
3. Ao ordenar, mova o nome junto com o indicador.

## Solução

```visualg
algoritmo "Desafio0105A"
var
nome: vetor[1..5] de caractere
  custoPorMl: vetor[1..5] de real
  volume, preco, temporario: real
  nomeTemporario: caractere
  i, j: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Embalagem ", i, ": ")
    leia(nome[i])
    escreva("Volume (ml): ")
    leia(volume)
    escreva("Preço: ")
    leia(preco)
    se volume > 0 entao
      custoPorMl[i] <- preco / volume
    senao
      custoPorMl[i] <- 999999999
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se custoPorMl[j] < custoPorMl[i] entao
        temporario <- custoPorMl[i]
        custoPorMl[i] <- custoPorMl[j]
        custoPorMl[j] <- temporario
        nomeTemporario <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTemporario
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º: ", nome[i], " — custo por ml: ", custoPorMl[i])
  fimpara
fimalgoritmo
```

Quando dois custos trocam de posição, os nomes correspondentes também trocam; assim o ranking mantém a relação entre dado e embalagem.
