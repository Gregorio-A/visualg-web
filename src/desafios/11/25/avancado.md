# Protocolo de comandos

**Data:** 25 de novembro · **Nível:** Avançado

## Objetivo

Interprete uma sequência de instruções com parâmetros e valide erros.

## Como funciona

Interprete oito instruções: somar, subtrair, multiplicar com parâmetro ou zerar sem parâmetro. Conte comandos desconhecidos.

## Exemplo de execução

```text
Saldo 0; somar 5; multiplicar 2 → saldo 10
```

**Como ler o exemplo:** a seta → significa "resulta em".

Comando inválido não altera o estado.

## Dicas para resolução

1. Leia comando.
2. Leia parâmetro só quando necessário.
3. Atualize saldo e conte erros.

## Solução

```visualg
algoritmo "Desafio1125A"
var
saldo, comando, parametro, i, erros: inteiro
inicio
saldo <- 0
  erros <- 0
  para i de 1 ate 8 faca
    escreva("Comando ", i, " (1 somar, 2 subtrair, 3 multiplicar, 4 zerar): ")
    leia(comando)
    parametro <- 0
    se (comando >= 1) e (comando <= 3) entao
      escreva("Parâmetro inteiro: ")
      leia(parametro)
    fimse
    escolha comando
      caso 1
        saldo <- saldo + parametro
      caso 2
        saldo <- saldo - parametro
      caso 3
        saldo <- saldo * parametro
      caso 4
        saldo <- 0
      outrocaso
        erros <- erros + 1
        escreval("Comando inválido")
    fimescolha
    escreval("Estado: ", saldo)
  fimpara
  escreval("Erros de protocolo: ", erros)
fimalgoritmo
```

A estrutura de seleção aplica a operação correspondente à instrução recebida.
