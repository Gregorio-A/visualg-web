# Inventário das salas

**Data:** 25 de março · **Nível:** Avançado

## Objetivo

Controle carteiras livres, ocupadas e interditadas numa matriz.

## Como funciona

Modele uma sala de três linhas por quatro colunas. Use 0 para carteira livre, 1 ocupada e 2 interditada; conte cada estado.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Doze posições: 5 livres, 6 ocupadas e 1 interditada
Relatório: 5, 6 e 1
```

Códigos diferentes de 0, 1 e 2 não entram em nenhuma contagem.

## Dicas para resolução

1. Use dois laços para percorrer todas as posições.
2. Trate os três códigos separadamente.
3. Confira se os três totais somam doze quando todas as entradas são válidas.

## Solução

```visualg
algoritmo "Desafio0325A"
var
carteira: vetor[1..3, 1..4] de inteiro
  i, j, livres, ocupadas, interditadas: inteiro
inicio
livres <- 0
  ocupadas <- 0
  interditadas <- 0
  para i de 1 ate 3 faca
    para j de 1 ate 4 faca
      escreva("Carteira ", i, ",", j, " (0 livre, 1 ocupada, 2 interditada): ")
      leia(carteira[i, j])
      se carteira[i, j] = 0 entao
        livres <- livres + 1
      senao
        se carteira[i, j] = 1 entao
          ocupadas <- ocupadas + 1
        senao
          se carteira[i, j] = 2 entao
            interditadas <- interditadas + 1
          fimse
        fimse
      fimse
    fimpara
  fimpara
  escreval("Livres: ", livres)
  escreval("Ocupadas: ", ocupadas)
  escreval("Interditadas: ", interditadas)
fimalgoritmo
```

A matriz preserva a posição das carteiras enquanto os contadores resumem os estados.
