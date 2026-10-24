# Gerente de embalagens

**Data:** 17 de dezembro · **Nível:** Avançado

## Objetivo

Escolha caixas de dimensões disponíveis para objetos com medidas informadas.

## Como funciona

Considere o objeto na orientação informada, sem girá-lo. Escolha entre quatro caixas válidas a de menor volume.

## Exemplo de execução

```text
Objeto 2×2×2; caixas 3×3×3 e 2×2×4 → escolha a segunda, volume 16.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se o objeto não couber em nenhuma caixa, informe isso.

## Dicas para resolução

1. Leia dimensões de caixas e objeto.
2. Compare dimensões correspondentes.
3. Entre as válidas, escolha menor volume.

## Solução

```visualg
algoritmo "Desafio1217A"
var
  largura, altura, profundidade: vetor[1..4] de real
  objL, objA, objP, aux: real
  i, escolhida: inteiro
  volume, menor: real
inicio
  para i de 1 ate 4 faca
    repita
      escreva("Caixa ", i, " (largura, altura, profundidade): ")
      leia(largura[i], altura[i], profundidade[i])
    ate (largura[i] > 0) e (altura[i] > 0) e (profundidade[i] > 0)
  fimpara
  repita
    escreva("Objeto (largura, altura, profundidade): ")
    leia(objL, objA, objP)
  ate (objL > 0) e (objA > 0) e (objP > 0)
  escolhida <- 0
  menor <- 999999999
  para i de 1 ate 4 faca
    se (objL <= largura[i]) e (objA <= altura[i]) e (objP <= profundidade[i]) entao
      volume <- largura[i]*altura[i]*profundidade[i]
      se volume < menor entao
        menor <- volume
        escolhida <- i
      fimse
    fimse
  fimpara
  se escolhida = 0 entao
    escreval("Nenhuma caixa comporta o objeto nessa orientação")
  senao
    escreval("Escolha a caixa ", escolhida, " com volume ", menor:0:2)
  fimse
fimalgoritmo
```

Teste as três dimensões separadamente e minimize o volume das caixas aprovadas.
