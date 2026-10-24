# Agenda alternativa

**Data:** 30 de julho · **Nível:** Avançado

## Objetivo

Replaneje uma lista de atividades conforme restrições climáticas pré-definidas.

## Como funciona

Cadastre cinco atividades e marque quais são externas. Com chuva, adie as externas; sem chuva, mantenha todas. Informe o novo plano.

## Exemplo de execução

```text
Chuva sim; passeio externo é adiado e jogo interno é mantido
```

A entrada de chuva deve ser 0 ou 1 nesta simulação.

## Dicas para resolução

1. Guarde se cada atividade é externa.
2. Leia o estado do clima.
3. Decida individualmente.

## Solução

```visualg
algoritmo "Desafio0730A"
var
atividade: vetor[1..5] de caractere
  externa: vetor[1..5] de inteiro
  i, chuva, internas, realizadas: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Atividade ", i, ": ")
    leia(atividade[i])
    escreva("É externa? (0 não, 1 sim): ")
    leia(externa[i])
  fimpara
  escreva("Há chuva? (0 não, 1 sim): ")
  leia(chuva)
  realizadas <- 0
  internas <- 0
  para i de 1 ate 5 faca
    se (chuva = 1) e (externa[i] = 1) entao
      escreval(atividade[i], ": adiada por chuva")
    senao
      escreval(atividade[i], ": mantida")
      realizadas <- realizadas + 1
      se externa[i] = 0 entao
        internas <- internas + 1
      fimse
    fimse
  fimpara
  escreval("Mantidas: ", realizadas, "; internas disponíveis: ", internas)
fimalgoritmo
```

A decisão combina a restrição climática com o tipo de cada atividade.
