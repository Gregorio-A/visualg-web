# Caixa com cédulas

**Data:** 5 de maio · **Nível:** Avançado

## Objetivo

Decomponha o troco nas notas disponíveis e avise quando não for possível pagar.

## Como funciona

Use cédulas/moedas de 20, 10, 5 e 1 em quantidades limitadas. Procure uma combinação exata dentro do estoque.

## Exemplo de execução

```text
Troco 26; disponíveis: 1 de 20, 0 de 10, 1 de 5, 1 de 1
Usar 20+5+1; troco completo
```

Troco negativo e quantidades negativas são recusados. Se nenhuma combinação exata existir, informe a impossibilidade.

## Dicas para resolução

1. Teste as quantidades disponíveis de cada cédula.
2. Calcule o valor ainda necessário.
3. Veja se as moedas de 1 completam a quantia.

## Solução

```visualg
algoritmo "Desafio0505A"
var
notas: vetor[1..4] de inteiro
  valores: vetor[1..4] de inteiro
  troco, restante, i, a, b, c, d: inteiro
  melhorA, melhorB, melhorC, melhorD, achou: inteiro
inicio
valores[1] <- 20
  valores[2] <- 10
  valores[3] <- 5
  valores[4] <- 1
  escreva("Troco inteiro a entregar: ")
  leia(troco)
  para i de 1 ate 4 faca
    escreva("Notas/moedas disponíveis de ", valores[i], ": ")
    leia(notas[i])
  fimpara
  achou <- 0
  se (troco < 0) ou (notas[1] < 0) ou (notas[2] < 0) ou (notas[3] < 0) ou (notas[4] < 0) entao
    escreval("Dados inválidos")
  senao
    para a de 0 ate notas[1] faca
      para b de 0 ate notas[2] faca
        para c de 0 ate notas[3] faca
          restante <- troco - 20 * a - 10 * b - 5 * c
          se (restante >= 0) e (restante <= notas[4]) entao
            achou <- 1
            melhorA <- a
            melhorB <- b
            melhorC <- c
            melhorD <- restante
          fimse
        fimpara
      fimpara
    fimpara
    se achou = 1 entao
      escreval("Troco completo: ", melhorA, " de 20, ", melhorB, " de 10, ", melhorC, " de 5, ", melhorD, " de 1")
    senao
      escreval("Não há combinação exata com o estoque disponível")
    fimse
  fimse
fimalgoritmo
```

O programa examina as quantidades disponíveis de 20, 10 e 5; o resto determina quantas moedas de 1 seriam necessárias.
