# Irrigador automático

**Data:** 28 de setembro · **Nível:** Avançado

## Objetivo

Simule sensores e válvulas com faixas de liga/desliga independentes.

## Como funciona

Três setores têm limiares independentes. Válvula desligada liga abaixo do limiar inferior; ligada desliga ao atingir o superior.

## Exemplo de execução

```text
Liga abaixo de 30, desliga em 45: umidade 20 liga, 35 mantém, 45 desliga
```

Configure limiar de desligar maior que o de ligar para obter histerese coerente.

## Dicas para resolução

1. Guarde dois limites por setor.
2. Confira o estado atual.
3. Altere apenas quando atravessar o limite correspondente.

## Solução

```visualg
algoritmo "Desafio0928A"
var
umidade, liga, desliga: vetor[1..3] de real
  valvula: vetor[1..3] de inteiro
  i, rodada: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Sensor ", i, ": liga abaixo de: ")
    leia(liga[i])
    escreva("Desliga a partir de: ")
    leia(desliga[i])
    valvula[i] <- 0
  fimpara
  para rodada de 1 ate 5 faca
    para i de 1 ate 3 faca
      escreva("Umidade sensor ", i, " na rodada ", rodada, ": ")
      leia(umidade[i])
      se valvula[i] = 0 entao
        se umidade[i] < liga[i] entao
          valvula[i] <- 1
        fimse
      senao
        se umidade[i] >= desliga[i] entao
          valvula[i] <- 0
        fimse
      fimse
      escreval("Válvula ", i, ": ", valvula[i])
    fimpara
  fimpara
fimalgoritmo
```

Cada válvula conserva seu próprio estado entre as cinco rodadas.
