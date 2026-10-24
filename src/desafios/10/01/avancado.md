# Corredor assombrado

**Data:** 1 de outubro · **Nível:** Avançado

## Objetivo

Simule deslocamentos em um corredor com armadilhas e inventário de chaves.

## Como funciona

Corredor de dez posições. Armadilhas em 3 e 9 consomem uma chave ou devolvem ao início; posição 6 contém uma chave única. Faça até oito movimentos de um ou dois passos.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Começa com uma chave; mover para posição 3 neutraliza a armadilha e deixa zero chaves
```

Movimento que ultrapassa a posição 10 é ignorado.

## Dicas para resolução

1. Guarde posição e chaves.
2. Consulte o conteúdo da célula alcançada.
3. Consuma ou encontre chave conforme o evento.

## Solução

```visualg
algoritmo "Desafio1001A"
var
armadilha: vetor[1..10] de inteiro
  posicao, chaves, movimento, rodada: inteiro
inicio
para posicao de 1 ate 10 faca
    armadilha[posicao] <- 0
  fimpara
  armadilha[3] <- 1
  armadilha[6] <- 2
  armadilha[9] <- 1
  posicao <- 1
  chaves <- 1
  para rodada de 1 ate 8 faca
    escreval("Posição ", posicao, ", chaves ", chaves)
    escreva("Passos à frente (1 ou 2; 0 encerra): ")
    leia(movimento)
    se movimento = 0 entao
      interrompa
    fimse
    se (movimento = 1) ou (movimento = 2) entao
      se posicao + movimento <= 10 entao
        posicao <- posicao + movimento
        se armadilha[posicao] = 1 entao
          se chaves > 0 entao
            chaves <- chaves - 1
            escreval("Armadilha neutralizada com uma chave")
          senao
            escreval("Armadilha! Volta ao início")
            posicao <- 1
          fimse
        fimse
        se armadilha[posicao] = 2 entao
          chaves <- chaves + 1
          armadilha[posicao] <- 0
          escreval("Chave encontrada")
        fimse
      fimse
    fimse
  fimpara
  escreval("Posição final: ", posicao, "; chaves: ", chaves)
fimalgoritmo
```

Um vetor codifica armadilhas e objeto; a posição e o inventário mudam conforme a célula alcançada.
