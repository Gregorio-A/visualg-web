# Simulador de entregas

**Data:** 22 de maio · **Nível:** Avançado

## Objetivo

Compare três transportadoras pelo custo total e prazo prometido.

## Como funciona

Compare três empresas por taxa fixa + peso × preço/kg. Entre as que cumprem o prazo máximo, selecione a mais barata.

## Exemplo de execução

```text
Peso 2 kg, limite 3 dias; A: 5 + 2/kg em 2 dias; B: 4 + 1/kg em 5 dias
Escolha A (R$ 9)
```

Uma empresa barata fora do prazo não concorre. Empates mantêm a primeira.

## Dicas para resolução

1. Calcule o frete completo.
2. Descarte prazos fora do limite.
3. Atualize o menor custo elegível.

## Solução

```visualg
algoritmo "Desafio0522A"
var
nome: vetor[1..3] de caractere
  custo: vetor[1..3] de real
  prazo: vetor[1..3] de inteiro
  i, melhor, limite: inteiro
  peso, fixo, porKg, menor: real
inicio
escreva("Peso total em kg: ")
  leia(peso)
  escreva("Prazo máximo em dias: ")
  leia(limite)
  se (peso < 0) ou (limite < 0) entao
    escreval("Dados inválidos")
  senao
    melhor <- 0
    para i de 1 ate 3 faca
      escreva("Transportadora ", i, ": ")
      leia(nome[i])
      escreva("Taxa fixa: ")
      leia(fixo)
      escreva("Preço por kg: ")
      leia(porKg)
      escreva("Prazo em dias: ")
      leia(prazo[i])
      custo[i] <- fixo + porKg * peso
      escreval(nome[i], ": R$ ", custo[i], "; ", prazo[i], " dia(s)")
      se (fixo >= 0) e (porKg >= 0) e (prazo[i] >= 0) e (prazo[i] <= limite) entao
        se (melhor = 0) ou (custo[i] < menor) entao
          melhor <- i
          menor <- custo[i]
        fimse
      fimse
    fimpara
    se melhor = 0 entao
      escreval("Nenhuma atende ao prazo")
    senao
      escreval("Escolha: ", nome[melhor], " por R$ ", menor)
    fimse
  fimse
fimalgoritmo
```

O algoritmo mostra todas as propostas e usa custo e prazo conjuntamente para escolher.
