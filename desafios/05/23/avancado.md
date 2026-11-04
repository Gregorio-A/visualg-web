# Inventário de ferramentas

**Data:** 23 de maio · **Nível:** Avançado

## Objetivo

Controle empréstimos, devoluções e itens ainda em uso.

## Como funciona

Cadastre cinco ferramentas. Empréstimo só é aceito quando disponível; devolução só quando em uso. A consulta lista os itens emprestados.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Empreste a ferramenta 2 e consulte
Ferramenta 2 em uso; total 1
```

Empréstimo duplicado e devolução sem empréstimo são recusados.

## Dicas para resolução

1. Use 0 para disponível e 1 para em uso.
2. Valide número e estado antes de mudar.
3. Percorra o vetor para listar empréstimos.

## Solução

```visualg
algoritmo "Desafio0523A"
var
nome: vetor[1..5] de caractere
  emUso: vetor[1..5] de inteiro
  i, opcao, item, total: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Ferramenta ", i, ": ")
    leia(nome[i])
    emUso[i] <- 0
  fimpara
  escreva("Ação (1 emprestar, 2 devolver, 3 listar, 0 sair): ")
  leia(opcao)
  enquanto opcao <> 0 faca
    se (opcao = 1) ou (opcao = 2) entao
      escreva("Número da ferramenta (1 a 5): ")
      leia(item)
      se (item < 1) ou (item > 5) entao
        escreval("Número inválido")
      senao
        se (opcao = 1) e (emUso[item] = 0) entao
          emUso[item] <- 1
          escreval("Empréstimo registrado: ", nome[item])
        senao
          se (opcao = 2) e (emUso[item] = 1) entao
            emUso[item] <- 0
            escreval("Devolução registrada: ", nome[item])
          senao
            escreval("Operação incompatível com o estado atual")
          fimse
        fimse
      fimse
    senao
      se opcao = 3 entao
        total <- 0
        para i de 1 ate 5 faca
          se emUso[i] = 1 entao
            escreval(nome[i], " em uso")
            total <- total + 1
          fimse
        fimpara
        escreval("Total em uso: ", total)
      fimse
    fimse
    escreva("Ação (1 emprestar, 2 devolver, 3 listar, 0 sair): ")
    leia(opcao)
  fimenquanto
fimalgoritmo
```

Um vetor de estados guarda a situação de cada item entre operações.
