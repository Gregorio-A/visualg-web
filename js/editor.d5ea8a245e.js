// ============================================
// VisuAlg Web IDE - Editor (CodeMirror 5)
// ============================================

(function () {
    'use strict';

    function getDataAtual() {
        var d = new Date();
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var yyyy = d.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }

    window.gerarTemplate = function () {
        return 'Algoritmo "MeuAlgoritmo"\n' +
            '\n' +
            // '// Disciplina: Algoritmos\n' +
            // '// Professor: Murilo Gregorio Alves\n' +
            // '// Descri\u00e7\u00e3o: Descreva o que o algoritmo faz\n' +
            '// Autor(a): \n' +
            '// Descri\u00e7\u00e3o: \n' +
            '// Data: ' + getDataAtual() + '\n' +
            
            '\n' +
            'Var\n' +
            '  // Se\u00e7\u00e3o de Declara\u00e7\u00f5es das vari\u00e1veis\n' +
            '  \n' +
            '  \n' +
            'Inicio\n' +
            '  // Se\u00e7\u00e3o de Comandos\n' +
            '  \n' +
            '  \n' +
            'fimalgoritmo';
    };

    var DEFAULT_PROGRAM = window.gerarTemplate();

    // Word boundary regex that supports accented characters (JS \b only works with ASCII)
    var ACCENT_CHARS = 'áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ';
    function wordBoundaryRegex(pattern) {
        var wb = 'a-zA-Z0-9_' + ACCENT_CHARS;
        return new RegExp('(?<![' + wb + '])(?:' + pattern + ')(?![' + wb + '])', 'i');
    }

    // Define VisuAlg syntax mode
    CodeMirror.defineSimpleMode('visualg', {
        start: [
            // Block comments { }
            { regex: /\{/, token: 'comment', push: 'comment_block' },
            // Line comments
            { regex: /\/\/.*/, token: 'comment' },
            // Strings
            { regex: /"(?:[^"\\]|\\.|"")*"/, token: 'string' },
            { regex: /"[^"\n]*$/, token: 'error' },
            // Input/output and execution commands
            { regex: wordBoundaryRegex('escreval|escreva|leia|limpatela|pausa|interrompa|retorne|debug|eco|cronometro|cronômetro|timer|aleatorio|aleatório|arquivo'), token: 'command' },
            // Assignment operator
            { regex: /<-|:=/, token: 'operator' },
            // Comparison operators (multi-char)
            { regex: /<=|>=|<>/, token: 'operator' },
            // Keywords (case-insensitive)
            {
                regex: wordBoundaryRegex('algoritmo|var|declare|inicio|início|fimalgoritmo|se|entao|então|senao|senão|fimse|enquanto|faca|faça|fimenquanto|para|de|ate|até|passo|fimpara|repita|fimrepita|escolha|caso|outrocaso|fimescolha|procedimento|fimprocedimento|funcao|função|fimfuncao'),
                token: 'keyword'
            },
            // Data types
            { regex: wordBoundaryRegex('inteiro|real|numerico|numérico|literal|caractere|caracter|caráter|logico|lógico|vetor'), token: 'type' },
            // Boolean literals
            { regex: wordBoundaryRegex('verdadeiro|falso|on|off'), token: 'atom' },
            // Logical and special operators
            { regex: wordBoundaryRegex('e|ou|nao|não|xou|mod|div'), token: 'operator' },
            // Built-in functions
            {
                regex: /\b(?:abs|quad|raizq|exp|log|logn|sen|cos|tan|cotan|arcsen|arccos|arctan|grauprad|radpgrau|int|pi|rand|randi|compr|copia|maiusc|minusc|asc|carac|pos|caracpnum|numpcarac)\b/i,
                token: 'builtin'
            },
            // Numbers
            { regex: /\d+(\.\d+)?/, token: 'number' },
            // Identifiers
            { regex: /[a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ_][\wáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ]*/, token: 'variable-2' },
            // Operators
            { regex: /[+\-*\/\\^=<>]/, token: 'operator' },
            { regex: /[(),:\[\]]/, token: 'punctuation' },
            // Range operator
            { regex: /\.\./, token: 'operator' }
        ],
        comment_block: [
            { regex: /.*?\}/, token: 'comment', pop: true },
            { regex: /.*/, token: 'comment' }
        ],
        meta: {
            lineComment: '//'
        }
    });

    var highlightedLine = null;
    var highlightedLineClass = null;
    var debugLine = null;
    var _guideColors = null;
    var completions = [
        { label:'escreva', insert:'escreva()', cursor:8, detail:'Exibe texto ou valores na mesma linha' },
        { label:'escreval', insert:'escreval()', cursor:9, detail:'Exibe texto ou valores e pula uma linha' },
        { label:'leia', insert:'leia()', cursor:5, detail:'Lê um valor para uma variável' },
        { label:'se', insert:'se  entao\n  \nfimse', cursor:3, detail:'Inicia uma condição' },
        { label:'enquanto', insert:'enquanto  faca\n  \nfimenquanto', cursor:10, detail:'Repete enquanto a condição for verdadeira' },
        { label:'para', insert:'para  de  ate  faca\n  \nfimpara', cursor:5, detail:'Repete usando um contador' },
        { label:'repita', insert:'repita\n  \nate ', cursor:9, detail:'Repete até a condição ser verdadeira' },
        { label:'escolha', insert:'escolha \n  caso \n    \nfimescolha', cursor:8, detail:'Escolhe entre casos' },
        { label:'procedimento', insert:'procedimento \ninicio\n  \nfimprocedimento', cursor:13, detail:'Declara um procedimento' },
        { label:'funcao', insert:'funcao : inteiro\ninicio\n  retorne \nfimfuncao', cursor:7, detail:'Declara uma função com retorno inteiro' },
        { label:'limpatela', detail:'Limpa o console' },
        { label:'interrompa', detail:'Sai de um laço de repetição' },
        { label:'algoritmo', insert:'algoritmo ""', cursor:11, detail:'Declara o nome do algoritmo' },
        { label:'var', detail:'Inicia a declaração de variáveis' },
        { label:'inicio', detail:'Inicia os comandos do algoritmo' },
        { label:'fimalgoritmo', detail:'Encerra o algoritmo' },
        { label:'entao' }, { label:'senao' }, { label:'fimse' }, { label:'faca' },
        { label:'fimenquanto' }, { label:'de' }, { label:'ate' }, { label:'passo' },
        { label:'fimpara' }, { label:'escolha' }, { label:'caso' }, { label:'outrocaso' },
        { label:'fimescolha' }, { label:'fimfuncao' },
        { label:'fimprocedimento' }, { label:'inteiro' },
        { label:'real' }, { label:'caractere' }, { label:'logico' },
        { label:'verdadeiro' }, { label:'falso' }
    ];
    ['abs', 'quad', 'raizq', 'sen', 'cos', 'tan', 'int', 'compr', 'maiusc', 'minusc'].forEach(function (name) {
        completions.push({ label:name, insert:name + '()', cursor:name.length + 1, detail:'Função integrada: informe o argumento' });
    });
    var EDITOR_HELP = {
        algoritmo:{ signature:'algoritmo "nome"', description:'Inicia o programa e exige um nome entre aspas duplas, usado para identificar o algoritmo.', doc:'introducao', section:'Estrutura mínima' },
        escreva:{ signature:'escreva(valor, ...)', description:'Mostra valores no console sem pular para a próxima linha.', doc:'entrada-saida', section:'Saída com escreva' },
        escreval:{ signature:'escreval(valor, ...)', description:'Mostra valores no console e termina a saída com uma quebra de linha.', doc:'entrada-saida', section:'Saída com escreva' },
        leia:{ signature:'leia(variável)', description:'Lê um valor informado no console e o guarda na variável.', doc:'entrada-saida', section:'Entrada com leia' },
        limpatela:{ signature:'limpatela', description:'Limpa o conteúdo atual do console.', doc:'comandos', section:'limpatela' },
        interrompa:{ signature:'interrompa', description:'Encerra imediatamente o laço de repetição mais interno.', doc:'comandos', section:'interrompa' },
        aleatorio:{ signature:'aleatorio [on|off]', description:'Ativa ou desativa a geração automática de valores nas leituras.', doc:'comandos', section:'aleatorio' },
        cronometro:{ signature:'cronometro on|off', description:'Mede o tempo decorrido entre cronometro on e cronometro off e mostra o resultado no console.', doc:'comandos', section:'cronometro' },
        var:{ signature:'var', description:'Inicia a área de declaração de variáveis, antes do bloco inicio.', doc:'introducao', section:'Declaração de variáveis' },
        inicio:{ signature:'inicio', description:'Marca o começo dos comandos executados pelo algoritmo.', doc:'introducao', section:'Estrutura mínima' },
        fimalgoritmo:{ signature:'fimalgoritmo', description:'Encerra a definição do algoritmo principal.', doc:'introducao', section:'Estrutura mínima' },
        entao:{ signature:'se condição entao', description:'Separa a condição do bloco que será executado quando ela for verdadeira.', doc:'condicionais', section:'se...entao' },
        fimse:{ signature:'fimse', description:'Encerra um bloco condicional iniciado por se.', doc:'condicionais', section:'se...entao' },
        faca:{ signature:'faca', description:'Fecha o cabeçalho de um laço para ou enquanto e inicia os comandos que serão repetidos.', doc:'repeticao', section:'para...ate...faca' },
        de:{ signature:'para variável de início ate fim', description:'Define o valor inicial da variável contadora do laço para.', doc:'repeticao', section:'para...ate...faca' },
        ate:{ signature:'ate condição', description:'Define o limite de um laço para ou a condição de encerramento de repita.', doc:'repeticao', section:'repita...ate' },
        passo:{ signature:'passo incremento', description:'Define o valor de incremento ou decremento de um laço para.', doc:'repeticao', section:'para...ate...faca' },
        fimpara:{ signature:'fimpara', description:'Encerra o bloco de comandos do laço para.', doc:'repeticao', section:'para...ate...faca' },
        fimenquanto:{ signature:'fimenquanto', description:'Encerra o bloco do laço enquanto.', doc:'repeticao', section:'enquanto...faca' },
        fimrepita:{ signature:'fimrepita', description:'Encerra a forma repita...fimrepita, usada com interrompa para sair do laço.', doc:'repeticao', section:'repita...fimrepita com interrompa' },
        caso:{ signature:'caso valor1, valor2', description:'Define os valores que selecionam o bloco correspondente dentro de escolha.', doc:'condicionais', section:'escolha...caso' },
        outrocaso:{ signature:'outrocaso', description:'Define o bloco padrão de escolha, executado quando nenhum caso corresponde ao valor.', doc:'condicionais', section:'escolha...caso' },
        fimescolha:{ signature:'fimescolha', description:'Encerra uma estrutura escolha.', doc:'condicionais', section:'escolha...caso' },
        retorne:{ signature:'retorne expressão', description:'Define o valor devolvido pela função. A execução continua nos comandos seguintes, então coloque o retorno ao final ou controle o fluxo explicitamente.', doc:'funcoes', section:'Retorne' },
        timer:{ signature:'timer on|off|milissegundos', description:'Insere um atraso antes dos comandos seguintes; timer on usa 500 ms e valores numéricos definem milissegundos.', doc:'comandos', section:'timer' },
        pausa:{ signature:'pausa', description:'Interrompe temporariamente a execução até o usuário continuar.', doc:'comandos', section:'pausa e debug' },
        debug:{ signature:'debug expressão-lógica', description:'Interrompe a execução para depuração quando a expressão lógica for verdadeira. A expressão é obrigatória; use pausa para interromper sem condição.', doc:'comandos', section:'pausa e debug' },
        eco:{ signature:'eco on|off', description:'Ativa ou oculta a repetição dos valores digitados durante leia.', doc:'entrada-saida', section:'Conversão dos valores digitados' },
        arquivo:{ signature:'arquivo "caminho/nome.txt"', description:'Associa um arquivo de dados às operações de leia: reutiliza entradas gravadas e registra novas entradas para execuções futuras.', doc:'comandos', section:'arquivo' },
        verdadeiro:{ signature:'verdadeiro', description:'Valor lógico que representa uma condição satisfeita.', doc:'condicionais', section:'se...entao' },
        falso:{ signature:'falso', description:'Valor lógico que representa uma condição não satisfeita.', doc:'condicionais', section:'se...entao' },
        xou:{ signature:'xou lógico', description:'Disjunção exclusiva: retorna verdadeiro quando exatamente uma condição é verdadeira.', doc:'operadores', section:'Lógicos' },
        se:{ signature:'se condição entao ... fimse', description:'Executa um bloco quando a condição lógica é verdadeira.', doc:'condicionais', section:'se...entao' },
        senao:{ signature:'senao', description:'Define o bloco alternativo executado quando a condição falha.', doc:'condicionais', section:'se...senao' },
        escolha:{ signature:'escolha expressão ... fimescolha', description:'Seleciona um bloco de comandos conforme o valor de uma expressão.', doc:'condicionais', section:'escolha...caso' },
        para:{ signature:'para variável de início ate limite [passo n] faca', description:'Repete um bloco usando uma variável contadora.', doc:'repeticao', section:'para...ate...faca' },
        enquanto:{ signature:'enquanto condição faca ... fimenquanto', description:'Repete o bloco enquanto a condição permanecer verdadeira.', doc:'repeticao', section:'enquanto...faca' },
        repita:{ signature:'repita ... ate condição', description:'Executa o bloco ao menos uma vez e repete até a condição ser verdadeira.', doc:'repeticao', section:'repita...ate' },
        funcao:{ signature:'funcao nome(parâmetros): tipo', description:'Declara um subprograma que devolve um valor e pode ser usado em expressões.', doc:'funcoes', section:'Sintaxe' },
        procedimento:{ signature:'procedimento nome(parâmetros)', description:'Declara uma rotina reutilizável que executa comandos e não devolve valor.', doc:'subprogramas', section:'Procedimento com parâmetros' },
        fimprocedimento:{ signature:'fimprocedimento', description:'Encerra a declaração de um procedimento.', doc:'subprogramas', section:'Procedimento com parâmetros' },
        fimfuncao:{ signature:'fimfuncao', description:'Encerra a declaração de uma função.', doc:'funcoes', section:'Sintaxe' },
        inteiro:{ signature:'inteiro', description:'Tipo para números inteiros, sem parte decimal.', doc:'introducao', section:'Tipos de dados' },
        real:{ signature:'real', description:'Tipo para números que podem ter parte decimal.', doc:'introducao', section:'Tipos de dados' },
        logico:{ signature:'logico', description:'Tipo lógico, com os valores verdadeiro ou falso.', doc:'introducao', section:'Tipos de dados' },
        numerico:{ signature:'numerico', description:'Alias aceito para real: armazena números que podem ter parte decimal.', doc:'introducao', section:'Tipos de dados' },
        caracter:{ signature:'caracter', description:'Alias aceito para caractere: armazena textos entre aspas duplas.', doc:'introducao', section:'Tipos de dados' },
        carater:{ signature:'caráter', description:'Alias acentuado aceito para caractere: armazena textos entre aspas duplas.', doc:'introducao', section:'Tipos de dados' },
        literal:{ signature:'literal', description:'Tipo textual para armazenar uma sequência de caracteres.', doc:'introducao', section:'Tipos de dados' },
        caractere:{ signature:'caractere', description:'Tipo textual para armazenar uma sequência de caracteres.', doc:'introducao', section:'Tipos de dados' },
        vetor:{ signature:'vetor[início..fim] de tipo', description:'Declara uma sequência indexada de valores do mesmo tipo.', doc:'introducao', section:'Vetores' },
        '+':{ signature:'+', description:'Soma números ou concatena valores de texto conforme o contexto.', doc:'operadores', section:'Aritméticos' },
        '-':{ signature:'-', description:'Subtrai valores ou indica o sinal negativo de um número.', doc:'operadores', section:'Aritméticos' },
        '*':{ signature:'*', description:'Multiplica dois valores numéricos.', doc:'operadores', section:'Aritméticos' },
        '/':{ signature:'/', description:'Divide valores numéricos e produz um resultado real.', doc:'operadores', section:'Aritméticos' },
        '\\':{ signature:'\\', description:'Divide números inteiros e retorna o quociente sem a parte fracionária.', doc:'operadores', section:'Aritméticos' },
        '^':{ signature:'^', description:'Calcula uma potência. A exponenciação é associativa da direita para a esquerda.', doc:'operadores', section:'Aritméticos' },
        '=':{ signature:'=', description:'Compara dois valores e retorna verdadeiro quando são iguais.', doc:'operadores', section:'Relacionais' },
        '<>':{ signature:'<>', description:'Compara dois valores e retorna verdadeiro quando são diferentes.', doc:'operadores', section:'Relacionais' },
        '<':{ signature:'<', description:'Retorna verdadeiro quando o valor à esquerda é menor que o da direita.', doc:'operadores', section:'Relacionais' },
        '>':{ signature:'>', description:'Retorna verdadeiro quando o valor à esquerda é maior que o da direita.', doc:'operadores', section:'Relacionais' },
        '<=':{ signature:'<=', description:'Retorna verdadeiro quando o valor à esquerda é menor ou igual ao da direita.', doc:'operadores', section:'Relacionais' },
        '>=':{ signature:'>=', description:'Retorna verdadeiro quando o valor à esquerda é maior ou igual ao da direita.', doc:'operadores', section:'Relacionais' },
        '<-':{ signature:'variavel <- expressao', description:'Atribui à variável o resultado da expressão à direita. Leia como "recebe".', doc:'operadores', section:'Atribuição' },
        ':=':{ signature:'variavel := expressao', description:'Forma alternativa de atribuição aceita pelo VisuAlg Web; o formato recomendado é <-.', doc:'operadores', section:'Atribuição' },
        '..':{ signature:'inicio..fim', description:'Indica os limites inicial e final de uma ou duas dimensões de vetor.', doc:'introducao', section:'Vetores' },
        '%':{ signature:'valor1 % valor2', description:'Calcula o resto da divisão inteira, como mod.', doc:'operadores', section:'Aritméticos' },
        ';':{ signature:'parametro1: tipo; parametro2: tipo', description:'Separa grupos de parâmetros com tipos diferentes na declaração de procedimentos e funções.', doc:'subprogramas', section:'Procedimento com parâmetros' },
        mod:{ signature:'mod', description:'Retorna o resto da divisão inteira.', doc:'operadores', section:'Aritméticos' },
        div:{ signature:'div', description:'Retorna o quociente inteiro da divisão.', doc:'operadores', section:'Aritméticos' },
        e:{ signature:'e lógico', description:'Produz verdadeiro apenas quando as duas condições são verdadeiras.', doc:'operadores', section:'Lógicos' },
        ou:{ signature:'ou lógico', description:'Produz verdadeiro quando pelo menos uma condição é verdadeira.', doc:'operadores', section:'Lógicos' },
        nao:{ signature:'nao condição', description:'Inverte um valor lógico.', doc:'operadores', section:'Lógicos' },
        abs:{ signature:'abs(x) → mesmo tipo numérico', description:'Retorna o valor absoluto de x: a distância entre o número e zero, sem sinal negativo.', doc:'funcoes', section:'Matemática básica' },
        quad:{ signature:'quad(x) → numérico', description:'Retorna x multiplicado por ele mesmo, equivalente a x ^ 2.', doc:'funcoes', section:'Matemática básica' },
        raizq:{ signature:'raizq(x) → real', description:'Calcula a raiz quadrada. O argumento não pode ser negativo.', doc:'funcoes', section:'Matemática básica' },
        exp:{ signature:'exp(base, expoente) → real', description:'Calcula base elevada ao expoente. Por exemplo, exp(2, 3) resulta em 8.', doc:'funcoes', section:'Matemática básica' },
        log:{ signature:'log(x) → real', description:'Calcula o logaritmo decimal de um número positivo. Zero e valores negativos geram erro.', doc:'funcoes', section:'Matemática básica' },
        logn:{ signature:'logn(x) → real', description:'Calcula o logaritmo natural de um número positivo. Zero e valores negativos geram erro.', doc:'funcoes', section:'Matemática básica' },
        sen:{ signature:'sen(ângulo) → real', description:'Calcula o seno de um ângulo informado em radianos.', doc:'funcoes', section:'Trigonometria' },
        cos:{ signature:'cos(ângulo) → real', description:'Calcula o cosseno de um ângulo informado em radianos.', doc:'funcoes', section:'Trigonometria' },
        tan:{ signature:'tan(ângulo) → real', description:'Calcula a tangente de um ângulo informado em radianos.', doc:'funcoes', section:'Trigonometria' },
        cotan:{ signature:'cotan(ângulo) → real', description:'Calcula a cotangente de um ângulo informado em radianos.', doc:'funcoes', section:'Trigonometria' },
        arcsen:{ signature:'arcsen(x) → real', description:'Calcula o arco seno; x precisa estar entre -1 e 1.', doc:'funcoes', section:'Trigonometria' },
        arccos:{ signature:'arccos(x) → real', description:'Calcula o arco cosseno; x precisa estar entre -1 e 1.', doc:'funcoes', section:'Trigonometria' },
        arctan:{ signature:'arctan(x) → real', description:'Calcula o arco tangente e retorna o ângulo em radianos.', doc:'funcoes', section:'Trigonometria' },
        grauprad:{ signature:'grauprad(graus) → real', description:'Converte um ângulo em graus para radianos antes de usar funções trigonométricas.', doc:'funcoes', section:'Trigonometria' },
        radpgrau:{ signature:'radpgrau(radianos) → real', description:'Converte um ângulo em radianos para graus.', doc:'funcoes', section:'Trigonometria' },
        int:{ signature:'int(x) → inteiro', description:'Retorna a parte inteira de x, removendo a parte decimal em direção a zero.', doc:'funcoes', section:'Matemática básica' },
        pi:{ signature:'pi → real', description:'Constante com o valor de π. Também pode ser usada como pi().', doc:'funcoes', section:'Matemática básica' },
        rand:{ signature:'rand() → real', description:'Gera um número real aleatório entre 0 e 1.', doc:'funcoes', section:'Matemática básica' },
        randi:{ signature:'randi(limite) → inteiro', description:'Gera um inteiro entre 0 e limite - 1. O limite deve ser inteiro e maior que zero.', doc:'funcoes', section:'Matemática básica' },
        compr:{ signature:'compr(texto) → inteiro', description:'Conta os caracteres do texto informado.', doc:'funcoes', section:'Texto' },
        copia:{ signature:'copia(texto, início, tamanho) → caractere', description:'Extrai uma quantidade de caracteres de um texto; a primeira posição é 1.', doc:'funcoes', section:'Texto' },
        maiusc:{ signature:'maiusc(texto) → caractere', description:'Retorna o texto com as letras convertidas para maiúsculas.', doc:'funcoes', section:'Texto' },
        minusc:{ signature:'minusc(texto) → caractere', description:'Retorna o texto com as letras convertidas para minúsculas.', doc:'funcoes', section:'Texto' },
        asc:{ signature:'asc(texto) → inteiro', description:'Retorna o código do primeiro caractere do texto; o texto não pode estar vazio.', doc:'funcoes', section:'Texto' },
        carac:{ signature:'carac(código) → caractere', description:'Converte um código numérico em seu caractere correspondente.', doc:'funcoes', section:'Texto' },
        pos:{ signature:'pos(trecho, texto) → inteiro', description:'Procura trecho dentro de texto e retorna a posição iniciada em 1; retorna 0 se não encontrar.', doc:'funcoes', section:'Texto' },
        caracpnum:{ signature:'caracpnum(texto) → numérico', description:'Converte um texto numérico, como "12,5", em número.', doc:'funcoes', section:'Conversão entre texto e número' },
        numpcarac:{ signature:'numpcarac(numero) → caractere', description:'Converte um número em texto para concatenação ou exibição.', doc:'funcoes', section:'Conversão entre texto e número' }
    };
    var EDITOR_HELP_DETAILS = {
        algoritmo:{ example:'algoritmo "MeuPrograma"', tip:'O nome entre aspas é obrigatório e deve vir na primeira linha.' },
        escreva:{ example:'escreva("Total: ", total)', tip:'Não pula linha; use escreval quando quiser terminar a linha.' },
        escreval:{ example:'escreval("Total: ", total)', tip:'Aceita várias expressões separadas por vírgula.' },
        leia:{ example:'escreva("Idade: ")\nleia(idade)', tip:'A variável precisa estar declarada e o valor digitado deve combinar com o tipo.' },
        limpatela:{ example:'escreval("Mensagem")\nlimpatela', tip:'Apaga a saída já exibida no console.' },
        interrompa:{ example:'se encontrado entao\n  interrompa\nfimse', tip:'Encerra somente o laço mais interno que contém o comando.' },
        aleatorio:{ example:'aleatorio 1, 6\nleia(dado)\naleatorio off', tip:'As leituras recebem valores gerados enquanto o modo estiver ativo.' },
        cronometro:{ example:'cronometro on\n// trecho medido\ncronometro off', tip:'O resultado é exibido quando a medição é encerrada.' },
        var:{ example:'var\n  idade: inteiro\n  nome: caractere', tip:'As declarações ficam antes de inicio; procedimentos e funções podem vir depois delas.' },
        inicio:{ example:'inicio\n  escreval("Começo do programa")', tip:'As instruções executáveis do algoritmo principal começam aqui.' },
        fimalgoritmo:{ example:'inicio\n  escreval("Fim")\nfimalgoritmo', tip:'Deve aparecer uma vez, no final do algoritmo principal.' },
        entao:{ example:'se idade >= 18 entao\n  escreval("Maior de idade")', tip:'A condição precisa produzir um valor lógico.' },
        fimse:{ example:'se saldo > 0 entao\n  escreval("Disponível")\nfimse', tip:'Cada bloco se aberto precisa de seu próprio fimse.' },
        faca:{ example:'para i de 1 ate 3 faca\n  escreval(i)', tip:'Também fecha o cabeçalho de enquanto; o hint aponta para a forma usada na linha.' },
        de:{ example:'para contador de 1 ate 5 faca', tip:'O valor inicial é atribuído à variável contadora antes da primeira repetição.' },
        ate:{ example:'repita\n  tentativa <- tentativa + 1\nate tentativa = 3', tip:'Em para, ate define o limite; em repita, recebe a condição de parada.' },
        passo:{ example:'para i de 10 ate 2 passo -2 faca', tip:'O passo não pode ser zero; um valor negativo faz a contagem decrescente.' },
        fimpara:{ example:'para i de 1 ate 3 faca\n  escreval(i)\nfimpara', tip:'O limite do laço é inclusivo quando a contagem alcança esse valor.' },
        fimenquanto:{ example:'enquanto contador < 3 faca\n  contador <- contador + 1\nfimenquanto', tip:'A condição é verificada antes de cada repetição.' },
        fimrepita:{ example:'repita\n  tentativa <- tentativa + 1\n  se tentativa = 3 entao\n    interrompa\n  fimse\nfimrepita', tip:'Esta variante termina explicitamente com interrompa; repita...ate usa uma condição.' },
        escolha:{ example:'escolha opcao\ncaso 1\n  escreval("Um")\noutrocaso\n  escreval("Outro")\nfimescolha', tip:'Compare uma expressão com vários valores possíveis.' },
        caso:{ example:'escolha opcao\ncaso 1, 3\n  escreval("Opção válida")\nfimescolha', tip:'Liste valores separados por vírgula; o bloco correspondente é executado quando um deles coincide.' },
        outrocaso:{ example:'escolha opcao\ncaso 1\n  escreval("Um")\noutrocaso\n  escreval("Outro")\nfimescolha', tip:'É o caminho padrão quando nenhum caso corresponde.' },
        fimescolha:{ example:'escolha opcao\ncaso 1\n  escreval("Um")\nfimescolha', tip:'Fecha o bloco escolha depois dos casos.' },
        retorne:{ example:'funcao dobro(x: inteiro): inteiro\ninicio\n  retorne x * 2\nfimfuncao', tip:'Comandos após retorne ainda são executados; organize o fluxo para evitar substituir o resultado.' },
        timer:{ example:'timer 250\nescreval("Esta saída aguarda 250 ms")\ntimer off', tip:'O número é uma constante inteira em milissegundos e fica limitado a 10.000.' },
        pausa:{ example:'escreval("Confira os valores")\npausa', tip:'A execução continua quando você confirma no terminal.' },
        debug:{ example:'debug contador >= 10', tip:'Só pausa quando a expressão for verdadeira; use pausa para parar sempre.' },
        eco:{ example:'eco off\nleia(resposta)\neco on', tip:'Controla se a entrada lida também aparece no console.' },
        arquivo:{ example:'arquivo "dados/turma.txt"', tip:'Declare antes de var ou inicio; leia consome os dados e grava novas entradas nesse arquivo.' },
        verdadeiro:{ example:'aprovado <- nota >= 6', tip:'Comparações como >= produzem valores lógicos que podem ser guardados ou usados em se.' },
        falso:{ example:'aprovado <- falso', tip:'Use falso sem aspas; entre aspas, o conteúdo é texto.' },
        se:{ example:'se saldo > 0 entao\n  escreval("Disponível")\nsenao\n  escreval("Sem saldo")\nfimse', tip:'Toda estrutura se precisa ser encerrada com fimse.' },
        senao:{ example:'se nota >= 6 entao\n  escreval("Aprovado")\nsenao\n  escreval("Revisão")\nfimse', tip:'O bloco senao é opcional e executa quando a condição do se é falsa.' },
        para:{ example:'para i de 1 ate 5 passo 1 faca\n  escreval(i)\nfimpara', tip:'A variável contadora avança automaticamente pelo passo escolhido.' },
        enquanto:{ example:'enquanto resposta <> "sair" faca\n  leia(resposta)\nfimenquanto', tip:'Atualize dentro do bloco os valores usados na condição para que o laço possa terminar.' },
        repita:{ example:'repita\n  leia(opcao)\nate opcao = 0', tip:'O corpo executa pelo menos uma vez; a condição de ate encerra o laço quando é verdadeira.' },
        funcao:{ example:'funcao dobro(x: inteiro): inteiro\ninicio\n  retorne x * 2\nfimfuncao', tip:'Informe o tipo depois dos dois-pontos e devolva um valor compatível com esse tipo.' },
        fimfuncao:{ example:'funcao dobro(x: inteiro): inteiro\ninicio\n  retorne x * 2\nfimfuncao', tip:'Fecha a definição da função, não a chamada feita no algoritmo principal.' },
        procedimento:{ example:'procedimento mostrar(texto: caractere)\ninicio\n  escreval(texto)\nfimprocedimento', tip:'Use procedimento para ações; para produzir um valor dentro de uma expressão, declare uma função.' },
        fimprocedimento:{ example:'procedimento mostrar\ninicio\n  escreval("Olá")\nfimprocedimento', tip:'Fecha a definição da rotina; a chamada é feita pelo nome do procedimento.' },
        inteiro:{ example:'idade: inteiro\nidade <- 18', tip:'Não aceita parte decimal; use real para valores como 3.5.' },
        real:{ example:'preco: real\npreco <- 12.50', tip:'Use ponto no código para escrever a parte decimal.' },
        logico:{ example:'aprovado: logico\naprovado <- verdadeiro', tip:'Só armazena verdadeiro ou falso e é usado em condições.' },
        numerico:{ example:'media: numerico\nmedia <- 7.5', tip:'É um alias aceito para real.' },
        caracter:{ example:'nome: caracter\nnome <- "Ana"', tip:'É um alias aceito para caractere.' },
        carater:{ example:'nome: caráter\nnome <- "Ana"', tip:'A forma acentuada também é aceita como alias de caractere.' },
        literal:{ example:'mensagem: literal\nmensagem <- "Olá"', tip:'É um alias de caractere para armazenar texto.' },
        caractere:{ example:'nome: caractere\nnome <- "Ana"', tip:'Use aspas duplas para escrever valores de texto.' },
        vetor:{ example:'notas: vetor [1..3] de real\nnotas[1] <- 8.5', tip:'Os limites definem índices válidos; acesse cada posição entre colchetes.' },
        '..':{ example:'notas: vetor [1..5] de real', tip:'Os limites do vetor são inclusivos; neste exemplo os índices válidos vão de 1 a 5.' },
        ';':{ example:'procedimento trocar(a: inteiro; b: caractere)', tip:'Separa grupos de parâmetros quando cada grupo tem um tipo diferente.' },
        '+':{ example:'soma <- a + b\nnome_completo <- nome + sobrenome', tip:'Com dois textos, + concatena; com números, soma.' },
        '-':{ example:'diferenca <- total - desconto\nnegativo <- -valor', tip:'Pode subtrair dois números ou indicar que um valor é negativo.' },
        '*':{ example:'area <- largura * altura', tip:'Multiplica valores numéricos.' },
        '/':{ example:'media <- soma / quantidade', tip:'A divisão com / preserva casas decimais no resultado.' },
        '\\':{ example:'quociente <- 7 \\ 2', tip:'Use div como alternativa textual; o resultado descarta a parte fracionária.' },
        '^':{ example:'quadrado <- numero ^ 2', tip:'Potências encadeadas são avaliadas da direita para a esquerda.' },
        '<-':{ example:'idade <- 18\nidade <- idade + 1', tip:'O lado direito é calculado primeiro e seu valor é guardado na variável à esquerda.' },
        ':=':{ example:'total := preco * quantidade', tip:'É uma forma alternativa aceita pelo Web; <- é a escrita recomendada.' },
        mod:{ example:'resto <- 17 mod 5', tip:'O resto fica entre zero e um valor menor que o divisor positivo.' },
        div:{ example:'quociente <- 17 div 5', tip:'Retorna o quociente inteiro, sem a parte decimal.' },
        '%':{ example:'resto <- 17 % 5', tip:'É equivalente ao operador mod.' },
        '=':{ example:'se senha = "abc" entao', tip:'Em uma condição, compara valores; não altera a variável.' },
        '<>':{ example:'se resposta <> "sair" entao', tip:'É verdadeiro quando os valores comparados são diferentes.' },
        '<':{ example:'se idade < 18 entao', tip:'É verdadeiro quando o valor da esquerda é menor.' },
        '>':{ example:'se nota > 6 entao', tip:'É verdadeiro quando o valor da esquerda é maior.' },
        '<=':{ example:'se idade <= 17 entao', tip:'Inclui também o caso em que os valores são iguais.' },
        '>=':{ example:'se nota >= 6 entao', tip:'Inclui também o caso em que os valores são iguais.' },
        e:{ example:'se idade >= 18 e tem_documento entao', tip:'As duas condições precisam ser verdadeiras.' },
        ou:{ example:'se opcao = 1 ou opcao = 2 entao', tip:'Basta uma das condições ser verdadeira.' },
        nao:{ example:'se nao encontrado entao', tip:'Inverte verdadeiro para falso e falso para verdadeiro.' },
        xou:{ example:'resultado <- primeira_condicao xou segunda_condicao', tip:'É verdadeiro quando exatamente um dos lados é verdadeiro.' },
        abs:{ example:'distancia <- abs(-8) // 8', tip:'Remove o sinal; o resultado nunca é negativo.' },
        quad:{ example:'area <- quad(lado)', tip:'Equivale a multiplicar o argumento por ele mesmo.' },
        raizq:{ example:'lado <- raizq(area)', tip:'O argumento deve ser maior ou igual a zero.' },
        exp:{ example:'resultado <- exp(2, 3) // 8', tip:'Recebe base primeiro e expoente depois.' },
        log:{ example:'ordem <- log(100) // 2', tip:'É logaritmo na base 10; o argumento precisa ser positivo.' },
        logn:{ example:'valor <- logn(2.7182818)', tip:'É o logaritmo natural; o argumento precisa ser positivo.' },
        sen:{ example:'altura <- sen(grauprad(30))', tip:'As funções trigonométricas usam radianos; converta graus com grauprad.' },
        cos:{ example:'base <- cos(grauprad(60))', tip:'As funções trigonométricas usam radianos.' },
        tan:{ example:'inclinacao <- tan(grauprad(45))', tip:'Converta o ângulo em graus antes de chamar tan.' },
        cotan:{ example:'valor <- cotan(pi / 4)', tip:'Usa radianos e não está definida quando a tangente do ângulo é zero.' },
        arcsen:{ example:'angulo <- arcsen(0.5)', tip:'O argumento precisa estar entre -1 e 1; o resultado é em radianos.' },
        arccos:{ example:'angulo <- arccos(0.5)', tip:'O argumento precisa estar entre -1 e 1; o resultado é em radianos.' },
        arctan:{ example:'angulo <- arctan(1)', tip:'O resultado é informado em radianos.' },
        grauprad:{ example:'radianos <- grauprad(180) // pi', tip:'Use antes de sen, cos, tan ou cotan quando seu ângulo estiver em graus.' },
        radpgrau:{ example:'graus <- radpgrau(pi) // 180', tip:'Converte o resultado angular de radianos para graus.' },
        int:{ example:'parte <- int(-2.8) // -2', tip:'Trunca em direção a zero; não arredonda para o inteiro mais próximo.' },
        pi:{ example:'circunferencia <- 2 * pi * raio', tip:'Pode ser escrito como pi ou pi(); representa aproximadamente 3,14159.' },
        rand:{ example:'sorteio <- rand()', tip:'Gera um real maior ou igual a zero e menor que um.' },
        randi:{ example:'dado <- randi(6) + 1', tip:'randi(6) gera de 0 a 5; some 1 para obter um dado de 1 a 6.' },
        compr:{ example:'tamanho <- compr("VisuAlg") // 7', tip:'Conta unidades de texto; espaços também entram na contagem.' },
        copia:{ example:'iniciais <- copia("Ana Silva", 1, 3)', tip:'A primeira posição é 1 e o terceiro argumento informa quantos caracteres extrair.' },
        maiusc:{ example:'resposta <- maiusc("sim") // "SIM"', tip:'A conversão não altera a variável original; atribua o resultado se quiser guardá-lo.' },
        minusc:{ example:'comando <- minusc("SAIR") // "sair"', tip:'Útil para comparar texto sem depender da caixa digitada.' },
        asc:{ example:'codigo <- asc("A")', tip:'Retorna o código do primeiro caractere; texto vazio resulta em zero.' },
        carac:{ example:'letra <- carac(65) // "A"', tip:'O argumento deve ser inteiro entre 0 e 65535.' },
        pos:{ example:'posicao <- pos("alg", "VisuAlg")', tip:'A posição começa em 1; zero significa que o trecho não foi encontrado.' },
        caracpnum:{ example:'preco <- caracpnum("12,50")', tip:'Aceita ponto ou vírgula decimal e ignora espaços nas extremidades.' },
        numpcarac:{ example:'mensagem <- "Total: " + numpcarac(total)', tip:'Transforma o número em texto para concatenar com outras strings.' }
    };
    function enrichEditorHelpEntry(key, entry) {
        var details = EDITOR_HELP_DETAILS[key];
        return details ? Object.assign({}, entry, details) : entry;
    }
    var hintMenu = null;
    var hintItems = [];
    var hintIndex = 0;
    var hintStart = null;
    var mobileHintTimer = null;
    var variableSourceCache = null;
    var variableCompletionCache = [];
    var recentPair = null;
    var contextHelpElement = null;
    var contextHelpTimer = 0;
    var hoverHelpTimer = 0;
    var contextHelpHideTimer = 0;
    var helpNavigationGeneration = 0;
    var contextHelpHoverAnchor = null;
    var lastContextHelpKey = '';
    var PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"' };
    var CLOSERS = ')]}';

    var IDENTIFIER_CHARS = 'A-Za-z0-9_' + ACCENT_CHARS;
    var IDENTIFIER_PATTERN = '[A-Za-z_' + ACCENT_CHARS + '][' + IDENTIFIER_CHARS + ']*';
    var DECLARED_NAMES_PATTERN = '(' + IDENTIFIER_PATTERN + '(?:\\s*,\\s*' + IDENTIFIER_PATTERN + ')*)';
    var VARIABLE_TYPE_PATTERN = '(?:inteiro|real|numerico|numérico|caractere|caracter|caráter|literal|logico|lógico|vetor)';

    function addDeclaredNames(group, result, seen) {
        group.split(',').forEach(function (rawName) {
            var name = rawName.trim();
            var key = name.toLocaleLowerCase('pt-BR');
            if (name && !seen[key]) {
                seen[key] = true;
                result.push(name);
            }
        });
    }

    function getDeclaredVariables(cm) {
        var source = cm.getValue();
        if (source === variableSourceCache) return variableCompletionCache;

        var variables = [];
        var seen = {};
        var declarationPattern = new RegExp('^\\s*' + DECLARED_NAMES_PATTERN + '\\s*:\\s*' + VARIABLE_TYPE_PATTERN + '(?![' + IDENTIFIER_CHARS + '])', 'i');
        var headerPattern = new RegExp('^\\s*(?:procedimento|funcao|função)\\s+' + IDENTIFIER_PATTERN + '\\s*\\((.*)\\)', 'i');

        source.split('\n').forEach(function (sourceLine) {
            var line = sourceLine.replace(/\/\/.*$/, '');
            var declaration = declarationPattern.exec(line);
            if (declaration) addDeclaredNames(declaration[1], variables, seen);

            var header = headerPattern.exec(line);
            if (!header) return;
            var parameterPattern = new RegExp('(?:^|[;,])\\s*(?:var\\s+)?' + DECLARED_NAMES_PATTERN + '\\s*:\\s*' + VARIABLE_TYPE_PATTERN + '(?![' + IDENTIFIER_CHARS + '])', 'gi');
            var parameter;
            while ((parameter = parameterPattern.exec(header[1]))) addDeclaredNames(parameter[1], variables, seen);
        });

        variableSourceCache = source;
        variableCompletionCache = variables;
        return variables;
    }

    function usesMobileAutocomplete() {
        return window.innerWidth <= 760 || (window.innerWidth <= 950 && window.innerHeight <= 500);
    }
    function publishMobileHints() {
        document.dispatchEvent(new window.CustomEvent('visualg:autocomplete-suggestions', { detail: { items: hintItems.slice(), selectedIndex: hintIndex } }));
    }
    function closeHints() {
        if (hintMenu) hintMenu.remove();
        hintMenu = null;
        hintItems = [];
        hintStart = null;
        publishMobileHints();
    }
    function acceptHint(cm) {
        if (!hintItems.length || !hintStart) return false;
        var entry = hintItems[hintIndex];
        var cursor = cm.getCursor();
        var insert = entry.insert || entry.label;
        var offset = entry.cursor;
        if (insert.endsWith('()') && cm.getLine(cursor.line).charAt(cursor.ch) === '(') {
            insert = entry.label;
            offset = insert.length + 1;
        }
        var start = hintStart;
        if (insert.indexOf('\n') !== -1) {
            var indentation = /^\s*/.exec(cm.getLine(start.line))[0];
            if (start.ch >= indentation.length) {
                if (offset !== undefined) offset = insert.slice(0, offset).replace(/\n/g, '\n' + indentation).length;
                insert = insert.replace(/\n/g, '\n' + indentation);
            }
        }
        cm.operation(function () {
            cm.replaceRange(insert, start, cursor);
            if (offset !== undefined) {
                var prefix = insert.slice(0, offset).split('\n');
                cm.setCursor({ line:start.line + prefix.length - 1, ch:(prefix.length === 1 ? start.ch + offset : prefix[prefix.length - 1].length) });
            }
        });
        closeHints(); return true;
    }
    function showHints(cm, explicit) {
        closeHints();
        var cursor = cm.getCursor(); var before = cm.getLine(cursor.line).slice(0, cursor.ch);
        if (/comment|string/.test(cm.getTokenTypeAt(cursor) || '')) return false;
        var match = /[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9_]*$/.exec(before);
        if (!match && !explicit) return false;
        if (match && !explicit && match[0].length < (usesMobileAutocomplete() ? 1 : 2)) return false;
        var word = match ? match[0].toLocaleLowerCase('pt-BR') : '';
        var candidates = getDeclaredVariables(cm).map(function (name) { return { label:name, detail:'Variável declarada' }; }).concat(completions);
        var seen = {};
        hintItems = candidates.filter(function (entry) {
            var normalized = entry.label.toLocaleLowerCase('pt-BR');
            if (!normalized.startsWith(word) || normalized === word || seen[normalized]) return false;
            seen[normalized] = true;
            return true;
        }).slice(0, 8);
        if (!hintItems.length) return false;
        hintStart = { line: cursor.line, ch: cursor.ch - (match ? match[0].length : 0) }; hintIndex = 0;
        if (usesMobileAutocomplete()) {
            publishMobileHints();
            return true;
        }
        hintMenu = document.createElement('div'); hintMenu.className = 'visualg-hints'; hintMenu.setAttribute('role', 'listbox');
        hintItems.forEach(function (entry, index) {
            var option = document.createElement('button'); option.type = 'button';
            var name = document.createElement('strong'); name.textContent = entry.insert && entry.insert.endsWith('()') ? entry.insert : entry.label;
            option.appendChild(name);
            var detail = document.createElement('small'); detail.textContent = entry.detail || 'Palavra-chave do VisuAlg'; option.appendChild(detail);
            if (index === 0) option.classList.add('selected');
            option.addEventListener('pointerdown', function (event) { event.preventDefault(); });
            option.addEventListener('click', function () { hintIndex = index; acceptHint(cm); cm.focus(); });
            hintMenu.appendChild(option);
        });
        document.body.appendChild(hintMenu);
        var coords = cm.cursorCoords(cursor, 'window');
        var viewport = window.visualViewport;
        var viewportLeft = viewport ? viewport.offsetLeft : 0;
        var viewportTop = viewport ? viewport.offsetTop : 0;
        var viewportWidth = viewport ? viewport.width : window.innerWidth;
        var viewportHeight = viewport ? viewport.height : window.innerHeight;
        var toolbarSpace = document.body.classList.contains('mobile-editor-focused') ? 52 : 8;
        hintMenu.style.left = Math.max(viewportLeft + 8, Math.min(coords.left, viewportLeft + viewportWidth - hintMenu.offsetWidth - 8)) + 'px';
        hintMenu.style.top = Math.max(viewportTop + 8, Math.min(coords.bottom + 4, viewportTop + viewportHeight - hintMenu.offsetHeight - toolbarSpace)) + 'px';
        return true;
    }
    function moveHint(delta) {
        if (!hintItems.length) return false;
        hintIndex = (hintIndex + delta + hintItems.length) % hintItems.length;
        if (hintMenu) Array.prototype.forEach.call(hintMenu.children, function (item, index) { item.classList.toggle('selected', index === hintIndex); });
        else publishMobileHints();
        return true;
    }

    function getEditorHelpEntry(name, cm, position) {
        var rawName = String(name || '');
        var key = rawName.toLocaleLowerCase('pt-BR');
        var lookupKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        var helpAliases = { declare:'var' };
        lookupKey = helpAliases[lookupKey] || lookupKey;
        var source = cm.getValue();
        if (Object.prototype.hasOwnProperty.call(EDITOR_HELP, lookupKey)) {
            var entry = EDITOR_HELP[lookupKey];
            var currentLine = position && cm.getLine(position.line) || '';
            if (lookupKey === 'faca' && /\benquanto\b/i.test(currentLine)) return enrichEditorHelpEntry(lookupKey, Object.assign({}, entry, { description:'Fecha o cabeçalho do laço enquanto e inicia o bloco repetido.', section:'enquanto...faca', example:'enquanto contador < 3 faca\n  contador <- contador + 1\nfimenquanto' }));
            if (lookupKey === 'ate' && /\bpara\b/i.test(currentLine)) return enrichEditorHelpEntry(lookupKey, Object.assign({}, entry, { description:'Define o limite final do laço para. O limite é avaliado antes das repetições.', section:'para...ate...faca', example:'para i de 1 ate 5 faca' }));
            if (lookupKey === 'senao' && /\bsenao\s+se\b/i.test(currentLine)) return enrichEditorHelpEntry(lookupKey, Object.assign({}, entry, { section:'senao se', example:'senao se nota >= 7 entao' }));
            return enrichEditorHelpEntry(lookupKey, entry);
        }
        var identifier = '[A-Za-z_À-ÿ][A-Za-z0-9_À-ÿ]*';
        var variableDeclaration = new RegExp('^\\s*(' + identifier + '(?:\\s*,\\s*' + identifier + ')*)\\s*:\\s*(vetor(?:\\s*\\[[^\\]]+\\]\\s*de\\s*)?(?:inteiro|real|numerico|numérico|caractere|caracter|caráter|literal|logico|lógico))', 'i');
        var declaredType = null;
        source.split('\n').some(function (line) {
            var match = variableDeclaration.exec(line.replace(/\/\/.*$/, ''));
            if (!match) return false;
            var names = match[1].split(',').map(function (part) { return part.trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); });
            if (names.indexOf(lookupKey) < 0) return false;
            declaredType = match[2].trim(); return true;
        });
        if (declaredType) {
            var isVector = /^vetor/i.test(declaredType);
            var normalizedType = declaredType.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/^vetor(?:\s*\[[^\]]+\]\s*de\s*)?/, '');
            var sampleValue = /^(inteiro)$/.test(normalizedType) ? '0' : /^(real|numerico)$/.test(normalizedType) ? '0.0' : /^(logico)$/.test(normalizedType) ? 'verdadeiro' : '"texto"';
            return { signature:rawName + ': ' + declaredType, description:'Variável declarada neste algoritmo. ' + declaredType + ' define os valores que ela aceita; vetores também exigem um índice válido entre colchetes.', example:isVector ? rawName + '[indice] <- ' + sampleValue : rawName + ' <- ' + sampleValue, tip:isVector ? 'Use um índice entre os limites declarados para acessar uma posição.' : 'O valor atribuído precisa ser compatível com o tipo declarado.', doc:'introducao', section:isVector ? 'Vetores' : 'Tipos de dados' };
        }
        var declaration = new RegExp('(?:funcao|função|procedimento)\\s+' + rawName + '\\s*(?:\\(([^)]*)\\))?', 'i').exec(source);
        if (!declaration) return null;
        var rawParams = (declaration[1] || '').trim();
        var params = rawParams ? rawParams.split(/[;,]/).map(function (part) { return part.trim().replace(/^var\s+/i, '').split(':')[0].trim(); }).filter(Boolean) : [];
        var isFunction = /^fun(?:cao|ção)/i.test(declaration[0]);
        return { signature:rawName + '(' + rawParams + ')', description:isFunction ? 'Função definida neste algoritmo. Ela recebe os argumentos indicados e devolve um valor para a expressão que a chamou.' : 'Procedimento definido neste algoritmo. Ele executa comandos; parâmetros marcados com var podem alterar as variáveis passadas na chamada.', example:rawName + '(' + params.join(', ') + ')', tip:isFunction ? 'Use o resultado dentro de uma expressão ou atribua-o a uma variável.' : 'A chamada executa o bloco; confirme a ordem e a quantidade dos argumentos.', doc:isFunction ? 'funcoes' : 'subprogramas', section:isFunction ? 'Sintaxe' : 'Procedimento com parâmetros', parameters:params };
    }

    function hideContextHelp(delay) {
        window.clearTimeout(contextHelpTimer);
        if (delay) {
            window.clearTimeout(contextHelpHideTimer);
            contextHelpHideTimer = window.setTimeout(function () { contextHelpHideTimer = 0; hideContextHelp(); }, delay);
        } else if (contextHelpElement) { contextHelpElement.hidden = true; lastContextHelpKey = ''; contextHelpHoverAnchor = null; }
    }

    function scheduleContextHelpHide(delay) {
        window.clearTimeout(contextHelpHideTimer);
        contextHelpHideTimer = window.setTimeout(function () {
            contextHelpHideTimer = 0;
            if (!contextHelpElement || contextHelpElement.hidden || contextHelpElement.matches(':hover')) return;
            hideContextHelp();
        }, delay);
    }

    function openHelpDocumentation(entry) {
        var workspace = window.VisualGWorkspace;
        if (!workspace || !entry.doc) return;
        var generation = ++helpNavigationGeneration;
        var normalized = String(entry.section || '').toLocaleLowerCase('pt-BR').replace(/[^a-z0-9áàâãéèêíìîóòôõúùûç]+/gi, ' ').trim();
        var finished = false;
        var timeout;
        function cleanup() { if (finished) return; finished = true; document.removeEventListener('visualg:documentation-rendered', onRendered); window.clearTimeout(timeout); }
        function waitForImage(image) {
            if (image.complete) return image.decode ? image.decode().catch(function () {}) : Promise.resolve();
            return new Promise(function (resolve) {
                var settled = false;
                var imageTimeout = window.setTimeout(done, 5000);
                function done() {
                    if (settled) return;
                    settled = true; window.clearTimeout(imageTimeout);
                    image.removeEventListener('load', done); image.removeEventListener('error', done);
                    if (image.decode) image.decode().then(resolve, resolve); else resolve();
                }
                image.addEventListener('load', done, { once:true }); image.addEventListener('error', done, { once:true });
            });
        }
        function nextFrame() { return new Promise(function (resolve) { window.requestAnimationFrame(resolve); }); }
        function scrollToSection(article) {
            if (!normalized) return;
            var heading = Array.prototype.find.call(article.querySelectorAll('h1,h2,h3,h4'), function (item) {
                return item.textContent.toLocaleLowerCase('pt-BR').replace(/[^a-z0-9áàâãéèêíìîóòôõúùûç]+/gi, ' ').trim() === normalized;
            });
            if (!heading) return;
            var imagesBeforeHeading = Array.prototype.filter.call(article.querySelectorAll('img'), function (image) {
                return !!(image.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING);
            });
            var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready.catch(function () {}) : Promise.resolve();
            Promise.all([Promise.all(imagesBeforeHeading.map(waitForImage)), fontsReady]).then(function () {
                return nextFrame().then(nextFrame);
            }).then(function () {
                if (generation !== helpNavigationGeneration || !article.isConnected) return;
                var scroller = article.closest('.workspace-aux-view');
                if (!scroller) return;
                var target = scroller.scrollTop + heading.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 24;
                scroller.scrollTo({ top:Math.max(0, target), behavior:usesMobileAutocomplete() ? 'auto' : 'smooth' });
            });
        }
        function onRendered(event) {
            if (!event.detail || event.detail.id !== entry.doc) return;
            cleanup();
            scrollToSection(event.detail.article);
        }
        document.addEventListener('visualg:documentation-rendered', onRendered);
        timeout = window.setTimeout(cleanup, 15000);
        workspace.showDoc(entry.doc);
    }

    function positionHelpElement(cm, position, preferAbove) {
        if (!contextHelpElement) return;
        var coords = cm.cursorCoords(position, 'window');
        var viewport = window.visualViewport;
        var leftEdge = viewport ? viewport.offsetLeft : 0;
        var topEdge = viewport ? viewport.offsetTop : 0;
        var width = viewport ? viewport.width : window.innerWidth;
        var height = viewport ? viewport.height : window.innerHeight;
        var x = Math.max(leftEdge + 8, Math.min(coords.left, leftEdge + width - contextHelpElement.offsetWidth - 8));
        var above = coords.top - contextHelpElement.offsetHeight - 8;
        var y = preferAbove && above >= topEdge + 8 ? above : Math.min(coords.bottom + 8, topEdge + height - contextHelpElement.offsetHeight - 8);
        contextHelpElement.style.left = x + 'px'; contextHelpElement.style.top = Math.max(topEdge + 8, y) + 'px';
    }

    function ensureContextHelp() {
        if (contextHelpElement) return contextHelpElement;
        contextHelpElement = document.createElement('section'); contextHelpElement.className = 'visualg-context-help'; contextHelpElement.hidden = true;
        contextHelpElement.setAttribute('role', 'dialog'); contextHelpElement.setAttribute('aria-label', 'Ajuda contextual do código');
        contextHelpElement.addEventListener('pointerenter', function () { window.clearTimeout(contextHelpHideTimer); contextHelpHideTimer = 0; });
        contextHelpElement.addEventListener('pointerleave', function () { scheduleContextHelpHide(120); });
        document.addEventListener('pointerdown', function (event) {
            if (contextHelpElement && !contextHelpElement.hidden && !contextHelpElement.contains(event.target)) hideContextHelp();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && contextHelpElement && !contextHelpElement.hidden) hideContextHelp();
        });
        document.body.appendChild(contextHelpElement);
        return contextHelpElement;
    }

    function highlightContextExample(source, codeElement) {
        if (!CodeMirror.getMode || !CodeMirror.StringStream) { codeElement.textContent = source; return; }
        var mode = CodeMirror.getMode(CodeMirror.defaults, 'visualg');
        var state = CodeMirror.startState(mode);
        var lines = source.split('\n');
        lines.forEach(function (line, lineIndex) {
            if (!line.length && mode.blankLine) mode.blankLine(state);
            var stream = new CodeMirror.StringStream(line, CodeMirror.defaults.tabSize || 4);
            while (!stream.eol()) {
                stream.start = stream.pos;
                var style = mode.token(stream, state);
                if (stream.pos <= stream.start) stream.pos = stream.start + 1;
                var token = document.createElement('span');
                if (style) token.className = style.split(/\s+/).map(function (name) { return 'cm-' + name; }).join(' ');
                token.textContent = line.slice(stream.start, stream.pos);
                codeElement.appendChild(token);
            }
            if (lineIndex < lines.length - 1) codeElement.appendChild(document.createTextNode('\n'));
        });
    }

    function renderContextHelp(cm, name, entry, position, activeParameter, signatureMode) {
        window.clearTimeout(contextHelpHideTimer);
        contextHelpHideTimer = 0;
        var panel = ensureContextHelp();
        var cacheKey = [signatureMode ? 'signature:' + activeParameter : 'hover', name.toLocaleLowerCase('pt-BR'), entry.doc, entry.section, entry.description, entry.example, entry.tip].join(':');
        if (lastContextHelpKey !== cacheKey || panel.hidden) {
            panel.replaceChildren(); panel.className = 'visualg-context-help' + (signatureMode ? ' is-signature-help' : '');
            var heading = document.createElement('strong'); heading.className = 'visualg-context-title'; heading.textContent = entry.signature || name;
            panel.appendChild(heading);
            if (signatureMode && entry.parameters && entry.parameters.length) {
                var parameters = document.createElement('div'); parameters.className = 'visualg-context-parameters';
                entry.parameters.forEach(function (parameter, index) { var item = document.createElement('span'); item.textContent = parameter; if (index === activeParameter) item.className = 'current'; parameters.appendChild(item); if (index < entry.parameters.length - 1) parameters.appendChild(document.createTextNode(', ')); });
                panel.appendChild(parameters);
            }
            var description = document.createElement('p'); description.textContent = entry.description || 'Consulte a documentação para ver a sintaxe e os exemplos.'; panel.appendChild(description);
            if (entry.example) {
                var example = document.createElement('div'); example.className = 'visualg-context-example';
                var exampleLabel = document.createElement('span'); exampleLabel.textContent = 'Exemplo';
                var examplePre = document.createElement('pre'); examplePre.className = 'visualg-context-code';
                var exampleCode = document.createElement('code'); highlightContextExample(entry.example, exampleCode);
                examplePre.appendChild(exampleCode); example.append(exampleLabel, examplePre); panel.appendChild(example);
            }
            if (entry.tip) {
                var tip = document.createElement('p'); tip.className = 'visualg-context-tip'; tip.textContent = entry.tip; panel.appendChild(tip);
            }
            var link = document.createElement('button'); link.type = 'button'; link.className = 'visualg-context-doc-link'; link.textContent = 'Abrir explicação na documentação →';
            link.addEventListener('click', function () { panel.hidden = true; openHelpDocumentation(entry); }); panel.appendChild(link);
            lastContextHelpKey = cacheKey;
        }
        panel.hidden = false; positionHelpElement(cm, position, !!signatureMode);
    }

    function getCallContext(cm) {
        var cursor = cm.getCursor();
        var source = cm.getValue().slice(0, cm.indexFromPos(cursor));
        source = source.replace(/"(?:[^"\\]|\\.)*"/g, function (text) { return text.replace(/[^\n]/g, ' '); }).replace(/\/\/[^\n]*/g, function (text) { return text.replace(/[^\n]/g, ' '); }).replace(/\{[\s\S]*?\}/g, function (text) { return text.replace(/[^\n]/g, ' '); });
        var stack = [];
        for (var i = 0; i < source.length; i++) {
            if (source[i] === '(') {
                var before = source.slice(0, i); var nameMatch = /([A-Za-zÀ-ÿ_][A-Za-zÀ-ÿ0-9_]*)\s*$/.exec(before);
                stack.push({ name:nameMatch ? nameMatch[1] : '', commas:0 });
            } else if (source[i] === ')' && stack.length) stack.pop();
            else if (source[i] === ',' && stack.length) stack[stack.length - 1].commas++;
        }
        return stack.length ? stack[stack.length - 1] : null;
    }

    function updateSignatureHelp(cm) {
        if (/comment|string/.test(cm.getTokenTypeAt(cm.getCursor()) || '')) { hideContextHelp(); return; }
        var call = getCallContext(cm);
        var entry = call && call.name ? getEditorHelpEntry(call.name, cm, cm.getCursor()) : null;
        if (!call || !entry) { if (contextHelpElement && contextHelpElement.classList.contains('is-signature-help')) hideContextHelp(); return; }
        if (!entry.parameters && entry.signature) {
            var params = /\((.*)\)/.exec(entry.signature);
            entry.parameters = params && params[1].trim() ? params[1].split(',').map(function (part) { return part.trim(); }) : [];
        }
        if (!entry.parameters || !entry.parameters.length) { hideContextHelp(); return; }
        renderContextHelp(cm, call.name, entry, cm.getCursor(), Math.min(call.commas, entry.parameters.length - 1), true);
    }

    function showHoverHelp(cm, event) {
        if (usesMobileAutocomplete()) return;
        var position = cm.coordsChar({ left:event.clientX, top:event.clientY }, 'window');
        var token = cm.getTokenAt(position);
        if (!token || !token.string || /comment|string/.test(token.type || '')) { hideContextHelp(140); return; }
        var name = token.string.replace(/^[^A-Za-zÀ-ÿ_]+|[^A-Za-zÀ-ÿ0-9_]+$/g, '');
        if (!name && Object.prototype.hasOwnProperty.call(EDITOR_HELP, token.string)) name = token.string;
        if (!name) { hideContextHelp(140); return; }
        var entry = getEditorHelpEntry(name, cm, position);
        if (!entry) { hideContextHelp(140); return; }
        contextHelpHoverAnchor = { name:name.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, ''), line:position.line, start:token.start, end:token.end };
        renderContextHelp(cm, name, entry, { line:position.line, ch:token.start }, false);
    }

    function scheduleMobileHints(cm) {
        if (!usesMobileAutocomplete()) return;
        window.clearTimeout(mobileHintTimer);
        mobileHintTimer = window.setTimeout(function () {
            if (cm.hasFocus()) showHints(cm, false);
        }, 45);
    }

    function isLiteralContext(tokenType) {
        return /(?:^|\s)(?:comment|string)(?:\s|$)/.test(tokenType);
    }

    function handleDelimiter(cm, character) {
        if (cm.getOption('disableInput')) return false;
        if (cm.somethingSelected()) return surroundSelection(cm, character);
        if (cm.listSelections().length !== 1) return false;
        var cursor = cm.getCursor();
        var line = cm.getLine(cursor.line) || '';
        var ahead = line.charAt(cursor.ch);
        var tokenType = cm.getTokenTypeAt(cursor) || '';
        var literal = isLiteralContext(tokenType);
        var freshCloser = recentPair && recentPair.line === cursor.line && recentPair.ch === cursor.ch && recentPair.closing === character;
        var shouldSkip = freshCloser || (CLOSERS.includes(character) && !literal) || (character === '"' && /string/.test(tokenType));
        if (ahead === character && shouldSkip) {
            cm.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
            recentPair = null;
            closeHints();
            return true;
        }
        var closing = PAIRS[character];
        if (!closing || literal || character === '"' && line.charAt(cursor.ch - 1) === '\\') return false;
        if (ahead === closing || ahead && !/[\s)\]},;]/.test(ahead)) return false;
        cm.operation(function () {
            cm.replaceSelection(character + closing, 'end', '+input');
            cm.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
        });
        recentPair = { line: cursor.line, ch: cursor.ch + 1, opening: character, closing: closing };
        closeHints();
        return true;
    }

    function deleteFreshPair(cm) {
        if (!recentPair || cm.somethingSelected() || cm.listSelections().length !== 1) return false;
        var cursor = cm.getCursor();
        if (cursor.line !== recentPair.line || cursor.ch !== recentPair.ch) return false;
        var line = cm.getLine(cursor.line) || '';
        if (line.charAt(cursor.ch - 1) !== recentPair.opening || line.charAt(cursor.ch) !== recentPair.closing) return false;
        cm.replaceRange('', { line: cursor.line, ch: cursor.ch - 1 }, { line: cursor.line, ch: cursor.ch + 1 }, '+delete');
        cm.setCursor({ line: cursor.line, ch: cursor.ch - 1 });
        recentPair = null;
        return true;
    }

    var searchWidget = null;
    var searchMark = null;
    var searchInputTimer = 0;
    function clearSearchMark() { if (searchMark) searchMark.clear(); searchMark = null; }
    function openSearch(cm, withReplace) {
        if (!searchWidget) {
            var widget = document.createElement('div'); widget.className = 'cm-search-widget'; widget.setAttribute('role', 'search');
            var query = document.createElement('input'); query.type = 'search'; query.placeholder = 'Localizar no código'; query.setAttribute('aria-label', 'Localizar no código');
            var replacement = document.createElement('input'); replacement.type = 'text'; replacement.placeholder = 'Substituir por'; replacement.setAttribute('aria-label', 'Substituir por');
            var caseLabel = document.createElement('label'); caseLabel.className = 'cm-search-case'; var caseToggle = document.createElement('input'); caseToggle.type = 'checkbox'; caseToggle.setAttribute('aria-label', 'Diferenciar maiúsculas e minúsculas'); caseLabel.append(caseToggle, document.createTextNode('Aa'));
            var status = document.createElement('span'); status.className = 'cm-search-count'; status.setAttribute('aria-live', 'polite');
            function action(label, title, callback) { var button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.title = title; button.addEventListener('click', callback); widget.appendChild(button); return button; }
            widget.append(query, replacement, caseLabel); var count = status; widget.appendChild(count);
            var state = { element:widget, query:query, replacement:replacement, caseToggle:caseToggle, status:status, cm:null, replaceMode:false, replaceButtons:[] };
            function find(direction) {
                var editor = state.cm; var needle = query.value; clearSearchMark();
                if (!editor || !needle) { status.textContent = needle ? '0 resultados' : ''; return; }
                var haystack = editor.getValue(); var matchText = caseToggle.checked ? haystack : haystack.toLocaleLowerCase('pt-BR'); var searchText = caseToggle.checked ? needle : needle.toLocaleLowerCase('pt-BR');
                var selected = editor.listSelections()[0]; var from = editor.indexFromPos(direction > 0 ? selected.to() : selected.from());
                var at = direction > 0 ? matchText.indexOf(searchText, selected.from().line === selected.to().line && selected.from().ch !== selected.to().ch ? from : from + (editor.somethingSelected() ? 0 : 1)) : matchText.lastIndexOf(searchText, Math.max(0, from - (editor.somethingSelected() ? 0 : 1)));
                if (at < 0) at = direction > 0 ? matchText.indexOf(searchText) : matchText.lastIndexOf(searchText);
                if (at < 0) { status.textContent = '0 resultados'; return; }
                var start = editor.posFromIndex(at); var end = editor.posFromIndex(at + needle.length);
                editor.setSelection(start, end); editor.scrollIntoView({ from:start, to:end }, 80); searchMark = editor.markText(start, end, { className:'cm-search-current' });
                var total = 0; var cursor = 0; while ((cursor = matchText.indexOf(searchText, cursor)) !== -1) { total++; cursor += Math.max(1, searchText.length); }
                status.textContent = total + ' resultado' + (total === 1 ? '' : 's');
            }
            action('↑', 'Resultado anterior', function () { window.clearTimeout(searchInputTimer); find(-1); }); action('↓', 'Próximo resultado', function () { window.clearTimeout(searchInputTimer); find(1); });
            var replaceOne = action('Substituir', 'Substituir ocorrência atual', function () { var editor = state.cm; if (editor && editor.somethingSelected()) { editor.replaceSelection(replacement.value, 'end', '+input'); find(1); } });
            var replaceAll = action('Tudo', 'Substituir todas as ocorrências', function () { var editor = state.cm; var needle = query.value; if (!editor || !needle) return; var flags = caseToggle.checked ? 'g' : 'gi'; var escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); var result = editor.getValue().replace(new RegExp(escaped, flags), replacement.value); var lastLine = editor.lastLine(); editor.replaceRange(result, { line:0, ch:0 }, { line:lastLine, ch:editor.getLine(lastLine).length }, '+input'); clearSearchMark(); status.textContent = 'Substituição concluída'; });
            state.replaceButtons = [replaceOne, replaceAll];
            action('×', 'Fechar busca', function () { window.clearTimeout(searchInputTimer); clearSearchMark(); widget.remove(); searchWidget = null; state.cm.focus(); });
            query.addEventListener('keydown', function (event) { if (event.key === 'Enter') { event.preventDefault(); window.clearTimeout(searchInputTimer); find(event.shiftKey ? -1 : 1); } if (event.key === 'Escape') { event.preventDefault(); window.clearTimeout(searchInputTimer); clearSearchMark(); widget.remove(); searchWidget = null; state.cm.focus(); } });
            query.addEventListener('input', function () { window.clearTimeout(searchInputTimer); searchInputTimer = window.setTimeout(function () { searchInputTimer = 0; find(1); }, 80); });
            caseToggle.addEventListener('change', function () { window.clearTimeout(searchInputTimer); find(1); });
            document.body.appendChild(widget); searchWidget = state;
        }
        searchWidget.cm = cm; searchWidget.replaceMode = withReplace; searchWidget.replacement.hidden = !withReplace;
        searchWidget.replaceButtons.forEach(function (button) { button.hidden = !withReplace; });
        searchWidget.element.classList.toggle('is-replace-mode', withReplace);
        var selection = cm.getSelection(); if (selection && !searchWidget.query.value) searchWidget.query.value = selection;
        searchWidget.element.hidden = false; searchWidget.query.focus(); searchWidget.query.select();
        if (searchWidget.query.value) { var evt = new window.Event('input'); searchWidget.query.dispatchEvent(evt); }
    }

    function selectNextOccurrence(cm) {
        var selection = cm.getSelection();
        if (!selection) {
            var word = cm.findWordAt(cm.getCursor()); selection = cm.getRange(word.anchor, word.head);
            if (!selection) return;
            cm.setSelection(word.anchor, word.head);
        }
        var source = cm.getValue(); var needle = selection; var start = cm.indexFromPos(cm.listSelections()[cm.listSelections().length - 1].to());
        var next = source.indexOf(needle, start);
        if (next < 0) next = source.indexOf(needle, 0);
        if (next < 0) return;
        var end = next + needle.length; var overlaps = cm.listSelections().some(function (range) { var a = cm.indexFromPos(range.from()); var b = cm.indexFromPos(range.to()); return next < b && end > a; });
        if (overlaps) { next = source.indexOf(needle, end); if (next < 0) return; }
        var ranges = cm.listSelections().slice(); ranges.push({ anchor:cm.posFromIndex(next), head:cm.posFromIndex(next + needle.length) });
        cm.setSelections(ranges, ranges.length - 1); cm.focus();
    }

    function selectAllOccurrences(cm) {
        var needle = cm.getRange(cm.getCursor('anchor'), cm.getCursor('head'));
        if (!needle) {
            var word = cm.findWordAt(cm.getCursor());
            needle = cm.getRange(word.anchor, word.head);
        }
        if (!needle) return;
        var source = cm.getValue(); var ranges = []; var index = 0;
        while ((index = source.indexOf(needle, index)) !== -1) {
            ranges.push({ anchor:cm.posFromIndex(index), head:cm.posFromIndex(index + needle.length) });
            index += needle.length;
        }
        if (!ranges.length) return;
        cm.setSelections(ranges, 0); cm.focus();
    }

    function surroundSelection(cm, opening) {
        if (!cm.somethingSelected()) return false;
        var closing = PAIRS[opening]; if (!closing) return false;
        var ranges = cm.listSelections(); var selected = ranges.map(function (range) { return cm.getRange(range.from(), range.to()); });
        var starts = ranges.map(function (range) { return cm.indexFromPos(range.from()); });
        cm.replaceSelections(selected.map(function (text) { return opening + text + closing; }), 'around', '+input');
        var result = ranges.map(function (range, index) { var prior = index; var start = starts[index] + prior * 2 + 1; return { anchor:cm.posFromIndex(start), head:cm.posFromIndex(start + selected[index].length) }; });
        cm.setSelections(result, result.length - 1); recentPair = null; return true;
    }


    function replaceSelection(cm, text, cursorOffset) {
        var selections = cm.listSelections();
        cm.operation(function () {
            cm.replaceSelections(selections.map(function () { return text; }), 'end', '+input');
            if (selections.length === 1 && typeof cursorOffset === 'number') {
                var cursor = cm.getCursor();
                cm.setCursor({ line: cursor.line, ch: Math.max(0, cursor.ch - cursorOffset) });
            }
        });
        cm.focus();
    }

    window.VisualGEditor = {
        instance: null,

        init: function (hostElement) {
            this.instance = CodeMirror(hostElement, {
                mode: 'visualg',
                theme: 'tokyonight',
                lineNumbers: true,
                indentUnit: 2,
                tabSize: 2,
                indentWithTabs: false,
                lineWrapping: false,
                matchBrackets: true,
                styleActiveLine: false,
                extraKeys: {
                    'Ctrl-Space': function (cm) { showHints(cm, true); },
                    'Enter': function (cm) { if (!acceptHint(cm)) cm.execCommand('newlineAndIndent'); },
                    'Tab': function (cm) {
                        if (cm.somethingSelected()) { closeHints(); cm.execCommand('indentMore'); }
                        else if (!acceptHint(cm)) cm.execCommand('insertSoftTab');
                    },
                    'Esc': function () { closeHints(); hideContextHelp(); },
                    'Down': function (cm) { if (!moveHint(1)) cm.execCommand('goLineDown'); },
                    'Up': function (cm) { if (!moveHint(-1)) cm.execCommand('goLineUp'); },
                    'Shift-Tab': 'indentLess',
                    'Ctrl-]': 'indentMore',
                    'Ctrl-[': 'indentLess',
                    'Cmd-]': 'indentMore',
                    'Cmd-[': 'indentLess',
                    'Ctrl-F': function (cm) { openSearch(cm, false); },
                    'Cmd-F': function (cm) { openSearch(cm, false); },
                    'Ctrl-H': function (cm) { openSearch(cm, true); },
                    'Cmd-Alt-F': function (cm) { openSearch(cm, true); },
                    'Ctrl-D': selectNextOccurrence,
                    'Cmd-D': selectNextOccurrence,
                    'Shift-Alt-F': function () { var button = document.getElementById('btn-tab-indent'); if (button) button.click(); },
                    'Backspace': function (cm) { return deleteFreshPair(cm) ? undefined : CodeMirror.Pass; },
                    'Cmd-/': 'toggleComment',
                    'Ctrl-/': 'toggleComment'
                },
                value: DEFAULT_PROGRAM
            });
            var cm = this.instance;
            cm.getInputField().addEventListener('keydown', function (event) {
                if (!(event.ctrlKey || event.metaKey) || !event.shiftKey || event.altKey || event.key.toLowerCase() !== 'l') return;
                event.preventDefault(); event.stopImmediatePropagation(); selectAllOccurrences(cm);
            }, true);
            cm.getWrapperElement().addEventListener('mousedown', function (event) {
                if (!event.altKey || event.button !== 0 || cm.getOption('readOnly')) return;
                var position = cm.coordsChar({ left:event.clientX, top:event.clientY }, 'window');
                var word = cm.findWordAt(position);
                var text = cm.getRange(word.anchor, word.head);
                event.preventDefault();
                if (text) cm.addSelection(word.anchor, word.head);
                else cm.setCursor(position);
                cm.focus();
            }, true);
            cm.getInputField().addEventListener('beforeinput', function (event) {
                if (event.isComposing) return;
                if (event.inputType === 'deleteContentBackward' && /Android/i.test(navigator.userAgent)) {
                    if (event.cancelable) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        if (!deleteFreshPair(cm)) cm.execCommand('delCharBefore');
                    } else {
                        var before = cm.getValue();
                        window.setTimeout(function () {
                            if (cm.getValue() === before && !cm.getOption('readOnly')) {
                                if (!deleteFreshPair(cm)) cm.execCommand('delCharBefore');
                            }
                        }, 0);
                    }
                    return;
                }
                if (!event.cancelable) return;
                if (event.inputType === 'deleteContentBackward' && deleteFreshPair(cm)) event.preventDefault();
                else if (event.inputType === 'insertText' && event.data && event.data.length === 1 && handleDelimiter(cm, event.data)) event.preventDefault();
            });
            this.instance.on('inputRead', function (cm) {
                hideContextHelp(); updateSignatureHelp(cm);
                if (usesMobileAutocomplete()) scheduleMobileHints(cm);
                else showHints(cm, false);
            });
            this.instance.on('cursorActivity', function (cm) {
                window.clearTimeout(contextHelpTimer);
                contextHelpTimer = window.setTimeout(function () { if (cm.hasFocus()) updateSignatureHelp(cm); }, 80);
            });
            var editorWrapper = this.instance.getWrapperElement();
            editorWrapper.addEventListener('mousemove', function (event) {
                if (event.buttons || usesMobileAutocomplete()) return;
                if (contextHelpElement && !contextHelpElement.hidden) {
                    if (contextHelpElement.classList.contains('is-signature-help')) return;
                    var pointerPosition = cm.coordsChar({ left:event.clientX, top:event.clientY }, 'window');
                    var pointerToken = cm.getTokenAt(pointerPosition);
                    var pointerName = pointerToken && pointerToken.string ? pointerToken.string.replace(/^[^A-Za-zÀ-ÿ_]+|[^A-Za-zÀ-ÿ0-9_]+$/g, '').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
                    var onAnchor = contextHelpHoverAnchor && pointerName === contextHelpHoverAnchor.name && pointerPosition.line === contextHelpHoverAnchor.line && pointerPosition.ch >= contextHelpHoverAnchor.start && pointerPosition.ch <= contextHelpHoverAnchor.end;
                    if (onAnchor) { window.clearTimeout(contextHelpHideTimer); contextHelpHideTimer = 0; }
                    else if (!contextHelpHideTimer) scheduleContextHelpHide(450);
                    return;
                }
                window.clearTimeout(hoverHelpTimer);
                hoverHelpTimer = window.setTimeout(function () { showHoverHelp(cm, event); }, 380);
            });
            editorWrapper.addEventListener('mouseleave', function () {
                window.clearTimeout(hoverHelpTimer);
                if (contextHelpElement && !contextHelpElement.hidden) scheduleContextHelpHide(450);
            });
            this.instance.on('change', function (cm, change) {
                recentPair = null;
                if (usesMobileAutocomplete() && change && change.origin !== 'setValue') scheduleMobileHints(cm);
            });
            this.instance.getInputField().addEventListener('compositionend', function () { scheduleMobileHints(window.VisualGEditor.instance); });
            this.instance.getInputField().addEventListener('input', function () { scheduleMobileHints(window.VisualGEditor.instance); });
            this.instance.on('blur', function (cm) {
                window.setTimeout(function () { if (!cm.hasFocus()) closeHints(); }, 180);
            });

            this.instance.on('renderLine', function (cm, line, el) {
                if (!_guideColors) {
                    el.style.backgroundImage = '';
                    return;
                }
                var text = line.text;
                var firstNonSpace = text.search(/\S/);
                if (firstNonSpace <= 0) {
                    el.style.backgroundImage = '';
                    return;
                }
                var tabSize = cm.getOption('indentUnit');
                var spaces = CodeMirror.countColumn(text, firstNonSpace, tabSize);
                var levels = Math.floor(spaces / tabSize);
                if (levels <= 0) { el.style.backgroundImage = ''; return; }

                var charWidth = cm.defaultCharWidth();
                var images = [], positions = [], sizes = [];
                for (var j = 1; j < levels; j++) {
                    var x = Math.round(j * tabSize * charWidth);
                    var color = _guideColors[j % _guideColors.length];
                    images.push('linear-gradient(to right,' + color + ' 1px,transparent 1px)');
                    positions.push(x + 'px 0');
                    sizes.push('1px 100%');
                }
                el.style.backgroundImage = images.join(',');
                el.style.backgroundPosition = positions.join(',');
                el.style.backgroundSize = sizes.join(',');
                el.style.backgroundRepeat = 'no-repeat';
            });
        },

        updateGuideColors: function () {
            var style = getComputedStyle(document.documentElement);
            var vars = ['--blue', '--green', '--yellow', '--orange', '--red', '--magenta'];
            _guideColors = vars.map(function (v) {
                var hex = style.getPropertyValue(v).trim();
                var r = parseInt(hex.slice(1, 3), 16);
                var g = parseInt(hex.slice(3, 5), 16);
                var b = parseInt(hex.slice(5, 7), 16);
                return 'rgba(' + r + ',' + g + ',' + b + ',0.25)';
            });
        },

        clearGuideColors: function () {
            _guideColors = null;
        },

        getValue: function () {
            return this.instance.getValue();
        },

        setValue: function (code) {
            this.instance.setValue(code);
        },

        showAutocomplete: function () {
            this.instance.focus();
            return showHints(this.instance, true);
        },

        acceptAutocomplete: function (index) {
            if (typeof index === 'number' && index >= 0 && index < hintItems.length) hintIndex = index;
            var accepted = acceptHint(this.instance);
            this.instance.focus();
            return accepted;
        },

        insertText: function (text) {
            replaceSelection(this.instance, text);
        },

        insertPair: function (pair) {
            var cm = this.instance;
            var selected = cm.getSelection();
            if (selected) {
                cm.replaceSelection(pair.charAt(0) + selected + pair.charAt(1), 'around', '+input');
                cm.focus();
                return;
            }
            if (!handleDelimiter(cm, pair.charAt(0))) replaceSelection(cm, pair.charAt(0));
            cm.focus();
        },

        indent: function () {
            this.instance.execCommand(this.instance.somethingSelected() ? 'indentMore' : 'insertSoftTab');
            this.instance.focus();
        },

        moveCursor: function (direction) {
            this.instance.execCommand(direction < 0 ? 'goCharLeft' : 'goCharRight');
            this.instance.focus();
        },

        highlightLine: function (lineNumber, className) {
            this.clearHighlight();
            if (lineNumber >= 0) {
                highlightedLine = lineNumber;
                highlightedLineClass = className || 'cm-highlight-line';
                this.instance.addLineClass(lineNumber, 'background', highlightedLineClass);
                if (highlightedLineClass === 'cm-debug-line') {
                    debugLine = lineNumber;
                    var marker = document.createElement('span');
                    marker.className = 'debug-current-marker';
                    marker.textContent = '▶';
                    marker.setAttribute('aria-label', 'Linha atual do debugger');
                    this.instance.setGutterMarker(lineNumber, 'debug-current', marker);
                }
                this.instance.scrollIntoView({ line: lineNumber, ch: 0 }, 50);
            }
        },

        revealLocation: function (lineNumber, columnNumber) {
            var line = Math.max(0, (parseInt(lineNumber, 10) || 1) - 1);
            var column = Math.max(0, (parseInt(columnNumber, 10) || 1) - 1);
            var lineText = this.instance.getLine(line) || '';

            column = Math.min(column, lineText.length);
            this.highlightLine(line, 'cm-error-line');
            this.instance.setCursor({ line: line, ch: column });
            this.instance.scrollIntoView({ line: line, ch: column }, 100);
            this.instance.focus();
        },

        clearHighlight: function () {
            if (highlightedLine !== null) {
                this.instance.removeLineClass(highlightedLine, 'background', highlightedLineClass || 'cm-highlight-line');
                highlightedLine = null;
                highlightedLineClass = null;
            }
            if (debugLine !== null) {
                this.instance.setGutterMarker(debugLine, 'debug-current', null);
                debugLine = null;
            }
        }
    };
})();
