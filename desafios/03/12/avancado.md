# Glossário de sala

**Data:** 12 de março · **Nível:** Avançado

## Objetivo

Armazene termos e definições, com busca e atualização.

## Como funciona

Cadastre cinco pares termo/definição. Permita busca exata por termo e atualização da definição encontrada.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Termo vetor → coleção indexada
Atualização para “lista indexada”
Busca vetor → lista indexada
```

**Como ler o exemplo:** a seta → significa "resulta em".

Termo ausente não altera nenhuma definição.

## Dicas para resolução

1. Guarde termo e definição no mesmo índice.
2. Procure o termo antes de editar.
3. Uma atualização altera apenas a definição correspondente.

## Solução

```visualg
algoritmo "Desafio0312A"
var
termo, definicao: vetor[1..5] de caractere
  busca, nova: caractere
  i, encontrado, acao: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Termo ", i, ": ")
    leia(termo[i])
    escreva("Definição: ")
    leia(definicao[i])
  fimpara
  escreva("Ação (1 buscar, 2 atualizar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Termo procurado: ")
    leia(busca)
    encontrado <- 0
    para i de 1 ate 5 faca
      se termo[i] = busca entao
        encontrado <- i
      fimse
    fimpara
    se encontrado > 0 entao
      se acao = 2 entao
        escreva("Nova definição: ")
        leia(nova)
        definicao[encontrado] <- nova
      fimse
      escreval(termo[encontrado], ": ", definicao[encontrado])
    senao
      escreval("Termo não encontrado.")
    fimse
    escreva("Ação (1 buscar, 2 atualizar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Os dois vetores são paralelos: a posição localizada na busca indica qual definição pode ser lida ou substituída.
