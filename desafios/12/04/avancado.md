# Corte de papel

**Data:** 4 de dezembro · **Nível:** Avançado

## Objetivo

Distribua retângulos de embrulho em folhas de tamanho fixo e estime desperdício.

## Como funciona

Corte retângulos sem rotação, em grade regular, de folhas idênticas. Desperdício inclui espaços entre cortes e sobra da última folha.

## Exemplo de execução

```text
Retângulos 10×10 cm, 5 unidades, folha 20×20 cm → 2 folhas; desperdício 300 cm².
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se uma dimensão do embrulho exceder a folha, a orientação escolhida não comporta nenhum.

## Dicas para resolução

1. Conte colunas e linhas por folha.
2. Arredonde a quantidade de folhas para cima.
3. Subtraia a área dos embrulhos da área comprada.

## Solução

```visualg
algoritmo "Desafio1204A"
var
  largura, altura, quantidade, usados, folhas: inteiro
  folhaL, folhaA, porLinha, porColuna, porFolha, desperdicio: inteiro
inicio
  escreva("Largura e altura de cada retângulo (cm): ")
  leia(largura, altura)
  escreva("Quantidade de embrulhos: ")
  leia(quantidade)
  escreva("Largura e altura da folha (cm): ")
  leia(folhaL, folhaA)
  se (largura <= 0) ou (altura <= 0) ou (quantidade < 0) ou (folhaL <= 0) ou (folhaA <= 0) entao
    escreval("Medidas inválidas")
  senao
    porLinha <- folhaL div largura
    porColuna <- folhaA div altura
    porFolha <- porLinha * porColuna
    se porFolha = 0 entao
      escreval("O retângulo não cabe na folha nessa orientação")
    senao
      folhas <- (quantidade + porFolha - 1) div porFolha
      usados <- quantidade * largura * altura
      desperdicio <- folhas * folhaL * folhaA - usados
      escreval("Retângulos por folha: ", porFolha)
      escreval("Folhas necessárias: ", folhas)
      escreval("Área não usada: ", desperdicio, " cm²")
    fimse
  fimse
fimalgoritmo
```

Divida cada dimensão da folha pela dimensão correspondente do retângulo e arredonde para baixo.
