# Fim do enigma

**Data:** 30 de abril · **Nível:** Simples

## Objetivo

Some os algarismos de um inteiro positivo.

## Como funciona

Leia um inteiro positivo e some todos os seus dígitos decimais.

## Exemplo de execução

```text
Número: 2034
Soma dos algarismos: 9
```

Zeros internos contribuem com zero. O valor de entrada deve ser maior que zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0430S"
var
numero, algarismo, soma: inteiro
inicio
escreva("Inteiro positivo: ")
  leia(numero)
  soma <- 0
  se numero > 0 entao
    enquanto numero > 0 faca
      algarismo <- numero mod 10
      soma <- soma + algarismo
      numero <- numero div 10
    fimenquanto
    escreval("Soma dos algarismos: ", soma)
  senao
    escreval("Informe inteiro positivo")
  fimse
fimalgoritmo
```

O resto por dez extrai o último dígito; a divisão inteira o remove antes da próxima iteração.
