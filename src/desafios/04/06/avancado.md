# Decifrador de códigos

**Data:** 6 de abril · **Nível:** Avançado

## Objetivo

Descubra quais códigos de quatro dígitos atendem a soma e posições parciais informadas.

## Como funciona

Leia soma desejada dos dígitos, primeiro e terceiro dígito. Percorra os códigos de 1000 a 9999 e liste os que satisfazem todas as pistas.

## Exemplo de execução

```text
Soma 10; primeiro dígito 1; terceiro dígito 2
Código 1225 é compatível: 1+2+2+5=10.
```

Se as pistas forem impossíveis, a contagem final será zero.

## Dicas para resolução

1. Extraia cada uma das quatro posições.
2. Cheque as pistas de posição e soma no mesmo `se`.
3. Conte apenas códigos que satisfazem tudo.

## Solução

```visualg
algoritmo "Desafio0406A"
var
somaAlvo, primeiro, terceiro, codigo, milhar, centena, dezena, unidade, encontrados: inteiro
inicio
escreva("Soma dos quatro dígitos: ")
  leia(somaAlvo)
  escreva("Primeiro dígito: ")
  leia(primeiro)
  escreva("Terceiro dígito: ")
  leia(terceiro)
  encontrados <- 0
  para codigo de 1000 ate 9999 faca
    milhar <- codigo div 1000
    centena <- (codigo div 100) mod 10
    dezena <- (codigo div 10) mod 10
    unidade <- codigo mod 10
    se (milhar = primeiro) e (dezena = terceiro) e (milhar + centena + dezena + unidade = somaAlvo) entao
      escreval(codigo)
      encontrados <- encontrados + 1
    fimse
  fimpara
  escreval("Códigos compatíveis: ", encontrados)
fimalgoritmo
```

Divisão inteira e resto extraem dígitos em posições determinadas; a enumeração examina o espaço finito de códigos.
