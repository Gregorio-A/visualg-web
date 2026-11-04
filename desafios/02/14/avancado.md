# Sequência de bandeiras

**Data:** 14 de fevereiro · **Nível:** Avançado

## Objetivo

Valide padrões de cores e encontre o menor ciclo que reproduz a sequência.

## Como funciona

Leia de uma a doze cores e encontre o menor padrão inicial que, repetido, reproduz toda a sequência. A última repetição pode ser parcial.

### Palavras úteis

- **Resto da divisão:** É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1.

## Exemplo de execução

```text
Sequência: azul, amarelo, azul, amarelo, azul
Menor ciclo: 2
```

Uma sequência sem repetição tem ciclo igual ao seu próprio tamanho.

## Dicas para resolução

1. Experimente comprimentos de ciclo a partir de um.
2. Use o resto da divisão para localizar a posição equivalente no prefixo.
3. Pare no primeiro comprimento que reproduz todas as cores.

## Solução

```visualg
algoritmo "Desafio0214A"
var
cores: vetor[1..12] de caractere
  tamanho, ciclo, i: inteiro
  valido: logico
inicio
escreva("Quantidade de cores (1 a 12): ")
  leia(tamanho)
  se (tamanho >= 1) e (tamanho <= 12) entao
    para i de 1 ate tamanho faca
      escreva("Cor ", i, ": ")
      leia(cores[i])
    fimpara
    ciclo <- 1
    valido <- falso
    enquanto (ciclo <= tamanho) e (nao valido) faca
      valido <- verdadeiro
      para i de ciclo + 1 ate tamanho faca
        se cores[i] <> cores[((i - 1) mod ciclo) + 1] entao
          valido <- falso
        fimse
      fimpara
      se nao valido entao
        ciclo <- ciclo + 1
      fimse
    fimenquanto
    escreval("Menor ciclo: ", ciclo)
  senao
    escreval("Quantidade inválida.")
  fimse
fimalgoritmo
```

Para cada tamanho candidato, compare cada posição com a posição correspondente dentro do prefixo repetido.
