# Mapa de progressão

**Data:** 16 de agosto · **Nível:** Avançado

## Objetivo

Controle fases liberadas conforme requisitos e conquistas de etapas anteriores.

## Como funciona

Cinco fases formam uma sequência. Só a primeira inicia liberada; concluir uma fase libera a seguinte.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Concluir fase 1 libera fase 2; tentar fase 3 antes disso é recusado
```

Repetir uma fase já concluída mantém os estados.

## Dicas para resolução

1. Inicialize somente fase 1 liberada.
2. Recuse fase bloqueada.
3. Libere a próxima ao concluir.

## Solução

```visualg
algoritmo "Desafio0816A"
var
concluida, liberada: vetor[1..5] de inteiro
  fase, acao, i: inteiro
inicio
para i de 1 ate 5 faca
    concluida[i] <- 0
    liberada[i] <- 0
  fimpara
  liberada[1] <- 1
  escreva("Fase concluída (1 a 5; 0 encerra): ")
  leia(fase)
  enquanto fase <> 0 faca
    se (fase < 1) ou (fase > 5) entao
      escreval("Fase inválida")
    senao
      se liberada[fase] = 0 entao
        escreval("Fase bloqueada")
      senao
        concluida[fase] <- 1
        escreval("Fase ", fase, " concluída")
        se fase < 5 entao
          liberada[fase + 1] <- 1
        fimse
      fimse
    fimse
    para i de 1 ate 5 faca
      escreval("Fase ", i, ": liberada ", liberada[i], ", concluída ", concluida[i])
    fimpara
    escreva("Fase concluída (1 a 5; 0 encerra): ")
    leia(fase)
  fimenquanto
fimalgoritmo
```

Vetores distintos guardam liberação e conclusão de cada etapa.
