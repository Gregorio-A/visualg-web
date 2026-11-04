# Organizador de roupas

**Data:** 18 de dezembro · **Nível:** Avançado

## Objetivo

Monte combinações de peças sem repetir uma mesma peça entre conjuntos.

## Como funciona

Cadastre três peças de cada categoria. Para cada um dos três conjuntos, escolha índices ainda não usados de camisa, calça e sapato.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Camisas A/B/C, calças X/Y/Z, sapatos 1/2/3; escolhas (1,2,3), (2,1,1), (3,3,2) geram A-Y-3, B-X-1 e C-Z-2.
```

São três conjuntos porque há três peças de cada categoria.

## Dicas para resolução

1. Guarde nomes por categoria.
2. Marque cada peça escolhida como usada.
3. Repita a leitura caso o índice já tenha sido usado.

## Solução

```visualg
algoritmo "Desafio1218A"
var
  camisa, calca, sapato: vetor[1..3] de caractere
  usadaCamisa, usadaCalca, usadoSapato: vetor[1..3] de logico
  i, c, p, s: inteiro
  disponivel: logico
inicio
  para i de 1 ate 3 faca
    escreva("Camisa ", i, ": ")
    leia(camisa[i])
    escreva("Calça ", i, ": ")
    leia(calca[i])
    escreva("Sapato ", i, ": ")
    leia(sapato[i])
    usadaCamisa[i] <- falso
    usadaCalca[i] <- falso
    usadoSapato[i] <- falso
  fimpara
  para i de 1 ate 3 faca
    repita
      escreva("Conjunto ", i, " — camisa (1 a 3) ainda não usada: ")
      leia(c)
      disponivel <- falso
      se (c >= 1) e (c <= 3) entao
        disponivel <- nao usadaCamisa[c]
      fimse
    ate disponivel
    repita
      escreva("Calça (1 a 3) ainda não usada: ")
      leia(p)
      disponivel <- falso
      se (p >= 1) e (p <= 3) entao
        disponivel <- nao usadaCalca[p]
      fimse
    ate disponivel
    repita
      escreva("Sapato (1 a 3) ainda não usado: ")
      leia(s)
      disponivel <- falso
      se (s >= 1) e (s <= 3) entao
        disponivel <- nao usadoSapato[s]
      fimse
    ate disponivel
    usadaCamisa[c] <- verdadeiro
    usadaCalca[p] <- verdadeiro
    usadoSapato[s] <- verdadeiro
    escreval("Conjunto ", i, ": ", camisa[c], ", ", calca[p], ", ", sapato[s])
  fimpara
  escreval("Cada peça foi usada uma única vez nos 3 conjuntos")
fimalgoritmo
```

Três vetores lógicos marcam peças utilizadas e impedem que uma seleção posterior reutilize uma delas.
