# Portaria do evento

**Data:** 7 de fevereiro · **Nível:** Avançado

## Objetivo

Valide códigos únicos de ingresso e rejeite entradas repetidas.

## Como funciona

Leia códigos numéricos positivos de ingresso e aceite cada código apenas na primeira utilização. O cadastro comporta vinte códigos distintos.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Entradas: código 123, código 456, código 123
Aceita, aceita, rejeitada
```

Código zero ou negativo é inválido; código já utilizado não dá nova entrada.

## Dicas para resolução

1. Use uma variável diferente do código para percorrer os registros.
2. Procure o novo código no vetor antes de gravá-lo.
3. Grave somente depois de verificar que não é repetido.

## Solução

```visualg
algoritmo "Desafio0207A"
var
codigos: vetor[1..20] de inteiro
  quantidade, codigo, tentativas, i, j: inteiro
  repetido: logico
inicio
quantidade <- 0
  escreva("Número de tentativas de entrada: ")
  leia(tentativas)
  para i de 1 ate tentativas faca
    escreva("Código da pulseira: ")
    leia(codigo)
    repetido <- falso
    se codigo <= 0 entao
      repetido <- verdadeiro
    fimse
    para j de 1 ate quantidade faca
      se codigos[j] = codigo entao
        repetido <- verdadeiro
      fimse
    fimpara
    se repetido entao
      escreval("Entrada rejeitada.")
    senao
      se quantidade < 20 entao
        quantidade <- quantidade + 1
        codigos[quantidade] <- codigo
        escreval("Entrada aceita.")
      senao
        escreval("Cadastro cheio.")
      fimse
    fimse
  fimpara
fimalgoritmo
```

O vetor guarda códigos já aceitos; cada nova entrada deve ser comparada a todos os registros anteriores.
