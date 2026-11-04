# Mesa de som

**Data:** 20 de novembro · **Nível:** Avançado

## Objetivo

Gerencie volumes de canais e estados mudo, solo e restauração.

## Como funciona

Controle três canais. Mudo zera o volume efetivo do canal; se algum solo estiver ativo, só canais solo não mudos soam. Salvar/restaurar copia os volumes ajustados.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Canal 1 em solo e canal 2 normal → só canal 1 soa
```

**Como ler o exemplo:** a seta → significa "resulta em".

Restaurar recompõe volumes, mas preserva mudo e solo nesta versão.

## Dicas para resolução

1. Guarde volume e estados separados.
2. Calcule volume efetivo.
3. Copie os volumes ao salvar.

## Solução

```visualg
algoritmo "Desafio1120A"
var
volume, mudo, solo, salvo: vetor[1..3] de inteiro
  i, acao, canal, valor, soma: inteiro
inicio
para i de 1 ate 3 faca
    volume[i] <- 50
    mudo[i] <- 0
    solo[i] <- 0
    salvo[i] <- 50
  fimpara
  escreva("Ação (1 ajustar, 2 mudo, 3 solo, 4 salvar, 5 restaurar, 6 ouvir, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao >= 1) e (acao <= 3) entao
      escreva("Canal (1 a 3): ")
      leia(canal)
      se (canal >= 1) e (canal <= 3) entao
        escolha acao
          caso 1
            escreva("Novo volume 0 a 100: ")
            leia(valor)
            se (valor >= 0) e (valor <= 100) entao
              volume[canal] <- valor
            fimse
          caso 2
            mudo[canal] <- 1 - mudo[canal]
          caso 3
            solo[canal] <- 1 - solo[canal]
        fimescolha
      fimse
    senao
      se acao = 4 entao
        para i de 1 ate 3 faca
          salvo[i] <- volume[i]
        fimpara
      fimse
      se acao = 5 entao
        para i de 1 ate 3 faca
          volume[i] <- salvo[i]
        fimpara
      fimse
      se acao = 6 entao
        soma <- solo[1] + solo[2] + solo[3]
        para i de 1 ate 3 faca
          valor <- 0
          se (mudo[i] = 0) e ((soma = 0) ou (solo[i] = 1)) entao
            valor <- volume[i]
          fimse
          escreval("Canal ", i, ": volume efetivo ", valor)
        fimpara
      fimse
    fimse
    escreva("Ação (1 ajustar, 2 mudo, 3 solo, 4 salvar, 5 restaurar, 6 ouvir, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Vetores separam valores configurados, estados de escuta e cópia salva.
