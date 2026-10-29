# Controle remoto

**Data:** 25 de novembro · **Nível:** Simples

## Objetivo

Associe os números 1 a 4 a comandos escritos.

## Como funciona

Associe 1 abrir, 2 salvar, 3 executar e 4 fechar.

## Exemplo de execução

```text
3 → Executar
```

**Como ler o exemplo:** a seta → significa "resulta em".

Fora de 1–4 é desconhecido.

## Dicas para resolução

1. Leia número.
2. Use escolha.
3. Inclua outrocaso.

## Solução

```visualg
algoritmo "Desafio1125S"
var
comando: inteiro
inicio
escreva("Comando (1 a 4): ")
  leia(comando)
  escolha comando
    caso 1
      escreval("Abrir")
    caso 2
      escreval("Salvar")
    caso 3
      escreval("Executar")
    caso 4
      escreval("Fechar")
    outrocaso
      escreval("Comando desconhecido")
  fimescolha
fimalgoritmo
```

A seleção produz a descrição textual do código.
