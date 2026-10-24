# Lista de convidados

**Data:** 10 de fevereiro · **Nível:** Avançado

## Objetivo

Cadastre nomes, impeça duplicatas e busque convidados por prefixo.

## Como funciona

Cadastre até vinte nomes distintos. Na busca, leia um prefixo e mostre todos os nomes cadastrados que começam exatamente por ele.

## Exemplo de execução

```text
Cadastre Ana e Anabela; tentar Ana outra vez → duplicata
Busca por An → Ana, Anabela
```

**Como ler o exemplo:** a seta → significa "resulta em".

A comparação é sensível a maiúsculas e minúsculas. Um prefixo sem correspondências não mostra nomes.

## Dicas para resolução

1. Compare um novo nome com todos os já cadastrados.
2. Não incremente o total em caso de duplicata.
3. Na busca, compare o início de cada nome com o prefixo.

## Solução

```visualg
algoritmo "Desafio0210A"
var
convidados: vetor[1..20] de caractere
  quantidade, i, j, acao: inteiro
  nome, prefixo: caractere
  duplicado: logico
inicio
quantidade <- 0
  escreva("Ação (1 cadastrar, 2 buscar prefixo, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Nome: ")
      leia(nome)
      duplicado <- falso
      para i de 1 ate quantidade faca
        se convidados[i] = nome entao
          duplicado <- verdadeiro
        fimse
      fimpara
      se duplicado entao
        escreval("Nome já cadastrado.")
      senao
        se quantidade < 20 entao
          quantidade <- quantidade + 1
          convidados[quantidade] <- nome
        senao
          escreval("Lista cheia.")
        fimse
      fimse
    senao
      se acao = 2 entao
        escreva("Prefixo: ")
        leia(prefixo)
        para i de 1 ate quantidade faca
          se copia(convidados[i], 1, compr(prefixo)) = prefixo entao
            escreval(convidados[i])
          fimse
        fimpara
      fimse
    fimse
    escreva("Ação (1 cadastrar, 2 buscar prefixo, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

`copia` extrai do começo de cada nome tantos caracteres quantos existirem no prefixo.
