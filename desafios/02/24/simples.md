# Festa com chuva

**Data:** 24 de fevereiro · **Nível:** Simples

## Objetivo

Escolha entre espaço aberto e coberto conforme uma entrada SIM/NÃO.

## Como funciona

Receba SIM ou NÃO e escolha um local de festa: espaço coberto para chuva, aberto caso contrário.

## Exemplo de execução

```text
Vai chover? (SIM/NÃO): SIM
Use o espaço coberto.
```

O programa aceita SIM/sim e NÃO/não/NAO/nao; outra resposta é inválida.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0224S"
var
chuva: caractere
inicio
escreva("Vai chover? (SIM/NÃO): ")
  leia(chuva)
  se (chuva = "SIM") ou (chuva = "sim") entao
    escreval("Use o espaço coberto.")
  senao
    se (chuva = "NÃO") ou (chuva = "não") ou (chuva = "NAO") ou (chuva = "nao") entao
      escreval("Use o espaço aberto.")
    senao
      escreval("Resposta inválida.")
    fimse
  fimse
fimalgoritmo
```

A condição primeiro reconhece chuva, depois ausência de chuva, sem tratar texto desconhecido como NÃO.
