# Distribuidor de provas

**Data:** 17 de março · **Nível:** Avançado

## Objetivo

Associe versões A e B aos assentos, evitando vizinhos com mesma versão.

## Como funciona

Distribua duas versões de prova por dez assentos em uma fileira. Assentos vizinhos devem receber versões diferentes.

## Exemplo de execução

```text
Assentos 1 a 4 → A, B, A, B
```

**Como ler o exemplo:** a seta → significa "resulta em".

A alternância garante que nenhum par de assentos consecutivos compartilhe a versão.

## Dicas para resolução

1. Atribua A a posições ímpares.
2. Atribua B a posições pares.
3. Percorra os dez assentos para conferir a alternância.

## Solução

```visualg
algoritmo "Desafio0317A"
var
versao: vetor[1..10] de caractere
  i: inteiro
inicio
para i de 1 ate 10 faca
    se i mod 2 = 1 entao
      versao[i] <- "A"
    senao
      versao[i] <- "B"
    fimse
  fimpara
  para i de 1 ate 10 faca
    escreval("Assento ", i, ": versão ", versao[i])
  fimpara
fimalgoritmo
```

A paridade do número do assento escolhe entre A e B.
