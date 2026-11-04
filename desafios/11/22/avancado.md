# Mapa de sinal

**Data:** 22 de novembro · **Nível:** Avançado

## Objetivo

Processe leituras em matriz e localize áreas com cobertura insuficiente.

## Como funciona

Leia matriz 4×4 de intensidades. Localize cada célula estritamente abaixo do limite e calcule média de todas.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Limite 40; célula com sinal 30 → insuficiente
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor igual ao limite é suficiente.

## Dicas para resolução

1. Use matriz 4×4.
2. Compare cada célula.
3. Some para média.

## Solução

```visualg
algoritmo "Desafio1122A"
var
sinal: vetor[1..4, 1..4] de real
  linha, coluna, fracos: inteiro
  limite, soma: real
inicio
escreva("Sinal mínimo aceitável: ")
  leia(limite)
  fracos <- 0
  soma <- 0
  para linha de 1 ate 4 faca
    para coluna de 1 ate 4 faca
      escreva("Sinal em ", linha, ",", coluna, ": ")
      leia(sinal[linha, coluna])
      soma <- soma + sinal[linha, coluna]
      se sinal[linha, coluna] < limite entao
        fracos <- fracos + 1
        escreval("Cobertura insuficiente em (", linha, ",", coluna, ")")
      fimse
    fimpara
  fimpara
  escreval("Células insuficientes: ", fracos, "; sinal médio: ", soma / 16)
fimalgoritmo
```

Percorrer linhas e colunas preserva a posição das regiões fracas.
