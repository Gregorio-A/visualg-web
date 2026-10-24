# Senhas de atendimento

**Data:** 18 de maio · **Nível:** Avançado

## Objetivo

Implemente filas comum e prioritária com política de atendimento alternado.

## Como funciona

Cadastre até vinte senhas de cada classe. Em cada chamada, alterne prioritária e comum; se a classe da vez estiver vazia, atenda a outra.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Cadastre P1, P2, C3; chame três vezes
P1, C3, P2
```

Quando ambas as filas estão vazias, informe que não há senhas pendentes.

## Dicas para resolução

1. Use dois vetores como filas.
2. Mantenha índices de entrada e saída.
3. Troque a classe preferida após atendimento.

## Solução

```visualg
algoritmo "Desafio0518A"
var
comum, prioridade: vetor[1..20] de inteiro
  ic, fc, ip, fp, acao, numero, vez: inteiro
inicio
ic <- 1
  fc <- 0
  ip <- 1
  fp <- 0
  vez <- 1
  escreva("Ação (1 senha comum, 2 prioritária, 3 atender, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      se fc < 20 entao
        fc <- fc + 1
        escreva("Número: ")
        leia(numero)
        comum[fc] <- numero
      senao
        escreval("Fila comum cheia")
      fimse
    senao
      se acao = 2 entao
        se fp < 20 entao
          fp <- fp + 1
          escreva("Número: ")
          leia(numero)
          prioridade[fp] <- numero
        senao
          escreval("Fila prioritária cheia")
        fimse
      senao
        se acao = 3 entao
          se (vez = 1) e (ip <= fp) entao
            escreval("Prioritária ", prioridade[ip])
            ip <- ip + 1
            vez <- 2
          senao
            se ic <= fc entao
              escreval("Comum ", comum[ic])
              ic <- ic + 1
              vez <- 1
            senao
              se ip <= fp entao
                escreval("Prioritária ", prioridade[ip])
                ip <- ip + 1
                vez <- 2
              senao
                escreval("Nenhuma senha pendente")
              fimse
            fimse
          fimse
        fimse
      fimse
    fimse
    escreva("Ação (1 comum, 2 prioritária, 3 atender, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Dois índices de leitura e dois de escrita preservam a ordem FIFO de cada fila.
