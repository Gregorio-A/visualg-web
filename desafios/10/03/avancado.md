# Distribuição de doces

**Data:** 3 de outubro · **Nível:** Avançado

## Objetivo

Monte sacolas com quantidades definidas e controle sobras por tipo.

## Como funciona

Cada sacola usa quantidades positivas de três tipos de doce. Monte o máximo de sacolas completas e reporte sobras por tipo.

### Palavras úteis

- **Quociente:** É o resultado de uma divisão.

## Exemplo de execução

```text
Estoques 10,8,7; por sacola 2,2,1 → quatro sacolas completas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Necessidade zero é inválida para este modelo.

## Dicas para resolução

1. Calcule sacolas possíveis por tipo.
2. Escolha o menor valor.
3. Subtraia o consumo de cada tipo.

## Solução

```visualg
algoritmo "Desafio1003A"
var
estoque, porSacola: vetor[1..3] de inteiro
  tipo, sacolas, possiveis, menor: inteiro
inicio
para tipo de 1 ate 3 faca
    escreva("Estoque do doce ", tipo, ": ")
    leia(estoque[tipo])
    escreva("Unidades desse doce por sacola: ")
    leia(porSacola[tipo])
  fimpara
  menor <- 999999
  para tipo de 1 ate 3 faca
    se (estoque[tipo] < 0) ou (porSacola[tipo] <= 0) entao
      menor <- -1
    senao
      possiveis <- estoque[tipo] div porSacola[tipo]
      se possiveis < menor entao
        menor <- possiveis
      fimse
    fimse
  fimpara
  se menor < 0 entao
    escreval("Dados inválidos")
  senao
    sacolas <- menor
    escreval("Sacolas completas: ", sacolas)
    para tipo de 1 ate 3 faca
      escreval("Sobra do doce ", tipo, ": ", estoque[tipo] - sacolas * porSacola[tipo])
    fimpara
  fimse
fimalgoritmo
```

O menor quociente inteiro estoque/necessidade limita a produção.
