package lexer;

public class Main {
    public static void main(String[] args) {
        String codigo = "x + 10 * (y - 3)";

        Lexer lexer = new Lexer(codigo);

        Token token;
        do {
            token = lexer.nextToken();
            System.out.println(token);
        } while (token.getType() != TokenType.EOF);
    }
}
