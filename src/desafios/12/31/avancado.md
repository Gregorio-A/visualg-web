# Planejador anual

**Data:** 31 de dezembro · **Nível:** Avançado

## Objetivo

Cadastre 12 metas, distribua prazos e gere painel textual de acompanhamento.

## Como funciona

Cadastre doze metas, cada uma com mês de prazo e estado de conclusão; o painel mostra todas e o total concluído.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Meta “ler livros”, prazo 3, concluída → aparece como “mês 3 — concluída”.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma meta com estado 0 permanece pendente mesmo após o mês de prazo; o painel não depende da data do computador.

## Dicas para resolução

1. Leia meta e prazo em vetores.
2. Guarde conclusão como 0 ou 1.
3. Percorra as doze metas para montar o painel.

## Solução

```visualg
algoritmo "Desafio1231A"
var
  nome: vetor[1..12] de caractere
  prazo, concluida: vetor[1..12] de inteiro
  i, prontas, atrasadas: inteiro
inicio
  prontas <- 0
  atrasadas <- 0
  para i de 1 ate 12 faca
    escreva("Meta ", i, ": ")
    leia(nome[i])
    repita
      escreva("Mês do prazo (1 a 12): ")
      leia(prazo[i])
    ate (prazo[i] >= 1) e (prazo[i] <= 12)
    repita
      escreva("Concluída? (1 sim, 0 não): ")
      leia(concluida[i])
    ate (concluida[i] = 0) ou (concluida[i] = 1)
    prontas <- prontas+concluida[i]
  fimpara
  para i de 1 ate 12 faca
    escreva("Meta ", i, ": ", nome[i], " — mês ", prazo[i])
    se concluida[i] = 1 entao
      escreval(" — concluída")
    senao
      escreval(" — pendente")
    fimse
  fimpara
  escreval("Concluídas: ", prontas, "/12")
fimalgoritmo
```

Vetores paralelos mantêm nome, prazo e estado da mesma meta em cada índice.
