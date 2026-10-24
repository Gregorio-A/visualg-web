# Sistema de empréstimos

**Data:** 9 de março · **Nível:** Avançado

## Objetivo

Gerencie cadastro, retirada e devolução de dez livros.

## Como funciona

Cadastre dez títulos. O estado de cada exemplar começa disponível; retirar muda para emprestado, devolver muda para disponível. Recuse operações incompatíveis.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Livro 1: Algoritmos
Retirar 1 → retirado
Retirar 1 novamente → operação incompatível
Devolver 1 → devolvido
```

**Como ler o exemplo:** a seta → significa "resulta em".

Número de livro fora de 1 a 10 é rejeitado antes de acessar o vetor.

## Dicas para resolução

1. Associe título e estado pelo mesmo índice.
2. Valide o número informado.
3. Altere o estado apenas quando a operação fizer sentido.

## Solução

```visualg
algoritmo "Desafio0309A"
var
titulo: vetor[1..10] de caractere
  emprestado: vetor[1..10] de logico
  i, livro, acao: inteiro
inicio
para i de 1 ate 10 faca
    escreva("Livro ", i, ": ")
    leia(titulo[i])
    emprestado[i] <- falso
  fimpara
  escreva("Ação (1 retirar, 2 devolver, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Número do livro (1 a 10): ")
    leia(livro)
    se (livro >= 1) e (livro <= 10) entao
      se (acao = 1) e (nao emprestado[livro]) entao
        emprestado[livro] <- verdadeiro
        escreval("Retirado: ", titulo[livro])
      senao
        se (acao = 2) e emprestado[livro] entao
          emprestado[livro] <- falso
          escreval("Devolvido: ", titulo[livro])
        senao
          escreval("Operação incompatível com o estado do livro.")
        fimse
      fimse
    senao
      escreval("Número inválido.")
    fimse
    escreva("Ação (1 retirar, 2 devolver, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Um vetor lógico representa diretamente a disponibilidade de cada exemplar.
