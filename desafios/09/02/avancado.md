# Central de reciclagem

**Data:** 2 de setembro · **Nível:** Avançado

## Objetivo

Registre material e peso de descartes e produza relatório por categoria.

## Como funciona

Registre dez descartes, cada um classificado como papel, vidro ou plástico, com peso. Mostre quantidade e massa total por categoria.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Papel de 2 kg e papel de 3 kg → dois descartes, 5 kg
```

**Como ler o exemplo:** a seta → significa "resulta em".

Peso negativo ou categoria desconhecida é ignorado.

## Dicas para resolução

1. Mapeie material para índice.
2. Some peso na categoria.
3. Conte descartes válidos.

## Solução

```visualg
algoritmo "Desafio0902A"
var
peso: vetor[1..3] de real
  quantidade: vetor[1..3] de inteiro
  i, material: inteiro
  massa: real
inicio
para i de 1 ate 3 faca
    peso[i] <- 0
    quantidade[i] <- 0
  fimpara
  para i de 1 ate 10 faca
    escreva("Material ", i, " (1 papel, 2 vidro, 3 plástico): ")
    leia(material)
    escreva("Peso em kg: ")
    leia(massa)
    se (material >= 1) e (material <= 3) e (massa >= 0) entao
      peso[material] <- peso[material] + massa
      quantidade[material] <- quantidade[material] + 1
    senao
      escreval("Descarte inválido")
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Categoria ", i, ": ", quantidade[i], " descarte(s), ", peso[i], " kg")
  fimpara
fimalgoritmo
```

Vetores por categoria acumulam contagem e peso separadamente.
