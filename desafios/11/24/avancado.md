# Calculadora de armazenamento

**Data:** 24 de novembro · **Nível:** Avançado

## Objetivo

Converta entre bytes, KiB, MiB e GiB com seleção de unidade.

## Como funciona

Selecione unidade de entrada entre bytes, KiB, MiB e GiB. Converta para bytes e mostre as quatro unidades usando fator 1024.

## Exemplo de execução

```text
1 MiB → 1048576 bytes → 1024 KiB
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor negativo ou código de unidade fora de 1–4 é inválido.

## Dicas para resolução

1. Converta entrada em bytes.
2. Use potências de 1024.
3. Divida para outras unidades.

## Solução

```visualg
algoritmo "Desafio1124A"
var
valor, bytes: real
  unidade: inteiro
inicio
escreva("Valor: ")
  leia(valor)
  escreva("Unidade (1 bytes, 2 KiB, 3 MiB, 4 GiB): ")
  leia(unidade)
  se (valor < 0) ou (unidade < 1) ou (unidade > 4) entao
    escreval("Dados inválidos")
  senao
    bytes <- valor
    escolha unidade
      caso 2
        bytes <- valor * 1024
      caso 3
        bytes <- valor * 1024 * 1024
      caso 4
        bytes <- valor * 1024 * 1024 * 1024
    fimescolha
    escreval("Bytes: ", bytes)
    escreval("KiB: ", bytes / 1024)
    escreval("MiB: ", bytes / (1024 * 1024))
    escreval("GiB: ", bytes / (1024 * 1024 * 1024))
  fimse
fimalgoritmo
```

Bytes servem de unidade intermediária comum para todas as saídas.
