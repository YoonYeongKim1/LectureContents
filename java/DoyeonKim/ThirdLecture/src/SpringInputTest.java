import java.util.Scanner;

public class SpringInputTest {
    public static void main(String[] args) {
        System.out.println("문장도 입력이 된다는데요 ?");
        Scanner scan = new Scanner(System.in);

        System.out.println("아무 문장이나 입력하시요:");
        String str = scan.nextLine();

        System.out.println("당신이 입력한 문장은 ="+ str);
    }
}
