# Comparador de transporte

**Data:** 13 de setembro · **Nível:** Avançado

## Objetivo

Avalie trajetos por tempo, custo e emissões com ranking ponderado.

## Como funciona

Compare três meios de transporte. A nota ponderada é tempo×peso do tempo + custo×peso do custo + emissão×peso da emissão. Menor nota vence.

## Exemplo de execução

```text
Pesos 1,1,1: A (10 min, R$ 5, 1 kg) → nota 16
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pesos devem ser não negativos. Empate preserva a primeira opção.

## Dicas para resolução

1. Defina os pesos.
2. Calcule nota de cada trajeto.
3. Guarde o menor valor.

## Solução

```visualg
algoritmo "Desafio0913A"
var
nome: vetor[1..3] de caractere
  tempo, custo, emissao, nota: vetor[1..3] de real
  i, j, escolhido: inteiro
  pesoTempo, pesoCusto, pesoEmissao, menor: real
inicio
escreva("Peso do tempo, custo e emissão na nota: ")
  leia(pesoTempo, pesoCusto, pesoEmissao)
  escolhido <- 0
  para i de 1 ate 3 faca
    escreva("Transporte ", i, ": ")
    leia(nome[i])
    escreva("Tempo em minutos, custo R$ e emissão kg: ")
    leia(tempo[i], custo[i], emissao[i])
    se (tempo[i] >= 0) e (custo[i] >= 0) e (emissao[i] >= 0) e (pesoTempo >= 0) e (pesoCusto >= 0) e (pesoEmissao >= 0) entao
      nota[i] <- tempo[i] * pesoTempo + custo[i] * pesoCusto + emissao[i] * pesoEmissao
      se (escolhido = 0) ou (nota[i] < menor) entao
        menor <- nota[i]
        escolhido <- i
      fimse
      escreval(nome[i], ": nota ", nota[i])
    senao
      nota[i] <- -1
    fimse
  fimpara
  se escolhido > 0 entao
    escreval("Melhor nota: ", nome[escolhido], " (", menor, ")")
  senao
    escreval("Nenhuma opção válida")
  fimse
fimalgoritmo
```

Os pesos explicitam a importância relativa dos três critérios na escolha.
