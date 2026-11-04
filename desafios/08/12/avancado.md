# Gerente de armazenamento

**Data:** 12 de agosto · **Nível:** Avançado

## Objetivo

Simule inclusão e exclusão de arquivos com tamanhos e categorias.

## Como funciona

Simule até dez arquivos nomeados. Inclusão exige nome único, categoria 1–3, tamanho positivo e espaço suficiente; exclusão libera o tamanho ocupado.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Disco 100 MB; inclui foto de 20 MB → 80 MB livres; exclui → 100 MB livres
```

**Como ler o exemplo:** a seta → significa "resulta em".

Nome duplicado é recusado. Capacidade menor que o arquivo impede inclusão.

## Dicas para resolução

1. Procure nome antes de incluir.
2. Valide espaço disponível.
3. Devolva o espaço na exclusão.

## Solução

```visualg
algoritmo "Desafio0812A"
var
nome: vetor[1..10] de caractere
  tamanho, categoria: vetor[1..10] de inteiro
  capacidade, usado, acao, i, livre, encontrado, novoTamanho: inteiro
  busca: caractere
inicio
escreva("Capacidade do disco em MB: ")
  leia(capacidade)
  usado <- 0
  para i de 1 ate 10 faca
    nome[i] <- ""
    tamanho[i] <- 0
  fimpara
  escreva("Ação (1 incluir, 2 excluir, 3 relatório, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Nome do arquivo: ")
      leia(busca)
      escreva("Tamanho em MB: ")
      leia(novoTamanho)
      escreva("Categoria (1 foto, 2 vídeo, 3 outro): ")
      leia(livre)
      encontrado <- 0
      para i de 1 ate 10 faca
        se nome[i] = busca entao
          encontrado <- -1
        fimse
      fimpara
      se encontrado = 0 entao
        para i de 10 ate 1 passo -1 faca
          se nome[i] = "" entao
            encontrado <- i
          fimse
        fimpara
      fimse
      se (encontrado > 0) e (novoTamanho > 0) e (livre >= 1) e (livre <= 3) e (usado + novoTamanho <= capacidade) entao
        nome[encontrado] <- busca
        tamanho[encontrado] <- novoTamanho
        categoria[encontrado] <- livre
        usado <- usado + novoTamanho
        escreval("Arquivo incluído")
      senao
        escreval("Inclusão recusada")
      fimse
    senao
      se acao = 2 entao
        escreva("Nome a excluir: ")
        leia(busca)
        encontrado <- 0
        para i de 1 ate 10 faca
          se nome[i] = busca entao
            encontrado <- i
          fimse
        fimpara
        se encontrado > 0 entao
          usado <- usado - tamanho[encontrado]
          nome[encontrado] <- ""
          tamanho[encontrado] <- 0
          escreval("Arquivo excluído")
        senao
          escreval("Arquivo não encontrado")
        fimse
      senao
        se acao = 3 entao
          escreval("Usado: ", usado, " MB; livre: ", capacidade - usado, " MB")
          para i de 1 ate 10 faca
            se nome[i] <> "" entao
              escreval(nome[i], ": ", tamanho[i], " MB, categoria ", categoria[i])
            fimse
          fimpara
        fimse
      fimse
    fimse
    escreva("Ação (1 incluir, 2 excluir, 3 relatório, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Vetores guardam nome, tamanho e categoria de cada arquivo; o uso é atualizado em cada operação.
