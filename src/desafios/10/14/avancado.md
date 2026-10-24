# Calendário lunar fictício

**Data:** 14 de outubro · **Nível:** Avançado

## Objetivo

Gere fases em ciclo de 28 dias a partir de uma fase inicial informada.

## Como funciona

O calendário fictício dura 28 dias em quatro fases de sete dias. Comece na fase 1–4 informada e avance ciclicamente a cada sete dias.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
Fase inicial nova: dias 1–7 nova, 8–14 crescente, 15–21 cheia, 22–28 minguante
```

Após a fase 4, o índice volta à fase 1.

## Dicas para resolução

1. Agrupe dias em blocos de sete.
2. Some o deslocamento à fase inicial.
3. Use mod 4.

## Solução

```visualg
algoritmo "Desafio1014A"
var
faseInicial, dia, fase: inteiro
inicio
escreva("Fase inicial (1 nova, 2 crescente, 3 cheia, 4 minguante): ")
  leia(faseInicial)
  se (faseInicial < 1) ou (faseInicial > 4) entao
    escreval("Fase inválida")
  senao
    para dia de 1 ate 28 faca
      fase <- ((faseInicial - 1 + (dia - 1) div 7) mod 4) + 1
      escreva("Dia ", dia, ": ")
      escolha fase
        caso 1
          escreval("nova")
        caso 2
          escreval("crescente")
        caso 3
          escreval("cheia")
        caso 4
          escreval("minguante")
      fimescolha
    fimpara
  fimse
fimalgoritmo
```

Divisão inteira por sete encontra quantas mudanças ocorreram; módulo quatro fecha o ciclo.
