# Controle de pedidos

**Data:** 17 de maio · **Nível:** Avançado

## Objetivo

Rastreie pedidos por código e classifique atrasos conforme datas numéricas.

## Como funciona

Cadastre cinco pedidos por código único, data prevista e data real no formato AAAAMMDD. Data real zero significa pendente. Consulte um código.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Pedido 42: previsão 20260510, entrega 20260512
Entregue com atraso
```

O formato numérico pressupõe datas válidas; validar calendário real não faz parte desta atividade.

## Dicas para resolução

1. Guarde os três atributos no mesmo índice.
2. Procure o código.
3. Compare entrega e previsão só para pedidos concluídos.

## Solução

```visualg
algoritmo "Desafio0517A"
var
codigo: vetor[1..5] de inteiro
  previsto, entregue: vetor[1..5] de inteiro
  i, busca, achado: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Código do pedido: ")
    leia(codigo[i])
    escreva("Data prevista (AAAAMMDD): ")
    leia(previsto[i])
    escreva("Data de entrega (AAAAMMDD; 0 pendente): ")
    leia(entregue[i])
  fimpara
  escreva("Código para consulta: ")
  leia(busca)
  achado <- 0
  para i de 1 ate 5 faca
    se codigo[i] = busca entao
      achado <- i
    fimse
  fimpara
  se achado = 0 entao
    escreval("Pedido não localizado")
  senao
    se entregue[achado] = 0 entao
      escreval("Pedido pendente")
    senao
      se entregue[achado] > previsto[achado] entao
        escreval("Entregue com atraso")
      senao
        escreval("Entregue no prazo")
      fimse
    fimse
  fimse
fimalgoritmo
```

No formato AAAAMMDD, uma comparação numérica preserva a ordem cronológica das datas válidas.
