# Escala do recreio

**Data:** 8 de março · **Nível:** Avançado

## Objetivo

Organize pausas de várias turmas sem exceder capacidade do pátio.

## Como funciona

Leia capacidade do pátio e quatro pedidos de recreio, com início, fim exclusivo e tamanho da turma. Aceite uma turma somente se nenhum minuto de seu intervalo ultrapassar a capacidade.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Capacidade 30; turma A 20 alunos, minutos 10–20; turma B 15, minutos 15–25
A aceita; B recusada porque haveria 35 alunos entre 15 e 19
```

Turmas adjacentes não se sobrepõem. Um pedido recusado não altera a ocupação.

## Dicas para resolução

1. Teste todos os minutos antes de registrar um pedido.
2. Use fim exclusivo para permitir horários adjacentes.
3. Só atualize a ocupação depois que todo o intervalo couber.

## Solução

```visualg
algoritmo "Desafio0308A"
var
inicioMin, fimMin, alunos: vetor[1..4] de inteiro
  ocupacao: vetor[1..60] de inteiro
  capacidade, i, minuto: inteiro
  cabe: logico
inicio
escreva("Capacidade do pátio: ")
  leia(capacidade)
  para minuto de 1 ate 60 faca
    ocupacao[minuto] <- 0
  fimpara
  para i de 1 ate 4 faca
    escreva("Início da turma ", i, " (minuto 1 a 60): ")
    leia(inicioMin[i])
    escreva("Fim exclusivo: ")
    leia(fimMin[i])
    escreva("Alunos da turma: ")
    leia(alunos[i])
    cabe <- (inicioMin[i] >= 1) e (fimMin[i] <= 61) e (fimMin[i] > inicioMin[i]) e (alunos[i] >= 0)
    se cabe entao
      para minuto de inicioMin[i] ate fimMin[i] - 1 faca
        se ocupacao[minuto] + alunos[i] > capacidade entao
          cabe <- falso
        fimse
      fimpara
    fimse
    se cabe entao
      para minuto de inicioMin[i] ate fimMin[i] - 1 faca
        ocupacao[minuto] <- ocupacao[minuto] + alunos[i]
      fimpara
      escreval("Turma ", i, " agendada.")
    senao
      escreval("Turma ", i, " não cabe no pátio.")
    fimse
  fimpara
fimalgoritmo
```

O vetor `ocupacao` guarda quantos alunos estarão no pátio em cada minuto da janela.
