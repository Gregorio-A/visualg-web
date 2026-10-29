# Agenda de hospedagem

**Data:** 16 de janeiro · **Nível:** Avançado

## Objetivo

Mantenha dez quartos e permita reservar períodos sem conflito de datas.

Gerencie períodos de reserva para dez quartos, sem aceitar sobreposição no mesmo quarto.

## Como funciona

Leia uma quantidade de pedidos. Cada pedido indica quarto de 1 a 10 e dias de entrada e saída no mesmo mês. A saída é exclusiva: outra reserva pode começar nesse dia. Cada quarto guarda até 20 reservas aceitas.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Pedido 1: quarto 2, dias 5–8 → confirmado
Pedido 2: quarto 2, dias 7–10 → indisponível
Pedido 3: quarto 2, dias 8–10 → confirmado
```

**Como ler o exemplo:** a seta → significa "resulta em".

Reservas de quartos diferentes podem ocupar os mesmos dias; um período com saída igual à entrada é inválido.

## Dicas para resolução

1. Use um contador de reservas para cada quarto.
2. Compare o novo intervalo somente com reservas do mesmo quarto.
3. Dois intervalos colidem se ambos começarem antes de o outro terminar.

## Solução

```visualg
algoritmo "Desafio0116A"
var
inicioReserva: vetor[1..10, 1..20] de inteiro
  fimReserva: vetor[1..10, 1..20] de inteiro
  quantidade: vetor[1..10] de inteiro
  quarto, entrada, saida, i, j, pedidos: inteiro
  livre: logico
inicio
para i de 1 ate 10 faca
    quantidade[i] <- 0
  fimpara
  escreva("Quantidade de pedidos: ")
  leia(pedidos)
  para i de 1 ate pedidos faca
    escreva("Quarto (1 a 10): ")
    leia(quarto)
    escreva("Dia de entrada: ")
    leia(entrada)
    escreva("Dia de saída: ")
    leia(saida)
    se (quarto < 1) ou (quarto > 10) ou (entrada < 1) ou (saida <= entrada) ou (saida > 31) entao
      escreval("Pedido inválido.")
    senao
      livre <- verdadeiro
      para j de 1 ate quantidade[quarto] faca
        se (entrada < fimReserva[quarto, j]) e (inicioReserva[quarto, j] < saida) entao
          livre <- falso
        fimse
      fimpara
      se livre e (quantidade[quarto] < 20) entao
        quantidade[quarto] <- quantidade[quarto] + 1
        inicioReserva[quarto, quantidade[quarto]] <- entrada
        fimReserva[quarto, quantidade[quarto]] <- saida
        escreval("Reserva confirmada no quarto ", quarto)
      senao
        escreval("Quarto indisponível nesse período.")
      fimse
    fimse
  fimpara
fimalgoritmo
```

A matriz guarda os intervalos de cada quarto. Um pedido é aceito somente quando não cruza nenhum intervalo já registrado naquele quarto.
