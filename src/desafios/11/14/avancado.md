# Organizador de arquivos

**Data:** 14 de novembro · **Nível:** Avançado

## Objetivo

Classifique nomes por extensão, conte categorias e detecte nomes repetidos.

## Como funciona

Cadastre oito arquivos com nome e extensão codificada. Conte por extensão e sinalize cada entrada cujo nome já apareceu, ignorando caixa.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
a.txt e A.TXT cadastrados com mesmo nome textual → segunda entrada repetida
```

**Como ler o exemplo:** a seta → significa "resulta em".

A comparação de nomes usa exatamente o campo digitado; inclua a extensão nele se quiser distingui-la.

## Dicas para resolução

1. Conte códigos de extensão.
2. Compare cada nome aos anteriores.
3. Pare após achar duplicata.

## Solução

```visualg
algoritmo "Desafio1114A"
var
nome: vetor[1..8] de caractere
  categoria: vetor[1..8] de inteiro
  contagem: vetor[1..3] de inteiro
  i, j, repetidos: inteiro
inicio
para i de 1 ate 3 faca
    contagem[i] <- 0
  fimpara
  repetidos <- 0
  para i de 1 ate 8 faca
    escreva("Nome do arquivo ", i, ": ")
    leia(nome[i])
    escreva("Extensão (1 txt, 2 jpg, 3 mp4): ")
    leia(categoria[i])
    se (categoria[i] >= 1) e (categoria[i] <= 3) entao
      contagem[categoria[i]] <- contagem[categoria[i]] + 1
    fimse
    para j de 1 ate i - 1 faca
      se minusc(nome[i]) = minusc(nome[j]) entao
        repetidos <- repetidos + 1
        escreval("Nome repetido: ", nome[i])
        interrompa
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval("Extensão ", i, ": ", contagem[i], " arquivo(s)")
  fimpara
  escreval("Entradas com nome repetido: ", repetidos)
fimalgoritmo
```

Um laço interno procura nomes anteriores e evita contar a mesma entrada repetida mais de uma vez.
