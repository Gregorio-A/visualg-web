# Nome de arquivo

**Data:** 14 de novembro · **Nível:** Simples

## Objetivo

Acrescente extensão `.txt` a um nome digitado sem extensão.

## Como funciona

A entrada deve ser apenas o nome, sem extensão.

## Exemplo de execução

```text
anotacoes → anotacoes.txt
```

**Como ler o exemplo:** a seta → significa "resulta em".

Nome vazio deve ser evitado pelo usuário.

## Dicas para resolução

1. Leia texto.
2. Acrescente literal .txt.
3. Mostre o resultado.

## Solução

```visualg
algoritmo "Desafio1114S"
var
nome: caractere
inicio
escreva("Nome do arquivo sem extensão: ")
  leia(nome)
  escreval("Arquivo: ", nome, ".txt")
fimalgoritmo
```

Concatenar o sufixo forma o nome completo.
