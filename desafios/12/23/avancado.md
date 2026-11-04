# Ajustador de orçamento

**Data:** 23 de dezembro · **Nível:** Avançado

## Objetivo

Reduza ou substitua itens por prioridade até caber no valor disponível.

## Como funciona

Cadastre cinco itens, preço atual, opção econômica e prioridade. Primeiro remova opcionais; se ainda necessário, substitua essenciais por alternativas econômicas.

## Exemplo de execução

```text
Essencial R$ 80 com substituto R$ 60, opcional R$ 30 e orçamento R$ 70 → remova opcional, custo R$ 80; substitua essencial, custo R$ 60 (demais itens a R$ 0).
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se o mínimo possível ainda exceder o limite, informe a falta; não declare sucesso falso.

## Dicas para resolução

1. Some o custo original.
2. Retire opcionais enquanto houver excesso.
3. Reduza essenciais e confira novamente.

## Solução

```visualg
algoritmo "Desafio1223A"
var
  nome: vetor[1..5] de caractere
  preco, minimo: vetor[1..5] de real
  prioridade: vetor[1..5] de inteiro
  i, escolhido: inteiro
  total, limite, economia: real
inicio
  total <- 0
  para i de 1 ate 5 faca
    escreva("Item ", i, ": ")
    leia(nome[i])
    repita
      escreva("Preço atual e substituto econômico: ")
      leia(preco[i], minimo[i])
      escreva("Prioridade (1 essencial, 2 opcional): ")
      leia(prioridade[i])
    ate (preco[i] >= 0) e (minimo[i] >= 0) e (minimo[i] <= preco[i]) e (prioridade[i] >= 1) e (prioridade[i] <= 2)
    total <- total+preco[i]
  fimpara
  escreva("Orçamento: ")
  leia(limite)
  para i de 1 ate 5 faca
    se (total > limite) e (prioridade[i] = 2) entao
      total <- total-preco[i]
      escreval("Removido: ", nome[i])
    fimse
  fimpara
  para i de 1 ate 5 faca
    se (total > limite) e (prioridade[i] = 1) entao
      economia <- preco[i]-minimo[i]
      total <- total-economia
      escreval("Substituído por versão econômica: ", nome[i])
    fimse
  fimpara
  escreval("Custo final: R$ ", total:0:2)
  se total > limite entao
    escreval("Ainda faltam R$ ", total-limite:0:2, " de redução")
  senao
    escreval("Cabe no orçamento")
  fimse
fimalgoritmo
```

A regra percorre prioridades em duas etapas e recalcula o total após cada redução.
