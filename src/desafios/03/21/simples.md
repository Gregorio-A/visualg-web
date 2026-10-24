# Perguntas respondidas

**Data:** 21 de março · **Nível:** Simples

## Objetivo

Calcule a porcentagem de acertos de um questionário.

## Como funciona

Leia total de questões e acertos. Divida acertos pelo total e multiplique por cem.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Questões: 20
Acertos: 15
Acertos: 75%
```

Total zero não permite porcentagem; acertos não podem exceder questões.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0321S"
var
questoes, acertos: inteiro
  percentual: real
inicio
escreva("Questões: ")
  leia(questoes)
  escreva("Acertos: ")
  leia(acertos)
  se (questoes > 0) e (acertos >= 0) e (acertos <= questoes) entao
    percentual <- acertos * 100 / questoes
    escreval("Acertos: ", percentual, "%")
  senao
    escreval("Contagens inválidas.")
  fimse
fimalgoritmo
```

O cálculo só ocorre depois da validação das contagens.
