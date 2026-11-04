# Cinema de férias

**Data:** 17 de julho · **Nível:** Avançado

## Objetivo

Escolha sessões que não se sobrepõem e calcule o custo de um roteiro.

## Como funciona

Escolha o máximo de sessões sem sobreposição entre cinco sessões, ordenando pelo horário de término. Some o preço das selecionadas.

## Exemplo de execução

```text
Sessões 60–90 e 90–120 podem ser vistas na sequência
```

Sessão com término anterior ao início ou preço negativo é ignorada.

## Dicas para resolução

1. Ordene por término.
2. Selecione se começar após a sessão anterior.
3. Some o custo de cada selecionada.

## Solução

```visualg
algoritmo "Desafio0717A"
var
nome: vetor[1..5] de caractere
  comeco, termino: vetor[1..5] de inteiro
  preco: vetor[1..5] de real
  i, j, limite, minutoLivre, selecionados: inteiro
  custo, trocaR: real
  trocaI: inteiro
  trocaNome: caractere
inicio
para i de 1 ate 5 faca
    escreva("Sessão ", i, ": ")
    leia(nome[i])
    escreva("Início e fim em minutos: ")
    leia(comeco[i], termino[i])
    escreva("Ingresso R$: ")
    leia(preco[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se termino[j] < termino[i] entao
        trocaI <- comeco[i]
        comeco[i] <- comeco[j]
        comeco[j] <- trocaI
        trocaI <- termino[i]
        termino[i] <- termino[j]
        termino[j] <- trocaI
        trocaR <- preco[i]
        preco[i] <- preco[j]
        preco[j] <- trocaR
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  minutoLivre <- 0
  selecionados <- 0
  custo <- 0
  para i de 1 ate 5 faca
    se (comeco[i] >= minutoLivre) e (termino[i] >= comeco[i]) e (preco[i] >= 0) entao
      escreval("Assistir ", nome[i], " de ", comeco[i], " a ", termino[i])
      minutoLivre <- termino[i]
      custo <- custo + preco[i]
      selecionados <- selecionados + 1
    fimse
  fimpara
  escreval("Sessões: ", selecionados, "; custo R$ ", custo)
fimalgoritmo
```

Selecionar a sessão que termina primeiro deixa mais espaço para as próximas.
