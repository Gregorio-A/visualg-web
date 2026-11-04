# Sequenciador de LEDs

**Data:** 5 de novembro · **Nível:** Avançado

## Objetivo

Processe padrões de quatro canais e gere tabela de estados por instante.

## Como funciona

Gere oito instantes para quatro canais de LED. Acenda em padrão alternado pela paridade canal+instante; a cada quarto instante, acenda todos.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Instante 4 → os quatro canais acesos
```

**Como ler o exemplo:** a seta → significa "resulta em".

A matriz contém apenas 0 (apagado) e 1 (aceso).

## Dicas para resolução

1. Use matriz canal×instante.
2. Teste paridade.
3. Sobrescreva múltiplos de quatro.

## Solução

```visualg
algoritmo "Desafio1105A"
var
led: vetor[1..4, 1..8] de inteiro
  canal, instante: inteiro
inicio
para instante de 1 ate 8 faca
    para canal de 1 ate 4 faca
      led[canal, instante] <- 0
      se (instante + canal) mod 2 = 0 entao
        led[canal, instante] <- 1
      fimse
      se instante mod 4 = 0 entao
        led[canal, instante] <- 1
      fimse
    fimpara
  fimpara
  para canal de 1 ate 4 faca
    escreva("Canal ", canal, ": ")
    para instante de 1 ate 8 faca
      escreva(led[canal, instante], " ")
    fimpara
    escreval("")
  fimpara
fimalgoritmo
```

O padrão base alterna por paridade e o pulso coletivo sobrescreve instantes 4 e 8.
