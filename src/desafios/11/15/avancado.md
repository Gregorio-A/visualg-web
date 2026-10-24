# Gerenciador de usuários

**Data:** 15 de novembro · **Nível:** Avançado

## Objetivo

Cadastre nomes e códigos de acesso, com bloqueio de duplicados e tentativas.

## Como funciona

Até cinco cadastros: nomes e códigos de acesso devem ser únicos. Depois, três tentativas de login exigem que nome e código coincidam no mesmo registro.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Ana/123 cadastrado; Ana/123 autoriza, Ana/999 nega
```

Tentativa de cadastrar nome ou código duplicado não consome uma posição de cadastro.

## Dicas para resolução

1. Procure duplicatas antes de inserir.
2. Guarde nome e código juntos.
3. Valide o par completo no login.

## Solução

```visualg
algoritmo "Desafio1115A"
var
usuario, codigo: vetor[1..5] de caractere
  i, j, n, duplicado, achado, tentativa: inteiro
  busca, digitado: caractere
inicio
n <- 0
  para i de 1 ate 5 faca
    escreva("Nome do novo usuário: ")
    leia(busca)
    escreva("Código de acesso: ")
    leia(digitado)
    duplicado <- 0
    para j de 1 ate n faca
      se (usuario[j] = busca) ou (codigo[j] = digitado) entao
        duplicado <- 1
      fimse
    fimpara
    se duplicado = 0 entao
      n <- n + 1
      usuario[n] <- busca
      codigo[n] <- digitado
      escreval("Usuário cadastrado")
    senao
      escreval("Nome ou código duplicado")
    fimse
  fimpara
  para tentativa de 1 ate 3 faca
    escreva("Usuário para login: ")
    leia(busca)
    escreva("Código: ")
    leia(digitado)
    achado <- 0
    para i de 1 ate n faca
      se (usuario[i] = busca) e (codigo[i] = digitado) entao
        achado <- 1
      fimse
    fimpara
    se achado = 1 entao
      escreval("Acesso autorizado")
    senao
      escreval("Acesso negado")
    fimse
  fimpara
fimalgoritmo
```

Vetores paralelos preservam a associação nome–código; a busca de login confere ambos no mesmo índice.
