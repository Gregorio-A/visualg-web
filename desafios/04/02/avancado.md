# Senha do cofre

**Data:** 2 de abril · **Nível:** Avançado

## Objetivo

Conte tentativas e bloqueie acesso após três erros, armazenando histórico de tentativas.

## Como funciona

A senha fixa é 42. Leia no máximo três tentativas e pare após um acerto. Ao fim, mostre as tentativas registradas; três erros bloqueiam o acesso.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Laço:** É um trecho do algoritmo que se repete.
- **Variável lógica:** Guarda apenas verdadeiro ou falso, como uma resposta de sim ou não.

## Exemplo de execução

```text
Tentativas: 10, 20, 42
Código incorreto; código incorreto; acesso autorizado
```

Se acertar na primeira tentativa, as duas restantes não são solicitadas.

## Dicas para resolução

1. Use um laço com limite de três.
2. Interrompa leituras depois do acerto.
3. Guarde cada tentativa antes de compará-la.

## Solução

```visualg
algoritmo "Desafio0402A"
var
historico: vetor[1..3] de inteiro
  senha, tentativa, i, feitas: inteiro
  acertou: logico
inicio
senha <- 42
  acertou <- falso
  feitas <- 0
  para i de 1 ate 3 faca
    se nao acertou entao
      escreva("Tentativa ", i, ": ")
      leia(tentativa)
      historico[i] <- tentativa
      feitas <- feitas + 1
      se tentativa = senha entao
        acertou <- verdadeiro
        escreval("Acesso autorizado.")
      senao
        escreval("Código incorreto.")
      fimse
    fimse
  fimpara
  se nao acertou entao
    escreval("Acesso bloqueado após três erros.")
  fimse
  para i de 1 ate feitas faca
    escreval("Histórico ", i, ": ", historico[i])
  fimpara
fimalgoritmo
```

O vetor armazena o histórico real de tentativas e a variável lógica impede novas leituras depois do acerto.
