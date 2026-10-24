# Lembrete de hidratação

**Data:** 28 de janeiro · **Nível:** Simples

## Objetivo

Mostre cinco lembretes numerados com um laço.

Mostre cinco lembretes numerados de hidratação.

## Como funciona

Use um laço `para` começando em 1 e terminando em 5. Cada volta imprime um número e a mensagem.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Lembrete 1: beber água
Lembrete 2: beber água
Lembrete 3: beber água
Lembrete 4: beber água
Lembrete 5: beber água
```

O laço deve imprimir exatamente cinco linhas, sem uma sexta.

## Dicas para resolução

1. Este exercício não pede entrada. Prepare os valores que o próprio programa usará.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0128S"
var
i: inteiro
inicio
para i de 1 ate 5 faca
    escreval("Lembrete ", i, ": beber água")
  fimpara
fimalgoritmo
```

A variável de controle `i` já representa o número que aparece em cada lembrete.
