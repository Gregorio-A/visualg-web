# Navegação por comandos

**Data:** 23 de abril · **Nível:** Avançado

## Objetivo

Execute uma sequência de movimentos em grade e detecte saídas do mapa.

## Como funciona

Simule um personagem começando no centro de uma grade 5 × 5. Comandos N/S/L/O mudam uma célula; avise quando a tentativa sair do mapa e mantenha a última posição válida.

## Exemplo de execução

```text
Início 3,3; comandos N, N, N
Posições 2,3; 1,3; saída detectada no movimento 3
```

Uma saída detectada não desloca o personagem, permitindo continuar com comandos seguintes.

## Dicas para resolução

1. Guarde linha e coluna atuais.
2. Calcule uma posição candidata para cada comando.
3. Teste limites de 1 a 5 antes de atualizar.

## Solução

```visualg
algoritmo "Desafio0423A"
var
linha, coluna, novaLinha, novaColuna, movimentos, i: inteiro
  comando: caractere
inicio
linha <- 3
  coluna <- 3
  escreva("Quantidade de movimentos: ")
  leia(movimentos)
  para i de 1 ate movimentos faca
    escreva("Comando N/S/L/O: ")
    leia(comando)
    novaLinha <- linha
    novaColuna <- coluna
    se comando = "N" entao
      novaLinha <- linha - 1
    fimse
    se comando = "S" entao
      novaLinha <- linha + 1
    fimse
    se comando = "L" entao
      novaColuna <- coluna + 1
    fimse
    se comando = "O" entao
      novaColuna <- coluna - 1
    fimse
    se (novaLinha < 1) ou (novaLinha > 5) ou (novaColuna < 1) ou (novaColuna > 5) entao
      escreval("Saída detectada no movimento ", i)
    senao
      linha <- novaLinha
      coluna <- novaColuna
      escreval("Posição: ", linha, ",", coluna)
    fimse
  fimpara
fimalgoritmo
```

A nova posição só substitui a atual após o teste de limites.
