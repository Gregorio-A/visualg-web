# Desafio de leitura

**Data:** 5 de julho · **Nível:** Avançado

## Objetivo

Registre progresso de sete dias e calcule evolução e previsão baseada na média.

## Como funciona

Registre páginas lidas em sete dias. Some evolução diária, calcule média de páginas por dia e estime dias restantes mantendo o mesmo ritmo.

## Exemplo de execução

```text
Livro 140 páginas; 10 páginas em cada um dos sete dias → 70 lidas; média 10; faltam 7 dias
```

**Como ler o exemplo:** a seta → significa "resulta em".

Média zero não permite previsão. Leitura além do livro é limitada a zero páginas restantes.

## Dicas para resolução

1. Acumule sete leituras.
2. Divida por sete.
3. Use a média para estimar o restante.

## Solução

```visualg
algoritmo "Desafio0705A"
var
paginas, i, lidas, total: inteiro
  media, faltam, diasPrevistos: real
inicio
escreva("Páginas totais do livro: ")
  leia(paginas)
  total <- 0
  para i de 1 ate 7 faca
    escreva("Páginas lidas no dia ", i, ": ")
    leia(lidas)
    se lidas > 0 entao
      total <- total + lidas
    fimse
    escreval("Progresso acumulado: ", total)
  fimpara
  se paginas < 0 entao
    escreval("Livro inválido")
  senao
    media <- total / 7
    faltam <- paginas - total
    se faltam < 0 entao
      faltam <- 0
    fimse
    escreval("Média diária: ", media, "; páginas restantes: ", faltam)
    se media > 0 entao
      diasPrevistos <- faltam / media
      escreval("Dias estimados para terminar: ", diasPrevistos)
    senao
      escreval("Sem ritmo para prever conclusão")
    fimse
  fimse
fimalgoritmo
```

A previsão divide páginas restantes pela média diária observada.
