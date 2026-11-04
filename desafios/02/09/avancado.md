# Fila de atendimento

**Data:** 9 de fevereiro · **Nível:** Avançado

## Objetivo

Gerencie fila de espera com entradas e chamadas até esvaziar.

## Como funciona

Use uma fila de até vinte entradas. Ação 1 acrescenta uma pessoa ao fim; ação 2 chama a mais antiga ainda aguardando. Ação 0 encerra o atendimento.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Entradas Ana, Bia; chamada → Ana; chamada → Bia; nova chamada → fila vazia
```

**Como ler o exemplo:** a seta → significa "resulta em".

Chamar uma fila vazia não altera os índices. Depois de vinte entradas totais, esta implementação exige reiniciar para cadastrar novas pessoas.

## Dicas para resolução

1. Use um índice para a primeira pessoa ainda na fila.
2. Use outro para a última posição ocupada.
3. Ao chamar, avance apenas o índice da frente.

## Solução

```visualg
algoritmo "Desafio0209A"
var
fila: vetor[1..20] de caractere
  primeiro, ultimo, acao: inteiro
  nome: caractere
inicio
primeiro <- 1
  ultimo <- 0
  escreva("Ação (1 entrar, 2 chamar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      se ultimo < 20 entao
        escreva("Nome: ")
        leia(nome)
        ultimo <- ultimo + 1
        fila[ultimo] <- nome
      senao
        escreval("Fila cheia.")
      fimse
    senao
      se acao = 2 entao
        se primeiro <= ultimo entao
          escreval("Chamado: ", fila[primeiro])
          primeiro <- primeiro + 1
        senao
          escreval("Fila vazia.")
        fimse
      fimse
    fimse
    escreval("Aguardando: ", ultimo - primeiro + 1)
    escreva("Ação (1 entrar, 2 chamar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Os índices `primeiro` e `ultimo` mantêm ordem de chegada sem deslocar os nomes no vetor.
