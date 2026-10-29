# Campeonato de praia

**Data:** 20 de janeiro · **Nível:** Avançado

## Objetivo

Registre resultados entre quatro equipes e gere tabela por pontos e saldo.

Registre todos os confrontos únicos de quatro equipes e calcule uma tabela com pontos e saldo de gols.

## Como funciona

Cada par de equipes joga uma vez, em seis jogos ao todo. Vitória vale 3 pontos, empate vale 1 para cada uma. Saldo é gols marcados menos sofridos. Classifique por pontos e depois por saldo; igualdade nos dois critérios mantém empate.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Quatro equipes A, B, C e D; todos os seis jogos terminam 0–0
Cada equipe: 3 pontos, saldo 0, posição 1
```

Gols negativos tornam aquele jogo inválido e o programa o ignora. Equipes empatadas nos dois critérios exibem a mesma posição.

## Dicas para resolução

1. Percorra apenas pares com `j > i`.
2. Atualize saldo de ambos os lados com sinais opostos.
3. Ordene logicamente usando pontos primeiro e saldo como desempate.

## Solução

```visualg
algoritmo "Desafio0120A"
var
nomes: vetor[1..4] de caractere
  pontos: vetor[1..4] de inteiro
  saldo: vetor[1..4] de inteiro
  i, j, golsI, golsJ, posicao: inteiro
inicio
para i de 1 ate 4 faca
    escreva("Equipe ", i, ": ")
    leia(nomes[i])
    pontos[i] <- 0
    saldo[i] <- 0
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      escreva("Gols de ", nomes[i], " contra ", nomes[j], ": ")
      leia(golsI)
      escreva("Gols de ", nomes[j], " contra ", nomes[i], ": ")
      leia(golsJ)
      se (golsI >= 0) e (golsJ >= 0) entao
        saldo[i] <- saldo[i] + golsI - golsJ
        saldo[j] <- saldo[j] + golsJ - golsI
        se golsI > golsJ entao
          pontos[i] <- pontos[i] + 3
        senao
          se golsJ > golsI entao
            pontos[j] <- pontos[j] + 3
          senao
            pontos[i] <- pontos[i] + 1
            pontos[j] <- pontos[j] + 1
          fimse
        fimse
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    posicao <- 1
    para j de 1 ate 4 faca
      se (pontos[j] > pontos[i]) ou ((pontos[j] = pontos[i]) e (saldo[j] > saldo[i])) entao
        posicao <- posicao + 1
      fimse
    fimpara
    escreval(nomes[i], ": posição ", posicao, ", pontos ", pontos[i], ", saldo ", saldo[i])
  fimpara
fimalgoritmo
```

Os laços `i` e `j` geram cada confronto uma vez. A posição é um mais o número de equipes com pontuação ou saldo superior.
