# Gerador de cartazes

**Data:** 18 de março · **Nível:** Avançado

## Objetivo

Desenhe uma moldura textual ajustável para títulos de comprimentos variados.

## Como funciona

Leia um título e desenhe uma moldura retangular com uma margem de um espaço em cada lado.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Título: Aula
********
* Aula *
********
```

A largura da borda é o comprimento do título mais quatro caracteres: dois asteriscos laterais e dois espaços.

## Dicas para resolução

1. Conte os caracteres do título.
2. Some quatro para a largura externa.
3. Use a mesma borda no topo e na base.

## Solução

```visualg
algoritmo "Desafio0318A"
var
titulo, borda: caractere
  largura, i: inteiro
inicio
escreva("Título: ")
  leia(titulo)
  largura <- compr(titulo) + 4
  borda <- ""
  para i de 1 ate largura faca
    borda <- borda + "*"
  fimpara
  escreval(borda)
  escreval("* ", titulo, " *")
  escreval(borda)
fimalgoritmo
```

O laço constrói uma linha de asteriscos da largura calculada, reutilizada acima e abaixo.
