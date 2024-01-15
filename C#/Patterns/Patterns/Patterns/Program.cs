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

            //12345
            //1234
            //123
            //12
            //1
            for (int i = 0; i < n; i++)
            {
                for (int j = 1; j <= n - i; j++)
                {
                    Console.Write(j);
                }
                Console.WriteLine();
            }
            PrintSeparator(separator);

            //5
            //44
            //333
            //2222
            //11111
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j <= i; j++)
                {
                    Console.Write(n - i);
                }
                Console.WriteLine();
            }
            PrintSeparator(separator);

            //    1
            //   22
            //  333
            // 4444
            //55555
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
            PrintSeparator(separator);

            //    5
            //   45
            //  345
            // 2345
            //12345
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
            PrintSeparator(separator);

            //           01
            //         01 02 03
            //      01 02 03 04 05
            //   01 02 03 04 05 06 07
            //01 02 03 04 05 06 07 08 09
            int numberToPrint = 1;
            for (int i = 1; i <= n; i++)
            {
                numberToPrint = 1;
                for (int j = 1; j < n + i; j++)
                {
                    if (j <= n - i)
                    {
                        Console.Write(space);
                    }
                    else
                    {
                        Console.Write(numberToPrint++.ToString(" 00"));
                    }
                }
                Console.WriteLine();
            }
            PrintSeparator(separator);

            //            01
            //         02 03 04
            //      05 06 07 08 09
            //   10 11 12 13 14 15 16
            //17 18 19 20 21 22 23 24 25
            numberToPrint = 1;
            for (int i = 1; i <= n; i++)
            {

                for (int j = 1; j < n + i; j++)
                {
                    if (j <= n - i)
                    {
                        Console.Write(space);
                    }
                    else
                    {
                        Console.Write(numberToPrint++.ToString(" 00"));
                    }
                }
                Console.WriteLine();
            }
            PrintSeparator(separator);

            //            01
            //         02 01 02
            //      03 02 01 02 03
            //    04 03 02 01 02 03 04
            //05 04 03 02 01 02 03 04 05
            for (int i = 1; i <= n; i++)
            {
                numberToPrint = i;

                for (int j = 1; j < n + i; j++)
                {
                    if (j <= n - i)
                    {
                        Console.Write(space);
                    }
                    else
                    {
                        if (j < n)
                        {
                            Console.Write(numberToPrint--.ToString(" 00"));

                        }
                        else if (j == n)
                        {
                            Console.Write(numberToPrint.ToString(" 00"));
                        }
                        else
                        {
                            ++numberToPrint;
                            Console.Write(numberToPrint.ToString(" 00"));
                        }
                    }
                }
                Console.WriteLine();
            }
            PrintSeparator(separator);

            //            *
            //         *  *  *
            //      *  *  *  *  *
            //   *  *  *  *  *  *  *
            //*  *  *  *  *  *  *  *  *
            for (int i = 1; i <= n; i++)
            {
                for (int j = 1; j < n + i; j++)
                {
                    if (j <= n - i)
                    {
                        Console.Write(space);
                    }
                    else
                    {
                        Console.Write(star);
                    }
                }
                Console.WriteLine();
            }
            PrintSeparator(separator);

            //         *
            //      *  *  *
            //   *  *  *  *  *
            //*  *  *  *  *  *  *
            //   *  *  *  *  *
            //      *  *  *
            //         *
            n = 7;
            int refIndex = (n / 2) + 1;
            int topPartLoop = 0;
            int bottomPartLoop = 0;
            for (int i = 1; i <= n; i++)
            {
                if (i <= (n / 2) + 1)
                {
                    for (int j = 1; j < refIndex + i; j++)
                    {
                        if (j <= refIndex - i)
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
                    for (int j = 1; j <= refIndex + (n - i); j++)
                    {
                        if (j <= i - refIndex)
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
            PrintSeparator(separator);


            //         *
            //      *     *
            //   *           *
            //*                 *
            //   *           *
            //      *     *
            //         *
            n = 7;
            
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
            PrintSeparator(separator);


            //*  *  *  *  *  *  *
            //*              *
            //*           *
            //*        *
            //*     *
            //*  *
            //*
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
            PrintSeparator(separator);

            //*  *  *  *  *  *  *
            //*                 *
            //*                 *
            //*                 *
            //*                 *
            //*                 *
            //*  *  *  *  *  *  *
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
            PrintSeparator(separator);

            //01 02 03 04 05 06 07
            //24                08
            //23                09
            //22                10
            //21                11
            //20                12
            //19 18 17 16 15 14 13
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
            PrintSeparator(separator);


            //01 02 03 04 05 06 07
            //14 13 12 11 10 09 08
            //15 16 17 18 19 20 21
            //28 27 26 25 24 23 22
            //29 30 31 32 33 34 35
            //42 41 40 39 38 37 36
            //43 44 45 46 47 48 49
            ascNum = 1;
            for (int i = 0; i < n; i++)
            {
                for (int j = 1; j <= n; j++)
                {
                    //For Odd no row 1/3/5
                    if (i % 2 == 0)
                    {
                        Console.Write(ascNum++.ToString(" 00"));
                        if (j == n)
                        {
                            ascNum += (n - 1);
                        }
                    }
                    //For Odd no row 2/4/6
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
            PrintSeparator(separator);

            //01 08 15 22 29 36 43
            //02 09 16 23 30 37 44
            //03 10 17 24 31 38 45
            //04 11 18 25 32 39 46
            //05 12 19 26 33 40 47
            //06 13 20 27 34 41 48
            //07 14 21 28 35 42 49
            for (int i = 1; i <= n; i++)
            {
                ascNum = i;
                for (int j = 1; j <= n; j++)
                {
                    //Console.Write(ascNum.ToString(" 00"));
                    Console.Write($"{ascNum,3}");
                    ascNum += n;
                }
                Console.WriteLine();
            }
            PrintSeparator(separator);

            //01 10 11 20 21
            //02 09 12 19 22
            //03 08 13 18 23
            //04 07 14 17 24
            //05 06 15 16 25
            n = 5;
            for (int i = 1; i <= n; i++)
            {
                ascNum = i;
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
                Console.WriteLine();
            }
            
            PrintSeparator(separator);

        }

        public static void PrintSeparator(char separator)
        {
            Console.WriteLine(new String(separator, 40));
        }
    }


}
