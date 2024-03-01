// Clasess

class Animal{
    int height;
    private int weight;

    static void sayHello(){
        System.out.println("Hello");
    }

    void talk(){
        System.out.println("Animal Noise");
    }

    // OverLoading
    int getHeight(){
        return this.height;
    }
    int getWeight(){
        return this.weight;
    }

    int getHeight(int height){
        return height;
    }

    // Constructor
    Animal(int height , int weight){
        this.height = height;
        this.weight = weight;
    }

}

// Inheritance
// one parent to child

final class Bird extends Animal{


    String name;

    Bird(int height,int weight,String name){
        super(height , weight);
        this.name = name;
    }

    // Overriding
    void talk(){
        super.talk();
        System.out.println("Chirp");
    }

    void getDetails(){
        System.out.println(this.height);
        System.out.println(this.name);
        System.out.println(this.getWeight());
    }

    void fly(){
        System.out.println("Flying");
    }
}



// Abstract -> Imaginary ( Does not Physically Exist )

abstract class Person{
    String name;
    String dateOfBirth;
    Person(String name , String dateOfBirth){
        this.name = name;
        this.dateOfBirth = dateOfBirth;
    }
}

class Boy extends Person implements Live{

    public void drinkWater(){
        System.out.println("Drinking water");
    }

    void printLifeSpan(){
        System.out.println(lifespan);
    }

    public void eat(){
        System.out.println("Eating");
    }

    public void breath(){
        System.out.println("Breathing");
    }

    Boy(String name , String dateOfBirth){
        super(name, dateOfBirth);
    }
}

// Interface -> set of functions every implementing class should use
interface Live {
    int lifespan = 30;  
    void drinkWater();
    void eat();
    void breath();
}
//  Default Public static
// Andar ke methods are always Public and Abstract

class Monkey extends Animal{
    String name;
    Monkey(int height,int weight,String name){
        super(height , weight);
        this.name = name;
    }
}

public class Tp{
    public static void main(String args[]){
        Animal giraffe = new Animal(100,60);
        // System.out.println(giraffe.getHeight());
        Animal kshirin = new Animal(160,40);
        // System.out.println(kshirin.getHeight());
        // System.out.println(kshirin.getHeight(140));
        Bird divya = new Bird(140, 40, "Namuna");
        divya.talk();
        // Person p = new Person(); cannot create object of This class
        Boy mushan = new Boy("Mushan", "25/03/2004");
        mushan.printLifeSpan();
        System.out.println(divya.getWeight());
        // Polymorphism
        // Morph -> Taking Forms , Poly -> Multiple
        Animal a[] = new Animal[100];
        // a = [Animal,Animal,Animal......]

        // Normal Polymorphism
        Animal ss = new Bird(34, 2, "Mushan");

        // Runtime Polymorphism
        int x = 1;
        if (x == 1) {
            a[0] = new Bird(23, 12, "Kshirin");
        }else{
            a[0] = new Monkey(20,3,"Divya");
        }
        a[1] = new Monkey(20,3,"Divya");
        // a[2] = new Fish()
        // a = [Bird,Monkey,Fish......]

    }
}