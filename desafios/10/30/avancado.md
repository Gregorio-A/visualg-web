# Controle do baile

**Data:** 30 de outubro · **Nível:** Avançado

## Objetivo

Gerencie convites, entrada e saída com lotação máxima e histórico.

## Como funciona

Cadastre até vinte códigos únicos de convite. Entradas respeitam lotação e impedem uso simultâneo do mesmo convite. Saídas liberam a vaga.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Lotação 1; convite 10 entra; convite 11 tenta entrar → negado; 10 sai; 11 entra
```

**Como ler o exemplo:** a seta → significa "resulta em".

O cadastro pressupõe códigos distintos. Saída sem presença é recusada.

## Dicas para resolução

1. Procure o código do convite.
2. Confira estado e lotação.
3. Atualize presença e ocupação juntos.

## Solução

```visualg
algoritmo "Desafio1030A"
var
convite, dentro: vetor[1..20] de inteiro
  i, codigo, quantidade, lotacao, ocupacao, acao, posicao: inteiro
inicio
escreva("Lotação máxima: ")
  leia(lotacao)
  escreva("Convites emitidos (máximo 20): ")
  leia(quantidade)
  se (lotacao < 0) ou (quantidade < 0) ou (quantidade > 20) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate quantidade faca
      escreva("Código do convite ", i, ": ")
      leia(convite[i])
      dentro[i] <- 0
    fimpara
    ocupacao <- 0
    escreva("Ação (1 entrada, 2 saída, 3 histórico atual, 0 encerra): ")
    leia(acao)
    enquanto acao <> 0 faca
      se (acao = 1) ou (acao = 2) entao
        escreva("Código: ")
        leia(codigo)
        posicao <- 0
        para i de 1 ate quantidade faca
          se convite[i] = codigo entao
            posicao <- i
          fimse
        fimpara
        se posicao = 0 entao
          escreval("Convite inexistente")
        senao
          se acao = 1 entao
            se (dentro[posicao] = 0) e (ocupacao < lotacao) entao
              dentro[posicao] <- 1
              ocupacao <- ocupacao + 1
              escreval("Entrada autorizada: ", codigo)
            senao
              escreval("Entrada negada")
            fimse
          senao
            se dentro[posicao] = 1 entao
              dentro[posicao] <- 0
              ocupacao <- ocupacao - 1
              escreval("Saída registrada: ", codigo)
            senao
              escreval("Saída negada")
            fimse
          fimse
        fimse
      senao
        se acao = 3 entao
          escreval("Ocupação: ", ocupacao, "/", lotacao)
          para i de 1 ate quantidade faca
            escreval("Convite ", convite[i], ": estado ", dentro[i])
          fimpara
        fimse
      fimse
      escreva("Ação (1 entrada, 2 saída, 3 histórico atual, 0 encerra): ")
      leia(acao)
    fimenquanto
  fimse
fimalgoritmo
```

O vetor de estados registra quem está dentro; o contador atualiza ocupação em cada evento autorizado.
