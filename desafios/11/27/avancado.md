# Limpeza simulada

**Data:** 27 de novembro · **Nível:** Avançado

## Objetivo

Escolha arquivos temporários por tamanho e prioridade para liberar espaço-alvo.

## Como funciona

Escolha arquivos temporários até atingir o espaço-alvo. Prioridade numérica menor vem primeiro; no empate, maior arquivo primeiro.

## Exemplo de execução

```text
Alvo 10; arquivos prioritários de tamanhos 6 e 5 → ambos selecionados, 11 liberados
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se todos os arquivos válidos não bastarem, informe que o alvo não foi alcançado.

## Dicas para resolução

1. Guarde prioridade e tamanho.
2. Selecione a próxima opção.
3. Pare ao atingir alvo.

## Solução

```visualg
algoritmo "Desafio1127A"
var
nome: vetor[1..6] de caractere
  tamanho, prioridade: vetor[1..6] de inteiro
  selecionado: vetor[1..6] de inteiro
  i, j, escolhido, liberado, alvo: inteiro
inicio
escreva("Espaço a liberar: ")
  leia(alvo)
  para i de 1 ate 6 faca
    escreva("Arquivo temporário ", i, ": ")
    leia(nome[i])
    escreva("Tamanho: ")
    leia(tamanho[i])
    escreva("Prioridade de limpeza (1 mais alta): ")
    leia(prioridade[i])
    selecionado[i] <- 0
  fimpara
  liberado <- 0
  para i de 1 ate 6 faca
    se liberado < alvo entao
      escolhido <- 0
      para j de 1 ate 6 faca
        se (selecionado[j] = 0) e (tamanho[j] > 0) entao
          se escolhido = 0 entao
            escolhido <- j
          senao
            se (prioridade[j] < prioridade[escolhido]) ou ((prioridade[j] = prioridade[escolhido]) e (tamanho[j] > tamanho[escolhido])) entao
              escolhido <- j
            fimse
          fimse
        fimse
      fimpara
      se escolhido > 0 entao
        selecionado[escolhido] <- 1
        liberado <- liberado + tamanho[escolhido]
        escreval("Remover ", nome[escolhido], " (", tamanho[escolhido], ")")
      fimse
    fimse
  fimpara
  escreval("Espaço liberado: ", liberado)
  se liberado < alvo entao
    escreval("Alvo não alcançado")
  fimse
fimalgoritmo
```

Uma seleção repetida encontra a melhor opção ainda não escolhida.
