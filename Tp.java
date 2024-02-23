import java.util.Scanner;

public class Tp{
    public static void main(String args[]){

        //This is not copied bruh
        Scanner sc = new Scanner(System.in);
        long i = sc.nextLong();
        while (i != 0) {
            long in = sc.nextLong();
            if (in >= 2000) {
                System.out.println("Yes");
            }else{
                System.out.println("No");
            }

            i--;
        }
        sc.close();
    }
}