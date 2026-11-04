# Planejador de bebidas

**Data:** 9 de dezembro · **Nível:** Avançado

## Objetivo

Combine tamanhos de recipientes e estime volume restante após servir convidados.

## Como funciona

Use copos de 500, 300 e 200 ml, nessa prioridade; sirva no máximo um copo por convidado, sem reabastecer.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
1600 ml e 4 convidados → 3 copos de 500 ml, 0 de 300 ml, 0 de 200 ml; sobram 100 ml.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se não houver volume para 200 ml, o restante não serve outro copo.

## Dicas para resolução

1. Guarde os três tamanhos em vetor.
2. Limite o número de copos por convidados restantes.
3. Subtraia cada volume usado.

## Solução

```visualg
algoritmo "Desafio1209A"
var
  tamanhos: vetor[1..3] de inteiro
  usados: vetor[1..3] de inteiro
  litros, convidados, i, restante, servido: inteiro
inicio
  tamanhos[1] <- 500
  tamanhos[2] <- 300
  tamanhos[3] <- 200
  escreva("Volume disponível em ml: ")
  leia(litros)
  escreva("Número de convidados: ")
  leia(convidados)
  se (litros < 0) ou (convidados < 0) entao
    escreval("Dados inválidos")
  senao
    restante <- litros
    servido <- 0
    para i de 1 ate 3 faca
      usados[i] <- restante div tamanhos[i]
      se servido + usados[i] > convidados entao
        usados[i] <- convidados-servido
      fimse
      restante <- restante-usados[i]*tamanhos[i]
      servido <- servido+usados[i]
      escreval("Copos de ", tamanhos[i], " ml: ", usados[i])
    fimpara
    escreval("Convidados servidos: ", servido)
    escreval("Volume restante: ", restante, " ml")
  fimse
fimalgoritmo
```

Uma estratégia gulosa usa os maiores copos primeiro e subtrai o volume servido.
