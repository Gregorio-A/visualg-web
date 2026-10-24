# Castelo de escolhas

**Data:** 17 de outubro · **Nível:** Avançado

## Objetivo

Modele salas conectadas e permita navegar sem atravessar portas trancadas.

## Como funciona

Salão liga à biblioteca, biblioteca à torre, torre à saída. A chave está na biblioteca e é necessária para abrir a saída.

## Exemplo de execução

```text
Salão → biblioteca → explorar → torre → saída → vitória
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tentar sair da sala errada ou sem chave não move o jogador.

## Dicas para resolução

1. Defina conexões das salas.
2. Guarde a chave.
3. Valide porta e condição de vitória.

## Solução

```visualg
algoritmo "Desafio1017A"
var
sala, acao, chave, venceu: inteiro
inicio
sala <- 1
  chave <- 0
  venceu <- 0
  enquanto venceu = 0 faca
    escreval("Sala ", sala, " (1 salão, 2 biblioteca, 3 torre, 4 saída)")
    escreva("Ação (1 salão, 2 biblioteca, 3 torre, 4 saída, 5 explorar, 0 encerrar): ")
    leia(acao)
    escolha acao
      caso 0
        venceu <- 2
      caso 1
        sala <- 1
      caso 2
        se (sala = 1) ou (sala = 2) entao
          sala <- 2
        senao
          escreval("Porta não conecta estas salas")
        fimse
      caso 3
        se (sala = 2) ou (sala = 3) entao
          sala <- 3
        senao
          escreval("Passe pela biblioteca")
        fimse
      caso 4
        se (sala = 3) e (chave = 1) entao
          sala <- 4
          venceu <- 1
          escreval("Você escapou!")
        senao
          escreval("Saída trancada ou distante")
        fimse
      caso 5
        se sala = 2 entao
          chave <- 1
          escreval("Chave encontrada")
        senao
          escreval("Nada encontrado")
        fimse
    fimescolha
  fimenquanto
fimalgoritmo
```

Uma variável guarda a sala atual e outra registra a chave encontrada.
