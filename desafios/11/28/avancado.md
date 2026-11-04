# Gerenciador de atualizações

**Data:** 28 de novembro · **Nível:** Avançado

## Objetivo

Simule dependências entre pacotes e identifique ordem válida de instalação.

## Como funciona

Cinco pacotes têm no máximo uma dependência cada. Instale um pacote somente depois de instalar seu requisito; repita passagens até concluir ou travar.

## Exemplo de execução

```text
B depende de A; A sem dependência → instala A antes de B
```

**Como ler o exemplo:** a seta → significa "resulta em".

Ciclo A↔B deixa os dois pendentes e é identificado pela ausência de progresso.

## Dicas para resolução

1. Guarde dependência e estado.
2. Instale os liberados.
3. Detecte uma passagem sem progresso.

## Solução

```visualg
algoritmo "Desafio1128A"
var
nome: vetor[1..5] de caractere
  depende, instalado: vetor[1..5] de inteiro
  i, rodada, progresso, restantes: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Pacote ", i, ": ")
    leia(nome[i])
    escreva("Depende do pacote (0 sem dependência, 1 a 5): ")
    leia(depende[i])
    instalado[i] <- 0
  fimpara
  restantes <- 5
  para rodada de 1 ate 5 faca
    progresso <- 0
    para i de 1 ate 5 faca
      se instalado[i] = 0 entao
        se depende[i] = 0 entao
          instalado[i] <- 1
          restantes <- restantes - 1
          progresso <- progresso + 1
          escreval("Instalado: ", nome[i])
        senao
          se (depende[i] >= 1) e (depende[i] <= 5) entao
            se instalado[depende[i]] = 1 entao
              instalado[i] <- 1
              restantes <- restantes - 1
              progresso <- progresso + 1
              escreval("Instalado: ", nome[i])
            fimse
          fimse
        fimse
      fimse
    fimpara
    se progresso = 0 entao
      interrompa
    fimse
  fimpara
  se restantes > 0 entao
    escreval("Dependência circular ou inválida; ", restantes, " pacote(s) pendente(s)")
  senao
    escreval("Todos os pacotes instalados em ordem válida")
  fimse
fimalgoritmo
```

Passagens sucessivas aplicam uma ordenação topológica simples aos requisitos.
