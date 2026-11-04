# Organizador de pares

**Data:** 29 de junho · **Nível:** Avançado

## Objetivo

Forme duplas sem repetir parceria em rodadas consecutivas.

## Como funciona

Forme quatro duplas entre pessoas 1–4 e 5–8 em três rodadas. A cada rodada, gire a associação do segundo grupo para evitar repetir parceria consecutiva.

### Palavras úteis

- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.
- **Permutação:** É uma ordem possível para os mesmos itens. Por exemplo, A-B-C e B-A-C são duas ordens diferentes.

## Exemplo de execução

```text
Pessoa 1 faz dupla com 5 na rodada 1, 6 na rodada 2 e 7 na rodada 3
```

São necessários pelo menos dois grupos de quatro pessoas; a escala aqui é fixa para oito.

## Dicas para resolução

1. Separe os dois grupos.
2. Use deslocamento por rodada.
3. Faça a posição voltar ao início com mod.

## Solução

```visualg
algoritmo "Desafio0629A"
var
parceiro: vetor[1..4] de inteiro
  rodada, i, j, anterior: inteiro
inicio
para i de 1 ate 4 faca
    parceiro[i] <- 0
  fimpara
  para rodada de 1 ate 3 faca
    escreval("Rodada ", rodada)
    para i de 1 ate 4 faca
      j <- ((i + rodada - 2) mod 4) + 5
      escreval("Pessoa ", i, " com pessoa ", j)
      parceiro[i] <- j
    fimpara
  fimpara
fimalgoritmo
```

A rotação modular produz uma permutação em cada rodada sem parceiro repetido para qualquer pessoa.
