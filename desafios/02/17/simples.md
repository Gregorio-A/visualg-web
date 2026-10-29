# Fantasia por tamanho

**Data:** 17 de fevereiro · **Nível:** Simples

## Objetivo

Indique P, M ou G conforme faixas numéricas informadas.

## Como funciona

Leia uma medida e dois limites crescentes: até o primeiro é P, até o segundo é M, acima dele é G.

## Exemplo de execução

```text
Medida: 42
Limite superior de P: 38
Limite superior de M: 44
M
```

Valor igual ao limite de P permanece em P; igual ao limite de M permanece em M.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0217S"
var
valor, limiteP, limiteM: real
inicio
escreva("Medida: ")
  leia(valor)
  escreva("Limite superior de P: ")
  leia(limiteP)
  escreva("Limite superior de M: ")
  leia(limiteM)
  se limiteP <= limiteM entao
    se valor <= limiteP entao
      escreval("P")
    senao
      se valor <= limiteM entao
        escreval("M")
      senao
        escreval("G")
      fimse
    fimse
  senao
    escreval("Faixas inválidas.")
  fimse
fimalgoritmo
```

As condicionais aninhadas mantêm as três faixas sem sobreposição.
