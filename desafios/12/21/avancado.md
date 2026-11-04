# Conferência de pacotes

**Data:** 21 de dezembro · **Nível:** Avançado

## Objetivo

Valide etiquetas de destinatários, conte pacotes e detecte duplicatas.

## Como funciona

Leia oito etiquetas de destinatários, conte pacotes e marque cada etiqueta que já apareceu. Nomes idênticos são considerados duplicados.

## Exemplo de execução

```text
Ana, Bia, Ana → três pacotes e uma etiqueta duplicada (mais cinco entradas distintas).
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma terceira ocorrência do mesmo nome conta como outra duplicata.

## Dicas para resolução

1. Guarde as etiquetas.
2. Compare a etiqueta nova às anteriores.
3. Incremente o contador uma vez se houver repetição.

## Solução

```visualg
algoritmo "Desafio1221A"
var
  etiqueta: vetor[1..8] de caractere
  i, j, duplicatas: inteiro
  repetida: logico
inicio
  duplicatas <- 0
  para i de 1 ate 8 faca
    escreva("Destinatário do pacote ", i, ": ")
    leia(etiqueta[i])
    repetida <- falso
    para j de 1 ate i-1 faca
      se etiqueta[j] = etiqueta[i] entao
        repetida <- verdadeiro
      fimse
    fimpara
    se repetida entao
      duplicatas <- duplicatas+1
      escreval("Etiqueta duplicada: ", etiqueta[i])
    fimse
  fimpara
  escreval("Pacotes: 8; etiquetas repetidas: ", duplicatas)
  se duplicatas = 0 entao
    escreval("Todas as etiquetas são únicas")
  fimse
fimalgoritmo
```

Compare cada nova etiqueta somente com as anteriores; assim cada pacote duplicado é contado uma vez.
