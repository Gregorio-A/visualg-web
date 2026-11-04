# Conversor de bases

**Data:** 2 de novembro · **Nível:** Avançado

## Objetivo

Converta números entre decimal, binário e hexadecimal com validação.

## Como funciona

Converta texto numérico não negativo entre bases 2, 10 e 16. Primeiro interprete cada dígito, validando-o; depois divida sucessivamente pela base de saída.

## Exemplo de execução

```text
1010 em base 2 → A em base 16; FF em base 16 → 255 em base 10
```

**Como ler o exemplo:** a seta → significa "resulta em".

Entrada vazia deve ser evitada. Valores devem caber no tipo inteiro do interpretador.

## Dicas para resolução

1. Converta cada caractere em dígito.
2. Valide dígito < base de entrada.
3. Monte a saída com divisões e restos.

## Solução

```visualg
algoritmo "Desafio1102A"
var
numero, baseEntrada, baseSaida, resto, digito, valor, posicao, acumulado: inteiro
  textoEntrada, resultado, caractereAtual: caractere
inicio
escreva("Base de entrada (2, 10 ou 16): ")
  leia(baseEntrada)
  escreva("Número sem sinal: ")
  leia(textoEntrada)
  escreva("Base de saída (2, 10 ou 16): ")
  leia(baseSaida)
  se ((baseEntrada <> 2) e (baseEntrada <> 10) e (baseEntrada <> 16)) ou ((baseSaida <> 2) e (baseSaida <> 10) e (baseSaida <> 16)) entao
    escreval("Base inválida")
  senao
    acumulado <- 0
    valor <- 1
    para posicao de 1 ate compr(textoEntrada) faca
      caractereAtual <- maiusc(copia(textoEntrada, posicao, 1))
      digito <- asc(caractereAtual) - 48
      se (asc(caractereAtual) >= 65) e (asc(caractereAtual) <= 70) entao
        digito <- asc(caractereAtual) - 55
      fimse
      se (digito < 0) ou (digito >= baseEntrada) entao
        valor <- 0
      senao
        acumulado <- acumulado * baseEntrada + digito
      fimse
    fimpara
    se valor = 0 entao
      escreval("Dígito inválido para a base")
    senao
      numero <- acumulado
      resultado <- ""
      se numero = 0 entao
        resultado <- "0"
      fimse
      enquanto numero > 0 faca
        resto <- numero mod baseSaida
        se resto < 10 entao
          caractereAtual <- carac(resto + 48)
        senao
          caractereAtual <- carac(resto + 55)
        fimse
        resultado <- caractereAtual + resultado
        numero <- numero div baseSaida
      fimenquanto
      escreval("Resultado: ", resultado)
    fimse
  fimse
fimalgoritmo
```

Acumulação posicional transforma entrada em decimal; restos sucessivos montam o texto da base desejada.
