# Velocidade da internet

**Data:** 7 de novembro · **Nível:** Simples

## Objetivo

Calcule tempo de download com tamanho e taxa fixa compatíveis.

## Como funciona

Use tamanho em MB e taxa em MB por segundo.

## Exemplo de execução

```text
100 MB a 10 MB/s → 10 s
```

**Como ler o exemplo:** a seta → significa "resulta em".

Taxa zero impede a divisão.

## Dicas para resolução

1. Confira unidades.
2. Valide taxa.
3. Divida.

## Solução

```visualg
algoritmo "Desafio1107S"
var
tamanho, taxa: real
inicio
escreva("Tamanho do download em MB: ")
  leia(tamanho)
  escreva("Taxa em MB/s: ")
  leia(taxa)
  se (tamanho < 0) ou (taxa <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Tempo estimado: ", tamanho / taxa, " s")
  fimse
fimalgoritmo
```

Tamanho dividido por taxa fornece segundos.
