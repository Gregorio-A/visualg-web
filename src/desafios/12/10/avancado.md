# Analisador de ofertas

**Data:** 10 de dezembro · **Nível:** Avançado

## Objetivo

Compare preços antigos e atuais e ordene descontos reais em porcentagem.

## Como funciona

Compare cinco ofertas pelo desconto percentual real. Preço atual acima do antigo produz percentual negativo, não desconto.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
De R$ 100 para R$ 75 → 25%; de R$ 40 para R$ 20 → 50%, que aparece antes.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Preço antigo zero não permite porcentagem; solicite outro valor.

## Dicas para resolução

1. Use a fórmula (antigo-atual)/antigo.
2. Ordene do maior desconto ao menor.
3. Preserve a associação com o produto.

## Solução

```visualg
algoritmo "Desafio1210A"
var
  antigo, atual, desconto: vetor[1..5] de real
  nomes: vetor[1..5] de caractere
  i, j: inteiro
  aux: real
  auxNome: caractere
inicio
  para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nomes[i])
    repita
      escreva("Preço antigo e atual: ")
      leia(antigo[i], atual[i])
    ate (antigo[i] > 0) e (atual[i] >= 0)
    desconto[i] <- (antigo[i]-atual[i])*100/antigo[i]
  fimpara
  para i de 1 ate 4 faca
    para j de i+1 ate 5 faca
      se desconto[j] > desconto[i] entao
        aux <- desconto[i]
        desconto[i] <- desconto[j]
        desconto[j] <- aux
        auxNome <- nomes[i]
        nomes[i] <- nomes[j]
        nomes[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(nomes[i], ": ", desconto[i]:0:2, "%")
  fimpara
fimalgoritmo
```

Calcule a mudança percentual e troque nome e taxa juntos ao ordenar.
