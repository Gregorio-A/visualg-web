# Inventário do necromante

**Data:** 10 de outubro · **Nível:** Avançado

## Objetivo

Gerencie componentes para criar criaturas de receitas diferentes.

## Como funciona

Crie esqueletos com três ossos cada ou golems com dois ossos e uma pedra cada. Toda criação deve caber integralmente no inventário.

## Exemplo de execução

```text
Com 8 ossos e 2 pedras, dois golems usam 4 ossos e 2 pedras
```

Pedido acima do inventário é recusado sem gasto parcial.

## Dicas para resolução

1. Defina custo por criatura.
2. Multiplique pela quantidade.
3. Valide os dois saldos antes de subtrair.

## Solução

```visualg
algoritmo "Desafio1010A"
var
osso, pedra, criatura, quantidade: inteiro
inicio
escreva("Ossos disponíveis: ")
  leia(osso)
  escreva("Pedras mágicas disponíveis: ")
  leia(pedra)
  escreva("Criatura (1 esqueleto: 3 ossos; 2 golem: 2 ossos e 1 pedra; 0 sair): ")
  leia(criatura)
  enquanto criatura <> 0 faca
    escreva("Quantidade desejada: ")
    leia(quantidade)
    se quantidade <= 0 entao
      escreval("Quantidade inválida")
    senao
      se criatura = 1 entao
        se osso >= 3 * quantidade entao
          osso <- osso - 3 * quantidade
          escreval("Esqueletos criados: ", quantidade)
        senao
          escreval("Ossos insuficientes")
        fimse
      senao
        se criatura = 2 entao
          se (osso >= 2 * quantidade) e (pedra >= quantidade) entao
            osso <- osso - 2 * quantidade
            pedra <- pedra - quantidade
            escreval("Golems criados: ", quantidade)
          senao
            escreval("Componentes insuficientes")
          fimse
        fimse
      fimse
    fimse
    escreval("Saldo: ", osso, " ossos e ", pedra, " pedras")
    escreva("Criatura (1 esqueleto, 2 golem, 0 sair): ")
    leia(criatura)
  fimenquanto
fimalgoritmo
```

A receita escolhida define o consumo antes de qualquer desconto de componentes.
