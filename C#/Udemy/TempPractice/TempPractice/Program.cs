using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace TempPractice
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string separator = new String('*', 10);
            //float fNo = 673.14f;
            //double dNumber = 1234.56;
            //Console.WriteLine(fNo);
            //Console.WriteLine(dNumber);

            //Console.WriteLine(fNo);
            //Console.WriteLine();

            ////char sign = '\u00D6';
            //char sign = (char)65;
            //Console.WriteLine(sign);
            //Console.InputEncoding = Encoding.UTF8;
            //Console.OutputEncoding = Encoding.UTF8;
            //Console.WriteLine(Console.OutputEncoding);

            //string userName = "admin";

            //Console.WriteLine(userName[4]);

            ////int[] numbers = { 5, 6, 7, 8, 9, 1, 2, 3 };
            //int[] numbers = new int[5];
            //Console.WriteLine(numbers[2]);

            //Console.WriteLine(separator);
            //int intNo = 456;
            //Console.WriteLine(intNo + intNo + userName + intNo + intNo);
            //char charA = 'a';
            //char charB = 'b';
            //char charC = 'c';
            //string v1 = "First " + charA + " Second " + charB + " Third " + charC;
            //string v2 = string.Format("First {0} Second {1} Third {2} for {0} {1} {2} ", charA, charB, charC);
            //string v3 = $"First {charA} Second {charB} Third {charC} for {charA} {charB} {charC}";
            //Console.WriteLine(v1);
            //Console.WriteLine(v2);
            //Console.WriteLine(v3);

            //int number = 10;
            //string num = "5";
            ////string num = null;
            //Console.WriteLine(Convert.ToInt32(num));    //0 incase of num = null
            //Console.WriteLine(int.Parse(num));          //Exception incase of num = null
            //Console.WriteLine(separator);
            //string v4 = "C:\\Folder1\\File1";
            //v4 = "\"C:\\Folder1\\File1\"";
            //v4 = @"""C:\Folder1\File1""";
            //Console.WriteLine(v4);


            //Console.WriteLine(separator);
            //string fruit = "Strawberry";
            //string juice = "juice";
            //float dollerSign = 1000.56f;
            //Console.WriteLine("{0, 15}", fruit);
            //Console.WriteLine("{0, 15}", juice);
            //Console.WriteLine("{0, 15:C2}", dollerSign);
            //Console.WriteLine("{0:C2}", dollerSign);
            //Console.WriteLine("{0, 15:N7}", dollerSign);
            //Console.WriteLine("{0:N7}", dollerSign);
            //Console.WriteLine($"{fruit, 15}");
            //Console.WriteLine($"{juice, 15}");
            //Console.WriteLine($"{dollerSign, 15:C2}");
            //Console.WriteLine($"{dollerSign:C2}");
            //Console.WriteLine($"{dollerSign, 15:N7}");
            //Console.WriteLine($"{dollerSign:N7}");


            //ConsoleKeyInfo key =  Console.ReadKey();
            //Console.WriteLine();
            //Console.WriteLine(key.KeyChar);
            //Console.WriteLine(key.Modifiers);
            //string mod = key.Modifiers.ToString();
            //string[] modArray = mod.Split(',');
            //Console.WriteLine(modArray[0]);

            //Console.CursorSize = 100;

            //Console.WriteLine(Console.WindowHeight +" "+ Console.WindowWidth);
            //Console.WriteLine(Console.LargestWindowHeight +" "+ Console.LargestWindowWidth);

            //int num = Convert.ToInt32(Console.ReadLine());
            //switch (num)
            //{
            //    case 0:
            //        Console.WriteLine($"Number is 0 ");
            //        break;
            //    case 1:
            //        Console.WriteLine($"Number is 1");
            //        break;
            //    default: Console.WriteLine("Default");
            //        break;
            //}

            //Random rnd = new Random();
            //int counter = 0;
            //bool isMatched = false;
            //while (!isMatched)
            //{
            //    int num = rnd.Next(1, 11);
            //    //int num = rnd.Next(11);
            //    counter++;
            //    isMatched = checkIsMatched(isMatched, num); 
            //    Console.WriteLine(num);
            //}
            //Console.WriteLine($"Counter : {counter}");




            //int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
            //double[] numbers = new double[5];            
            //string[] numbers = new string[5];
            //for (int i = 0; i < numbers.Length; i++)
            //{
            //    Console.WriteLine("Before " + numbers[i]);
            //    if (numbers[i] == null)
            //    {
            //        numbers[i] = $"{i}";
            //    }
            //    Console.WriteLine("After " + numbers[i]);
            //}

            //foreach (var number in numbers)
            //{
            //    Console.WriteLine(number);
            //}

            //Console.WriteLine(new string('-', 20));

            //int[] numbersCopy = new int[numbers.Length];
            //Array.Copy(numbers, numbersCopy, numbers.Length / 2);
            //Array.Copy(numbers, numbersCopy, numbers.Length);
            //Array.Reverse(numbers);

            //Array.Reverse(numbers,2,5);
            //Array.Reverse(numbers,2,numbers.Length-2);


            //foreach (var number in numbers)
            //{
            //    Console.WriteLine("==> " + number);
            //}


            //for (int i = 0; i < 5; i++)
            //{
            //    for (int j = 0; j < 5; j++) {
            //        Console.Write($"Index[{i}][{j}]   ");
            //    }
            //    Console.WriteLine();
            //}

            //char[] alphabets = { 'a','b','c','d','e','f' };

            //for (int i = 0; i < 10; i++)
            //{
            //    Console.WriteLine(alphabets[i%alphabets.Length]);

            //}


            ////Bubble Sort
            //int[] array = { 5, 7, 4, 3, 6 };
            //for (int i = 0; i < array.Length; i++)
            //{
            //    bool isSwapped = false;
            //    for (int j = 0; j < array.Length - i - 1; j++)
            //    {
            //        if (array[j] > array[j + 1])
            //        {
            //            SwapValues(ref array[j], ref array[j + 1]);
            //            isSwapped = true;
            //        }
            //    }
            //    if (!isSwapped)
            //    {
            //        break;
            //    }
            //    Console.WriteLine(string.Join(", ", array));
            //}
            //Console.WriteLine(new string('-', 40));
            //Console.WriteLine(string.Join(", ", array));


            ////Selection Sort
            //int[] array = { 5, 3, 100, 4, 1, -1 };
            //for (int i = 0; i < array.Length; i++)
            //{
            //    int smallestIndex = i;
            //    bool isSwapped = false;
            //    for (int j = i; j < array.Length; j++)
            //    {
            //        if (array[smallestIndex] > array[j])
            //        {
            //            isSwapped = true;
            //            smallestIndex = j;
            //        }
            //    }
            //    if (isSwapped)
            //    {
            //        SwapValues(ref array[i], ref array[smallestIndex]);
            //        Console.WriteLine(string.Join(", ", array));
            //    } else
            //    {
            //        continue;
            //    }
            //}
            //Console.WriteLine(new string('-',40));
            //Console.WriteLine(string.Join(", ", array));


            //Random rng = new Random();
            //int[] array = new int[10];
            //for (int i = 0; i < array.Length; i++)
            //{
            //    array[i] = rng.Next(50, 150);

            //}
            ////string[] array = { "cherry", "strawberry", "blueberry" };
            //printArray(array);
            //Array.Sort(array);
            //printArray(array);

            ////Binary Search
            //Random rng = new Random();
            //int[] array = new int[1000];
            //for (int i = 0; i < array.Length; i++)
            //{
            //    //array[i] = rng.Next(50, 150);
            //    array[i] = i;
            //}
            //Array.Sort(array);
            //printArray(array);

            //int lookingFor = 100;
            //int start = 0;
            //int end = array.Length - 1;
            //int midpoint = (end + start) / 2;
            //bool foundIt = false;
            //bool isOutOfRange = false;

            //while (!foundIt && !isOutOfRange)
            //{
            //    if (array[midpoint] == lookingFor)
            //    {
            //        Console.WriteLine("found");
            //        foundIt = true;
            //    }
            //    else if (array[midpoint] > lookingFor)
            //    {
            //        end = midpoint - 1;
            //        if (end < 0)
            //        {
            //            isOutOfRange = true;
            //        }
            //    }
            //    else if (array[midpoint] < lookingFor)
            //    {
            //        start = midpoint + 1;
            //        if (start == array.Length)
            //        {
            //            isOutOfRange = true;
            //        }
            //    }

            //    midpoint = (end + start) / 2;
            //    Console.WriteLine($"{start} {end} {midpoint}");
            //}
            //if (foundIt)
            //{
            //    Console.WriteLine($"The number {lookingFor} was found at index {midpoint}.");
            //}
            //else
            //{
            //    Console.WriteLine("Not available");
            //}


            ////List
            //Random rng = new Random();
            //int[] array = new int[rng.Next(50, 100)];

            //for (int i = 0; i < array.Length; i++)
            //{
            //    array[i] = rng.Next(1, 10);
            //}

            //List<int> ourFirstList = new List<int>();

            //for (int i = 0; i < array.Length; i++)
            //{
            //    if ((array[i] >= 5) && (array[i] <= 10))
            //    {
            //        ourFirstList.Add(array[i]);

            //    }
            //}
            //int fromList = 0;

            //foreach (var item in ourFirstList)
            //{
            //    Console.WriteLine($"List ==> {item}");
            //    fromList = item;
            //}
            //Console.WriteLine($"last from List ==> {fromList}");


            //Console.WriteLine(string.Join(", ", array));
            //Console.WriteLine(new string('-', 40));
            //Console.WriteLine(string.Join(", ", ourFirstList));




            //string[] vegetables = { "cucumber", "cabbage" };
            //string[] fruits = { "cherry", "strawberry", "blueberry" };
            //string[] meat = { "beef", "pork" };

            //List<string> food = ConcatenateStringArrays(new List<string[]>() { vegetables, fruits, meat });
            //List<string[]> foodV2 = new List<string[]>() { vegetables, fruits, meat };

            //List<string> vegetablesList = new List<string>() { "cucumber", "cabbage" };
            //List<string> fruitsList = new List<string>() { "cherry", "strawberry", "blueberry" };
            //List<string> meatList = new List<string>() { "beef", "pork" };
            //List<string> foodV3 = new List<string>() { };
            //foodV3.AddRange(vegetablesList);
            //foodV3.AddRange(fruitsList);
            //foodV3.AddRange(meatList);

            //List<string[]> foodV4 = new List<string[]>() { vegetablesList.ToArray(), fruitsList.ToArray(), meatList.ToArray() };
            //Console.WriteLine("Food2 : *****");
            //foreach (var stringArray in foodV2)
            //{
            //    foreach (var individualFood in stringArray)
            //    {
            //        Console.WriteLine(individualFood);
            //    }
            //}
            //Console.WriteLine("Food : *****");
            //foreach (var item in food)
            //{
            //    Console.WriteLine(item);
            //}

            //Console.WriteLine("Food3 : *****");
            //foreach (var stringArray in foodV3)
            //{
            //    //foreach (var individualFood in stringArray)
            //    //{
            //    //    Console.WriteLine(individualFood);
            //    //}
            //    Console.WriteLine(stringArray);

            //}
            //Console.WriteLine("Food4 : *****");
            //foreach (var stringArray in foodV4)
            //{
            //    foreach (var individualFood in stringArray)
            //    {
            //        Console.WriteLine(individualFood);
            //    }
            //}


            ////MultiDimensional Array
            //Random rng = new Random();

            //int years = 10;
            //int months = 12;
            //int days = 31;
            //int hours = 24;

            //List<int[,,]> temperatures = new List<int[,,]>();
            ////int[,,,] temperatures = new int[years, months, days, hours];

            //for (int year = 0; year < years; year++)
            //{
            //    temperatures.Add(new int[months, days, hours]);

            //    for (int month = 0; month < temperatures[year].GetLength(0); month++)
            //    {
            //        for (int day = 0; day < temperatures[year].GetLength(1); day++)
            //        {
            //            for (int hour = 0; hour < temperatures[year].GetLength(2); hour++)
            //            {
            //                if (month >= 0 && month <= 2)
            //                {
            //                    temperatures[year][month, day, hour] = rng.Next(-10, 15);
            //                    //temperatures[year, month, day, hour] = rng.Next(-10, 15);
            //                }
            //                else if (month >= 3 && month <= 5)
            //                {
            //                    temperatures[year][month, day, hour] = rng.Next(15, 25);
            //                }
            //                else if (month >= 6 && month <= 8)
            //                {
            //                    temperatures[year][month, day, hour] = rng.Next(25, 35);
            //                }
            //                else if (month >= 9 && month <= 11)
            //                {
            //                    temperatures[year][month, day, hour] = rng.Next(0, 25);
            //                }
            //            }
            //        }
            //    }
            //}
            //Console.WriteLine(temperatures[0][1,1,1]);
            //Console.WriteLine(temperatures[0][3,3,1]);
            //Console.WriteLine(temperatures[0][6,6,1]);
            //Console.WriteLine(temperatures[0][9,9,1]);


            //string[,] people = new string[2, 4];
            //string[] person = new string[4];
            //string input = string.Empty;

            //for (int i = 0; i < people.GetLength(0); i++)
            //{
            //    Console.WriteLine("Please input your information in the following format \"Firstname, Lastname, Age, City\":");
            //    input = Console.ReadLine();

            //    person = input.Split(new string[] { ", " }, StringSplitOptions.None);


            //    for (int j = 0; j < people.GetLength(1); j++)
            //    {
            //        people[i, j] = person[j];
            //    }
            //}

            //for (int i = 0; i < people.GetLength(0); i++)
            //{
            //    for (int j = 0; j < people.GetLength(1); j++)
            //    {
            //        Console.Write($"{people[i, j]} ");
            //    }
            //    Console.WriteLine();
            //}




            ////_1)_______________2)_______________3)________
            //// 1  5  9 13   |   1  8  9 16   |   7 11 14 16
            //// 2  6 10 14   |   2  7 10 15   |   4  8 12 15
            //// 3  7 11 15   |   3  6 11 14   |   2  5  9 13
            //// 4  8 12 16   |   4  5 12 13   |   1  3  6 10


            //int N = 6;
            //int[,] matrixOne = new int[N, N];
            //int[,] matrixTwo = new int[N, N];
            //int[,] matrixThree = new int[N, N];
            //int number = 1;

            //for (int i = 0; i < matrixOne.GetLength(0); i++)
            //{
            //    for (int j = 0; j < matrixOne.GetLength(1); j++)
            //    {
            //        matrixOne[j, i] = number;
            //        number++;
            //    }
            //}

            //PrintMatrix(matrixOne);
            //Console.WriteLine();
            //Console.WriteLine();

            //number = 1;

            //for (int i = 0; i < matrixTwo.GetLength(0); i++)
            //{
            //    if (i % 2 == 0)
            //    {
            //        for (int j = 0; j < matrixTwo.GetLength(1); j++)
            //        {
            //            matrixTwo[j, i] = number;
            //            number++;
            //        }
            //    }
            //    else
            //    {
            //        for (int j = matrixTwo.GetLength(1) - 1; j >= 0; j--)
            //        {
            //            matrixTwo[j, i] = number;
            //            number++;
            //        }
            //    }
            //}

            //PrintMatrix(matrixTwo);
            //Console.WriteLine();
            //Console.WriteLine();

            //number = 1;

            //int currentRow = 0;
            //int currentCol = 0;
            //int startingRow = N - 1;
            //int startingCol = 0;
            //int counter = 0;

            //while (number <= N * N)
            //{
            //    currentRow = startingRow + counter;
            //    currentCol = startingCol + counter;
            //    matrixThree[currentRow, currentCol] = number;
            //    number++;
            //    counter++;

            //    if (startingRow > 0 && currentRow == N - 1)
            //    {
            //        startingRow--;
            //        counter = 0;
            //    }
            //    else if (currentCol == N - 1)
            //    {
            //        startingCol++;
            //        counter = 0;
            //    }
            //}
            //PrintMatrix(matrixThree);


            ////Image
            //Random rng = new Random();

            //byte[,,] colors = new byte[3, 1080, 1920];

            //for (int color = 0; color < colors.GetLength(0); color++)
            //{
            //    for (int row = 0; row < colors.GetLength(1); row++)
            //    {
            //        for (int col = 0; col < colors.GetLength(2); col++)
            //        {
            //            //if (color == 0)
            //            //{
            //            //    colors[color, row, col] = (byte)rng.Next(255, 256);
            //            //}
            //            //else
            //            //{
            //            //    colors[color, row, col] = (byte)0;
            //            //}
            //            colors[color, row, col] = (byte)rng.Next(0, 255);
            //        }
            //    }
            //}

            //Bitmap bitmapImage = new Bitmap(colors.GetLength(2), colors.GetLength(1), PixelFormat.Format24bppRgb);

            //for (int row = 0; row < bitmapImage.Height; row++)
            //{
            //    for (int col = 0; col < bitmapImage.Width; col++)
            //    {
            //        bitmapImage.SetPixel(col, row, Color.FromArgb(colors[0, row, col], colors[1, row, col], colors[2, row, col]));
            //        //bitmapImage.SetPixel(col, row, Color.FromArgb(255, 0 , 0));
            //    }
            //}

            //bitmapImage.Save("test.png");
            ////bitmapImage.Save("test2.png");

            //////Create Image
            ////Bitmap bitmapImage2 = new Bitmap(colors.GetLength(2), colors.GetLength(1), PixelFormat.Format24bppRgb);
            ////for (int row = 0; row < bitmapImage2.Height; row++)
            ////{
            ////    for (int col = 0; col < bitmapImage2.Width; col++)
            ////    {                    
            ////        bitmapImage.SetPixel(col, row, Color.FromArgb(255, 0 , 0));
            ////    }
            ////}
            ////bitmapImage.Save("test2.png");


            //Bitmap readImage = new Bitmap(System.Drawing.Image.FromFile("test.png"));

            //Color[,] readColors = new Color[readImage.Height, readImage.Width];

            //for (int row = 0; row < readColors.GetLength(0); row++)
            //{
            //    for (int col = 0; col < readColors.GetLength(1); col++)
            //    {
            //        readColors[row, col] = readImage.GetPixel(col, row);
            //    }
            //}

            //colors[0, 100, 150] = 0;

            //bool equal = true;

            //for (int row = 0; row < readColors.GetLength(0); row++)
            //{
            //    for (int col = 0; col < readColors.GetLength(1); col++)
            //    {
            //        if ((readColors[row, col].R != colors[0, row, col]) ||
            //            (readColors[row, col].G != colors[1, row, col]) ||
            //            (readColors[row, col].B != colors[2, row, col]))
            //        {
            //            Console.WriteLine($"Difference found at pixel row = {row}, col = {col}");
            //            equal = false;
            //            break;
            //        }
            //    }
            //}

            //Console.WriteLine($"Is the image the same as the original array: {equal}");



            ////String
            //char[] charactersToSplitBy = { ' ', ',', 'T', 'H', 'a', 'o' };

            ////string namesV1 = "Tod Bob Maria Helena Jacky John";
            //string namesV1 = "Tod Bob Maria Helena Jacky John";
            //string namesV2 = "Tod, Bob, Maria, Helena, Jacky, John";
            //string namesV3 = "Tod,,,THao Bob,,,THao Maria,,,THao Helena,,,THao Jacky,,,THao John";

            //string[] splitNamesV1 = namesV1.Split(' ');
            //string[] splitNamesV2 = namesV2.Split(new char[] { ' ', ',' }, StringSplitOptions.None);
            //string[] splitNamesV3 = namesV3.Split(new string[] { ",,,TH", "ao " }, StringSplitOptions.RemoveEmptyEntries);
            //string[] splitNamesV4 = namesV1.Split('A');

            //foreach (var name in splitNamesV2)
            //{
            //    Console.WriteLine(name);
            //}
            //foreach (var name in splitNamesV3)
            //{
            //    Console.WriteLine(name);
            //}
            //foreach (var name in splitNamesV4)
            //{
            //    Console.WriteLine(name);
            //}

            //IWebDriver driver = new ChromeDriver();
            ////driver.Navigate().GoToUrl("http://testing.todvachev.com/sitemap-posttype-post.xml");
            //driver.Navigate().GoToUrl("http://localhost:4200/items");
            ////string pageSource = driver.PageSource;
            ////Console.WriteLine(pageSource);

            //string[] pageSource = driver.PageSource.Split('>');
            //foreach (var line in pageSource)
            //{
            //    Console.WriteLine(line);
            //}

            //int startIndex = 0;
            //int length = 0;
            //List<string> links = new List<string>();

            //foreach (var link in pageSource)
            //{
            //    if (link.Contains(@"""http://testing.todvachev.com"))
            //    {
            //        startIndex = link.IndexOf('"') + 1;
            //        length = link.LastIndexOf('"') - startIndex;
            //        links.Add(link.Substring(startIndex, length));
            //    }
            //}

            //foreach (var link in links)
            //{
            //    Console.WriteLine(link);
            //}




            //string stringToTrim = "abTodab";
            //char[] charactersToRemove = { 'a', 'b' };

            //stringToTrim = Trimming(stringToTrim, charactersToRemove);

            //Console.WriteLine(stringToTrim);

            //string[] namesV1 = { "  Tod  ", "  Bob ", " Maria    ", "  Helena  ", "  Jacky  ", " John " };

            //for (int i = 0; i < namesV1.Length; i++)
            //{
            //    namesV1[i] = namesV1[i].Trim();
            //}

            //foreach (var name in namesV1)
            //{
            //    Console.WriteLine(name);
            //}

            //name = name.Trim(new char[] { ' ', 'g', 'd', 'f' });

            //Console.WriteLine(name);


            //string fileDirectory = @"C:\Program Files\Microsoft\Word\Wo....rd.exe";
            //string extension = string.Empty;
            //string fileName = string.Empty;
            //string firstFolder = string.Empty;
            //string secondFolder = string.Empty;

            //int startIndex = fileDirectory.IndexOf('P');
            //int length = fileDirectory.IndexOf('s') + 1 - startIndex;
            //firstFolder = fileDirectory.Substring(startIndex, length);
            //Console.WriteLine(firstFolder);

            //startIndex = fileDirectory.LastIndexOf('.') + 1;
            //length = fileDirectory.Length - startIndex;
            //extension = fileDirectory.Substring(startIndex, length);
            //Console.WriteLine(extension);

            //startIndex = fileDirectory.LastIndexOf('\\') + 1;
            //length = fileDirectory.LastIndexOf('.') - startIndex;
            //fileName = fileDirectory.Substring(startIndex, length);
            //Console.WriteLine(fileName);

            //startIndex = NthIndexOf(fileDirectory, @"\", 2) + 1;
            //length = NthIndexOf(fileDirectory, @"\", 3) - startIndex;
            //secondFolder = fileDirectory.Substring(startIndex, length);
            //Console.WriteLine(secondFolder);


            //DateTime start = DateTime.Now;
            //string testOne = Concatenator('a', 20000);
            //DateTime end = DateTime.Now;
            //Console.WriteLine(end - start);

            //DateTime startTwo = DateTime.Now;
            //StringBuilder testTwo = ConcatenatorSB('a', 2000000);
            //DateTime endTwo = DateTime.Now;
            //Console.WriteLine(endTwo - startTwo);

            //string testThree = testTwo.ToString();
            //Console.WriteLine(testOne.ElementAt(19999));
            //Console.WriteLine(testTwo[1999999]);
            //Console.WriteLine(testTwo.Capacity);
            //Console.WriteLine(testTwo.Length);
            //Console.WriteLine(testThree.Length);



            ////try
            //{
            //    int number = Convert.ToInt32(Console.ReadLine());
            //    int secondNumber = Convert.ToInt32(Console.ReadLine());

            //    int result = number / secondNumber;
            //}
            //catch (FormatException)
            //{
            //    Console.WriteLine("Your input was not a number!");
            //}
            //catch (DivideByZeroException)
            //{
            //    Console.WriteLine("You can not divide by zero!");
            //}
            //catch (Exception)
            //{
            //    Console.WriteLine("Unexpected error!");
            //}
            //Console.WriteLine("After the try/catch block");

            //try
            //{
            //    int[] array = { 1, 2, 3, 4, 5, 0, 0, 6, 7, 8 };
            //    //int[] array = { 1, 2, 3, 4, 5, 6, 7, 8 };

            //    int number = Convert.ToInt32(Console.ReadLine());
            //    int calculated = 0;

            //    for (int i = 0; i <= array.Length; i++)
            //    {
            //        calculated = number / array[i];
            //        Console.WriteLine(array[i]);
            //    }
            //}
            //catch (FormatException ex)
            //{
            //    int startIndex = ex.StackTrace.IndexOf(':') - 1;
            //    int length = ex.StackTrace.Length - startIndex;
            //    string fileName = ex.StackTrace.Substring(startIndex, length);

            //    Console.WriteLine(ex.Message);
            //    Console.WriteLine(fileName);
            //}
            //catch (DivideByZeroException ex)
            //{
            //    Console.WriteLine("Attempted to divide by zero!");
            //}
            //catch (IndexOutOfRangeException ex)
            //{
            //    Console.WriteLine("Attempted to access non-existent element from the array! Index out of range!");
            //    Console.WriteLine(ex);
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("Unexpected error!");
            //}



            //StreamWriter sw = null;
            //try
            //{
            //    sw = File.AppendText(Directory.GetCurrentDirectory() + @"\test.txt");
            //    int number = Convert.ToInt32(Console.ReadLine());
            //    int divided = 5 / number;

            //    sw.Write(divided);
            //    sw.WriteLine();
            //    sw.Close();
            //}
            //catch (FormatException ex)
            //{
            //    Console.WriteLine(ex.Message);
            //}
            //catch (DivideByZeroException ex)
            //{
            //    Console.WriteLine(ex.Message);
            //}
            //finally
            //{

            //    sw.Close();
            //}

            //try
            //{
            //    StreamReader sr = File.OpenText(Directory.GetCurrentDirectory() + @"\test.txt");
            //    Console.WriteLine(sr.ReadToEnd());
            //}
            //catch (IOException ex)
            //{
            //    Console.WriteLine("From Reader");
            //    Console.WriteLine(ex.Message);
            //}

            int id = NthIndexOf("abcabcabcd", "c", 2);
            Console.WriteLine(id);

        }


        static string Concatenator(char characterToConcatenate, int count)
        {
            string concatenatedString = string.Empty;

            for (int i = 0; i < count; i++)
            {
                concatenatedString += characterToConcatenate;
            }
            return concatenatedString;
        }

        static StringBuilder ConcatenatorSB(char characterToConcatenate, int count)
        {
            StringBuilder concatenatedString = new StringBuilder();

            for (int i = 0; i < count; i++)
            {
                concatenatedString.Append(characterToConcatenate);
            }

            return concatenatedString;
        }


        static int NthIndexOf(string input, string toFind, int occurance)
        {
            int index = 0;
            int startIndex = 0;

            if (!input.Contains(toFind))
            {
                index = -1;
                return index;
            }

            for (int i = 0; i < occurance; i++)
            {
                index = input.IndexOf(toFind, startIndex);
                startIndex = index + 1;

                //if (startIndex > input.Length)
                //{
                //    index = -1;
                //    return index;
                //}
            }

            return index;
        }

        private static void printArray<T>(T[] array)
        {
            for (int i = 0; i < array.Length; i++)
            {
                Console.Write(array[i] + ", ");
            }
            Console.WriteLine(new string('-', 40));
        }
        //private static void printArray(int[] array)
        //{
        //    for (int i = 0; i < array.Length; i++)
        //    {
        //        Console.Write(array[i] + ", ");
        //    }
        //    Console.WriteLine(new string('-', 40));
        //}
        //private static void printArray(string[] array)
        //{
        //    for (int i = 0; i < array.Length; i++)
        //    {
        //        Console.Write(array[i] + ", ");
        //    }
        //    Console.WriteLine(new string('-', 40));
        //}

        static void PrintMatrix(int[,] matrix)
        {
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    Console.Write($"{matrix[i, j],3}");
                }

                Console.WriteLine();
            }
        }

        static List<string> ConcatenateStringArrays(List<string[]> listOfStringArrays)
        {
            List<string> concatenatedList = new List<string>();

            foreach (var stringArray in listOfStringArrays)
            {
                concatenatedList.AddRange(stringArray);
            }

            return concatenatedList;
        }

        static void SwapValues(ref int valueOne, ref int valueTwo)
        {
            int temp = valueOne;
            valueOne = valueTwo;
            valueTwo = temp;
        }

        private static bool checkIsMatched(bool isMatched, int num)
        {
            if (num == 10)
            {
                isMatched = true;
                Console.WriteLine(num);
            }

            return isMatched;
        }


        static string Trimming(string stringToTrim, char[] charactersToRemove)
        {
            string trimmedString = string.Empty;
            List<int> indexesToSkip = new List<int>();
            int counter = 0;

            for (int i = 0; i < stringToTrim.Length; i++)
            {
                for (int j = 0; j < charactersToRemove.Length; j++)
                {
                    if (stringToTrim[i] == charactersToRemove[j])
                    {
                        indexesToSkip.Add(i);
                        break;
                    }
                    else
                    {
                        counter++;
                    }
                }

                if (counter == charactersToRemove.Length)
                {
                    break;
                }

                counter = 0;
            }

            for (int i = stringToTrim.Length - 1; i >= 0; i--)
            {
                for (int j = 0; j < charactersToRemove.Length; j++)
                {
                    if (stringToTrim[i] == charactersToRemove[j])
                    {
                        indexesToSkip.Add(i);
                        break;
                    }
                    else
                    {
                        counter++;
                    }
                }

                if (counter == charactersToRemove.Length)
                {
                    break;
                }

                counter = 0;
            }

            for (int i = 0; i < stringToTrim.Length; i++)
            {
                if (!indexesToSkip.Contains(i))
                {
                    trimmedString += stringToTrim[i];
                }
            }

            return trimmedString;
        }



    }
}
