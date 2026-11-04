# Agenda da piscina

**Data:** 4 de janeiro · **Nível:** Avançado

## Objetivo

Receba horários de início e fim de cinco reservas e detecte sobreposições.

Detecte conflitos entre cinco reservas de piscina expressas como intervalos de minutos.

## Como funciona

Cada reserva começa no minuto inicial e termina antes do minuto final. Compare todos os pares distintos. Horários adjacentes, como 10–20 e 20–30, não se sobrepõem.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.

## Exemplo de execução

```text
Reservas: 10–20, 20–30, 15–25, 30–40, 40–50
Sobreposição entre reservas 1 e 3
Sobreposição entre reservas 2 e 3
```

Reservas com início igual ou posterior ao fim não formam intervalo válido e são desconsideradas nas comparações.

## Dicas para resolução

1. Guarde inícios e fins em vetores paralelos.
2. Percorra pares com `j` começando em `i + 1`.
3. Use duas comparações estritas para não marcar horários adjacentes.

## Solução

```visualg
algoritmo "Desafio0104A"
var
inicioReserva: vetor[1..5] de inteiro
  fimReserva: vetor[1..5] de inteiro
  i, j: inteiro
  conflito: logico
inicio
para i de 1 ate 5 faca
    escreva("Início da reserva ", i, " (minutos): ")
    leia(inicioReserva[i])
    escreva("Fim da reserva ", i, " (minutos): ")
    leia(fimReserva[i])
  fimpara
  conflito <- falso
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (inicioReserva[i] < fimReserva[i]) e (inicioReserva[j] < fimReserva[j]) entao
        se (inicioReserva[i] < fimReserva[j]) e (inicioReserva[j] < fimReserva[i]) entao
          escreval("Sobreposição entre reservas ", i, " e ", j)
          conflito <- verdadeiro
        fimse
      fimse
    fimpara
  fimpara
  se nao conflito entao
    escreval("Nenhuma sobreposição encontrada.")
  fimse
fimalgoritmo
```

Dois intervalos válidos se cruzam quando cada início ocorre antes do fim do outro.
