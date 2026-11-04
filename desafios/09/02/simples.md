# Coleta seletiva

**Data:** 2 de setembro · **Nível:** Simples

## Objetivo

Indique a lixeira correspondente a PAPEL, VIDRO ou PLÁSTICO.

## Como funciona

Associe papel à azul, vidro à verde e plástico à vermelha.

## Exemplo de execução

```text
VIDRO → lixeira verde
```

**Como ler o exemplo:** a seta → significa "resulta em".

PLASTICO sem acento também é aceito.

## Dicas para resolução

1. Normalize para maiúsculas.
2. Use escolha.
3. Trate material desconhecido.

## Solução

```visualg
algoritmo "Desafio0902S"
var
material: caractere
inicio
escreva("Material (PAPEL, VIDRO ou PLÁSTICO): ")
  leia(material)
  escolha maiusc(material)
    caso "PAPEL"
      escreval("Lixeira azul")
    caso "VIDRO"
      escreval("Lixeira verde")
    caso "PLÁSTICO"
      escreval("Lixeira vermelha")
    caso "PLASTICO"
      escreval("Lixeira vermelha")
    outrocaso
      escreval("Material não cadastrado")
  fimescolha
fimalgoritmo
```

A seleção escolhe a cor correspondente ao material informado.
