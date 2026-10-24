# Acampamento em grupo

**Data:** 21 de julho · **Nível:** Simples

## Objetivo

Calcule quantas barracas de quatro lugares são necessárias.

## Como funciona

Cada barraca acomoda até quatro pessoas; a última pode ter vagas livres.

### Palavras úteis

- **Resto da divisão:** É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1.

## Exemplo de execução

```text
9 pessoas → 3 barracas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pessoa exige zero barraca.

## Dicas para resolução

1. Divida por quatro.
2. Observe o resto.
3. Arredonde para cima.

## Solução

```visualg
algoritmo "Desafio0721S"
var
pessoas, barracas: inteiro
inicio
escreva("Pessoas: ")
  leia(pessoas)
  se pessoas < 0 entao
    escreval("Quantidade inválida")
  senao
    barracas <- pessoas div 4
    se pessoas mod 4 <> 0 entao
      barracas <- barracas + 1
    fimse
    escreval("Barracas de quatro lugares: ", barracas)
  fimse
fimalgoritmo
```

Qualquer resto da divisão por quatro requer outra barraca.
