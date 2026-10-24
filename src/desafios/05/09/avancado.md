# Distribuição de setores

**Data:** 9 de maio · **Nível:** Avançado

## Objetivo

Use matriz para representar corredores e localizar posições ocupadas.

## Como funciona

Use matriz de três corredores e quatro posições. Valor 1 significa ocupado e 0, livre. Liste todas as posições ocupadas e mostre o total.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Índice:** É o número da posição de um item em uma lista.
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Somente a célula 2,3 contém 1
Ocupada: corredor 2, posição 3
Total: 1
```

Uma matriz inteiramente livre produz total zero.

## Dicas para resolução

1. Use dois laços aninhados.
2. Confira o valor de cada célula.
3. Conte somente posições ocupadas.

## Solução

```visualg
algoritmo "Desafio0509A"
var
setor: vetor[1..3, 1..4] de inteiro
  linha, coluna, ocupadas: inteiro
inicio
ocupadas <- 0
  para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      escreva("Posição ", linha, ",", coluna, " (0 livre, 1 ocupada): ")
      leia(setor[linha, coluna])
      se setor[linha, coluna] = 1 entao
        escreval("Ocupada: corredor ", linha, ", posição ", coluna)
        ocupadas <- ocupadas + 1
      fimse
    fimpara
  fimpara
  escreval("Posições ocupadas: ", ocupadas)
fimalgoritmo
```

Os índices da matriz são usados diretamente na identificação da posição.
