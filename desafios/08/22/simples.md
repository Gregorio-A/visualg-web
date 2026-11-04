# Temporizador de jogo

**Data:** 22 de agosto · **Nível:** Simples

## Objetivo

Converta segundos de partida em minutos e segundos.

## Como funciona

Cada minuto contém 60 segundos.

### Palavras úteis

- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
125 s → 2 min e 5 s
```

**Como ler o exemplo:** a seta → significa "resulta em".

Menos de 60 segundos dá zero minuto.

## Dicas para resolução

1. Use div por 60.
2. Use mod 60.
3. Mostre as duas partes.

## Solução

```visualg
algoritmo "Desafio0822S"
var
segundos: inteiro
inicio
escreva("Segundos da partida: ")
  leia(segundos)
  se segundos < 0 entao
    escreval("Tempo inválido")
  senao
    escreval("Tempo: ", segundos div 60, " min e ", segundos mod 60, " s")
  fimse
fimalgoritmo
```

A divisão inteira fornece minutos e o resto fornece segundos restantes.
