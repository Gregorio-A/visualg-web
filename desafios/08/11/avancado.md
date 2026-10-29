# Montador de PCs

**Data:** 11 de agosto · **Nível:** Avançado

## Objetivo

Selecione peças compatíveis por categoria e mantenha orçamento máximo.

## Como funciona

Escolha uma CPU, uma memória e um disco entre três opções de cada. CPU e memória são compatíveis quando suas gerações coincidem; maximize o uso do orçamento.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
CPU geração 2 e memória geração 2 podem formar um conjunto; gerações 1 e 2 não podem
```

Preço negativo invalida uma peça. Empate preserva a primeira montagem encontrada.

## Dicas para resolução

1. Combine uma peça de cada categoria.
2. Confira a geração.
3. Compare o preço total com o teto.

## Solução

```visualg
algoritmo "Desafio0811A"
var
precoCpu, precoMem, precoDisco: vetor[1..3] de real
  geracaoCpu, geracaoMem: vetor[1..3] de inteiro
  i, cpu, mem, disco: inteiro
  teto, total, melhor: real
  melhorCpu, melhorMem, melhorDisco: inteiro
inicio
escreva("Orçamento máximo: ")
  leia(teto)
  para i de 1 ate 3 faca
    escreva("CPU ", i, ": preço e geração (1 ou 2): ")
    leia(precoCpu[i], geracaoCpu[i])
    escreva("Memória ", i, ": preço e geração (1 ou 2): ")
    leia(precoMem[i], geracaoMem[i])
    escreva("Disco ", i, ": preço: ")
    leia(precoDisco[i])
  fimpara
  melhor <- -1
  para cpu de 1 ate 3 faca
    para mem de 1 ate 3 faca
      para disco de 1 ate 3 faca
        total <- precoCpu[cpu] + precoMem[mem] + precoDisco[disco]
        se (geracaoCpu[cpu] = geracaoMem[mem]) e (precoCpu[cpu] >= 0) e (precoMem[mem] >= 0) e (precoDisco[disco] >= 0) e (total <= teto) entao
          se total > melhor entao
            melhor <- total
            melhorCpu <- cpu
            melhorMem <- mem
            melhorDisco <- disco
          fimse
        fimse
      fimpara
    fimpara
  fimpara
  se melhor < 0 entao
    escreval("Nenhuma montagem compatível cabe no orçamento")
  senao
    escreval("CPU ", melhorCpu, ", memória ", melhorMem, ", disco ", melhorDisco, "; R$ ", melhor)
  fimse
fimalgoritmo
```

Três laços percorrem as 27 combinações; filtros de geração e teto selecionam as viáveis.
