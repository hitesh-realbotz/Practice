using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patterns
{
    internal class Program
    {
        static void Main(string[] args)
        {
            char separator = '-';
            int n = 5;
            for (int i = 0; i < n; i++)
            {
                for (int j = 1; j <= n - i; j++)
                {
                    Console.Write(j);
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j <= i; j++)
                {
                    Console.Write(n - i);
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));

            for (int i = 1; i <= n; i++)
            {
                for (int j = 1; j <= n; j++)
                {
                    if (j <= n - i)
                    {
                        Console.Write(" ");
                    }
                    else
                    {
                        Console.Write(i);
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));

            for (int i = 1; i <= n; i++)
            {
                for (int j = 1; j <= n; j++)
                {
                    if (j <= n - i)
                    {
                        Console.Write(" ");
                    }
                    else
                    {
                        Console.Write(j);
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));


            for (int i = 1; i <= n; i++)
            {
                int numberToPrint = 1;
                for (int j = 1; j < n + i; j++)
                {
                    if (j <= n - i)
                    {
                        Console.Write(" ");
                    }
                    else
                    {
                        Console.Write(numberToPrint++);
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));
            for (int i = 1; i <= n; i++)
            {
                for (int j = 1; j < n + i; j++)
                {
                    if (j <= n - i)
                    {
                        Console.Write(" ");
                    }
                    else
                    {
                        Console.Write('*');
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));
            for (int i = 1; i <= n; i++)
            {
                if (i <= n/2+1)
                {
                    for (int j = 1; j < n + i; j++)
                    {
                        if (j <= n - i)
                        {
                            Console.Write(" ");
                        }
                        else
                        {
                            Console.Write('*');
                        }
                    }
                }
                else
                {
                    
                }

                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));


        }
    }
}
