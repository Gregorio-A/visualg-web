# Analisador de arquivos

**Data:** 1 de novembro · **Nível:** Avançado

## Objetivo

Agrupe tamanhos de arquivos por extensão e calcule ocupação em memória.

## Como funciona

Agrupe oito arquivos por extensão TXT, JPG ou MP4, com tamanhos em MB. Some a ocupação por extensão e no total.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.
- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
TXT 2 MB e TXT 3 MB → grupo TXT ocupa 5 MB
```

**Como ler o exemplo:** a seta → significa "resulta em".

Extensão desconhecida e tamanho negativo não entram nas somas.

## Dicas para resolução

1. Mapeie extensão para 1–3.
2. Some tamanho por grupo.
3. Some também o total.

## Solução

```visualg
algoritmo "Desafio1101A"
var
tamanho: vetor[1..8] de real
  categoria: vetor[1..8] de inteiro
  soma: vetor[1..3] de real
  i, tipo: inteiro
  total: real
inicio
para i de 1 ate 3 faca
    soma[i] <- 0
  fimpara
  total <- 0
  para i de 1 ate 8 faca
    escreva("Extensão do arquivo ", i, " (1 txt, 2 jpg, 3 mp4): ")
    leia(tipo)
    escreva("Tamanho em MB: ")
    leia(tamanho[i])
    se (tipo >= 1) e (tipo <= 3) e (tamanho[i] >= 0) entao
      categoria[i] <- tipo
      soma[tipo] <- soma[tipo] + tamanho[i]
      total <- total + tamanho[i]
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Extensão ", i, ": ", soma[i], " MB")
  fimpara
  escreval("Ocupação total: ", total, " MB")
fimalgoritmo
```

O código da extensão funciona como índice do acumulador de categoria.
