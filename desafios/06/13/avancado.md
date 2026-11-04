# Simulador de cadeiras

**Data:** 13 de junho · **Nível:** Avançado

## Objetivo

Elimine jogadores em círculo a partir de passos contados.

## Como funciona

Jogadores numerados de 1 a N formam um círculo. Conte K pessoas a partir da posição atual, elimine a Kª e continue da próxima.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
3 jogadores, contagem 2 → elimina 2, depois 1; vence 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Com um jogador, ele vence sem eliminações.

## Dicas para resolução

1. Guarde os jogadores restantes.
2. Use mod para circular.
3. Remova o eliminado deslocando o vetor.

## Solução

```visualg
algoritmo "Desafio0613A"
var
jogador: vetor[1..20] de inteiro
  n, passoContagem, restantes, indice, i, eliminados: inteiro
inicio
escreva("Jogadores (1 a 20): ")
  leia(n)
  escreva("Passos por eliminação: ")
  leia(passoContagem)
  se (n < 1) ou (n > 20) ou (passoContagem < 1) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate n faca
      jogador[i] <- i
    fimpara
    restantes <- n
    indice <- 1
    enquanto restantes > 1 faca
      indice <- (indice + passoContagem - 2) mod restantes + 1
      escreval("Eliminado: jogador ", jogador[indice])
      para i de indice ate restantes - 1 faca
        jogador[i] <- jogador[i + 1]
      fimpara
      restantes <- restantes - 1
      se indice > restantes entao
        indice <- 1
      fimse
    fimenquanto
    escreval("Vencedor: jogador ", jogador[1])
  fimse
fimalgoritmo
```

O índice modular localiza a próxima eliminação no vetor compacto dos sobreviventes.
