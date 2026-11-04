# Painel de luzes

**Data:** 2 de dezembro · **Nível:** Avançado

## Objetivo

Simule padrões de piscada em matriz por lâmpada e turno.

## Como funciona

Use matriz de quatro turnos por seis lâmpadas. A lâmpada acende quando turno + índice é par ou quando seu índice coincide com o turno.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
No turno 1, as lâmpadas 1, 3 e 5 aparecem acesas.
```

Cada célula vale somente zero (apagada) ou um (acesa).

## Dicas para resolução

1. Escolha índices de turno e lâmpada.
2. Aplique a regra booleana em cada célula.
3. Mostre a linha e conte os valores 1.

## Solução

```visualg
algoritmo "Desafio1202A"
var
  luz: vetor[1..4,1..6] de inteiro
  turno, lampada, acesas: inteiro
inicio
  para turno de 1 ate 4 faca
    acesas <- 0
    para lampada de 1 ate 6 faca
      se ((turno + lampada) mod 2 = 0) ou (lampada = turno) entao
        luz[turno,lampada] <- 1
        acesas <- acesas + 1
      senao
        luz[turno,lampada] <- 0
      fimse
    fimpara
    escreval("Turno ", turno, ":")
    para lampada de 1 ate 6 faca
      escreva(luz[turno,lampada], " ")
    fimpara
    escreval(" | acesas: ", acesas)
  fimpara
fimalgoritmo
```

A matriz guarda o padrão completo e o contador resume cada turno.
