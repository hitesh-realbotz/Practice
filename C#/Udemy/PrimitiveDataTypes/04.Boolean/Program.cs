using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _04.Boolean
{
    internal class Program
    {


        static void Main(string[] args)
        {
            /*
            float fNo = 673.14f;
            double dNumber = 1234.56;
            Console.WriteLine(fNo);
            Console.WriteLine(dNumber);

            Console.WriteLine(fNo);
            Console.WriteLine();

            //char sign = '\u00D6';
            char sign = (char)65;
            Console.WriteLine(sign);
            Console.InputEncoding = Encoding.UTF8;
            Console.OutputEncoding = Encoding.UTF8;
            Console.WriteLine(Console.OutputEncoding);

            string userName = "admin";

            Console.WriteLine(userName[4]);

            //int[] numbers = { 5, 6, 7, 8, 9, 1, 2, 3 };
            int[] numbers = new int[5];
            Console.WriteLine(numbers[2]);
            string separator = new String('*', 10);
            Console.WriteLine(separator);
            int intNo = 456;
            Console.WriteLine(intNo + intNo + userName + intNo + intNo);
            char charA = 'a';
            char charB = 'b';
            char charC = 'c';
            string v1 = "First " + charA + " Second " + charB + " Third " + charC;
            string v2 = string.Format("First {0} Second {1} Third {2} for {0} {1} {2} ", charA, charB, charC);
            string v3 = $"First {charA} Second {charB} Third {charC} for {charA} {charB} {charC}";
            Console.WriteLine(v1);
            Console.WriteLine(v2);
            Console.WriteLine(v3);

            int number = 10;
            string num = "5";
            //string num = null;
            Console.WriteLine(Convert.ToInt32(num));    //0 incase of num = null
            Console.WriteLine(int.Parse(num));          //Exception incase of num = null
            Console.WriteLine(separator);
            string v4 = "C:\\Folder1\\File1";
            v4 = "\"C:\\Folder1\\File1\"";
            v4 = @"""C:\Folder1\File1""";
            Console.WriteLine(v4);

            Console.WriteLine(separator);
            string fruit = "Strawberry";
            string juice = "juice";
            float dollerSign = 1000.56f;
            Console.WriteLine("{0, 15}", fruit);
            Console.WriteLine("{0, 15}", juice);
            Console.WriteLine("{0, 15:C2}", dollerSign);
            Console.WriteLine("{0:C2}", dollerSign);
            Console.WriteLine("{0, 15:N7}", dollerSign);
            Console.WriteLine("{0:N7}", dollerSign);
            Console.WriteLine($"{fruit, 15}");
            Console.WriteLine($"{juice, 15}");
            Console.WriteLine($"{dollerSign, 15:C2}");
            Console.WriteLine($"{dollerSign:C2}");
            Console.WriteLine($"{dollerSign, 15:N7}");
            Console.WriteLine($"{dollerSign:N7}");
            

            ConsoleKeyInfo key =  Console.ReadKey();
            Console.WriteLine();
            Console.WriteLine(key.KeyChar);
            Console.WriteLine(key.Modifiers);
            string mod = key.Modifiers.ToString();
            string[] modArray = mod.Split(',');
            Console.WriteLine(modArray[0]);
            */


            Console.CursorSize = 100;

            Console.WriteLine(Console.WindowHeight +" "+ Console.WindowWidth);
            Console.WriteLine(Console.LargestWindowHeight +" "+ Console.LargestWindowWidth);

            int num = Convert.ToInt32(Console.ReadLine());
            switch (num)
            {
                case 0:
                    Console.WriteLine($"Number is 0 ");
                    break;
                case 1:
                    Console.WriteLine($"Number is 1");
                    break;
                default: Console.WriteLine("Default");
                    break;
            }

        }
    }
}
