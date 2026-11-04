# Mochila de RPG

**Data:** 17 de agosto · **Nível:** Avançado

## Objetivo

Controle pilhas, limites por item e peso máximo com menu.

## Como funciona

Mochila aceita três tipos de item. Cada um tem limite de pilha e peso unitário; guardar exige respeitar tanto a pilha quanto o peso máximo.

## Exemplo de execução

```text
Limite 5 itens, peso 2 cada, mochila de 10 → até 5 unidades desse item
```

**Como ler o exemplo:** a seta → significa "resulta em".

Retirada maior que o saldo é recusada. Pesos e limites informados devem ser não negativos.

## Dicas para resolução

1. Valide o limite da pilha.
2. Calcule o peso agregado.
3. Atualize peso na guarda e na retirada.

## Solução

```visualg
algoritmo "Desafio0817A"
var
quantidade, limite, pesoUnidade: vetor[1..3] de inteiro
  i, acao, item, unidades, pesoMaximo, pesoAtual, pesoNovo: inteiro
inicio
escreva("Peso máximo da mochila: ")
  leia(pesoMaximo)
  pesoAtual <- 0
  para i de 1 ate 3 faca
    quantidade[i] <- 0
    escreva("Limite de pilha do item ", i, ": ")
    leia(limite[i])
    escreva("Peso por unidade: ")
    leia(pesoUnidade[i])
  fimpara
  escreva("Ação (1 guardar, 2 retirar, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao = 1) ou (acao = 2) entao
      escreva("Item (1 a 3): ")
      leia(item)
      escreva("Unidades: ")
      leia(unidades)
      se (item < 1) ou (item > 3) ou (unidades <= 0) entao
        escreval("Operação inválida")
      senao
        pesoNovo <- unidades * pesoUnidade[item]
        se (acao = 1) e (quantidade[item] + unidades <= limite[item]) e (pesoAtual + pesoNovo <= pesoMaximo) entao
          quantidade[item] <- quantidade[item] + unidades
          pesoAtual <- pesoAtual + pesoNovo
          escreval("Item guardado")
        senao
          se (acao = 2) e (unidades <= quantidade[item]) entao
            quantidade[item] <- quantidade[item] - unidades
            pesoAtual <- pesoAtual - pesoNovo
            escreval("Item retirado")
          senao
            escreval("Operação recusada")
          fimse
        fimse
      fimse
    senao
      se acao = 3 entao
        escreval("Peso: ", pesoAtual, "/", pesoMaximo)
        para i de 1 ate 3 faca
          escreval("Item ", i, ": ", quantidade[i], "/", limite[i])
        fimpara
      fimse
    fimse
    escreva("Ação (1 guardar, 2 retirar, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

A mesma operação atualiza quantidade e peso, mantendo os dois limites coerentes.
