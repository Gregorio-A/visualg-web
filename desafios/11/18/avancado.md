# Analisador de logs

**Data:** 18 de novembro · **Nível:** Avançado

## Objetivo

Conte mensagens por categoria e localize a maior sequência de erros.

## Como funciona

Leia doze logs classificados em informação, aviso ou erro. Conte cada categoria e encontre o maior trecho consecutivo de erros.

## Exemplo de execução

```text
3,3,1,3 → dois erros seguidos no primeiro trecho
```

**Como ler o exemplo:** a seta → significa "resulta em".

Código desconhecido não entra nas contagens e interrompe sequência de erros.

## Dicas para resolução

1. Conte por categoria.
2. Acompanhe sequência atual de erros.
3. Guarde a maior.

## Solução

```visualg
algoritmo "Desafio1118A"
var
categoria: vetor[1..12] de inteiro
  contagem: vetor[1..3] de inteiro
  i, atual, maior, inicioAtual, inicioMaior: inteiro
inicio
para i de 1 ate 3 faca
    contagem[i] <- 0
  fimpara
  atual <- 0
  maior <- 0
  para i de 1 ate 12 faca
    escreva("Log ", i, " (1 info, 2 aviso, 3 erro): ")
    leia(categoria[i])
    se (categoria[i] >= 1) e (categoria[i] <= 3) entao
      contagem[categoria[i]] <- contagem[categoria[i]] + 1
    fimse
    se categoria[i] = 3 entao
      se atual = 0 entao
        inicioAtual <- i
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Categoria ", i, ": ", contagem[i])
  fimpara
  se maior > 0 entao
    escreval("Maior sequência de erros: ", maior, " logs, de ", inicioMaior, " a ", inicioMaior + maior - 1)
  fimse
fimalgoritmo
```

O máximo preserva início e tamanho do trecho de erros mais longo.
