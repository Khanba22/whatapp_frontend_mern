import java.util.Scanner;

public class Tp{
    public static void main(String args[]){


        Scanner sc = new Scanner(System.in);
        long i = sc.nextLong();
        if (i % 2 == 0) {
            System.err.println(i+2);
        }else{
            System.err.println(i+1);
        }
        sc.close();
    }
}