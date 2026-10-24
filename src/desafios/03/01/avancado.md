# Cadastro de turmas

**Data:** 1 de março · **Nível:** Avançado

## Objetivo

Armazene alunos e turmas em vetores paralelos e permita consultas.

## Como funciona

Cadastre cinco pares aluno/turma em vetores paralelos. Depois consulte nomes exatos até digitar FIM.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Cadastro: Ana/7A, Bia/7B, mais três alunos
Consulta Ana → Ana pertence à turma 7A
```

**Como ler o exemplo:** a seta → significa "resulta em".

Nome ausente produz aviso. A comparação distingue maiúsculas e minúsculas.

## Dicas para resolução

1. Guarde nome e turma na mesma posição.
2. Percorra o vetor para cada consulta.
3. Avise quando nenhum nome corresponder.

## Solução

```visualg
algoritmo "Desafio0301A"
var
alunos, turmas: vetor[1..5] de caractere
  consulta: caractere
  i: inteiro
  encontrou: logico
inicio
para i de 1 ate 5 faca
    escreva("Aluno ", i, ": ")
    leia(alunos[i])
    escreva("Turma: ")
    leia(turmas[i])
  fimpara
  escreva("Nome a consultar (FIM encerra): ")
  leia(consulta)
  enquanto consulta <> "FIM" faca
    encontrou <- falso
    para i de 1 ate 5 faca
      se alunos[i] = consulta entao
        escreval(alunos[i], " pertence à turma ", turmas[i])
        encontrou <- verdadeiro
      fimse
    fimpara
    se nao encontrou entao
      escreval("Aluno não encontrado.")
    fimse
    escreva("Nome a consultar (FIM encerra): ")
    leia(consulta)
  fimenquanto
fimalgoritmo
```

O mesmo índice dos dois vetores relaciona cada aluno à sua turma.
