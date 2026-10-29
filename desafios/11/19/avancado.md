# Estrutura de pastas

**Data:** 19 de novembro · **Nível:** Avançado

## Objetivo

Represente relações pai-filho em vetores e gere árvore textual com indentação.

## Como funciona

Cadastre seis pastas com índice de pai. Zero marca raiz. Mostre árvore textual de até três níveis: raiz, filho e neto.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Pasta 1 raiz; pasta 2 tem pai 1 → pasta 2 aparece indentada sob pasta 1
```

**Como ler o exemplo:** a seta → significa "resulta em".

Relações cíclicas ou profundidade maior que três ficam fora do modelo definido.

## Dicas para resolução

1. Guarde pai por pasta.
2. Imprima raízes.
3. Procure filhos e netos com indentação.

## Solução

```visualg
algoritmo "Desafio1119A"
var
nome: vetor[1..6] de caractere
  pai: vetor[1..6] de inteiro
  i, j, k: inteiro
inicio
para i de 1 ate 6 faca
    escreva("Pasta ", i, ": ")
    leia(nome[i])
    escreva("Índice da pasta pai (0 raiz): ")
    leia(pai[i])
  fimpara
  para i de 1 ate 6 faca
    se pai[i] = 0 entao
      escreval(nome[i])
      para j de 1 ate 6 faca
        se pai[j] = i entao
          escreval("  └ ", nome[j])
          para k de 1 ate 6 faca
            se pai[k] = j entao
              escreval("    └ ", nome[k])
            fimse
          fimpara
        fimse
      fimpara
    fimse
  fimpara
fimalgoritmo
```

Laços aninhados encontram filhos e netos pelo índice do pai.
