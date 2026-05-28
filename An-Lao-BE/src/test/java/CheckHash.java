import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CheckHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        boolean matches = encoder.matches("password", "$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUawB230zKGa");
        System.out.println("Matches: " + matches);
        System.out.println("New Hash: " + encoder.encode("password"));
    }
}
