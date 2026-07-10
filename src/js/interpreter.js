// ============================================
// VisuAlg Web IDE - Interpreter
// Lexer, Parser, and async Executor
// ============================================

(function () {
    'use strict';

    var MAX_ITERATIONS = 1000;

    // ==========================================
    // TOKEN TYPES
    // ==========================================
    var T = {
        KEYWORD: 'KEYWORD',
        IDENT: 'IDENT',
        NUMBER: 'NUMBER',
        STRING: 'STRING',
        OPERATOR: 'OPERATOR',
        ASSIGN: 'ASSIGN',       // <-
        LPAREN: 'LPAREN',
        RPAREN: 'RPAREN',
        LBRACKET: 'LBRACKET',
        RBRACKET: 'RBRACKET',
        COMMA: 'COMMA',
        COLON: 'COLON',
        DOTDOT: 'DOTDOT',       // ..
        NEWLINE: 'NEWLINE',
        EOF: 'EOF'
    };

    var DATA_TYPES = ['inteiro', 'real', 'caractere', 'logico'];
    var UNSUPPORTED_KEYWORDS = [
        'pausa', 'debug', 'eco', 'cronometro', 'timer', 'aleatorio', 'arquivo'
    ];

    var KEYWORDS = [
        'algoritmo', 'var', 'inicio', 'fimalgoritmo',
        'se', 'entao', 'senao', 'fimse',
        'enquanto', 'faca', 'fimenquanto',
        'para', 'de', 'ate', 'passo', 'fimpara',
        'repita', 'fimrepita',
        'escolha', 'caso', 'outrocaso', 'fimescolha',
        'escreva', 'escreval', 'leia',
        'procedimento', 'fimprocedimento',
        'funcao', 'fimfuncao', 'retorne',
        'interrompa', 'limpatela',
        'e', 'ou', 'nao', 'xou', 'mod', 'div',
        'verdadeiro', 'falso',
        'inteiro', 'real', 'caractere', 'logico', 'vetor'
    ].concat(UNSUPPORTED_KEYWORDS);

    var BUILTIN_FUNCTIONS = [
        'abs', 'quad', 'raizq', 'exp', 'log', 'logn',
        'sen', 'cos', 'tan', 'cotan', 'arcsen', 'arccos', 'arctan',
        'grauprad', 'radpgrau', 'int', 'pi', 'rand', 'randi',
        'compr', 'copia', 'maiusc', 'minusc', 'asc', 'carac',
        'pos', 'caracpnum', 'numpcarac'
    ];

    var KEYWORD_ALIASES = {
        'então': 'entao',
        'senão': 'senao',
        'até': 'ate',
        'faça': 'faca',
        'início': 'inicio',
        'lógico': 'logico',
        'não': 'nao'
    };

    // ==========================================
    // LEXER
    // ==========================================
    function Token(type, value, line, column) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column || 1;
    }

    function Lexer(source) {
        this.source = source;
        this.pos = 0;
        this.line = 1;
        this.column = 1;
        this.tokens = [];
    }

    Lexer.prototype.peek = function () {
        return this.pos < this.source.length ? this.source[this.pos] : null;
    };

    Lexer.prototype.advance = function () {
        var ch = this.source[this.pos++];
        if (ch === '\n') {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
        }
        return ch;
    };

    Lexer.prototype.error = function (message, line, column) {
        throw new Error('Linha ' + (line || this.line) + ', coluna ' + (column || this.column) + ': ' + message);
    };

    Lexer.prototype.tokenize = function () {
        while (this.pos < this.source.length) {
            var ch = this.peek();

            // Skip spaces and tabs
            if (ch === ' ' || ch === '\t' || ch === '\r') {
                this.advance();
                continue;
            }

            // Newline
            if (ch === '\n') {
                var newlineLine = this.line;
                var newlineColumn = this.column;
                this.advance();
                // Collapse multiple newlines
                if (this.tokens.length > 0 && this.tokens[this.tokens.length - 1].type !== T.NEWLINE) {
                    this.tokens.push(new Token(T.NEWLINE, '\\n', newlineLine, newlineColumn));
                }
                continue;
            }

            // Comments: //
            if (ch === '/' && this.pos + 1 < this.source.length && this.source[this.pos + 1] === '/') {
                while (this.pos < this.source.length && this.source[this.pos] !== '\n') {
                    this.advance();
                }
                continue;
            }

            // Block comments: { }
            if (ch === '{') {
                var commentLine = this.line;
                var commentColumn = this.column;
                this.advance();
                while (this.pos < this.source.length && this.source[this.pos] !== '}') {
                    this.advance();
                }
                if (this.pos < this.source.length) {
                    this.advance(); // skip }
                } else {
                    this.error('Comentario de bloco iniciado com "{" nao foi fechado', commentLine, commentColumn);
                }
                continue;
            }

            // String
            if (ch === '"') {
                this.tokens.push(this.readString());
                continue;
            }

            // Number
            if (this.isDigit(ch)) {
                this.tokens.push(this.readNumber());
                continue;
            }

            // Identifier or keyword
            if (this.isAlpha(ch) || ch === '_') {
                this.tokens.push(this.readIdent());
                continue;
            }

            // Two-char operators
            if (ch === '<') {
                var lessLine = this.line;
                var lessColumn = this.column;
                this.advance();
                var next = this.peek();
                if (next === '-') {
                    this.advance();
                    this.tokens.push(new Token(T.ASSIGN, '<-', lessLine, lessColumn));
                } else if (next === '=') {
                    this.advance();
                    this.tokens.push(new Token(T.OPERATOR, '<=', lessLine, lessColumn));
                } else if (next === '>') {
                    this.advance();
                    this.tokens.push(new Token(T.OPERATOR, '<>', lessLine, lessColumn));
                } else {
                    this.tokens.push(new Token(T.OPERATOR, '<', lessLine, lessColumn));
                }
                continue;
            }

            if (ch === '>') {
                var greaterLine = this.line;
                var greaterColumn = this.column;
                this.advance();
                if (this.peek() === '=') {
                    this.advance();
                    this.tokens.push(new Token(T.OPERATOR, '>=', greaterLine, greaterColumn));
                } else {
                    this.tokens.push(new Token(T.OPERATOR, '>', greaterLine, greaterColumn));
                }
                continue;
            }

            // Dot-dot (..)
            if (ch === '.' && this.pos + 1 < this.source.length && this.source[this.pos + 1] === '.') {
                var dotLine = this.line;
                var dotColumn = this.column;
                this.advance(); this.advance();
                this.tokens.push(new Token(T.DOTDOT, '..', dotLine, dotColumn));
                continue;
            }

            // Single char tokens
            var tokenLine = this.line;
            var tokenColumn = this.column;
            this.advance();
            switch (ch) {
                case '(': this.tokens.push(new Token(T.LPAREN, '(', tokenLine, tokenColumn)); break;
                case ')': this.tokens.push(new Token(T.RPAREN, ')', tokenLine, tokenColumn)); break;
                case '[': this.tokens.push(new Token(T.LBRACKET, '[', tokenLine, tokenColumn)); break;
                case ']': this.tokens.push(new Token(T.RBRACKET, ']', tokenLine, tokenColumn)); break;
                case ',': this.tokens.push(new Token(T.COMMA, ',', tokenLine, tokenColumn)); break;
                case ':':
                    if (this.peek() === '=') {
                        this.advance();
                        this.tokens.push(new Token(T.ASSIGN, ':=', tokenLine, tokenColumn));
                    } else {
                        this.tokens.push(new Token(T.COLON, ':', tokenLine, tokenColumn));
                    }
                    break;
                case '+': this.tokens.push(new Token(T.OPERATOR, '+', tokenLine, tokenColumn)); break;
                case '-': this.tokens.push(new Token(T.OPERATOR, '-', tokenLine, tokenColumn)); break;
                case '*': this.tokens.push(new Token(T.OPERATOR, '*', tokenLine, tokenColumn)); break;
                case '/': this.tokens.push(new Token(T.OPERATOR, '/', tokenLine, tokenColumn)); break;
                case '\\': this.tokens.push(new Token(T.OPERATOR, '\\', tokenLine, tokenColumn)); break;
                case '%': this.tokens.push(new Token(T.OPERATOR, '%', tokenLine, tokenColumn)); break;
                case '^': this.tokens.push(new Token(T.OPERATOR, '^', tokenLine, tokenColumn)); break;
                case '=': this.tokens.push(new Token(T.OPERATOR, '=', tokenLine, tokenColumn)); break;
                case ';': this.tokens.push(new Token(T.OPERATOR, ';', tokenLine, tokenColumn)); break;
                default:
                    this.error('Caractere invalido "' + ch + '"', tokenLine, tokenColumn);
            }
        }

        this.tokens.push(new Token(T.EOF, null, this.line, this.column));
        return this.tokens;
    };

    Lexer.prototype.readString = function () {
        var line = this.line;
        var column = this.column;
        this.advance(); // skip opening "
        var str = '';
        while (this.pos < this.source.length && this.source[this.pos] !== '"') {
            if (this.source[this.pos] === '\n') {
                this.error('String nao foi fechada antes do fim da linha', line, column);
            }
            str += this.source[this.pos];
            this.advance();
        }
        if (this.pos < this.source.length) {
            this.advance(); // skip closing "
        } else {
            this.error('String iniciada com aspas duplas nao foi fechada', line, column);
        }
        return new Token(T.STRING, str, line, column);
    };

    Lexer.prototype.readNumber = function () {
        var line = this.line;
        var column = this.column;
        var num = '';
        while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
            num += this.advance();
        }
        if (this.peek() === '.' && this.pos + 1 < this.source.length &&
            this.source[this.pos + 1] !== '.') {
            num += this.advance(); // .
            while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
                num += this.advance();
            }
        }
        return new Token(T.NUMBER, parseFloat(num), line, column);
    };

    Lexer.prototype.readIdent = function () {
        var line = this.line;
        var column = this.column;
        var id = '';
        while (this.pos < this.source.length && this.isAlphaNum(this.source[this.pos])) {
            id += this.advance();
        }
        var lower = id.toLowerCase();
        if (KEYWORDS.indexOf(lower) !== -1) {
            return new Token(T.KEYWORD, lower, line, column);
        }
        if (KEYWORD_ALIASES.hasOwnProperty(lower)) {
            return new Token(T.KEYWORD, KEYWORD_ALIASES[lower], line, column);
        }
        if (BUILTIN_FUNCTIONS.indexOf(lower) !== -1) {
            return new Token(T.IDENT, lower, line, column);
        }
        return new Token(T.IDENT, lower, line, column);
    };

    Lexer.prototype.isDigit = function (ch) {
        return ch >= '0' && ch <= '9';
    };

    Lexer.prototype.isAlpha = function (ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_' ||
               /[áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ]/.test(ch);
    };

    Lexer.prototype.isAlphaNum = function (ch) {
        return this.isAlpha(ch) || this.isDigit(ch);
    };

    // ==========================================
    // PARSER
    // ==========================================
    function Parser(tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }

    Parser.prototype.current = function () {
        return this.tokens[this.pos];
    };

    Parser.prototype.eat = function (type, value) {
        var tok = this.current();
        if (tok.type === type && (value === undefined || tok.value === value)) {
            this.pos++;
            return tok;
        }
        throw new Error('Linha ' + tok.line + ', coluna ' + tok.column + ': Esperado ' + (value || type) +
            ', encontrado "' + tok.value + '"');
    };

    Parser.prototype.match = function (type, value) {
        var tok = this.current();
        return tok.type === type && (value === undefined || tok.value === value);
    };

    Parser.prototype.isUnsupportedKeyword = function (tok) {
        return tok && tok.type === T.KEYWORD && UNSUPPORTED_KEYWORDS.indexOf(tok.value) !== -1;
    };

    Parser.prototype.throwUnsupported = function (tok) {
        throw new Error('Linha ' + tok.line + ', coluna ' + tok.column + ': Comando "' + tok.value + '" ainda nao e suportado no VisuAlg Web');
    };

    Parser.prototype.throwUnexpected = function (tok) {
        throw new Error('Linha ' + tok.line + ', coluna ' + tok.column + ': Token inesperado "' + tok.value + '"');
    };

    Parser.prototype.skipNewlines = function () {
        while (this.current().type === T.NEWLINE) {
            this.pos++;
        }
    };

    Parser.prototype.expectNewline = function () {
        if (this.current().type === T.NEWLINE) {
            this.pos++;
        }
        this.skipNewlines();
    };

    Parser.prototype.parse = function () {
        this.skipNewlines();

        // algoritmo "nome"
        this.eat(T.KEYWORD, 'algoritmo');
        var name = this.eat(T.STRING).value;
        this.expectNewline();

        if (this.isUnsupportedKeyword(this.current())) {
            this.throwUnsupported(this.current());
        }

        // var declarations
        var varDecls = [];
        var procedures = [];
        var functions = [];

        if (this.match(T.KEYWORD, 'var')) {
            this.eat(T.KEYWORD, 'var');
            this.expectNewline();
            varDecls = this.parseVarDecls();
        }

        if (this.isUnsupportedKeyword(this.current())) {
            this.throwUnsupported(this.current());
        }

        // Procedures and functions (before inicio)
        while (this.match(T.KEYWORD, 'procedimento') || this.match(T.KEYWORD, 'funcao')) {
            if (this.match(T.KEYWORD, 'procedimento')) {
                procedures.push(this.parseProcedure());
            } else {
                functions.push(this.parseFunction());
            }
            this.skipNewlines();
            if (this.isUnsupportedKeyword(this.current())) {
                this.throwUnsupported(this.current());
            }
        }

        // inicio
        this.eat(T.KEYWORD, 'inicio');
        this.expectNewline();

        // body
        var body = this.parseStatements('fimalgoritmo');
        this.eat(T.KEYWORD, 'fimalgoritmo');

        return {
            type: 'Program',
            name: name,
            variables: varDecls,
            procedures: procedures,
            functions: functions,
            body: body
        };
    };

    Parser.prototype.parseVarDecls = function () {
        var decls = [];
        var declaredNames = {};
        while (!this.match(T.KEYWORD, 'inicio') &&
               !this.match(T.KEYWORD, 'procedimento') &&
               !this.match(T.KEYWORD, 'funcao') &&
               !this.match(T.EOF)) {
            if (this.match(T.NEWLINE)) {
                this.skipNewlines();
                continue;
            }
            if (this.isUnsupportedKeyword(this.current())) {
                this.throwUnsupported(this.current());
            }
            if (this.match(T.IDENT)) {
                var decl = this.parseVarDecl();
                for (var k = 0; k < decl.names.length; k++) {
                    if (declaredNames.hasOwnProperty(decl.names[k])) {
                        throw new Error('Linha ' + decl.line + ': Variavel "' + decl.names[k] + '" ja declarada');
                    }
                    declaredNames[decl.names[k]] = true;
                }
                decls.push(decl);
                this.skipNewlines();
            } else {
                this.throwUnexpected(this.current());
            }
        }
        return decls;
    };

    Parser.prototype.parseVarDecl = function () {
        var names = [];
        var ident = this.eat(T.IDENT);
        var line = ident.line;
        if (ident.value.length > 30) {
            throw new Error('Linha ' + ident.line + ': Nome de variavel "' + ident.value + '" excede 30 caracteres');
        }
        names.push(ident.value);
        while (this.match(T.COMMA)) {
            this.eat(T.COMMA);
            ident = this.eat(T.IDENT);
            if (ident.value.length > 30) {
                throw new Error('Linha ' + ident.line + ': Nome de variavel "' + ident.value + '" excede 30 caracteres');
            }
            names.push(ident.value);
        }
        this.eat(T.COLON);

        var isVector = false;
        var dimensions = [];
        var dataType;

        if (this.match(T.KEYWORD, 'vetor')) {
            this.eat(T.KEYWORD, 'vetor');
            isVector = true;
            this.eat(T.LBRACKET);
            dimensions.push(this.parseRange());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                dimensions.push(this.parseRange());
            }
            this.eat(T.RBRACKET);
            this.eat(T.KEYWORD, 'de');
            dataType = this.eat(T.KEYWORD).value;
        } else {
            dataType = this.eat(T.KEYWORD).value;
        }

        if (DATA_TYPES.indexOf(dataType) === -1) {
            throw new Error('Linha ' + line + ': Tipo de dado invalido "' + dataType + '"');
        }

        return {
            type: 'VarDecl',
            names: names,
            dataType: dataType,
            isVector: isVector,
            dimensions: dimensions,
            line: line
        };
    };

    Parser.prototype.parseRange = function () {
        var low = this.parseExpression();
        this.eat(T.DOTDOT);
        var high = this.parseExpression();
        return { low: low, high: high };
    };

    Parser.prototype.parseProcedure = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'procedimento');
        var name = this.eat(T.IDENT).value;

        var params = [];
        if (this.match(T.LPAREN)) {
            params = this.parseParams();
        }
        this.expectNewline();

        var localVars = [];
        if (this.match(T.KEYWORD, 'var')) {
            this.eat(T.KEYWORD, 'var');
            this.expectNewline();
            localVars = this.parseVarDecls();
        }

        this.eat(T.KEYWORD, 'inicio');
        this.expectNewline();

        var body = this.parseStatements('fimprocedimento');
        this.eat(T.KEYWORD, 'fimprocedimento');
        this.skipNewlines();

        return {
            type: 'ProcDecl',
            name: name,
            params: params,
            localVars: localVars,
            body: body,
            line: line
        };
    };

    Parser.prototype.parseFunction = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'funcao');
        var name = this.eat(T.IDENT).value;

        var params = [];
        if (this.match(T.LPAREN)) {
            params = this.parseParams();
        }
        this.eat(T.COLON);
        var returnType = this.eat(T.KEYWORD).value;
        this.expectNewline();

        var localVars = [];
        if (this.match(T.KEYWORD, 'var')) {
            this.eat(T.KEYWORD, 'var');
            this.expectNewline();
            localVars = this.parseVarDecls();
        }

        this.eat(T.KEYWORD, 'inicio');
        this.expectNewline();

        var body = this.parseStatements('fimfuncao');
        this.eat(T.KEYWORD, 'fimfuncao');
        this.skipNewlines();

        return {
            type: 'FuncDecl',
            name: name,
            params: params,
            returnType: returnType,
            localVars: localVars,
            body: body,
            line: line
        };
    };

    Parser.prototype.parseParams = function () {
        this.eat(T.LPAREN);
        var params = [];
        if (!this.match(T.RPAREN)) {
            params = params.concat(this.parseParamGroup());
            while (this.match(T.OPERATOR, ';') || this.match(T.COMMA) ||
                   (this.current().type === T.IDENT) || this.match(T.KEYWORD, 'var')) {
                // VisuAlg uses ; to separate param groups, but some use ,
                if (this.match(T.OPERATOR, ';') || this.match(T.COMMA)) {
                    this.pos++;
                }
                if (this.match(T.RPAREN)) break;
                params = params.concat(this.parseParamGroup());
            }
        }
        this.eat(T.RPAREN);
        return params;
    };

    Parser.prototype.parseParamGroup = function () {
        var byRef = false;
        if (this.match(T.KEYWORD, 'var')) {
            this.eat(T.KEYWORD, 'var');
            byRef = true;
        }
        var names = [];
        names.push(this.eat(T.IDENT).value);
        while (this.match(T.COMMA)) {
            this.eat(T.COMMA);
            names.push(this.eat(T.IDENT).value);
        }
        this.eat(T.COLON);
        var dataType = this.eat(T.KEYWORD).value;

        return names.map(function (n) {
            return { name: n, type: dataType, byRef: byRef };
        });
    };

    Parser.prototype.parseStatements = function (endKeyword) {
        var stmts = [];
        this.skipNewlines();
        while (!this.match(T.KEYWORD, endKeyword) && !this.match(T.EOF)) {
            var stmt = this.parseStatement();
            if (stmt) stmts.push(stmt);
            this.skipNewlines();
        }
        return stmts;
    };

    Parser.prototype.parseStatement = function () {
        var tok = this.current();

        if (tok.type === T.NEWLINE) {
            this.skipNewlines();
            return null;
        }

        if (tok.type === T.KEYWORD) {
            if (this.isUnsupportedKeyword(tok)) {
                this.throwUnsupported(tok);
            }
            switch (tok.value) {
                case 'escreva':
                case 'escreval':
                    return this.parseEscreva();
                case 'leia':
                    return this.parseLeia();
                case 'se':
                    return this.parseSe();
                case 'enquanto':
                    return this.parseEnquanto();
                case 'para':
                    return this.parsePara();
                case 'repita':
                    return this.parseRepita();
                case 'escolha':
                    return this.parseEscolha();
                case 'retorne':
                    return this.parseRetorne();
                case 'interrompa':
                    this.eat(T.KEYWORD, 'interrompa');
                    return { type: 'Interrompa', line: tok.line };
                case 'limpatela':
                    this.eat(T.KEYWORD, 'limpatela');
                    return { type: 'Limpatela', line: tok.line };
                default:
                    this.throwUnexpected(tok);
            }
        }

        if (tok.type === T.IDENT) {
            return this.parseAssignmentOrCall();
        }

        this.throwUnexpected(tok);
    };

    Parser.prototype.parseEscreva = function () {
        var tok = this.current();
        var newline = (tok.value === 'escreval');
        this.pos++;

        var args = [];
        if (this.match(T.LPAREN)) {
            this.eat(T.LPAREN);
            if (!this.match(T.RPAREN)) {
                args.push(this.parseEscrevaArg());
                while (this.match(T.COMMA)) {
                    this.eat(T.COMMA);
                    args.push(this.parseEscrevaArg());
                }
            }
            this.eat(T.RPAREN);
        } else if (!this.match(T.NEWLINE) && !this.match(T.EOF)) {
            args.push(this.parseEscrevaArg());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                args.push(this.parseEscrevaArg());
            }
        }

        return { type: 'Escreva', args: args, newline: newline, line: tok.line };
    };

    Parser.prototype.parseEscrevaArg = function () {
        var expr = this.parseExpression();
        var width = null;
        var decimals = null;

        // Format: expr:width or expr:width:decimals
        if (this.match(T.COLON)) {
            this.eat(T.COLON);
            width = this.parseExpression();
            if (this.match(T.COLON)) {
                this.eat(T.COLON);
                decimals = this.parseExpression();
            }
        }

        return { expr: expr, width: width, decimals: decimals };
    };

    Parser.prototype.parseLeia = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'leia');

        var targets = [];
        if (this.match(T.LPAREN)) {
            this.eat(T.LPAREN);
            targets.push(this.parseVarRef());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                targets.push(this.parseVarRef());
            }
            this.eat(T.RPAREN);
        } else {
            targets.push(this.parseVarRef());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                targets.push(this.parseVarRef());
            }
        }

        return { type: 'Leia', targets: targets, line: line };
    };

    Parser.prototype.parseVarRef = function () {
        var name = this.eat(T.IDENT).value;
        var indices = [];
        if (this.match(T.LBRACKET)) {
            this.eat(T.LBRACKET);
            indices.push(this.parseExpression());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                indices.push(this.parseExpression());
            }
            this.eat(T.RBRACKET);
        }
        return { name: name, indices: indices };
    };

    Parser.prototype.parseSe = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'se');
        var condition = this.parseExpression();
        this.eat(T.KEYWORD, 'entao');
        this.expectNewline();

        var thenBlock = this.parseStatements('fimse');

        var elseBlock = [];
        if (this.match(T.KEYWORD, 'senao')) {
            var senaoTok = this.eat(T.KEYWORD, 'senao');
            if (this.match(T.KEYWORD, 'se') && this.current().line === senaoTok.line) {
                elseBlock = [this.parseSe()];
                return {
                    type: 'Se',
                    condition: condition,
                    thenBlock: thenBlock,
                    elseBlock: elseBlock,
                    line: line
                };
            } else {
                this.expectNewline();
                elseBlock = this.parseStatements('fimse');
            }
        }

        this.eat(T.KEYWORD, 'fimse');

        return {
            type: 'Se',
            condition: condition,
            thenBlock: thenBlock,
            elseBlock: elseBlock,
            line: line
        };
    };

    // Override parseStatements for 'se' to handle senao as stop
    var origParseStatements = Parser.prototype.parseStatements;
    Parser.prototype.parseStatements = function (endKeyword) {
        var stmts = [];
        this.skipNewlines();
        while (!this.match(T.KEYWORD, endKeyword) && !this.match(T.EOF)) {
            // For se blocks, also stop at senao
            if (endKeyword === 'fimse' && this.match(T.KEYWORD, 'senao')) break;
            // For escolha blocks, stop at caso / outrocaso
            if ((endKeyword === 'fimescolha' || endKeyword === '__caso__') &&
                (this.match(T.KEYWORD, 'caso') || this.match(T.KEYWORD, 'outrocaso'))) break;

            var stmt = this.parseStatement();
            if (stmt) stmts.push(stmt);
            this.skipNewlines();
        }
        return stmts;
    };

    Parser.prototype.parseEnquanto = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'enquanto');
        var condition = this.parseExpression();
        this.eat(T.KEYWORD, 'faca');
        this.expectNewline();

        var body = this.parseStatements('fimenquanto');
        this.eat(T.KEYWORD, 'fimenquanto');

        return { type: 'Enquanto', condition: condition, body: body, line: line };
    };

    Parser.prototype.parsePara = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'para');
        var variable = this.eat(T.IDENT).value;
        this.eat(T.KEYWORD, 'de');
        var from = this.parseExpression();
        this.eat(T.KEYWORD, 'ate');
        var to = this.parseExpression();

        var step = null;
        if (this.match(T.KEYWORD, 'passo')) {
            this.eat(T.KEYWORD, 'passo');
            step = this.parseExpression();
        }
        this.eat(T.KEYWORD, 'faca');
        this.expectNewline();

        var body = this.parseStatements('fimpara');
        this.eat(T.KEYWORD, 'fimpara');

        return {
            type: 'Para',
            variable: variable,
            from: from,
            to: to,
            step: step,
            body: body,
            line: line
        };
    };

    Parser.prototype.parseRepita = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'repita');
        this.expectNewline();

        // repita...ate or repita...fimrepita
        var body = [];
        this.skipNewlines();
        while (!this.match(T.KEYWORD, 'ate') && !this.match(T.KEYWORD, 'fimrepita') && !this.match(T.EOF)) {
            var stmt = this.parseStatement();
            if (stmt) body.push(stmt);
            this.skipNewlines();
        }

        var condition = null;
        if (this.match(T.KEYWORD, 'ate')) {
            this.eat(T.KEYWORD, 'ate');
            condition = this.parseExpression();
        } else {
            this.eat(T.KEYWORD, 'fimrepita');
        }

        return { type: 'Repita', body: body, condition: condition, line: line };
    };

    Parser.prototype.parseEscolha = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'escolha');
        var expr = this.parseExpression();
        this.expectNewline();

        var cases = [];
        var otherwise = null;

        this.skipNewlines();
        while (this.match(T.KEYWORD, 'caso')) {
            this.eat(T.KEYWORD, 'caso');
            var values = [];
            values.push(this.parseExpression());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                values.push(this.parseExpression());
            }
            this.expectNewline();
            var caseBody = this.parseStatements('__caso__');
            cases.push({ values: values, body: caseBody });
            this.skipNewlines();
        }

        if (this.match(T.KEYWORD, 'outrocaso')) {
            this.eat(T.KEYWORD, 'outrocaso');
            this.expectNewline();
            otherwise = this.parseStatements('fimescolha');
        }

        this.eat(T.KEYWORD, 'fimescolha');

        return {
            type: 'Escolha',
            expr: expr,
            cases: cases,
            otherwise: otherwise,
            line: line
        };
    };

    Parser.prototype.parseRetorne = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'retorne');
        var expr = this.parseExpression();
        return { type: 'Retorne', expr: expr, line: line };
    };

    Parser.prototype.parseAssignmentOrCall = function () {
        var line = this.current().line;
        var name = this.eat(T.IDENT).value;

        // Array index
        var indices = [];
        if (this.match(T.LBRACKET)) {
            this.eat(T.LBRACKET);
            indices.push(this.parseExpression());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                indices.push(this.parseExpression());
            }
            this.eat(T.RBRACKET);
        }

        if (this.match(T.ASSIGN)) {
            this.eat(T.ASSIGN);
            var expr = this.parseExpression();
            return {
                type: 'Assignment',
                target: name,
                indices: indices,
                expr: expr,
                line: line
            };
        }

        // Function/procedure call
        var args = [];
        if (this.match(T.LPAREN)) {
            this.eat(T.LPAREN);
            if (!this.match(T.RPAREN)) {
                args.push(this.parseExpression());
                while (this.match(T.COMMA)) {
                    this.eat(T.COMMA);
                    args.push(this.parseExpression());
                }
            }
            this.eat(T.RPAREN);
        }

        return { type: 'Call', name: name, args: args, line: line };
    };

    // ==========================================
    // EXPRESSION PARSER (Precedence climbing)
    // ==========================================
    Parser.prototype.parseExpression = function () {
        return this.parseOr();
    };

    Parser.prototype.parseOr = function () {
        var left = this.parseAnd();
        while (this.match(T.KEYWORD, 'ou') || this.match(T.KEYWORD, 'xou')) {
            var op = this.current().value;
            this.pos++;
            var right = this.parseAnd();
            left = { type: 'BinaryOp', op: op, left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseAnd = function () {
        var left = this.parseNot();
        while (this.match(T.KEYWORD, 'e')) {
            this.pos++;
            var right = this.parseNot();
            left = { type: 'BinaryOp', op: 'e', left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseNot = function () {
        if (this.match(T.KEYWORD, 'nao')) {
            this.pos++;
            var expr = this.parseNot();
            return { type: 'UnaryOp', op: 'nao', operand: expr };
        }
        return this.parseComparison();
    };

    Parser.prototype.parseComparison = function () {
        var left = this.parseAddSub();
        while (this.match(T.OPERATOR, '=') || this.match(T.OPERATOR, '<>') ||
               this.match(T.OPERATOR, '<') || this.match(T.OPERATOR, '>') ||
               this.match(T.OPERATOR, '<=') || this.match(T.OPERATOR, '>=')) {
            var op = this.current().value;
            this.pos++;
            var right = this.parseAddSub();
            left = { type: 'BinaryOp', op: op, left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseAddSub = function () {
        var left = this.parseMulDiv();
        while (this.match(T.OPERATOR, '+') || this.match(T.OPERATOR, '-')) {
            var op = this.current().value;
            this.pos++;
            var right = this.parseMulDiv();
            left = { type: 'BinaryOp', op: op, left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseMulDiv = function () {
        var left = this.parsePower();
        while (this.match(T.OPERATOR, '*') || this.match(T.OPERATOR, '/') ||
               this.match(T.OPERATOR, '\\') || this.match(T.KEYWORD, 'div') ||
               this.match(T.KEYWORD, 'mod') || this.match(T.OPERATOR, '%')) {
            var op = this.current().value;
            this.pos++;
            var right = this.parsePower();
            left = { type: 'BinaryOp', op: op, left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parsePower = function () {
        var left = this.parseUnary();
        if (this.match(T.OPERATOR, '^')) {
            this.pos++;
            var right = this.parsePower();
            left = { type: 'BinaryOp', op: '^', left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseUnary = function () {
        if (this.match(T.OPERATOR, '-')) {
            this.pos++;
            var expr = this.parseUnary();
            return { type: 'UnaryOp', op: '-', operand: expr };
        }
        if (this.match(T.OPERATOR, '+')) {
            this.pos++;
            return this.parseUnary();
        }
        return this.parsePrimary();
    };

    Parser.prototype.parsePrimary = function () {
        var tok = this.current();

        // Number
        if (tok.type === T.NUMBER) {
            this.pos++;
            return { type: 'NumberLit', value: tok.value, line: tok.line };
        }

        // String
        if (tok.type === T.STRING) {
            this.pos++;
            return { type: 'StringLit', value: tok.value, line: tok.line };
        }

        // Boolean
        if (tok.type === T.KEYWORD && (tok.value === 'verdadeiro' || tok.value === 'falso')) {
            this.pos++;
            return { type: 'BoolLit', value: tok.value === 'verdadeiro', line: tok.line };
        }

        // Parenthesized expression
        if (tok.type === T.LPAREN) {
            this.eat(T.LPAREN);
            var expr = this.parseExpression();
            this.eat(T.RPAREN);
            return expr;
        }

        // Identifier (variable or function call)
        if (tok.type === T.IDENT) {
            this.pos++;
            var name = tok.value;

            // Function call
            if (this.match(T.LPAREN)) {
                this.eat(T.LPAREN);
                var args = [];
                if (!this.match(T.RPAREN)) {
                    args.push(this.parseExpression());
                    while (this.match(T.COMMA)) {
                        this.eat(T.COMMA);
                        args.push(this.parseExpression());
                    }
                }
                this.eat(T.RPAREN);
                return { type: 'FuncCall', name: name, args: args, line: tok.line };
            }

            // Array access
            if (this.match(T.LBRACKET)) {
                this.eat(T.LBRACKET);
                var indices = [];
                indices.push(this.parseExpression());
                while (this.match(T.COMMA)) {
                    this.eat(T.COMMA);
                    indices.push(this.parseExpression());
                }
                this.eat(T.RBRACKET);
                return { type: 'ArrayAccess', name: name, indices: indices, line: tok.line };
            }

            return { type: 'VarRef', name: name, line: tok.line };
        }

        throw new Error('Linha ' + tok.line + ': Expressao inesperada "' + tok.value + '"');
    };

    // ==========================================
    // SEMANTIC ANALYZER
    // ==========================================
    function SemanticAnalyzer(ast) {
        this.ast = ast;
        this.globals = {};
        this.procedures = {};
        this.functions = {};
    }

    SemanticAnalyzer.prototype.error = function (line, message) {
        throw new Error('Linha ' + line + ': ' + message);
    };

    SemanticAnalyzer.prototype.isDataType = function (type) {
        return DATA_TYPES.indexOf(type) !== -1;
    };

    SemanticAnalyzer.prototype.isNumeric = function (type) {
        return type === 'inteiro' || type === 'real';
    };

    SemanticAnalyzer.prototype.isAssignable = function (targetType, valueType) {
        if (targetType === valueType) return true;
        return targetType === 'real' && valueType === 'inteiro';
    };

    SemanticAnalyzer.prototype.typeName = function (type) {
        return type || 'desconhecido';
    };

    SemanticAnalyzer.prototype.assertAssignable = function (line, targetType, valueType, targetName) {
        if (!this.isAssignable(targetType, valueType)) {
            this.error(line, 'Nao e possivel atribuir ' + this.typeName(valueType) +
                ' a ' + this.typeName(targetType) + (targetName ? ' em "' + targetName + '"' : ''));
        }
    };

    SemanticAnalyzer.prototype.constantInteger = function (expr) {
        if (!expr) return null;
        if (expr.type === 'NumberLit' && Number.isInteger(expr.value)) return expr.value;
        if (expr.type === 'UnaryOp' && expr.op === '-') {
            var value = this.constantInteger(expr.operand);
            return value === null ? null : -value;
        }
        return null;
    };

    SemanticAnalyzer.prototype.validateType = function (line, type) {
        if (!this.isDataType(type)) {
            this.error(line, 'Tipo de dado invalido "' + type + '"');
        }
    };

    SemanticAnalyzer.prototype.validateName = function (line, name, label) {
        if (name.length > 30) {
            this.error(line, 'Nome de ' + label + ' "' + name + '" excede 30 caracteres');
        }
        if (KEYWORDS.indexOf(name) !== -1 || BUILTIN_FUNCTIONS.indexOf(name) !== -1) {
            this.error(line, 'Nome de ' + label + ' "' + name + '" usa palavra reservada');
        }
    };

    SemanticAnalyzer.prototype.declareInScope = function (scope, name, symbol, line) {
        if (scope.hasOwnProperty(name)) {
            this.error(line, 'Identificador "' + name + '" ja declarado neste escopo');
        }
        scope[name] = symbol;
    };

    SemanticAnalyzer.prototype.lookup = function (scopes, name) {
        for (var i = scopes.length - 1; i >= 0; i--) {
            if (scopes[i].hasOwnProperty(name)) return scopes[i][name];
        }
        return null;
    };

    SemanticAnalyzer.prototype.validateVarDecls = function (decls, scope, kind) {
        for (var i = 0; i < decls.length; i++) {
            var decl = decls[i];
            this.validateType(decl.line, decl.dataType);
            if (decl.isVector) {
                if (decl.dimensions.length < 1 || decl.dimensions.length > 2) {
                    this.error(decl.line, 'Vetores devem ter uma ou duas dimensoes');
                }
                for (var d = 0; d < decl.dimensions.length; d++) {
                    var low = this.constantInteger(decl.dimensions[d].low);
                    var high = this.constantInteger(decl.dimensions[d].high);
                    if (low === null || high === null) {
                        this.error(decl.line, 'Limites de vetor devem ser constantes inteiras');
                    }
                    if (high < low) {
                        this.error(decl.line, 'Limite final do vetor deve ser maior ou igual ao inicial');
                    }
                }
            }
            for (var j = 0; j < decl.names.length; j++) {
                var name = decl.names[j];
                this.validateName(decl.line, name, kind || 'variavel');
                this.declareInScope(scope, name, {
                    kind: 'var',
                    name: name,
                    type: decl.isVector ? 'vetor' : decl.dataType,
                    dataType: decl.dataType,
                    isVector: decl.isVector,
                    dimensions: decl.dimensions,
                    line: decl.line
                }, decl.line);
            }
        }
    };

    SemanticAnalyzer.prototype.validateParams = function (params, scope, ownerLine) {
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            this.validateName(ownerLine, param.name, 'parametro');
            this.validateType(ownerLine, param.type);
            this.declareInScope(scope, param.name, {
                kind: 'var',
                name: param.name,
                type: param.type,
                dataType: param.type,
                isVector: false,
                byRef: param.byRef,
                line: ownerLine
            }, ownerLine);
        }
    };

    SemanticAnalyzer.prototype.registerGlobals = function () {
        this.validateVarDecls(this.ast.variables, this.globals, 'variavel');

        for (var i = 0; i < this.ast.procedures.length; i++) {
            var proc = this.ast.procedures[i];
            this.validateName(proc.line, proc.name, 'procedimento');
            this.declareInScope(this.globals, proc.name, {
                kind: 'proc',
                name: proc.name,
                params: proc.params,
                decl: proc,
                line: proc.line
            }, proc.line);
            this.procedures[proc.name] = proc;
        }

        for (var j = 0; j < this.ast.functions.length; j++) {
            var func = this.ast.functions[j];
            this.validateName(func.line, func.name, 'funcao');
            this.validateType(func.line, func.returnType);
            this.declareInScope(this.globals, func.name, {
                kind: 'func',
                name: func.name,
                returnType: func.returnType,
                params: func.params,
                decl: func,
                line: func.line
            }, func.line);
            this.functions[func.name] = func;
        }
    };

    SemanticAnalyzer.prototype.validate = function () {
        this.registerGlobals();

        for (var i = 0; i < this.ast.procedures.length; i++) {
            this.validateProcedure(this.ast.procedures[i]);
        }
        for (var j = 0; j < this.ast.functions.length; j++) {
            this.validateFunction(this.ast.functions[j]);
        }

        this.validateStatements(this.ast.body, {
            scopes: [this.globals],
            loopDepth: 0,
            inFunction: false,
            returnType: null,
            inProcedure: false
        });
    };

    SemanticAnalyzer.prototype.validateProcedure = function (proc) {
        var local = {};
        this.validateParams(proc.params, local, proc.line);
        this.validateVarDecls(proc.localVars, local, 'variavel local');
        this.validateStatements(proc.body, {
            scopes: [this.globals, local],
            loopDepth: 0,
            inFunction: false,
            returnType: null,
            inProcedure: true
        });
    };

    SemanticAnalyzer.prototype.validateFunction = function (func) {
        var local = {};
        this.validateParams(func.params, local, func.line);
        this.declareInScope(local, func.name, {
            kind: 'var',
            name: func.name,
            type: func.returnType,
            dataType: func.returnType,
            isVector: false,
            line: func.line
        }, func.line);
        this.validateVarDecls(func.localVars, local, 'variavel local');
        this.validateStatements(func.body, {
            scopes: [this.globals, local],
            loopDepth: 0,
            inFunction: true,
            returnType: func.returnType,
            inProcedure: false
        });
    };

    SemanticAnalyzer.prototype.validateStatements = function (stmts, ctx) {
        for (var i = 0; i < stmts.length; i++) {
            this.validateStatement(stmts[i], ctx);
        }
    };

        SemanticAnalyzer.prototype.validateStatement = function (stmt, ctx) {
            switch (stmt.type) {
            case 'Escreva':
                for (var i = 0; i < stmt.args.length; i++) {
                    this.inferExpr(stmt.args[i].expr, ctx);
                    if (stmt.args[i].width) {
                        this.requireType(stmt.line, this.inferExpr(stmt.args[i].width, ctx), 'inteiro', 'largura de formatacao');
                    }
                    if (stmt.args[i].decimals) {
                        this.requireType(stmt.line, this.inferExpr(stmt.args[i].decimals, ctx), 'inteiro', 'casas decimais');
                    }
                }
                break;
            case 'Leia':
                for (var r = 0; r < stmt.targets.length; r++) {
                    this.validateVarTarget(stmt.targets[r].name, stmt.targets[r].indices, stmt.line, ctx, true);
                }
                break;
            case 'Assignment': {
                var target = this.validateVarTarget(stmt.target, stmt.indices, stmt.line, ctx, true);
                var valueType = this.inferExpr(stmt.expr, ctx);
                this.assertAssignable(stmt.line, target.type, valueType, stmt.target);
                break;
            }
            case 'Se':
                this.requireType(stmt.line, this.inferExpr(stmt.condition, ctx), 'logico', 'condicao do se');
                this.validateStatements(stmt.thenBlock, ctx);
                this.validateStatements(stmt.elseBlock, ctx);
                break;
            case 'Enquanto': {
                this.requireType(stmt.line, this.inferExpr(stmt.condition, ctx), 'logico', 'condicao do enquanto');
                var whileCtx = this.extendCtx(ctx, { loopDepth: ctx.loopDepth + 1 });
                this.validateStatements(stmt.body, whileCtx);
                break;
            }
                case 'Para': {
                    var counter = this.validateVarTarget(stmt.variable, [], stmt.line, ctx, false);
                    this.requireType(stmt.line, counter.type, 'inteiro', 'variavel de controle do para');
                    this.requireType(stmt.line, this.inferExpr(stmt.from, ctx), 'inteiro', 'valor inicial do para');
                    this.requireType(stmt.line, this.inferExpr(stmt.to, ctx), 'inteiro', 'valor limite do para');
                    if (stmt.step) this.requireType(stmt.line, this.inferExpr(stmt.step, ctx), 'inteiro', 'passo do para');
                    var forCtx = this.extendCtx(ctx, { loopDepth: ctx.loopDepth + 1 });
                    this.validateStatements(stmt.body, forCtx);
                    break;
                }
            case 'Repita': {
                var repeatCtx = this.extendCtx(ctx, { loopDepth: ctx.loopDepth + 1 });
                this.validateStatements(stmt.body, repeatCtx);
                if (stmt.condition) {
                    this.requireType(stmt.line, this.inferExpr(stmt.condition, ctx), 'logico', 'condicao do repita');
                }
                break;
            }
            case 'Escolha': {
                var selectType = this.inferExpr(stmt.expr, ctx);
                for (var c = 0; c < stmt.cases.length; c++) {
                    for (var v = 0; v < stmt.cases[c].values.length; v++) {
                        var caseType = this.inferExpr(stmt.cases[c].values[v], ctx);
                        if (!this.areComparable(selectType, caseType)) {
                            this.error(stmt.line, 'Valor de caso do tipo ' + caseType + ' nao e compativel com selecao do tipo ' + selectType);
                        }
                    }
                    this.validateStatements(stmt.cases[c].body, ctx);
                }
                if (stmt.otherwise) this.validateStatements(stmt.otherwise, ctx);
                break;
            }
            case 'Call':
                this.validateProcedureCall(stmt.name, stmt.args, stmt.line, ctx);
                break;
            case 'Retorne': {
                if (!ctx.inFunction) {
                    this.error(stmt.line, 'Comando retorne so pode ser usado dentro de funcao');
                }
                var returnType = this.inferExpr(stmt.expr, ctx);
                this.assertAssignable(stmt.line, ctx.returnType, returnType, 'retorno');
                break;
            }
            case 'Interrompa':
                if (ctx.loopDepth <= 0) {
                    this.error(stmt.line, 'Comando interrompa so pode ser usado dentro de um laco');
                }
                break;
            case 'Limpatela':
                break;
            default:
                this.error(stmt.line || 1, 'Comando desconhecido "' + stmt.type + '"');
        }
    };

    SemanticAnalyzer.prototype.extendCtx = function (ctx, changes) {
        var next = {
            scopes: ctx.scopes,
            loopDepth: ctx.loopDepth,
            inFunction: ctx.inFunction,
            returnType: ctx.returnType,
            inProcedure: ctx.inProcedure
        };
        for (var key in changes) {
            if (changes.hasOwnProperty(key)) next[key] = changes[key];
        }
        return next;
    };

    SemanticAnalyzer.prototype.validateVarTarget = function (name, indices, line, ctx, allowVectorElement) {
        var symbol = this.lookup(ctx.scopes, name);
        if (!symbol) {
            this.error(line, 'Variavel "' + name + '" nao declarada');
        }
        if (symbol.kind !== 'var') {
            this.error(line, '"' + name + '" nao e uma variavel');
        }
        if (indices && indices.length > 0) {
            if (!symbol.isVector) {
                this.error(line, 'Variavel "' + name + '" nao e vetor');
            }
            if (!allowVectorElement) {
                this.error(line, 'Variavel de controle nao pode ser elemento de vetor');
            }
            if (indices.length !== symbol.dimensions.length) {
                this.error(line, 'Vetor "' + name + '" espera ' + symbol.dimensions.length + ' indice(s), mas recebeu ' + indices.length);
            }
            for (var i = 0; i < indices.length; i++) {
                this.requireType(line, this.inferExpr(indices[i], ctx), 'inteiro', 'indice de vetor');
            }
            return { type: symbol.dataType, symbol: symbol };
        }
        if (symbol.isVector) {
            return { type: 'vetor', symbol: symbol };
        }
        return { type: symbol.type, symbol: symbol };
    };

    SemanticAnalyzer.prototype.requireType = function (line, actual, expected, label) {
        if (actual !== expected) {
            this.error(line, (label || 'expressao') + ' deve ser do tipo ' + expected + ', encontrado ' + actual);
        }
    };

    SemanticAnalyzer.prototype.requireNumeric = function (line, actual, label) {
        if (!this.isNumeric(actual)) {
            this.error(line, (label || 'expressao') + ' deve ser numerico, encontrado ' + actual);
        }
    };

    SemanticAnalyzer.prototype.areComparable = function (left, right) {
        if (this.isNumeric(left) && this.isNumeric(right)) return true;
        return left === right;
    };

    SemanticAnalyzer.prototype.numericResultType = function (left, right, op) {
        if (op === '/') return 'real';
        if (left === 'real' || right === 'real') return 'real';
        return 'inteiro';
    };

    SemanticAnalyzer.prototype.inferExpr = function (node, ctx) {
        if (!node) return 'desconhecido';
        switch (node.type) {
            case 'NumberLit':
                return Number.isInteger(node.value) ? 'inteiro' : 'real';
            case 'StringLit':
                return 'caractere';
            case 'BoolLit':
                return 'logico';
            case 'VarRef': {
                var symbol = this.lookup(ctx.scopes, node.name);
                if (!symbol && node.name === 'pi') return 'real';
                if (!symbol) this.error(node.line, 'Variavel "' + node.name + '" nao declarada');
                if (symbol.kind === 'func') {
                    if (symbol.params.length === 0) return symbol.returnType;
                    this.error(node.line, 'Funcao "' + node.name + '" precisa ser chamada com parenteses e argumento(s)');
                }
                if (symbol.kind !== 'var') {
                    this.error(node.line, '"' + node.name + '" nao e uma variavel');
                }
                if (symbol.isVector) {
                    this.error(node.line, 'Vetor "' + node.name + '" precisa de indice para ser usado em expressao');
                }
                return symbol.type;
            }
            case 'ArrayAccess': {
                var target = this.validateVarTarget(node.name, node.indices, node.line, ctx, true);
                return target.type;
            }
            case 'BinaryOp':
                return this.inferBinary(node, ctx);
            case 'UnaryOp': {
                var operand = this.inferExpr(node.operand, ctx);
                if (node.op === '-') {
                    this.requireNumeric(node.line || node.operand.line, operand, 'operando de -');
                    return operand;
                }
                if (node.op === 'nao') {
                    this.requireType(node.line || node.operand.line, operand, 'logico', 'operando de nao');
                    return 'logico';
                }
                return operand;
            }
            case 'FuncCall':
                return this.validateFunctionCall(node.name, node.args, node.line, ctx);
            default:
                this.error(node.line || 1, 'Expressao desconhecida "' + node.type + '"');
        }
    };

    SemanticAnalyzer.prototype.inferBinary = function (node, ctx) {
        var left = this.inferExpr(node.left, ctx);
        var right = this.inferExpr(node.right, ctx);
        var line = node.left.line || node.right.line || 1;

        switch (node.op) {
            case '+':
                if (left === 'caractere' || right === 'caractere') return 'caractere';
                this.requireNumeric(line, left, 'lado esquerdo de +');
                this.requireNumeric(line, right, 'lado direito de +');
                return this.numericResultType(left, right, node.op);
            case '-':
            case '*':
            case '/':
            case '\\':
            case 'div':
            case 'mod':
            case '%':
            case '^':
                this.requireNumeric(line, left, 'lado esquerdo de ' + node.op);
                this.requireNumeric(line, right, 'lado direito de ' + node.op);
                return this.numericResultType(left, right, node.op);
            case '=':
            case '<>':
            case '<':
            case '>':
            case '<=':
            case '>=':
                if (!this.areComparable(left, right)) {
                    this.error(line, 'Nao e possivel comparar ' + left + ' com ' + right);
                }
                return 'logico';
            case 'e':
            case 'ou':
            case 'xou':
                this.requireType(line, left, 'logico', 'lado esquerdo de ' + node.op);
                this.requireType(line, right, 'logico', 'lado direito de ' + node.op);
                return 'logico';
            default:
                this.error(line, 'Operador desconhecido "' + node.op + '"');
        }
        };

        SemanticAnalyzer.prototype.validateProcedureCall = function (name, args, line, ctx) {
            if (this.procedures[name]) {
                this.validateArgs(name, this.procedures[name].params, args, line, ctx);
                return;
            }
            var symbol = this.lookup(ctx.scopes, name);
            if (!symbol) {
                if (BUILTIN_FUNCTIONS.indexOf(name) !== -1) {
                this.error(line, 'Funcao "' + name + '" deve ser usada em uma expressao, nao como comando');
            }
            this.error(line, 'Procedimento "' + name + '" nao encontrado');
        }
        if (symbol.kind === 'func') {
            this.error(line, 'Funcao "' + name + '" deve ser usada em uma expressao');
        }
        if (symbol.kind !== 'proc') {
            this.error(line, '"' + name + '" nao e um procedimento');
        }
        this.validateArgs(name, symbol.params, args, line, ctx);
    };

        SemanticAnalyzer.prototype.validateFunctionCall = function (name, args, line, ctx) {
            if (BUILTIN_FUNCTIONS.indexOf(name) !== -1) {
                return this.validateBuiltinCall(name, args, line, ctx);
            }
            if (this.functions[name]) {
                this.validateArgs(name, this.functions[name].params, args, line, ctx);
                return this.functions[name].returnType;
            }
            var symbol = this.lookup(ctx.scopes, name);
            if (!symbol) this.error(line, 'Funcao "' + name + '" nao encontrada');
        if (symbol.kind === 'proc') {
            this.error(line, 'Procedimento "' + name + '" nao retorna valor');
        }
        if (symbol.kind !== 'func') {
            this.error(line, '"' + name + '" nao e uma funcao');
        }
        this.validateArgs(name, symbol.params, args, line, ctx);
        return symbol.returnType;
    };

    SemanticAnalyzer.prototype.validateArgs = function (name, params, args, line, ctx) {
        if (args.length !== params.length) {
            this.error(line, '"' + name + '" espera ' + params.length + ' argumento(s), mas recebeu ' + args.length);
        }
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            if (param.byRef) {
                if (!args[i] || args[i].type !== 'VarRef') {
                    this.error(line, 'Parametro por referencia "' + param.name + '" deve receber uma variavel simples');
                }
                var target = this.validateVarTarget(args[i].name, [], args[i].line || line, ctx, false);
                if (target.type !== param.type) {
                    this.error(line, 'Parametro por referencia "' + param.name + '" espera ' + param.type + ', encontrado ' + target.type);
                }
            } else {
                var argType = this.inferExpr(args[i], ctx);
                this.assertAssignable(line, param.type, argType, 'parametro ' + param.name);
            }
        }
    };

    SemanticAnalyzer.prototype.validateBuiltinCall = function (name, args, line, ctx) {
        var signatures = {
            abs: { args: ['numerico'], returns: 'same' },
            quad: { args: ['numerico'], returns: 'same' },
            raizq: { args: ['numerico'], returns: 'real' },
            exp: { args: ['numerico', 'numerico'], returns: 'real' },
            log: { args: ['numerico'], returns: 'real' },
            logn: { args: ['numerico'], returns: 'real' },
            sen: { args: ['numerico'], returns: 'real' },
            cos: { args: ['numerico'], returns: 'real' },
            tan: { args: ['numerico'], returns: 'real' },
            cotan: { args: ['numerico'], returns: 'real' },
            arcsen: { args: ['numerico'], returns: 'real' },
            arccos: { args: ['numerico'], returns: 'real' },
            arctan: { args: ['numerico'], returns: 'real' },
            grauprad: { args: ['numerico'], returns: 'real' },
            radpgrau: { args: ['numerico'], returns: 'real' },
            int: { args: ['numerico'], returns: 'inteiro' },
            pi: { args: [], returns: 'real' },
            rand: { args: [], returns: 'real' },
            randi: { args: ['inteiro'], returns: 'inteiro' },
            compr: { args: ['caractere'], returns: 'inteiro' },
            copia: { args: ['caractere', 'inteiro', 'inteiro'], returns: 'caractere' },
            maiusc: { args: ['caractere'], returns: 'caractere' },
            minusc: { args: ['caractere'], returns: 'caractere' },
            asc: { args: ['caractere'], returns: 'inteiro' },
            carac: { args: ['inteiro'], returns: 'caractere' },
            pos: { args: ['caractere', 'caractere'], returns: 'inteiro' },
            caracpnum: { args: ['caractere'], returns: 'real' },
            numpcarac: { args: ['numerico'], returns: 'caractere' }
        };
        var sig = signatures[name];
        if (!sig) this.error(line, 'Funcao interna "' + name + '" nao configurada');
        if (args.length !== sig.args.length) {
            this.error(line, 'Funcao "' + name + '" espera ' + sig.args.length + ' argumento(s), mas recebeu ' + args.length);
        }
        var firstType = null;
        for (var i = 0; i < sig.args.length; i++) {
            var actual = this.inferExpr(args[i], ctx);
            if (i === 0) firstType = actual;
            var expected = sig.args[i];
            if (expected === 'numerico') {
                this.requireNumeric(line, actual, 'argumento ' + (i + 1) + ' de ' + name);
            } else {
                this.requireType(line, actual, expected, 'argumento ' + (i + 1) + ' de ' + name);
            }
        }
        return sig.returns === 'same' ? (firstType || 'real') : sig.returns;
    };

    // ==========================================
    // EXECUTOR
    // ==========================================
    function Executor(terminal, variablesPanel) {
        this.terminal = terminal;
        this.variablesPanel = variablesPanel;
        this.variables = new Map();
        this.procedures = {};
        this.functions = {};
        this.running = false;
        this.stepMode = false;
        this.stepResolve = null;
        this.callStack = [];
        this.breakFlag = false;
        this.returnValue = undefined;
    }

        Executor.prototype.run = async function (ast) {
            this.running = true;
            this.breakFlag = false;
            this.returnValue = undefined;
            this.callStack = [];
            this.variables = new Map();
            this.procedures = {};
            this.functions = {};

            try {
                new SemanticAnalyzer(ast).validate();

                // Register procedures and functions
                for (var i = 0; i < ast.procedures.length; i++) {
                    this.procedures[ast.procedures[i].name] = ast.procedures[i];
                }
                for (var j = 0; j < ast.functions.length; j++) {
                    this.functions[ast.functions[j].name] = ast.functions[j];
                }

                // Declare global variables
                this.declareVariables(ast.variables, this.variables);
                this.updateVarsPanel();

                // Execute body
                await this.execBlock(ast.body);
            } catch (e) {
                throw e;
            } finally {
                this.running = false;
            }
        };

    Executor.prototype.declareVariables = function (decls, scope) {
        for (var i = 0; i < decls.length; i++) {
            var decl = decls[i];
                for (var j = 0; j < decl.names.length; j++) {
                    var name = decl.names[j];
                    if (decl.isVector) {
                        var dimensions = this.normalizeDimensions(decl.dimensions);
                        var arr = this.createArray(dimensions, decl.dataType);
                        scope.set(name, { type: 'vetor de ' + decl.dataType, value: arr, dataType: decl.dataType, dimensions: dimensions });
                    } else {
                        scope.set(name, { type: decl.dataType, value: this.defaultValue(decl.dataType) });
                    }
                }
            }
        };

        Executor.prototype.createArray = function (dimensions, dataType) {
            // For simplicity, store as a flat object with string keys
            return {};
        };

        Executor.prototype.evalConstantInteger = function (expr) {
            if (expr && expr.type === 'NumberLit' && Number.isInteger(expr.value)) return expr.value;
            if (expr && expr.type === 'UnaryOp' && expr.op === '-') {
                return -this.evalConstantInteger(expr.operand);
            }
            throw new Error('Limites de vetor devem ser constantes inteiras');
        };

        Executor.prototype.normalizeDimensions = function (dimensions) {
            var normalized = [];
            for (var i = 0; i < dimensions.length; i++) {
                var low = this.evalConstantInteger(dimensions[i].low);
                var high = this.evalConstantInteger(dimensions[i].high);
                if (high < low) {
                    throw new Error('Limite final do vetor deve ser maior ou igual ao inicial');
                }
                normalized.push({ low: low, high: high });
            }
            return normalized;
        };

    Executor.prototype.defaultValue = function (type) {
        switch (type) {
            case 'inteiro': return 0;
            case 'real': return 0.0;
            case 'caractere': return '';
            case 'logico': return false;
            default: return 0;
        }
    };

    Executor.prototype.updateVarsPanel = function () {
        this.variablesPanel.update(this.variables);
    };

    Executor.prototype.checkRunning = function () {
        if (!this.running) throw new Error('__STOP__');
    };

    Executor.prototype.waitForStep = function () {
        var self = this;
        return new Promise(function (resolve) {
            self.stepResolve = resolve;
        });
    };

    Executor.prototype.nextStep = function () {
        if (this.stepResolve) {
            var resolve = this.stepResolve;
            this.stepResolve = null;
            resolve();
        }
    };

    Executor.prototype.execBlock = async function (stmts) {
        for (var i = 0; i < stmts.length; i++) {
            this.checkRunning();
            if (this.breakFlag) return;
            if (this.returnValue !== undefined) return;
            await this.execStatement(stmts[i]);
        }
    };

    Executor.prototype.execStatement = async function (stmt) {
        this.checkRunning();

        if (this.stepMode && stmt.line !== undefined) {
            if (window.VisualGEditor) {
                window.VisualGEditor.highlightLine(stmt.line - 1);
            }
            await this.waitForStep();
        }

        switch (stmt.type) {
            case 'Escreva': await this.execEscreva(stmt); await this.yield(); break;
            case 'Leia': await this.execLeia(stmt); break;
            case 'Assignment': await this.execAssignment(stmt); break;
            case 'Se': await this.execSe(stmt); break;
            case 'Enquanto': await this.execEnquanto(stmt); break;
            case 'Para': await this.execPara(stmt); break;
            case 'Repita': await this.execRepita(stmt); break;
            case 'Escolha': await this.execEscolha(stmt); break;
            case 'Call': await this.execCall(stmt); break;
            case 'Retorne': await this.execRetorne(stmt); break;
            case 'Interrompa': this.breakFlag = true; break;
            case 'Limpatela': this.terminal.clear(); break;
        }

        this.updateVarsPanel();
    };

    Executor.prototype.execEscreva = async function (stmt) {
        function formatVal(val) {
            if (typeof val === 'boolean') return val ? 'VERDADEIRO' : 'FALSO';
            return String(val);
        }

        var output = '';
        for (var i = 0; i < stmt.args.length; i++) {
            var arg = stmt.args[i];
            var val = await this.evalExpr(arg.expr);

            var str;
            if (arg.decimals !== null && arg.decimals !== undefined) {
                var w = arg.width ? await this.evalExpr(arg.width) : 0;
                var d = await this.evalExpr(arg.decimals);
                str = Number(val).toFixed(d);
                if (w > 0) str = str.padStart(w);
            } else if (arg.width !== null && arg.width !== undefined) {
                var w = await this.evalExpr(arg.width);
                str = formatVal(val);
                if (w > 0) str = str.padStart(w);
            } else {
                str = formatVal(val);
            }
            output += str;
        }

        if (stmt.newline) {
            this.terminal.writeln(output);
        } else {
            this.terminal.write(output);
        }
    };

    Executor.prototype.execLeia = async function (stmt) {
        for (var i = 0; i < stmt.targets.length; i++) {
            var target = stmt.targets[i];
            var varInfo = this.getVar(target.name);
            var prompt = this.formatLeiaPrompt(target, varInfo);
            var input = await this.terminal.readInput(prompt);

            var value = this.convertInput(input, varInfo.type);
            await this.setVarValueAsync(target.name, target.indices, value);
        }
    };

        Executor.prototype.formatLeiaPrompt = function (target, varInfo) {
            var baseType = varInfo.dataType || varInfo.type;
            if (baseType.indexOf('vetor de ') === 0) {
                baseType = baseType.substring(9);
            }
            var name = target.name;
            if (target.indices && target.indices.length > 0) {
                name += '[' + target.indices.map(function () { return '?'; }).join(',') + ']';
            }
            return 'Leia ' + name + ' (' + baseType + '): ' + '\n' ;
        };

        Executor.prototype.convertInput = function (input, type) {
            var baseType = type;
            if (type.indexOf('vetor de ') === 0) {
                baseType = type.substring(9);
            }
            var text = String(input);
            var trimmed = text.trim();
            switch (baseType) {
                case 'inteiro':
                    if (!/^[+-]?\d+$/.test(trimmed)) {
                        throw new Error('Entrada invalida para inteiro: "' + text + '"');
                    }
                    return Number(trimmed);
                case 'real': {
                    var normalized = trimmed.replace(',', '.');
                    if (!/^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(normalized)) {
                        throw new Error('Entrada invalida para real: "' + text + '"');
                    }
                    return Number(normalized);
                }
                case 'caractere': return text;
                case 'logico': {
                    var lower = trimmed.toLowerCase();
                    if (lower === 'verdadeiro' || lower === 'v') return true;
                    if (lower === 'falso' || lower === 'f') return false;
                    throw new Error('Entrada invalida para logico: "' + text + '"');
                }
                default: return input;
            }
        };

    Executor.prototype.execAssignment = async function (stmt) {
        var value = await this.evalExpr(stmt.expr);
        await this.setVarValueAsync(stmt.target, stmt.indices, value);
    };

        Executor.prototype.setVarValue = function (name, indices, value) {
            var varInfo = this.getVar(name);
            if (indices && indices.length > 0) {
                throw new Error('Atribuicao em vetor exige indices avaliados');
            } else {
                // Coerce types
                varInfo.value = this.coerceType(value, varInfo.type);
            }
        };

        Executor.prototype.setVarValueAsync = async function (name, indices, value) {
            var varInfo = this.getVar(name);
            if (indices && indices.length > 0) {
                var keys = [];
                for (var i = 0; i < indices.length; i++) {
                    keys.push(await this.evalExpr(indices[i]));
                }
                this.validateArrayIndices(name, varInfo, keys);
                var key = keys.join(',');
                varInfo.value[key] = this.coerceType(value, varInfo.dataType || varInfo.type);
            } else {
                if (varInfo.type.indexOf('vetor de ') === 0) {
                    throw new Error('Vetor "' + name + '" precisa de indice para receber valor');
                }
                varInfo.value = this.coerceType(value, varInfo.type);
            }
        };

        Executor.prototype.validateArrayIndices = function (name, varInfo, keys) {
            if (!varInfo || varInfo.type.indexOf('vetor de ') !== 0) {
                throw new Error('Variavel "' + name + '" nao e vetor');
            }
            if (keys.length !== varInfo.dimensions.length) {
                throw new Error('Vetor "' + name + '" espera ' + varInfo.dimensions.length + ' indice(s), mas recebeu ' + keys.length);
            }
            for (var i = 0; i < keys.length; i++) {
                var idx = keys[i];
                if (typeof idx !== 'number' || !Number.isFinite(idx) || !Number.isInteger(idx)) {
                    throw new Error('Indice ' + (i + 1) + ' do vetor "' + name + '" deve ser inteiro');
                }
                var dim = varInfo.dimensions[i];
                if (idx < dim.low || idx > dim.high) {
                    throw new Error('Indice ' + idx + ' fora dos limites do vetor "' + name + '" [' + dim.low + '..' + dim.high + ']');
                }
            }
        };

        Executor.prototype.coerceType = function (value, type) {
            switch (type) {
                case 'inteiro':
                    if (typeof value !== 'number' || !Number.isFinite(value) || !Number.isInteger(value)) {
                        throw new Error('Valor "' + value + '" nao e compativel com inteiro');
                    }
                    return value;
                case 'real':
                    if (typeof value !== 'number' || !Number.isFinite(value)) {
                        throw new Error('Valor "' + value + '" nao e compativel com real');
                    }
                    return value;
                case 'caractere':
                    if (typeof value !== 'string') {
                        throw new Error('Valor "' + value + '" nao e compativel com caractere');
                    }
                    return value;
                case 'logico':
                    if (typeof value === 'boolean') return value;
                    throw new Error('Valor "' + value + '" nao e compativel com logico');
                default:
                    return value;
            }
    };

    Executor.prototype.getVar = function (name) {
        // Check call stack (local scope first)
        for (var i = this.callStack.length - 1; i >= 0; i--) {
            if (this.callStack[i].has(name)) {
                return this.callStack[i].get(name);
            }
        }
        // Global scope
        if (this.variables.has(name)) {
            return this.variables.get(name);
        }
        throw new Error('Variavel "' + name + '" nao declarada');
    };

    Executor.prototype.execSe = async function (stmt) {
        var cond = await this.evalExpr(stmt.condition);
        if (cond) {
            await this.execBlock(stmt.thenBlock);
        } else if (stmt.elseBlock.length > 0) {
            await this.execBlock(stmt.elseBlock);
        }
    };

    Executor.prototype.checkIterationLimit = function (iter) {
        if (localStorage.getItem('visualg-loop-detection') === 'off') return Promise.resolve();
        if (iter.count <= MAX_ITERATIONS) return Promise.resolve();
        iter.count = 0;
        var overlay = document.getElementById('loopLimitOverlay');
        overlay.classList.remove('hidden');
        var self = this;
        return new Promise(function (resolve, reject) {
            document.getElementById('btn-loop-continue').onclick = function () {
                overlay.classList.add('hidden');
                resolve();
            };
            document.getElementById('btn-loop-stop').onclick = function () {
                overlay.classList.add('hidden');
                self.running = false;
                reject(new Error('__STOP__'));
            };
        });
    };

    Executor.prototype.execEnquanto = async function (stmt) {
        var iter = { count: 0 };
        while (await this.evalExpr(stmt.condition)) {
            iter.count++;
            await this.checkIterationLimit(iter);
            this.checkRunning();
            this.breakFlag = false;
            await this.execBlock(stmt.body);
            if (this.breakFlag) { this.breakFlag = false; break; }
            if (this.returnValue !== undefined) return;
            // Yield to avoid blocking UI
            await this.yield();
        }
    };

    Executor.prototype.execPara = async function (stmt) {
        var from = await this.evalExpr(stmt.from);
        var to = await this.evalExpr(stmt.to);
        var step = stmt.step ? await this.evalExpr(stmt.step) : 1;
        if (step === 0) {
            throw new Error('O passo do comando para nao pode ser zero');
        }

        this.setVarValue(stmt.variable, [], from);

        var ascending = step > 0;
        var iter = { count: 0 };
        while (true) {
            iter.count++;
            await this.checkIterationLimit(iter);
            this.checkRunning();
            var current = this.getVar(stmt.variable).value;
            if (ascending && current > to) break;
            if (!ascending && current < to) break;

            this.breakFlag = false;
            await this.execBlock(stmt.body);
            if (this.breakFlag) { this.breakFlag = false; break; }
            if (this.returnValue !== undefined) return;

            this.setVarValue(stmt.variable, [], current + step);
            await this.yield();
        }
    };

    Executor.prototype.execRepita = async function (stmt) {
        var iter = { count: 0 };
        while (true) {
            iter.count++;
            await this.checkIterationLimit(iter);
            this.checkRunning();
            this.breakFlag = false;
            await this.execBlock(stmt.body);
            if (this.breakFlag) { this.breakFlag = false; break; }
            if (this.returnValue !== undefined) return;

            if (stmt.condition) {
                var cond = await this.evalExpr(stmt.condition);
                if (cond) break;
            }
            await this.yield();
        }
    };

    Executor.prototype.execEscolha = async function (stmt) {
        var val = await this.evalExpr(stmt.expr);
        var matched = false;

        for (var i = 0; i < stmt.cases.length; i++) {
            var caso = stmt.cases[i];
            for (var j = 0; j < caso.values.length; j++) {
                var caseVal = await this.evalExpr(caso.values[j]);
                if (val === caseVal || (typeof val === 'string' && typeof caseVal === 'string' &&
                    val.toLowerCase() === caseVal.toLowerCase())) {
                    matched = true;
                    break;
                }
            }
            if (matched) {
                await this.execBlock(caso.body);
                break;
            }
        }

        if (!matched && stmt.otherwise) {
            await this.execBlock(stmt.otherwise);
        }
    };

        Executor.prototype.execCall = async function (stmt) {
            // Check if it's a procedure
            if (this.procedures[stmt.name]) {
                await this.callProcedure(stmt.name, stmt.args);
            } else if (this.functions[stmt.name] || BUILTIN_FUNCTIONS.indexOf(stmt.name) !== -1) {
                throw new Error('Funcao "' + stmt.name + '" deve ser usada em uma expressao');
            } else {
                throw new Error('Procedimento "' + stmt.name + '" nao encontrado');
            }
        };

    Executor.prototype.execRetorne = async function (stmt) {
        this.returnValue = await this.evalExpr(stmt.expr);
    };

        Executor.prototype.callProcedure = async function (name, argExprs) {
            var proc = this.procedures[name];
            if (!proc) throw new Error('Procedimento "' + name + '" nao encontrado');
            if (argExprs.length !== proc.params.length) {
                throw new Error('Procedimento "' + name + '" espera ' + proc.params.length + ' argumento(s), mas recebeu ' + argExprs.length);
            }

            var localScope = new Map();
            // Evaluate arguments and bind to params
            for (var i = 0; i < proc.params.length; i++) {
                var param = proc.params[i];
                if (param.byRef) {
                    // Pass by reference: share the same var entry
                    var argName = argExprs[i] && argExprs[i].type === 'VarRef' ? argExprs[i].name : null;
                    if (!argName) {
                        throw new Error('Parametro por referencia "' + param.name + '" deve receber uma variavel simples');
                    }
                    localScope.set(param.name, this.getVar(argName));
                } else {
                    var val = await this.evalExpr(argExprs[i]);
                    localScope.set(param.name, { type: param.type, value: this.coerceType(val, param.type) });
                }
            }

        // Declare local variables
        this.declareVariables(proc.localVars, localScope);

            var previousReturnValue = this.returnValue;
            this.callStack.push(localScope);
            this.returnValue = undefined;
            try {
                await this.execBlock(proc.body);
            } finally {
                this.returnValue = previousReturnValue;
                this.callStack.pop();
            }
        };

        Executor.prototype.callFunction = async function (name, argExprs) {
            var func = this.functions[name];
            if (!func) throw new Error('Funcao "' + name + '" nao encontrada');
            if (argExprs.length !== func.params.length) {
                throw new Error('Funcao "' + name + '" espera ' + func.params.length + ' argumento(s), mas recebeu ' + argExprs.length);
            }

            var localScope = new Map();
            for (var i = 0; i < func.params.length; i++) {
                var param = func.params[i];
                if (param.byRef) {
                    var argName = argExprs[i] && argExprs[i].type === 'VarRef' ? argExprs[i].name : null;
                    if (!argName) {
                        throw new Error('Parametro por referencia "' + param.name + '" deve receber uma variavel simples');
                    }
                    localScope.set(param.name, this.getVar(argName));
                } else {
                    var val = await this.evalExpr(argExprs[i]);
                    localScope.set(param.name, { type: param.type, value: this.coerceType(val, param.type) });
                }
            }

        // Return variable (same name as function)
        localScope.set(name, { type: func.returnType, value: this.defaultValue(func.returnType) });

        this.declareVariables(func.localVars, localScope);

            var previousReturnValue = this.returnValue;
            this.callStack.push(localScope);
            this.returnValue = undefined;
            try {
                await this.execBlock(func.body);
                var result = this.returnValue !== undefined ? this.returnValue : localScope.get(name).value;
                return this.coerceType(result, func.returnType);
            } finally {
                this.returnValue = previousReturnValue;
                this.callStack.pop();
            }
        };

    Executor.prototype.yield = function () {
        return new Promise(function (resolve) { setTimeout(resolve, 0); });
    };

    // ==========================================
    // EXPRESSION EVALUATOR
    // ==========================================
    Executor.prototype.evalExpr = async function (node) {
        if (!node) return null;

        switch (node.type) {
            case 'NumberLit': return node.value;
            case 'StringLit': return node.value;
            case 'BoolLit': return node.value;

            case 'VarRef': {
                try {
                    return this.getVar(node.name).value;
                } catch (error) {
                    if (node.name === 'pi') return Math.PI;
                    if (this.functions[node.name]) {
                        if (this.functions[node.name].params.length === 0) {
                            return await this.callFunction(node.name, []);
                        }
                        throw new Error('Funcao "' + node.name + '" precisa ser chamada com parenteses e argumento(s)');
                    }
                    throw error;
                }
            }

                case 'ArrayAccess': {
                    var varInfo = this.getVar(node.name);
                    var keys = [];
                    for (var i = 0; i < node.indices.length; i++) {
                        keys.push(await this.evalExpr(node.indices[i]));
                    }
                    this.validateArrayIndices(node.name, varInfo, keys);
                    var key = keys.join(',');
                    var val = varInfo.value[key];
                    return val !== undefined ? val : this.defaultValue(varInfo.dataType || 'inteiro');
                }

            case 'BinaryOp': {
                var left = await this.evalExpr(node.left);
                var right = await this.evalExpr(node.right);
                return this.evalBinaryOp(node.op, left, right);
            }

            case 'UnaryOp': {
                var operand = await this.evalExpr(node.operand);
                if (node.op === '-') return -operand;
                if (node.op === 'nao') return !operand;
                return operand;
            }

            case 'FuncCall':
                return await this.evalFuncCall(node.name, node.args);

            default:
                throw new Error('Expressao desconhecida: ' + node.type);
        }
    };

    Executor.prototype.evalBinaryOp = function (op, left, right) {
        switch (op) {
            case '+':
                if (typeof left === 'string' || typeof right === 'string') {
                    return String(left) + String(right);
                }
                return left + right;
                case '-': return left - right;
                case '*': return left * right;
                case '/':
                    if (right === 0) throw new Error('Divisao por zero');
                    return left / right;
                case '\\':
                case 'div':
                    if (right === 0) throw new Error('Divisao inteira por zero');
                    return Math.trunc(left / right);
                case 'mod':
                case '%':
                    if (right === 0) throw new Error('Resto da divisao por zero');
                    return left % right;
            case '^': return Math.pow(left, right);
            case '=':
                if (typeof left === 'string' && typeof right === 'string') {
                    return left.toLowerCase() === right.toLowerCase();
                }
                return left === right;
            case '<>':
                if (typeof left === 'string' && typeof right === 'string') {
                    return left.toLowerCase() !== right.toLowerCase();
                }
                return left !== right;
            case '<': return left < right;
            case '>': return left > right;
            case '<=': return left <= right;
            case '>=': return left >= right;
            case 'e': return left && right;
            case 'ou': return left || right;
            case 'xou': return (left && !right) || (!left && right);
            default:
                throw new Error('Operador desconhecido: ' + op);
        }
    };

        Executor.prototype.evalFuncCall = async function (name, argNodes) {
            var lower = name.toLowerCase();
            var builtinArities = {
                abs: 1, quad: 1, raizq: 1, exp: 2, log: 1, logn: 1,
                sen: 1, cos: 1, tan: 1, cotan: 1, arcsen: 1, arccos: 1, arctan: 1,
                grauprad: 1, radpgrau: 1, int: 1, pi: 0, rand: 0, randi: 1,
                compr: 1, copia: 3, maiusc: 1, minusc: 1, asc: 1, carac: 1,
                pos: 2, caracpnum: 1, numpcarac: 1
            };
            if (builtinArities.hasOwnProperty(lower) && argNodes.length !== builtinArities[lower]) {
                throw new Error('Funcao "' + name + '" espera ' + builtinArities[lower] + ' argumento(s), mas recebeu ' + argNodes.length);
            }

            // Built-in functions
            switch (lower) {
                case 'abs': return Math.abs(await this.evalExpr(argNodes[0]));
                case 'quad': { var v = await this.evalExpr(argNodes[0]); return v * v; }
                case 'raizq': {
                    var v = await this.evalExpr(argNodes[0]);
                    if (v < 0) throw new Error('Nao e possivel calcular raiz quadrada de numero negativo (' + v + ')');
                    return Math.sqrt(v);
                }
                case 'exp': {
                    var base = await this.evalExpr(argNodes[0]);
                    var exponent = await this.evalExpr(argNodes[1]);
                    return Math.pow(base, exponent);
                }
                case 'log': {
                    var v = await this.evalExpr(argNodes[0]);
                    if (v <= 0) throw new Error('Logaritmo exige valor maior que zero');
                    return Math.log10(v);
                }
                case 'logn': {
                    var v = await this.evalExpr(argNodes[0]);
                    if (v <= 0) throw new Error('Logaritmo natural exige valor maior que zero');
                    return Math.log(v);
                }
                case 'sen': return Math.sin(await this.evalExpr(argNodes[0]));
                case 'cos': return Math.cos(await this.evalExpr(argNodes[0]));
                case 'tan': return Math.tan(await this.evalExpr(argNodes[0]));
                case 'cotan': {
                    var tangent = Math.tan(await this.evalExpr(argNodes[0]));
                    if (Math.abs(tangent) < 1e-12) throw new Error('Cotangente indefinida para este valor');
                    return 1 / tangent;
                }
                case 'arcsen': {
                    var v = await this.evalExpr(argNodes[0]);
                    if (v < -1 || v > 1) throw new Error('arcsen exige valor entre -1 e 1');
                    return Math.asin(v);
                }
                case 'arccos': {
                    var v = await this.evalExpr(argNodes[0]);
                    if (v < -1 || v > 1) throw new Error('arccos exige valor entre -1 e 1');
                    return Math.acos(v);
                }
                case 'arctan': return Math.atan(await this.evalExpr(argNodes[0]));
                case 'grauprad': return (await this.evalExpr(argNodes[0])) * Math.PI / 180;
                case 'radpgrau': return (await this.evalExpr(argNodes[0])) * 180 / Math.PI;
                case 'int': return Math.trunc(await this.evalExpr(argNodes[0]));
                case 'pi': return Math.PI;
                case 'rand': return Math.random();
                case 'randi': {
                    var limit = await this.evalExpr(argNodes[0]);
                    if (!Number.isInteger(limit) || limit <= 0) throw new Error('randi exige limite inteiro maior que zero');
                    return Math.floor(Math.random() * limit);
                }
                case 'compr': return String(await this.evalExpr(argNodes[0])).length;
                case 'copia': {
                    var str = String(await this.evalExpr(argNodes[0]));
                    var pos = await this.evalExpr(argNodes[1]);
                    var len = await this.evalExpr(argNodes[2]);
                    if (pos < 1) throw new Error('copia exige posicao inicial maior ou igual a 1');
                    if (len < 0) throw new Error('copia exige tamanho maior ou igual a 0');
                    return str.substr(pos - 1, len);
                }
                case 'maiusc': return String(await this.evalExpr(argNodes[0])).toUpperCase();
                case 'minusc': return String(await this.evalExpr(argNodes[0])).toLowerCase();
                case 'asc': {
                    var ch = String(await this.evalExpr(argNodes[0]));
                    return ch.length > 0 ? ch.charCodeAt(0) : 0;
                }
                case 'carac': {
                    var code = await this.evalExpr(argNodes[0]);
                    if (!Number.isInteger(code) || code < 0 || code > 65535) {
                        throw new Error('carac exige codigo inteiro entre 0 e 65535');
                    }
                    return String.fromCharCode(code);
                }
                case 'pos': {
                    var sub = String(await this.evalExpr(argNodes[0]));
                    var str = String(await this.evalExpr(argNodes[1]));
                    var idx = str.toLowerCase().indexOf(sub.toLowerCase());
                    return idx >= 0 ? idx + 1 : 0;
                }
                case 'caracpnum': {
                    var raw = String(await this.evalExpr(argNodes[0])).trim().replace(',', '.');
                    if (!/^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(raw)) {
                        throw new Error('caracpnum exige texto numerico');
                    }
                    return Number(raw);
                }
                case 'numpcarac': return String(await this.evalExpr(argNodes[0]));
                default:
                    break;
            }

        // User-defined function
        if (this.functions[name]) {
            return await this.callFunction(name, argNodes);
        }

            // User-defined procedure called as expression
            if (this.procedures[name]) {
                throw new Error('Procedimento "' + name + '" nao retorna valor');
            }

        throw new Error('Funcao "' + name + '" nao encontrada');
    };

        Executor.prototype.callBuiltin = async function (name, argNodes) {
            throw new Error('Funcao "' + name + '" deve ser usada em uma expressao');
        };

    // ==========================================
    // EXPORTS
    // ==========================================
        window.VisuAlgLexer = Lexer;
        window.VisuAlgParser = Parser;
        window.VisuAlgSemanticAnalyzer = SemanticAnalyzer;
        window.VisuAlgExecutor = Executor;
    })();
