# Misturador de poções

**Data:** 9 de outubro · **Nível:** Avançado

## Objetivo

Combine receitas com efeitos temporários e atualize atributos por turno.

## Como funciona

Receita 1 usa duas ervas e um cristal e melhora força; receita 2 usa uma erva e dois cristais e melhora defesa. Produza cada poção somente se houver ingredientes, descontando-os, e aplique os efeitos nos cinco turnos.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Três ervas e três cristais permitem as duas receitas; força e defesa recebem bônus enquanto cada duração estiver ativa.
```

Duração zero não ativa efeito; poção não produzida não modifica atributos.

## Dicas para resolução

1. Guarde custos em matriz.
2. Desconte apenas receitas completas.
3. Recalcule atributos a cada turno.

## Solução

```visualg
algoritmo "Desafio1009A"
var
estoque: vetor[1..2] de inteiro
  receita: vetor[1..2,1..2] de inteiro
  bonus, duracao: vetor[1..2] de inteiro
  ativa: vetor[1..2] de logico
  baseForca, baseDefesa, forcaAtual, defesaAtual, turno, i, j: inteiro
  possivel: logico
inicio
escreva("Ervas disponíveis: ")
  leia(estoque[1])
  escreva("Cristais disponíveis: ")
  leia(estoque[2])
  escreva("Força e defesa base: ")
  leia(baseForca, baseDefesa)
  receita[1,1] <- 2
  receita[1,2] <- 1
  receita[2,1] <- 1
  receita[2,2] <- 2
  para i de 1 ate 2 faca
    escreva("Bônus da poção ", i, ": ")
    leia(bonus[i])
    escreva("Duração (0 a 5 turnos): ")
    leia(duracao[i])
  fimpara
  se (estoque[1] < 0) ou (estoque[2] < 0) ou (baseForca < 0) ou (baseDefesa < 0) ou (bonus[1] < 0) ou (bonus[2] < 0) ou (duracao[1] < 0) ou (duracao[1] > 5) ou (duracao[2] < 0) ou (duracao[2] > 5) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate 2 faca
      possivel <- verdadeiro
      para j de 1 ate 2 faca
        se estoque[j] < receita[i,j] entao
          possivel <- falso
        fimse
      fimpara
      ativa[i] <- possivel
      se possivel entao
        para j de 1 ate 2 faca
          estoque[j] <- estoque[j]-receita[i,j]
        fimpara
        escreval("Poção ", i, " produzida")
      senao
        escreval("Ingredientes insuficientes para poção ", i)
      fimse
    fimpara
    para turno de 1 ate 5 faca
      forcaAtual <- baseForca
      defesaAtual <- baseDefesa
      se ativa[1] e (turno <= duracao[1]) entao
        forcaAtual <- forcaAtual+bonus[1]
      fimse
      se ativa[2] e (turno <= duracao[2]) entao
        defesaAtual <- defesaAtual+bonus[2]
      fimse
      escreval("Turno ", turno, ": força ", forcaAtual, ", defesa ", defesaAtual)
    fimpara
  fimse
fimalgoritmo
```

Cada receita verifica o estoque antes de descontar. Em cada turno, recalcule força e defesa a partir dos valores base e acrescente os bônus ativos.
