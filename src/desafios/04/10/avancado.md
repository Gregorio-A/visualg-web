# Detetive de pistas

**Data:** 10 de abril · **Nível:** Avançado

## Objetivo

Filtre uma lista de suspeitos por três características e apresente os compatíveis.

## Como funciona

Cadastre cinco suspeitos. As três pistas são: altura de pelo menos 170 cm, idade inferior a 40 anos e posse de uma chave.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Ana: 175 cm, 30 anos, chave sim → compatível
Bia: 160 cm, 30 anos, chave sim → não compatível
```

**Como ler o exemplo:** a seta → significa "resulta em".

Apenas quem atende simultaneamente as três pistas aparece na lista.

## Dicas para resolução

1. Guarde cada característica junto ao nome.
2. Use uma condição composta por três comparações.
3. Conte os nomes apresentados.

## Solução

```visualg
algoritmo "Desafio0410A"
var
nome: vetor[1..5] de caractere
  altura, idade, chave: vetor[1..5] de inteiro
  i, encontrados: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Suspeito ", i, ": ")
    leia(nome[i])
    escreva("Altura (cm): ")
    leia(altura[i])
    escreva("Idade: ")
    leia(idade[i])
    escreva("Possui chave? (1 sim, 0 não): ")
    leia(chave[i])
  fimpara
  encontrados <- 0
  para i de 1 ate 5 faca
    se (altura[i] >= 170) e (idade[i] < 40) e (chave[i] = 1) entao
      escreval("Compatível: ", nome[i])
      encontrados <- encontrados + 1
    fimse
  fimpara
  escreval("Suspeitos compatíveis: ", encontrados)
fimalgoritmo
```

Os atributos de um suspeito ocupam a mesma posição dos vetores; uma condição com `e` exige as três características.
