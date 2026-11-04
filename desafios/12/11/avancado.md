# Roteirizador de entregas

**Data:** 11 de dezembro · **Nível:** Avançado

## Objetivo

Compare ordens possíveis de visita a quatro locais usando distâncias informadas.

## Como funciona

Há quatro locais numerados 1–4; a visita começa no primeiro da ordem e termina de volta nele. Informe matriz de distâncias não negativas e compare as 24 permutações.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Permutação:** É uma ordem possível para os mesmos itens. Por exemplo, A-B-C e B-A-C são duas ordens diferentes.

## Exemplo de execução

```text
Com distâncias 1 entre todos os locais, qualquer ordem tem percurso 4; a primeira ordem encontrada é exibida.
```

A distância para ir do local 1 ao 2 pode ser diferente da distância para voltar do 2 ao 1.

## Dicas para resolução

1. Cadastre matriz de distâncias.
2. Enumere quatro locais sem repetição.
3. Guarde a menor soma e sua ordem.

## Solução

```visualg
algoritmo "Desafio1211A"
var
  d: vetor[1..4,1..4] de real
  ordem: vetor[1..4] de inteiro
  i, j, k, aux: inteiro
  custo, melhor: real
inicio
  para i de 1 ate 4 faca
    para j de 1 ate 4 faca
      repita
        escreva("Distância do ponto ", i, " ao ", j, ": ")
        leia(d[i,j])
      ate d[i,j] >= 0
    fimpara
  fimpara
  melhor <- 999999
  para i de 1 ate 4 faca
    ordem[i] <- i
  fimpara
  para i de 1 ate 4 faca
    para j de 1 ate 4 faca
      se j <> i entao
        para k de 1 ate 4 faca
          se (k <> i) e (k <> j) entao
            aux <- 10-i-j-k
            custo <- d[i,j]+d[j,k]+d[k,aux]+d[aux,i]
            se custo < melhor entao
              melhor <- custo
              ordem[1] <- i
              ordem[2] <- j
              ordem[3] <- k
              ordem[4] <- aux
            fimse
          fimse
        fimpara
      fimse
    fimpara
  fimpara
  escreval("Ordem: ", ordem[1], ", ", ordem[2], ", ", ordem[3], ", ", ordem[4])
  escreval("Distância total com retorno ao ponto 1: ", melhor:0:2)
fimalgoritmo
```

A soma dos quatro deslocamentos do ciclo permite comparar todas as ordens possíveis.
