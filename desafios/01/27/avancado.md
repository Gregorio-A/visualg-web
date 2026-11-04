# Júri de mergulho

**Data:** 27 de janeiro · **Nível:** Avançado

## Objetivo

Receba sete notas por atleta, descarte extremos e ordene pela média restante.

Classifique três atletas por uma média que descarta a maior e a menor de sete notas.

## Como funciona

Leia sete notas por atleta. Mesmo se houver notas extremas repetidas, retire apenas uma ocorrência da menor e uma da maior. Divida a soma restante por cinco e ordene as médias do maior para o menor.

## Exemplo de execução

```text
Ana: 1, 8, 8, 8, 8, 8, 10 → média 8
Bia: 2, 9, 9, 9, 9, 9, 10 → média 9
Caio: 1, 7, 7, 7, 7, 7, 10 → média 7
Ranking: Bia, Ana, Caio
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se todas as sete notas forem iguais, a média final será a mesma nota.

## Dicas para resolução

1. Some as notas enquanto procura mínimo e máximo.
2. Divida por cinco após retirar os dois extremos.
3. Ao ordenar, mova nome e média juntos.

## Solução

```visualg
algoritmo "Desafio0127A"
var
nomes: vetor[1..3] de caractere
  medias: vetor[1..3] de real
  nota, soma, menor, maior, tempMedia: real
  tempNome: caractere
  atleta, juiz, outro: inteiro
inicio
para atleta de 1 ate 3 faca
    escreva("Atleta ", atleta, ": ")
    leia(nomes[atleta])
    soma <- 0
    para juiz de 1 ate 7 faca
      escreva("Nota ", juiz, ": ")
      leia(nota)
      soma <- soma + nota
      se (juiz = 1) ou (nota < menor) entao
        menor <- nota
      fimse
      se (juiz = 1) ou (nota > maior) entao
        maior <- nota
      fimse
    fimpara
    medias[atleta] <- (soma - menor - maior) / 5
  fimpara
  para atleta de 1 ate 2 faca
    para outro de atleta + 1 ate 3 faca
      se medias[outro] > medias[atleta] entao
        tempMedia <- medias[atleta]
        medias[atleta] <- medias[outro]
        medias[outro] <- tempMedia
        tempNome <- nomes[atleta]
        nomes[atleta] <- nomes[outro]
        nomes[outro] <- tempNome
      fimse
    fimpara
  fimpara
  para atleta de 1 ate 3 faca
    escreval(atleta, "º: ", nomes[atleta], " — média ", medias[atleta])
  fimpara
fimalgoritmo
```

Subtrair os dois extremos da soma equivale a descartar exatamente duas avaliações.
