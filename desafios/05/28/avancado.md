# Recebimento de cargas

**Data:** 28 de maio · **Nível:** Avançado

## Objetivo

Simule fila de docas, duração de descarga e horários de liberação.

## Como funciona

Simule cinco cargas informadas em ordem de chegada. Atribua cada uma à doca que ficará livre primeiro; início é o máximo entre chegada e liberação da doca.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Docas livres em 0; cargas (0,10), (0,5), (2,3)
Cargas nas docas 1, 2 e 2; terceira inicia em 5 e libera em 8
```

Empate entre docas escolhe a doca 1. Duração zero libera imediatamente.

## Dicas para resolução

1. Guarde o horário livre de cada doca.
2. Escolha o menor horário.
3. Atualize liberação após a descarga.

## Solução

```visualg
algoritmo "Desafio0528A"
var
livre: vetor[1..2] de inteiro
  i, chegada, duracao, doca, inicioDescarga: inteiro
inicio
livre[1] <- 0
  livre[2] <- 0
  para i de 1 ate 5 faca
    escreva("Chegada da carga ", i, " em minutos: ")
    leia(chegada)
    escreva("Duração de descarga em minutos: ")
    leia(duracao)
    se (chegada < 0) ou (duracao < 0) entao
      escreval("Carga inválida")
    senao
      doca <- 1
      se livre[2] < livre[1] entao
        doca <- 2
      fimse
      inicioDescarga <- chegada
      se livre[doca] > inicioDescarga entao
        inicioDescarga <- livre[doca]
      fimse
      livre[doca] <- inicioDescarga + duracao
      escreval("Carga ", i, ": doca ", doca, ", inicia ", inicioDescarga, ", libera ", livre[doca])
    fimse
  fimpara
fimalgoritmo
```

O vetor de horários representa a próxima disponibilidade de cada doca.
