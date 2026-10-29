# Armários numerados

**Data:** 20 de fevereiro · **Nível:** Avançado

## Objetivo

Gerencie empréstimos com código, ocupação e limite de tentativas de acesso.

## Como funciona

Gerencie cinco armários. Um código positivo ocupa um armário livre. Para liberar, informe o mesmo código; três tentativas malsucedidas bloqueiam novas ações naquele armário até reiniciar o programa.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Ocupar armário 2 com código 123 → ocupado
Liberar com 456 → recusado, tentativa 1
Liberar com 123 → liberado
```

**Como ler o exemplo:** a seta → significa "resulta em".

Não é permitido ocupar um armário já ocupado. O bloqueio é independente para cada armário.

## Dicas para resolução

1. Use zero para representar armário livre.
2. Compare o código antes de liberar.
3. Mantenha o contador de tentativas por armário.

## Solução

```visualg
algoritmo "Desafio0220A"
var
ocupante: vetor[1..5] de inteiro
  tentativas: vetor[1..5] de inteiro
  codigo, armario, acao, i: inteiro
inicio
para i de 1 ate 5 faca
    ocupante[i] <- 0
    tentativas[i] <- 0
  fimpara
  escreva("Ação (1 ocupar, 2 liberar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Armário (1 a 5): ")
    leia(armario)
    escreva("Código positivo: ")
    leia(codigo)
    se (armario >= 1) e (armario <= 5) e (codigo > 0) entao
      se tentativas[armario] >= 3 entao
        escreval("Armário bloqueado por tentativas.")
      senao
        se (acao = 1) e (ocupante[armario] = 0) entao
          ocupante[armario] <- codigo
          tentativas[armario] <- 0
          escreval("Armário ocupado.")
        senao
          se (acao = 2) e (ocupante[armario] = codigo) entao
            ocupante[armario] <- 0
            tentativas[armario] <- 0
            escreval("Armário liberado.")
          senao
            tentativas[armario] <- tentativas[armario] + 1
            escreval("Acesso recusado. Tentativas: ", tentativas[armario])
          fimse
        fimse
      fimse
    senao
      escreval("Dados inválidos.")
    fimse
    escreva("Ação (1 ocupar, 2 liberar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Vetores separados guardam o código ocupante e o número de tentativas malsucedidas de cada armário.
