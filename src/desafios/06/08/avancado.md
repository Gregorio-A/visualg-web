# Bazar junino

**Data:** 8 de junho · **Nível:** Avançado

## Objetivo

Gere ranking de vendas por categoria e total de descontos concedidos.

## Como funciona

Registre seis vendas em três categorias. Conte unidades por categoria, ordene o ranking e some o valor em reais dos descontos.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
2 itens de R$ 10 com 10% de desconto → R$ 2 de descontos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empate entre categorias preserva a menor categoria.

## Dicas para resolução

1. Conte quantidades por categoria.
2. Calcule desconto vezes quantidade.
3. Ordene os índices pelo total de unidades.

## Solução

```visualg
algoritmo "Desafio0608A"
var
vendido, ordem: vetor[1..3] de inteiro
  categoria, quantidade, i, j, troca: inteiro
  preco, desconto, descontos: real
inicio
para i de 1 ate 3 faca
    vendido[i] <- 0
    ordem[i] <- i
  fimpara
  descontos <- 0
  para i de 1 ate 6 faca
    escreva("Categoria da venda (1 a 3): ")
    leia(categoria)
    escreva("Quantidade: ")
    leia(quantidade)
    escreva("Preço unitário: ")
    leia(preco)
    escreva("Desconto percentual: ")
    leia(desconto)
    se (categoria >= 1) e (categoria <= 3) e (quantidade > 0) e (preco >= 0) e (desconto >= 0) e (desconto <= 100) entao
      vendido[categoria] <- vendido[categoria] + quantidade
      descontos <- descontos + quantidade * preco * desconto / 100
    senao
      escreval("Venda inválida ignorada")
    fimse
  fimpara
  para i de 1 ate 2 faca
    para j de i + 1 ate 3 faca
      se vendido[ordem[j]] > vendido[ordem[i]] entao
        troca <- ordem[i]
        ordem[i] <- ordem[j]
        ordem[j] <- troca
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval(i, "º categoria ", ordem[i], ": ", vendido[ordem[i]], " unidade(s)")
  fimpara
  escreval("Descontos concedidos: R$ ", descontos)
fimalgoritmo
```

Vetores acumulam unidades por categoria; outro vetor ordena os índices sem perder os totais.
