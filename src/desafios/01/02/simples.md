# Termômetro da praia

**Data:** 2 de janeiro · **Nível:** Simples

## Objetivo

Leia uma temperatura e diga se supera 30 °C.

Informe se uma temperatura em graus Celsius é maior que 30.

## Como funciona

Leia uma temperatura real. Use comparação estrita: 30 °C não supera 30 °C.

## Exemplo de execução

```text
Temperatura (°C): 32
Supera 30 °C
```

Para entrada `30`, a resposta é “Não supera 30 °C”.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0102S"
var
temperatura: real
inicio
escreva("Temperatura (°C): ")
  leia(temperatura)
  se temperatura > 30 entao
    escreval("Supera 30 °C")
  senao
    escreval("Não supera 30 °C")
  fimse
fimalgoritmo
```

A condição `temperatura > 30` separa os dois resultados possíveis.
