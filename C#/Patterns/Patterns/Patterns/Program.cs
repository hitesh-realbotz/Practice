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
            string space = new String(' ', 3);
            string star = " * ";
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
            n = 7;
            int topPartLoop = 0;
            int bottomPartLoop = 0;
            for (int i = 1; i <= n; i++)
            {
                if (i <= (n / 2) + 1)
                {

                    for (int j = 1; j < (n / 2) + 1 + i; j++)
                    {
                        if (j <= (n / 2) + 1 - i)
                        {
                            Console.Write(space);
                        }
                        else
                        {
                            Console.Write(star);
                        }
                        topPartLoop++;
                    }
                    Console.WriteLine();
                }
                else
                {
                    for (int j = 1; j <= (n / 2) + 1 + (n - i); j++)
                    {
                        if (j <= i - ((n / 2) + 1))
                        {
                            Console.Write(space);
                        }
                        else
                        {
                            Console.Write(star);
                        }
                        bottomPartLoop++;
                    }
                    Console.WriteLine();
                }


            }
            Console.WriteLine("topPartLoop iterations :" + topPartLoop);
            Console.WriteLine("bottomPartLoop iterations :" + bottomPartLoop);
            Console.WriteLine(new String(separator, 40));
            n = 7;
            int refIndex = (n / 2) + 1;
            for (int i = 1; i <= n; i++)
            {
                //For First & Last Row
                if (i == 1 || i == n)
                {
                    for (int j = 1; j <= (n / 2) + i; j++)
                    {
                        if (j == refIndex)
                        {
                            Console.Write(star);
                        }
                        else
                        {
                            Console.Write(space);
                        }
                    }
                }
                // For Central/Mid Row
                else if (i == refIndex)
                {
                    for (int j = 1; j <= (n / 2) + i; j++)
                    {
                        if (j == 1 || j == n)
                        {
                            Console.Write(star);
                        }
                        else
                        {
                            Console.Write(space);
                        }
                    }
                }
                //For every other rows except first, last & mid
                else
                {
                    for (int j = 1; j <= n; j++)
                    {
                        if (j == Math.Abs(refIndex - i) + 1 || j == n - Math.Abs(refIndex - i))
                        {
                            Console.Write(star);
                        }
                        else
                        {
                            Console.Write(space);
                        }
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));


            for (int i = 0; i < n; i++)
            {
                for (int j = 1; j <= n - i; j++)
                {
                    if (j == 1 || j == n - i || i == 0)
                    {

                        Console.Write(star);
                    }
                    else
                    {
                        Console.Write(space);
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));

            for (int i = 0; i < n; i++)
            {
                for (int j = 1; j <= n; j++)
                {
                    if (j == 1 || j == n || i == 0 || i == n - 1)
                    {

                        Console.Write(star);
                    }
                    else
                    {
                        Console.Write(space);
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));

            int ascNum = 1;
            int descNum = (n * 4) - 4;
            for (int i = 0; i < n; i++)
            {
                for (int j = 1; j <= n; j++)
                {
                    if (i == 0)
                    {
                        Console.Write(ascNum++.ToString(" 00"));
                    }
                    else if (j == 1)
                    {
                        Console.Write(descNum--.ToString(" 00"));
                    }
                    else if (j == n)
                    {
                        Console.Write(ascNum++.ToString(" 00"));
                    }
                    else if (i == n - 1)
                    {
                        Console.Write(descNum--.ToString(" 00"));
                    }
                    else
                    {
                        Console.Write(space);
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));

            ascNum = 1;
            for (int i = 0; i < n; i++)
            {
                for (int j = 1; j <= n; j++)
                {
                    if (i % 2 == 0)
                    {
                        Console.Write(ascNum++.ToString(" 00"));
                        if (j == n)
                        {
                            ascNum += (n - 1);
                        }
                    }
                    else
                    {
                        Console.Write(ascNum--.ToString(" 00"));
                        if (j == n)
                        {
                            ascNum += (n + 1);
                        }
                    }

                }
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));
            ascNum = 1;
            for (int i = 1; i <= n; i++)
            {

                for (int j = 1; j <= n; j++)
                {
                    Console.Write(ascNum.ToString(" 00"));
                    ascNum += n;

                }
                ascNum = i + 1;
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));
            ascNum = 1;
            n = 5;
            for (int i = 1; i <= n; i++)
            {

                for (int j = 1; j <= n; j++)
                {
                    //For first row
                    if (i == 1)
                    {
                        if (j % 2 == 0)
                        {

                            Console.Write(ascNum.ToString(" 00"));
                            ascNum++;
                        }
                        else
                        {
                            Console.Write(ascNum.ToString(" 00"));
                            ascNum = n * (j + 1);
                        }
                    }
                    //For last row
                    else if (i == n)
                    {
                        if (j % 2 != 0)
                        {

                            Console.Write(ascNum.ToString(" 00"));
                            ascNum++;
                        }
                        else
                        {
                            Console.Write(ascNum.ToString(" 00"));
                            ascNum = n * (j + 1);
                        }
                    }
                    //For every other rows except first & last
                    else
                    {
                        if (j % 2 == 0)
                        {
                            Console.Write(ascNum.ToString(" 00"));
                            ascNum = (n * (j + 1)) - (n - i);
                        }
                        else
                        {
                            Console.Write(ascNum.ToString(" 00"));
                            ascNum = (n * (j + 1)) - i + 1;
                        }
                    }
                }
                ascNum = i + 1;
                Console.WriteLine();
            }
            Console.WriteLine(new String(separator, 40));

        }
    }
}
