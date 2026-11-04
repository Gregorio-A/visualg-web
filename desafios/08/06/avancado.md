# Sistema de perfis

**Data:** 6 de agosto · **Nível:** Avançado

## Objetivo

Cadastre usuários em vetor e bloqueie acessos após tentativas falhas.

## Como funciona

Cadastre três usuários com nomes únicos. Oito tentativas de login são processadas; três senhas incorretas consecutivas bloqueiam o perfil.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Ana erra três vezes → bloqueada; senha correta posterior não abre o perfil
```

**Como ler o exemplo:** a seta → significa "resulta em".

Um acerto antes do bloqueio zera falhas. O exercício é uma simulação didática, sem armazenamento seguro de senhas.

## Dicas para resolução

1. Procure o usuário.
2. Conte falhas por perfil.
3. Bloqueie ao chegar a três.

## Solução

```visualg
algoritmo "Desafio0806A"
var
usuario, senha: vetor[1..3] de caractere
  falhas, bloqueado: vetor[1..3] de inteiro
  i, tentativa, encontrado: inteiro
  busca, digitada: caractere
inicio
para i de 1 ate 3 faca
    escreva("Usuário ", i, ": ")
    leia(usuario[i])
    escreva("Senha: ")
    leia(senha[i])
    falhas[i] <- 0
    bloqueado[i] <- 0
  fimpara
  para tentativa de 1 ate 8 faca
    escreva("Login: ")
    leia(busca)
    escreva("Senha: ")
    leia(digitada)
    encontrado <- 0
    para i de 1 ate 3 faca
      se usuario[i] = busca entao
        encontrado <- i
      fimse
    fimpara
    se encontrado = 0 entao
      escreval("Usuário não encontrado")
    senao
      se bloqueado[encontrado] = 1 entao
        escreval("Perfil bloqueado")
      senao
        se senha[encontrado] = digitada entao
          falhas[encontrado] <- 0
          escreval("Acesso liberado")
        senao
          falhas[encontrado] <- falhas[encontrado] + 1
          se falhas[encontrado] >= 3 entao
            bloqueado[encontrado] <- 1
            escreval("Perfil bloqueado após três falhas")
          senao
            escreval("Senha incorreta")
          fimse
        fimse
      fimse
    fimse
  fimpara
fimalgoritmo
```

Vetores por usuário mantêm senha, número de falhas e bloqueio independentes.
