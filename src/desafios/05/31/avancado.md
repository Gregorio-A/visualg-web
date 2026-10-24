# Relatório mensal

**Data:** 31 de maio · **Nível:** Avançado

## Objetivo

Agregue resultados por equipe e semana, com médias e comparação de desempenho.

## Como funciona

Registre quatro resultados semanais de cada uma das três equipes. Mostre soma, média e a equipe com melhor média.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Equipe 1: 1,2,3,4 → média 2,5; equipe 2: 4,4,4,4 → média 4
Equipe 2 supera equipe 1
```

**Como ler o exemplo:** a seta → significa "resulta em".

Resultados negativos são permitidos. Empate preserva a equipe de menor número.

## Dicas para resolução

1. Use matriz 3×4.
2. Some as quatro semanas de cada linha.
3. Atualize o maior valor médio.

## Solução

```visualg
algoritmo "Desafio0531A"
var
resultado: vetor[1..3, 1..4] de real
  equipe, semana, melhor: inteiro
  soma, media, maior: real
inicio
maior <- -999999999
  para equipe de 1 ate 3 faca
    soma <- 0
    para semana de 1 ate 4 faca
      escreva("Resultado da equipe ", equipe, " semana ", semana, ": ")
      leia(resultado[equipe, semana])
      soma <- soma + resultado[equipe, semana]
    fimpara
    media <- soma / 4
    escreval("Equipe ", equipe, ": total ", soma, "; média ", media)
    se media > maior entao
      maior <- media
      melhor <- equipe
    fimse
  fimpara
  escreval("Melhor média mensal: equipe ", melhor, " com ", maior)
fimalgoritmo
```

A matriz mantém cada semana ligada à sua equipe; a média permite comparar equipes na mesma escala.
