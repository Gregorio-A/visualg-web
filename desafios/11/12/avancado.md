# Simulador de processos

**Data:** 12 de novembro · **Nível:** Avançado

## Objetivo

Aloque e libere memória de processos sem exceder limite físico.

## Como funciona

Até cinco processos podem reservar memória física. Nome duplicado, memória não positiva, catálogo cheio ou capacidade insuficiente recusam a alocação.

## Exemplo de execução

```text
Total 100; processo A usa 30 → 70 livres; ao encerrar A volta a 100
```

**Como ler o exemplo:** a seta → significa "resulta em".

Encerrar processo desconhecido não altera a memória usada.

## Dicas para resolução

1. Associe nome ao tamanho.
2. Valide antes de alocar.
3. Subtraia o mesmo tamanho ao encerrar.

## Solução

```visualg
algoritmo "Desafio1112A"
var
nome: vetor[1..5] de caractere
  memoria: vetor[1..5] de inteiro
  i, acao, usado, capacidade, pedido, posicao: inteiro
  busca: caractere
inicio
escreva("Memória física total: ")
  leia(capacidade)
  usado <- 0
  para i de 1 ate 5 faca
    nome[i] <- ""
    memoria[i] <- 0
  fimpara
  escreva("Ação (1 iniciar, 2 encerrar, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Processo: ")
      leia(busca)
      escreva("Memória solicitada: ")
      leia(pedido)
      posicao <- 0
      para i de 1 ate 5 faca
        se nome[i] = busca entao
          posicao <- -1
        fimse
      fimpara
      se posicao = 0 entao
        para i de 5 ate 1 passo -1 faca
          se nome[i] = "" entao
            posicao <- i
          fimse
        fimpara
      fimse
      se (posicao > 0) e (pedido > 0) e (usado + pedido <= capacidade) entao
        nome[posicao] <- busca
        memoria[posicao] <- pedido
        usado <- usado + pedido
        escreval("Processo iniciado")
      senao
        escreval("Alocação recusada")
      fimse
    senao
      se acao = 2 entao
        escreva("Processo a encerrar: ")
        leia(busca)
        posicao <- 0
        para i de 1 ate 5 faca
          se nome[i] = busca entao
            posicao <- i
          fimse
        fimpara
        se posicao > 0 entao
          usado <- usado - memoria[posicao]
          nome[posicao] <- ""
          memoria[posicao] <- 0
        fimse
      senao
        se acao = 3 entao
          escreval("Memória usada: ", usado, "; livre: ", capacidade - usado)
        fimse
      fimse
    fimse
    escreva("Ação (1 iniciar, 2 encerrar, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Cada processo guarda a quantidade exata para que sua liberação devolva o valor correto.
