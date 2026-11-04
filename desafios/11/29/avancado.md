# Monitor de rede

**Data:** 29 de novembro · **Nível:** Avançado

## Objetivo

Acompanhe resultados de testes e identifique quedas consecutivas de conexão.

## Como funciona

Em doze testes, 0 indica queda e 1 conexão. Conte quedas e localize o maior bloco consecutivo sem conexão.

## Exemplo de execução

```text
Resultados 0,0,1,0 → três quedas totais e maior bloco de 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Qualquer entrada diferente de 0 interrompe a sequência.

## Dicas para resolução

1. Conte zeros.
2. Reinicie a sequência em conexão.
3. Guarde o melhor início e tamanho.

## Solução

```visualg
algoritmo "Desafio1129A"
var
teste: vetor[1..12] de inteiro
  i, quedas, atual, maior, inicioAtual, inicioMaior: inteiro
inicio
quedas <- 0
  atual <- 0
  maior <- 0
  para i de 1 ate 12 faca
    escreva("Teste ", i, " (1 conectado, 0 queda): ")
    leia(teste[i])
    se teste[i] = 0 entao
      quedas <- quedas + 1
      se atual = 0 entao
        inicioAtual <- i
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Quedas totais: ", quedas)
  se maior > 0 entao
    escreval("Maior sequência de quedas: testes ", inicioMaior, " a ", inicioMaior + maior - 1)
  fimse
fimalgoritmo
```

Contador atual e máximo localizam a pior sequência de falhas.
