# Gerador de cartões

**Data:** 5 de dezembro · **Nível:** Avançado

## Objetivo

Cadastre destinatários e modelos de texto e produza mensagens por categoria.

## Como funciona

Cadastre seis destinatários e escolha um dos três modelos conforme a categoria informada.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Ana, família → “Ana, que a união da família ilumine seu ano!”
```

**Como ler o exemplo:** a seta → significa "resulta em".

Categoria fora de 1–3 é solicitada de novo.

## Dicas para resolução

1. Cadastre nomes em vetor.
2. Associe categoria a modelo.
3. Escreva uma mensagem diferente por categoria.

## Solução

```visualg
algoritmo "Desafio1205A"
var
  nomes: vetor[1..6] de caractere
  categoria, modelo, i: inteiro
inicio
  para i de 1 ate 6 faca
    escreva("Destinatário ", i, ": ")
    leia(nomes[i])
    repita
      escreva("Categoria (1 família, 2 amigo, 3 colega): ")
      leia(categoria)
    ate (categoria >= 1) e (categoria <= 3)
    escolha categoria
      caso 1
        modelo <- 1
      caso 2
        modelo <- 2
      outrocaso
        modelo <- 3
    fimescolha
    escolha modelo
      caso 1
        escreval(nomes[i], ", que a união da família ilumine seu ano!")
      caso 2
        escreval(nomes[i], ", obrigada pela amizade. Boas festas!")
      outrocaso
        escreval(nomes[i], ", boas festas e ótimos projetos!")
    fimescolha
  fimpara
fimalgoritmo
```

A categoria seleciona o modelo; a mensagem inclui o nome do destinatário.
