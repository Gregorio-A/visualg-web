# Garrafas de água

**Data:** 19 de janeiro · **Nível:** Simples

## Objetivo

Calcule quantas garrafas de 500 ml completam um volume informado em litros.

Calcule o número mínimo de garrafas inteiras de 500 ml para atingir um volume em litros.

## Como funciona

Converta litros em mililitros, divida por 500 e arredonde para cima quando houver resto.

## Exemplo de execução

```text
Volume desejado (litros): 1.2
Garrafas de 500 ml necessárias: 3
```

Exatamente 1 litro precisa de duas garrafas; 1,01 litro precisa de três.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0119S"
var
litros, mililitros: real
  garrafas: inteiro
inicio
escreva("Volume desejado (litros): ")
  leia(litros)
  se litros >= 0 entao
    mililitros <- litros * 1000
    garrafas <- int(mililitros / 500)
    se garrafas * 500 < mililitros entao
      garrafas <- garrafas + 1
    fimse
    escreval("Garrafas de 500 ml necessárias: ", garrafas)
  senao
    escreval("Volume inválido.")
  fimse
fimalgoritmo
```

O teste após a divisão adiciona uma garrafa apenas quando a capacidade calculada ainda não alcança o volume.
