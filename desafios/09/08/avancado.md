# Controle de estufa

**Data:** 8 de setembro · **Nível:** Avançado

## Objetivo

Monitore leituras e simule acionamento de aquecimento e ventilação por histerese.

## Como funciona

Em dez leituras, ligue aquecedor abaixo do mínimo e desligue após subir até mínimo + margem. Ligue ventilador acima do máximo e desligue após cair até máximo − margem.

## Exemplo de execução

```text
Mínimo 18, margem 2: aquece a 17 e só desliga ao chegar a 20
```

Escolha margem compatível com a faixa ideal para evitar ambos ligados por configuração contraditória.

## Dicas para resolução

1. Guarde se cada atuador está ligado.
2. Use limiares diferentes para ligar e desligar.
3. Atualize a cada leitura.

## Solução

```visualg
algoritmo "Desafio0908A"
var
i, aquecedor, ventilador: inteiro
  leitura, minimo, maximo, margem: real
inicio
escreva("Temperatura mínima ideal: ")
  leia(minimo)
  escreva("Temperatura máxima ideal: ")
  leia(maximo)
  escreva("Margem de histerese: ")
  leia(margem)
  aquecedor <- 0
  ventilador <- 0
  se (minimo > maximo) ou (margem < 0) entao
    escreval("Parâmetros inválidos")
  senao
    para i de 1 ate 10 faca
      escreva("Leitura ", i, ": ")
      leia(leitura)
      se aquecedor = 0 entao
        se leitura < minimo entao
          aquecedor <- 1
        fimse
      senao
        se leitura >= minimo + margem entao
          aquecedor <- 0
        fimse
      fimse
      se ventilador = 0 entao
        se leitura > maximo entao
          ventilador <- 1
        fimse
      senao
        se leitura <= maximo - margem entao
          ventilador <- 0
        fimse
      fimse
      escreval("Aquecedor ", aquecedor, "; ventilador ", ventilador)
    fimpara
  fimse
fimalgoritmo
```

Estados separados e limiares diferentes de liga e desliga evitam oscilação rápida.
