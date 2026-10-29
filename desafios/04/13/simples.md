# Botões da máquina

**Data:** 13 de abril · **Nível:** Simples

## Objetivo

Receba 1, 2 ou 3 e exiba a função escolhida.

## Como funciona

Associe os números 1, 2 e 3 a funções fixas da máquina e rejeite qualquer outro número.

### Palavras úteis

- **Função:** É um bloco de comandos com nome que devolve um valor.

## Exemplo de execução

```text
Botão: 2
Função 2: abrir a porta
```

Entrada zero ou quatro não aciona nenhuma função.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0413S"
var
opcaoBotao: inteiro
inicio
escreva("Botão (1 a 3): ")
  leia(opcaoBotao)
  se opcaoBotao = 1 entao
    escreval("Função 1: acender a luz")
  senao
    se opcaoBotao = 2 entao
      escreval("Função 2: abrir a porta")
    senao
      se opcaoBotao = 3 entao
        escreval("Função 3: tocar o alarme")
      senao
        escreval("Botão inválido")
      fimse
    fimse
  fimse
fimalgoritmo
```

As condições escolhem somente a mensagem correspondente ao botão informado.
