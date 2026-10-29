# Tempo de festa

**Data:** 14 de junho · **Nível:** Simples

## Objetivo

Calcule duração entre dois horários do mesmo dia.

## Como funciona

Converta horários do mesmo dia para minutos e subtraia o início do término.

### Palavras úteis

- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
18:30 até 20:00 → 1 h e 30 min
```

**Como ler o exemplo:** a seta → significa "resulta em".

Término anterior ao início é recusado.

## Dicas para resolução

1. Converta horas em minutos.
2. Subtraia.
3. Use div e mod para formatar.

## Solução

```visualg
algoritmo "Desafio0614S"
var
inicioH, inicioM, fimH, fimM, duracao: inteiro
inicio
escreva("Hora e minuto de início: ")
  leia(inicioH, inicioM)
  escreva("Hora e minuto de término: ")
  leia(fimH, fimM)
  se (inicioH < 0) ou (inicioH > 23) ou (fimH < 0) ou (fimH > 23) ou (inicioM < 0) ou (inicioM > 59) ou (fimM < 0) ou (fimM > 59) entao
    escreval("Horário inválido")
  senao
    duracao <- fimH * 60 + fimM - inicioH * 60 - inicioM
    se duracao < 0 entao
      escreval("O término deve ser no mesmo dia e após o início")
    senao
      escreval("Duração: ", duracao div 60, " h e ", duracao mod 60, " min")
    fimse
  fimse
fimalgoritmo
```

Minutos totais simplificam o cálculo antes de separar horas e minutos da duração.
