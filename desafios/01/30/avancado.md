# Catálogo de cartões

**Data:** 30 de janeiro · **Nível:** Avançado

## Objetivo

Armazene destinatários e mensagens e implemente busca por nome e edição.

Cadastre cinco cartões-postais e permita buscar ou editar a mensagem de um destinatário.

## Como funciona

Leia pares de destinatário e mensagem. Depois ofereça operações 1 para buscar, 2 para editar e 0 para sair. A busca é exata e diferencia letras maiúsculas de minúsculas.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.

## Exemplo de execução

```text
Cadastro: Ana → Olá; Bia → Até logo; mais três pessoas
Operação 2, Ana, nova mensagem Saudades
Ana: Saudades
Operação 1, Ana
Ana: Saudades
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se houver nomes duplicados, a última posição cadastrada é a encontrada. Um nome ausente produz aviso.

## Dicas para resolução

1. Use dois vetores paralelos.
2. Procure o nome percorrendo os cinco registros.
3. Na edição, altere a mensagem na posição encontrada.

## Solução

```visualg
algoritmo "Desafio0130A"
var
destinatario, mensagem: vetor[1..5] de caractere
  busca, novaMensagem: caractere
  i, encontrado, opcao: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Destinatário ", i, ": ")
    leia(destinatario[i])
    escreva("Mensagem: ")
    leia(mensagem[i])
  fimpara
  escreva("Operação (1 buscar, 2 editar, 0 sair): ")
  leia(opcao)
  enquanto opcao <> 0 faca
    se (opcao = 1) ou (opcao = 2) entao
      escreva("Nome do destinatário: ")
      leia(busca)
      encontrado <- 0
      para i de 1 ate 5 faca
        se destinatario[i] = busca entao
          encontrado <- i
        fimse
      fimpara
      se encontrado > 0 entao
        se opcao = 2 entao
          escreva("Nova mensagem: ")
          leia(novaMensagem)
          mensagem[encontrado] <- novaMensagem
        fimse
        escreval(destinatario[encontrado], ": ", mensagem[encontrado])
      senao
        escreval("Destinatário não encontrado.")
      fimse
    senao
      escreval("Operação inválida.")
    fimse
    escreva("Operação (1 buscar, 2 editar, 0 sair): ")
    leia(opcao)
  fimenquanto
fimalgoritmo
```

Os dois vetores mantêm cada destinatário ligado à sua mensagem; editar substitui somente a posição localizada.
