# Programação de luzes

**Data:** 12 de fevereiro · **Nível:** Avançado

## Objetivo

Armazene padrões de três canais e simule a saída em passos de tempo.

## Como funciona

Cadastre um padrão binário para cada um de três canais de luz. Leia o número de passos do padrão e de repetições; mostre o estado simultâneo dos três canais em cada passo.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Padrões: canal 1 [1,0]; canal 2 [0,1]; canal 3 [1,1]
Passo 1: 1, 0, 1
Passo 2: 0, 1, 1
```

Com zero repetições, nenhuma saída de luz é mostrada.

## Dicas para resolução

1. Use uma matriz para canais e passos.
2. Leia o padrão uma vez.
3. Repita a impressão do padrão no laço externo.

## Solução

```visualg
algoritmo "Desafio0212A"
var
canal: vetor[1..3, 1..8] de inteiro
  tamanho, repeticoes, c, etapa, volta: inteiro
inicio
escreva("Passos por padrão (1 a 8): ")
  leia(tamanho)
  se (tamanho >= 1) e (tamanho <= 8) entao
    para c de 1 ate 3 faca
      para etapa de 1 ate tamanho faca
        escreva("Canal ", c, ", passo ", etapa, " (0/1): ")
        leia(canal[c, etapa])
      fimpara
    fimpara
    escreva("Repetições: ")
    leia(repeticoes)
    para volta de 1 ate repeticoes faca
      para etapa de 1 ate tamanho faca
        escreval("Passo ", etapa, ": ", canal[1, etapa], ", ", canal[2, etapa], ", ", canal[3, etapa])
      fimpara
    fimpara
  senao
    escreval("Tamanho inválido.")
  fimse
fimalgoritmo
```

Cada linha da matriz pertence a um canal e cada coluna a um instante do padrão.
