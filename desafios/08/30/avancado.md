# Sistema de checkpoints

**Data:** 30 de agosto · **Nível:** Avançado

## Objetivo

Permita salvar e restaurar estado de posição, vida e recursos durante simulação.

## Como funciona

Simule posição, vida e recursos de um personagem. O checkpoint copia todos os três atributos; restaurar repõe exatamente o estado salvo.

## Exemplo de execução

```text
Salve com vida 10, receba 4 de dano, restaure → vida volta a 10
```

**Como ler o exemplo:** a seta → significa "resulta em".

Restaurar antes de salvar não altera o estado.

## Dicas para resolução

1. Guarde os três atributos ao salvar.
2. Reponha os três ao restaurar.
3. Indique se existe checkpoint.

## Solução

```visualg
algoritmo "Desafio0830A"
var
posicao, vida, recurso, salvoPosicao, salvoVida, salvoRecurso, temSalvo, acao, valor: inteiro
inicio
posicao <- 1
  vida <- 10
  recurso <- 3
  temSalvo <- 0
  escreva("Ação (1 mover, 2 dano, 3 usar recurso, 4 salvar, 5 restaurar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escolha acao
      caso 1
        escreva("Passos à frente: ")
        leia(valor)
        se valor > 0 entao
          posicao <- posicao + valor
        fimse
      caso 2
        escreva("Dano recebido: ")
        leia(valor)
        se valor > 0 entao
          vida <- vida - valor
          se vida < 0 entao
            vida <- 0
          fimse
        fimse
      caso 3
        se recurso > 0 entao
          recurso <- recurso - 1
        fimse
      caso 4
        salvoPosicao <- posicao
        salvoVida <- vida
        salvoRecurso <- recurso
        temSalvo <- 1
        escreval("Checkpoint salvo")
      caso 5
        se temSalvo = 1 entao
          posicao <- salvoPosicao
          vida <- salvoVida
          recurso <- salvoRecurso
          escreval("Checkpoint restaurado")
        senao
          escreval("Nenhum checkpoint")
        fimse
    fimescolha
    escreval("Posição ", posicao, "; vida ", vida, "; recursos ", recurso)
    escreva("Ação (1 mover, 2 dano, 3 usar recurso, 4 salvar, 5 restaurar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Variáveis separadas guardam o estado atual e a cópia do último checkpoint.
