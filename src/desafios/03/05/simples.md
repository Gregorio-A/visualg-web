# Presença na chamada

**Data:** 5 de março · **Nível:** Simples

## Objetivo

Calcule a porcentagem de presença dado total e comparecimentos.

## Como funciona

Leia total de aulas e quantidade de comparecimentos. Divida comparecimentos pelo total e multiplique por 100.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Total de aulas: 20
Comparecimentos: 15
Presença: 75%
```

Total zero é inválido porque impede calcular a porcentagem.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0305S"
var
total, presencas: inteiro
  percentual: real
inicio
escreva("Total de aulas: ")
  leia(total)
  escreva("Comparecimentos: ")
  leia(presencas)
  se (total > 0) e (presencas >= 0) e (presencas <= total) entao
    percentual <- presencas * 100 / total
    escreval("Presença: ", percentual, "%")
  senao
    escreval("Contagens inválidas.")
  fimse
fimalgoritmo
```

A validação também evita percentuais inferiores a zero ou superiores a cem.
