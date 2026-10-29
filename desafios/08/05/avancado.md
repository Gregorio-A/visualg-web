# Alocador fictício

**Data:** 5 de agosto · **Nível:** Avançado

## Objetivo

Simule reservas e liberações de blocos de memória com capacidade limitada.

## Como funciona

Simule até dez blocos identificados por nome. Reserva exige nome novo, tamanho positivo, vaga no catálogo e capacidade livre; liberação devolve o espaço.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Capacidade 100; reserva A=30 → livre 70; libera A → livre 100
```

**Como ler o exemplo:** a seta → significa "resulta em".

Identificador duplicado ou bloco inexistente é recusado.

## Dicas para resolução

1. Guarde nome e tamanho de cada bloco.
2. Valide a capacidade antes de reservar.
3. Subtraia o tamanho exato ao liberar.

## Solução

```visualg
algoritmo "Desafio0805A"
var
nome: vetor[1..10] de caractere
  tamanho: vetor[1..10] de inteiro
  i, acao, usado, capacidade, pedido, achado: inteiro
  busca: caractere
inicio
escreva("Capacidade total de memória: ")
  leia(capacidade)
  usado <- 0
  para i de 1 ate 10 faca
    nome[i] <- ""
    tamanho[i] <- 0
  fimpara
  escreva("Ação (1 reservar, 2 liberar, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Identificador do bloco: ")
      leia(busca)
      escreva("Tamanho: ")
      leia(pedido)
      achado <- 0
      para i de 1 ate 10 faca
        se nome[i] = busca entao
          achado <- -1
        fimse
      fimpara
      se achado = 0 entao
        para i de 10 ate 1 passo -1 faca
          se nome[i] = "" entao
            achado <- i
          fimse
        fimpara
      fimse
      se (achado > 0) e (pedido > 0) e (usado + pedido <= capacidade) entao
        nome[achado] <- busca
        tamanho[achado] <- pedido
        usado <- usado + pedido
        escreval("Bloco reservado")
      senao
        escreval("Reserva recusada")
      fimse
    senao
      se acao = 2 entao
        escreva("Identificador a liberar: ")
        leia(busca)
        achado <- 0
        para i de 1 ate 10 faca
          se nome[i] = busca entao
            achado <- i
          fimse
        fimpara
        se achado > 0 entao
          usado <- usado - tamanho[achado]
          nome[achado] <- ""
          tamanho[achado] <- 0
          escreval("Bloco liberado")
        senao
          escreval("Bloco não encontrado")
        fimse
      senao
        se acao = 3 entao
          escreval("Usado: ", usado, "; livre: ", capacidade - usado)
        fimse
      fimse
    fimse
    escreva("Ação (1 reservar, 2 liberar, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Vetores guardam o tamanho de cada bloco; a soma usada é atualizada nas reservas e liberações.
