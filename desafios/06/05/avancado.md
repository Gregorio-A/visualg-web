# Correio de mensagens

**Data:** 5 de junho · **Nível:** Avançado

## Objetivo

Armazene bilhetes, permita buscar destinatários e contar mensagens por pessoa.

## Como funciona

Cadastre até dez bilhetes com remetente, destinatário e mensagem. Busque por destinatário, ignorando maiúsculas e minúsculas.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.

## Exemplo de execução

```text
Bilhetes para Ana e Beto; busca Ana → mostra o bilhete de Ana e conta 1
```

**Como ler o exemplo:** a seta → significa "resulta em".

Nenhuma correspondência produz contagem zero.

## Dicas para resolução

1. Guarde três campos por bilhete.
2. Normalize os nomes na comparação.
3. Conte todas as correspondências.

## Solução

```visualg
algoritmo "Desafio0605A"
var
remetente, destinatario, mensagem: vetor[1..10] de caractere
  i, n, encontrados: inteiro
  busca: caractere
inicio
escreva("Número de bilhetes (0 a 10): ")
  leia(n)
  se (n < 0) ou (n > 10) entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate n faca
      escreva("Remetente: ")
      leia(remetente[i])
      escreva("Destinatário: ")
      leia(destinatario[i])
      escreva("Mensagem curta: ")
      leia(mensagem[i])
    fimpara
    escreva("Destinatário a buscar: ")
    leia(busca)
    encontrados <- 0
    para i de 1 ate n faca
      se minusc(destinatario[i]) = minusc(busca) entao
        escreval(remetente[i], " para ", destinatario[i], ": ", mensagem[i])
        encontrados <- encontrados + 1
      fimse
    fimpara
    escreval("Mensagens para ", busca, ": ", encontrados)
  fimse
fimalgoritmo
```

Vetores paralelos preservam cada bilhete; a busca percorre todos os destinatários.
