# Rede de ciclovias

**Data:** 10 de setembro · **Nível:** Avançado

## Objetivo

Compare trechos conectados e encontre rota de menor distância entre pontos.

## Como funciona

Uma matriz 5×5 registra distâncias positivas entre pontos; zero significa ausência de ligação. Informe origem e destino e calcule a menor distância.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Ir do ponto 1 ao 2 custa 3; do 2 ao 3 custa 4; ir direto do 1 ao 3 custa 10. O menor custo do ponto 1 ao 3 é 7, passando pelo ponto 2.
```

Sem caminho alcançável, informe sem rota. Distâncias negativas não são arestas válidas.

## Dicas para resolução

1. Guarde distâncias mínimas provisórias.
2. Selecione o menor ponto aberto.
3. Atualize vizinhos com caminhos melhores.

## Solução

```visualg
algoritmo "Desafio0910A"
var
distancia: vetor[1..5, 1..5] de real
  melhor: vetor[1..5] de real
  visitado: vetor[1..5] de inteiro
  i, j, atual, destino, etapa: inteiro
  menor: real
inicio
para i de 1 ate 5 faca
    para j de 1 ate 5 faca
      escreva("Distância direta de ", i, " para ", j, " (0 sem ligação): ")
      leia(distancia[i, j])
    fimpara
    melhor[i] <- 999999
    visitado[i] <- 0
  fimpara
  escreva("Origem (1 a 5): ")
  leia(atual)
  escreva("Destino (1 a 5): ")
  leia(destino)
  se (atual < 1) ou (atual > 5) ou (destino < 1) ou (destino > 5) entao
    escreval("Ponto inválido")
  senao
    melhor[atual] <- 0
    para etapa de 1 ate 5 faca
      atual <- 0
      menor <- 999999
      para i de 1 ate 5 faca
        se (visitado[i] = 0) e (melhor[i] < menor) entao
          menor <- melhor[i]
          atual <- i
        fimse
      fimpara
      se atual > 0 entao
        visitado[atual] <- 1
        para j de 1 ate 5 faca
          se (distancia[atual, j] > 0) e (melhor[atual] + distancia[atual, j] < melhor[j]) entao
            melhor[j] <- melhor[atual] + distancia[atual, j]
          fimse
        fimpara
      fimse
    fimpara
    se melhor[destino] = 999999 entao
      escreval("Sem rota")
    senao
      escreval("Menor distância: ", melhor[destino])
    fimse
  fimse
fimalgoritmo
```

O algoritmo de Dijkstra seleciona repetidamente o ponto não visitado de menor custo e relaxa seus vizinhos.
