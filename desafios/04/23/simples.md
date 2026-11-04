# Mapa codificado

**Data:** 23 de abril · **Nível:** Simples

## Objetivo

Traduza N, S, L ou O em uma direção escrita.

## Como funciona

Traduza os códigos N, S, L e O para os nomes completos dos pontos cardeais.

## Exemplo de execução

```text
Comando: L
Leste
```

Uma letra diferente dos quatro códigos não indica direção válida.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0423S"
var
direcao: caractere
inicio
escreva("Comando (N/S/L/O): ")
  leia(direcao)
  se direcao = "N" entao
    escreval("Norte")
  senao
    se direcao = "S" entao
      escreval("Sul")
    senao
      se direcao = "L" entao
        escreval("Leste")
      senao
        se direcao = "O" entao
          escreval("Oeste")
        senao
          escreval("Comando inválido")
        fimse
      fimse
    fimse
  fimse
fimalgoritmo
```

Cada ramo corresponde a um dos códigos possíveis.
