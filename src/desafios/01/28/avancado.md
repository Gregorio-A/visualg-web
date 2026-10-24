# Escala de lembretes

**Data:** 28 de janeiro · **Nível:** Avançado

## Objetivo

Gere alertas em intervalos configuráveis dentro de uma janela de horário.

Gere lembretes em intervalos regulares dentro de uma janela de horário.

## Como funciona

Leia início e fim como minutos desde meia-noite e intervalo positivo. Emita o primeiro alerta no início e continue somando o intervalo sem ultrapassar o fim.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Início: 480; fim: 600; intervalo: 60
Alerta às 8h0
Alerta às 9h0
Alerta às 10h0
```

Quando início e fim são iguais, há um único alerta. Intervalo zero é inválido para evitar repetição infinita.

## Dicas para resolução

1. Converta os horários para minutos.
2. Exija intervalo positivo.
3. Use divisão inteira e resto para exibir hora e minuto.

## Solução

```visualg
algoritmo "Desafio0128A"
var
inicioMin, fimMin, intervalo, horario: inteiro
inicio
escreva("Início da janela (minutos): ")
  leia(inicioMin)
  escreva("Fim da janela (minutos): ")
  leia(fimMin)
  escreva("Intervalo entre alertas (minutos): ")
  leia(intervalo)
  se (intervalo > 0) e (fimMin >= inicioMin) e (inicioMin >= 0) e (fimMin <= 1440) entao
    horario <- inicioMin
    enquanto horario <= fimMin faca
      escreval("Alerta às ", horario div 60, "h", horario mod 60)
      horario <- horario + intervalo
    fimenquanto
  senao
    escreval("Janela ou intervalo inválido.")
  fimse
fimalgoritmo
```

O laço termina porque `horario` aumenta por um valor positivo em cada volta.
