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
            float fNo = 673.14f;
            double dNumber = 1234.56;
            Console.WriteLine(fNo);
            Console.WriteLine(dNumber);

            Console.WriteLine(fNo);
            Console.WriteLine();

            //char sign = '\u00D6';
            char sign = (char)65;
            Console.WriteLine(sign);
            //Console.OutputEncoding = Encoding.UTF8;
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
            char a = 'a';
            char b = 'b';
            char c = 'c';
            string v1 = "First " + a + " Second " + b + " Third " + c;
            string v2 = string.Format("First {0} Second {1} Third {2} for {0} {1} {2} ",a,b,c);
            Console.WriteLine(v1);
            Console.WriteLine(v2);
        }
    }
}
