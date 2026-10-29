# Escape do castelo

**Data:** 31 de outubro · **Nível:** Avançado

## Objetivo

Construa um jogo textual com salas, objetos, pistas e condição de vitória.

## Como funciona

Explore quatro salas. Pegue o mapa na biblioteca para encontrar a torre; pegue a chave na torre e abra o portão. Zero encerra sem vitória.

## Exemplo de execução

```text
Biblioteca → explorar (mapa) → torre → explorar (chave) → portão → escapou
```

**Como ler o exemplo:** a seta → significa "resulta em".

Visitar o portão sem chave não vence; o jogador pode continuar explorando.

## Dicas para resolução

1. Guarde estados dos objetos.
2. Associe opções às salas.
3. Teste a chave para vencer.

## Solução

```visualg
algoritmo "Desafio1031A"
var
sala, acao, chave, mapa, venceu: inteiro
inicio
sala <- 1
  chave <- 0
  mapa <- 0
  venceu <- 0
  enquanto venceu = 0 faca
    escreval("Sala atual: ", sala, " (1 entrada, 2 biblioteca, 3 torre, 4 portão)")
    escolha sala
      caso 1
        escreval("Um corredor leva à biblioteca e ao portão.")
      caso 2
        escreval("Um livro antigo guarda um mapa.")
      caso 3
        escreval("A chave do portão está na torre.")
      caso 4
        escreval("O portão exige a chave.")
    fimescolha
    escreva("Ação (1 biblioteca, 2 torre, 3 portão, 4 explorar, 0 sair): ")
    leia(acao)
    se acao = 0 entao
      escreval("Aventura encerrada")
      venceu <- 2
    senao
      se acao = 1 entao
        sala <- 2
      senao
        se acao = 2 entao
          se mapa = 1 entao
            sala <- 3
          senao
            escreval("A torre está escondida. Procure um mapa.")
          fimse
        senao
          se acao = 3 entao
            sala <- 4
            se chave = 1 entao
              escreval("Você abriu o portão e escapou!")
              venceu <- 1
            senao
              escreval("Portão trancado")
            fimse
          senao
            se acao = 4 entao
              se sala = 2 entao
                mapa <- 1
                escreval("Mapa encontrado: a torre agora é acessível")
              senao
                se sala = 3 entao
                  chave <- 1
                  escreval("Chave encontrada")
                senao
                  escreval("Nenhum objeto aqui")
                fimse
              fimse
            fimse
          fimse
        fimse
      fimse
    fimse
  fimenquanto
fimalgoritmo
```

Variáveis de estado guardam sala, mapa e chave. A condição de vitória exige a chave ao usar o portão.
