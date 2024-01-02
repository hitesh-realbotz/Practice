using IntroToOops.ClassTemplates.Characters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntroToOops
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Warrior goodGuy = new Warrior();
            Console.WriteLine($"Count : {Warrior.IdCounter}");

            Warrior badGuy = new Warrior("John", 11, 70);
            Console.WriteLine($"Count : {Warrior.IdCounter}");
            Warrior thirdWarrior = new Warrior();
            Console.WriteLine($"Count : {Warrior.IdCounter}");


            Console.WriteLine(goodGuy.Name);

            Console.WriteLine(badGuy.Name);

            //Console.WriteLine(goodGuy.GetName());
            //Console.WriteLine(badGuy.GetName());
            //try
            //{
            //    goodGuy.Level = 500;
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("In Catch");
            //    Console.WriteLine("Exception Handled!");
            //    Console.WriteLine(ex.Message);
            //}
            //goodGuy.Level = 50;
            //Console.WriteLine(goodGuy.Level);
            Console.WriteLine(thirdWarrior.Level);


        }
    }
}
