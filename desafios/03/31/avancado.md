# Gerador de certificados

**Data:** 31 de março · **Nível:** Avançado

## Objetivo

Cadastre alunos e emita certificados textuais apenas para quem atender critérios.

## Como funciona

Cadastre quatro alunos e gere certificado textual somente para quem alcançar média mínima 7 e frequência mínima 75%.

## Exemplo de execução

```text
Ana: média 8, frequência 80% → certificado
Bia: média 8, frequência 70% → sem certificado
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade com os dois limites é suficiente. Cumprir apenas um deles não basta.

## Dicas para resolução

1. Leia média e frequência de cada aluno.
2. Use comparação inclusiva nos dois limites.
3. Combine as condições com `e`.

## Solução

```visualg
algoritmo "Desafio0331A"
var
nome: vetor[1..4] de caractere
  media: real
  frequencia: real
  i: inteiro
inicio
para i de 1 ate 4 faca
    escreva("Nome do aluno ", i, ": ")
    leia(nome[i])
    escreva("Média final (0 a 10): ")
    leia(media)
    escreva("Frequência (%): ")
    leia(frequencia)
    se (media >= 7) e (frequencia >= 75) entao
      escreval("CERTIFICADO — ", nome[i], " concluiu o curso.")
    senao
      escreval(nome[i], " ainda não atende aos critérios.")
    fimse
  fimpara
fimalgoritmo
```

A condição usa `e`, pois ambos os requisitos precisam ser verdadeiros.
