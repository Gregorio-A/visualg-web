# Balanço de eventos

**Data:** 28 de fevereiro · **Nível:** Avançado

## Objetivo

Compare receitas, custos e taxas de ocupação de quatro eventos.

## Como funciona

Compare quatro eventos por resultado financeiro e taxa de ocupação. Lucro é receita menos custo; ocupação é presentes divididos pela capacidade vezes 100.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Evento A: receita 100, custo 40, 5 presentes de 10 vagas → lucro 60, ocupação 50%
Evento B: receita 90, custo 20, 8 presentes de 10 vagas → lucro 70, ocupação 80%
B lidera nos dois critérios
```

**Como ler o exemplo:** a seta → significa "resulta em".

Capacidade zero torna a ocupação indefinida; esse evento é ignorado nas escolhas de destaque.

## Dicas para resolução

1. Calcule lucro e ocupação separadamente.
2. Não divida por capacidade zero.
3. Mantenha uma referência para cada critério de destaque.

## Solução

```visualg
algoritmo "Desafio0228A"
var
nome: vetor[1..4] de caractere
  receita, custo, capacidade, presentes: real
  i, melhorLucro, melhorOcupacao: inteiro
  lucro, ocupacao, maxLucro, maxOcupacao: real
inicio
melhorLucro <- 0
  melhorOcupacao <- 0
  para i de 1 ate 4 faca
    escreva("Evento ", i, ": ")
    leia(nome[i])
    escreva("Receita: ")
    leia(receita)
    escreva("Custo: ")
    leia(custo)
    escreva("Capacidade: ")
    leia(capacidade)
    escreva("Presentes: ")
    leia(presentes)
    lucro <- receita - custo
    se capacidade > 0 entao
      ocupacao <- presentes * 100 / capacidade
      escreval(nome[i], ": lucro ", lucro, ", ocupação ", ocupacao, "%")
      se (melhorLucro = 0) ou (lucro > maxLucro) entao
        maxLucro <- lucro
        melhorLucro <- i
      fimse
      se (melhorOcupacao = 0) ou (ocupacao > maxOcupacao) entao
        maxOcupacao <- ocupacao
        melhorOcupacao <- i
      fimse
    senao
      escreval("Capacidade inválida.")
    fimse
  fimpara
  se melhorLucro > 0 entao
    escreval("Maior lucro: evento ", melhorLucro)
    escreval("Maior ocupação: evento ", melhorOcupacao)
  fimse
fimalgoritmo
```

Os índices dos dois destaques são independentes porque maior lucro e maior ocupação podem pertencer a eventos diferentes.
