package lexer;

public class Lexer {
    private final String input;
    private int pos = 0;
    private char currentChar;

    public Lexer(String input) {
        this.input = input;
        currentChar = input.length() > 0 ? input.charAt(0) : '\0';
    }

    // avança um caractere
    private void advance() {
        pos++;
        if (pos >= input.length()) {
            currentChar = '\0'; // caractere "nulo" indicando fim
        } else {
            currentChar = input.charAt(pos);
        }
    }

    // ignora espaços em branco
    private void skipWhitespace() {
        while (Character.isWhitespace(currentChar)) {
            advance();
        }
    }

    // lê ident ou palavra (ex: x, soma1, var)
    private Token identifier() {
        int start = pos;
        StringBuilder sb = new StringBuilder();
        while (Character.isLetterOrDigit(currentChar) || currentChar == '_') {
            sb.append(currentChar);
            advance();
        }
        String lexeme = sb.toString();
        return new Token(TokenType.IDENTIFIER, lexeme, start);
    }

    // lê número (inteiro simples)
    private Token number() {
        int start = pos;
        StringBuilder sb = new StringBuilder();
        while (Character.isDigit(currentChar)) {
            sb.append(currentChar);
            advance();
        }
        String lexeme = sb.toString();
        return new Token(TokenType.NUMBER, lexeme, start);
    }

    // pega o próximo token
    public Token nextToken() {
        // pular espaços
        while (currentChar != '\0' && Character.isWhitespace(currentChar)) {
            skipWhitespace();
        }

        if (currentChar == '\0') {
            return new Token(TokenType.EOF, "", pos);
        }

        // identificador
        if (Character.isLetter(currentChar) || currentChar == '_') {
            return identifier();
        }

        // número
        if (Character.isDigit(currentChar)) {
            return number();
        }

        // símbolos simples
        int start = pos;
        char ch = currentChar;
        switch (ch) {
            case '+':
                advance();
                return new Token(TokenType.PLUS, "+", start);
            case '-':
                advance();
                return new Token(TokenType.MINUS, "-", start);
            case '*':
                advance();
                return new Token(TokenType.STAR, "*", start);
            case '/':
                advance();
                return new Token(TokenType.SLASH, "/", start);
            case '(':
                advance();
                return new Token(TokenType.LPAREN, "(", start);
            case ')':
                advance();
                return new Token(TokenType.RPAREN, ")", start);
            default:
                // caractere desconhecido
                advance();
                return new Token(TokenType.UNKNOWN, String.valueOf(ch), start);
        }
    }
}
