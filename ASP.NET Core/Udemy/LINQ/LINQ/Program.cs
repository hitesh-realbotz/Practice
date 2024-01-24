// See https://aka.ms/new-console-template for more information



// The Three Parts of a LINQ Query:
// 1. Data source.
using System.Security.Cryptography.X509Certificates;
using System.Xml.Linq;
using static System.Formats.Asn1.AsnWriter;

//int[] numbers = [0, 1, 2, 3, 4, 5, 6];

//// 2. Query creation.
//// numQuery is an IEnumerable<int>
//var numQuery =
//    from num in numbers
//    where (num % 2) == 0
//    select num;
//    //(from num in numbers
//    //where (num % 2) == 0
//    //select num).ToList();
//Console.WriteLine("Hello, World!");
//// 3. Query execution.
//foreach (int num in numQuery)
//{
//    Console.Write("{0,1} ", num);
//}


internal class Program
{
    private static void Main(string[] args)
    {
        //int[] scores = [60, 70, 78, 84, 92, 65];

        //IEnumerable<string> highScoresQuery2 =
        //    from score in scores
        //    where score > 80
        //    orderby score descending
        //    select $"The score is {score}";

        //foreach (string score in highScoresQuery2)
        //{
        //    Console.Write("{0,1} ", score);
        //}

        //IEnumerable<int> highScoresQuery3 =
        //    from score in scores
        //    where score > 80
        //    select score;
        //var scoreCount = highScoresQuery3.Count();
        //Console.WriteLine(scoreCount);
        //var scoreCount2 = scores.FirstOrDefault(num => num > 80);
        //Console.WriteLine(scoreCount2);


        //IEnumerable<City> cityQuery =
        //    from country in countries
        //    from city in country.Cities
        //    where city.Population > 10000
        //    select city;


        //List<Student> students =
        //        [
        //           new Student { First = "Svetlana", Last = "Omelchenko", ID = 111, Scores = [97, 72, 81, 60] },
        //            new Student { First = "Claire", Last = "O'Donnell", ID = 112, Scores = [75, 84, 91, 39] },
        //            new Student { First = "Sven", Last = "Mortensen", ID = 113, Scores = [99, 89, 91, 95] },
        //            new Student { First = "Cesar", Last = "Garcia", ID = 114, Scores = [72, 81, 65, 84] },
        //            new Student { First = "Debra", Last = "Garcia", ID = 115, Scores = [97, 89, 85, 82] }
        //        ];
        //var booleanGroupQuery =
        //            from student in students
        //            group student by student.Scores.Average() >= 80; //pass or fail!

        //// Execute the query and access items in each group
        //foreach (var studentGroup in booleanGroupQuery)
        //{
        //    Console.WriteLine(studentGroup.Key == true ? "High averages" : "Low averages");
        //    foreach (var student in studentGroup)
        //    {
        //        Console.WriteLine("   {0}, {1}:{2} => {3}", student.Last, student.First, student.Scores.Average(), studentGroup.Key);
        //    }
        //}

        //List<Category> categories =
        //    [
        //        new Category { Name = "Beverages", ID = 001 },
        //        new Category { Name = "Condiments", ID = 002 },
        //        new Category { Name = "Vegetables", ID = 003 },
        //        new Category { Name = "Grains", ID = 004 },
        //        new Category { Name = "Fruit", ID = 005 },
        //        new Category { Name = "Fruit2", ID = 006 }
        //    ];
        //// Specify the second data source.
        //List<Product> products =
        //[
        //  new Product { Name = "Cola", CategoryID = 001 },
        //    new Product { Name = "Tea", CategoryID = 001 },
        //    new Product { Name = "Mustard", CategoryID = 002 },
        //    new Product { Name = "Pickles", CategoryID = 002 },
        //    new Product { Name = "Carrots", CategoryID = 003 },
        //    new Product { Name = "Bok Choy", CategoryID = 003 },
        //    new Product { Name = "Peaches", CategoryID = 005 },
        //    new Product { Name = "Melons", CategoryID = 005 },
        //];


        //InnerJoin(categories, products);
        //GroupJoin(categories, products);
        //GroupJoin3(categories, products);
        //LeftOuterJoin(categories, products);
        //LeftOuterJoin2(categories, products);

        //var catQuery1 = from cat in categories
        //               from prod in products
        //               where prod.CategoryID == cat.ID
        //               select new { pName = prod.Name, catId = cat.ID, catName = cat.Name };
        //var catQuery = from cat in categories
        //               join prod in products on cat.ID equals prod.CategoryID into prodGroup
        //               from item in prodGroup.DefaultIfEmpty(new Product { Name = "**NA**", CategoryID = 0 })
        //               select new { pName = item.Name, catId = cat.ID, catName = cat.Name };
        //foreach (var item in catQuery)
        //{
        //    Console.WriteLine(" {0, -15} - {1} - {2}", item.pName, item.catId, item.catName);
        //}

        //int[] numbers = [5, 10, 8, 3, 6, 12];

        ////Query syntax:
        //IEnumerable<int> numQuery1 =
        //    from num in numbers
        //    where num % 2 == 0
        //    orderby num
        //    select num;

        ////Method syntax:
        //IEnumerable<int> numQuery2 = numbers.Where(num => num % 2 == 0).OrderBy(n => n);

        //foreach (int i in numQuery1)
        //{
        //    Console.Write(i + " ");
        //}
        //Console.WriteLine(System.Environment.NewLine);
        //foreach (int i in numQuery2)
        //{
        //    Console.Write(i + " ");
        //}


        //string sentence = "the quick brown fox jumps over the lazy dog";
        //// Split the string into individual words to create a collection.  
        //string[] words = sentence.Split(' ');

        //// Using query expression syntax.  
        //var query = from word in words
        //            group word.ToUpper() by word.Length into gr
        //            orderby gr.Key
        //            select new { Length = gr.Key, Words = gr };

        //// Using method-based query syntax.  
        //var query2 = words.
        //    GroupBy(w => w.Length, w => w.ToUpper()).
        //    Select(g => new { Length = g.Key, Words = g }).
        //    OrderBy(o => o.Length);

        //foreach (var obj in query2)
        //{
        //    Console.WriteLine("Words of length {0}:", obj.Length);
        //    foreach (string word in obj.Words)
        //        Console.WriteLine(word);
        //}


        //PetOwner[] petOwners =
        //{ new PetOwner { Name="Higa",
        //      Pets = new List<string>{ "Scruffy", "Sam" },
        //      //PetsB = new List<string>{ "Scr", "Sm" } 
        //  },

        //  new PetOwner { Name="Ashkenazi",
        //      Pets = new List<string>{ "Walker", "Sugar" },
        //      //PetsB = new List<string>{ "Wal", "Sug" } 
        //  },
        //  new PetOwner { Name="Price",
        //      Pets = new List<string>{ "Scratches", "Diesel" },
        //      //PetsB = new List<string>{ "Scrat", "Dsel" } 
        //  },
        //  new PetOwner { Name="Hines",
        //      Pets = new List<string>{ "Dusty" } ,
        //      //PetsB = new List<string>{ "Dsty" }
        //  }
        //};

        //// Project the pet owner's name and the pet's name.
        //var query =
        //    petOwners
        //    .SelectMany(petOwner => petOwner.Pets, (petOwner, petName) => new { petOwner, petName })
        //    .Where(ownerAndPet => ownerAndPet.petName.StartsWith("S"))
        //    .Select(ownerAndPet =>
        //            new
        //            {
        //                Owner = ownerAndPet.petOwner.Name,
        //                Pet = ownerAndPet.petName
        //            }
        //    );

        //// Print the results.
        //foreach (var obj in query)
        //{
        //    Console.WriteLine(obj);
        //}

        //// Create the data source by using a collection initializer.
        //// The Student class was defined previously in this topic.
        //List<Student> students =
        //[
        //    new Student { First = "Svetlana", Last = "Omelchenko", ID = 111, Scores = new List<int> { 97, 92, 81, 60 } },
        //    new Student { First = "Claire", Last = "O’Donnell", ID = 112, Scores = new List<int> { 75, 84, 91, 39 } },
        //    new Student { First = "Sven", Last = "Mortensen", ID = 113, Scores = new List<int> { 88, 94, 65, 91 } },
        //];

        //// Create the query.
        //var studentsToXML = new XElement("Root",
        //    new XElement("Students",
        //    from student in students
        //    let scores = string.Join(",", student.Scores)
        //    select new XElement("student",
        //               new XElement("First", student.First),
        //               new XElement("Last", student.Last),
        //               new XElement("Scores", scores)
        //            ) // end "student"
        //        )
        //    ); // end "Root"

        //// Execute the query.
        //Console.WriteLine(studentsToXML);


        // Data source.
        double[] radii = [1, 2, 3];

        // LINQ query using method syntax.
        IEnumerable<string> output =
            radii.Select(r => $"Area for a circle with a radius of '{r}' = {r * r * Math.PI:F2}");

        /*
        // LINQ query using query syntax.
        IEnumerable<string> output =
            from rad in radii
            select $"Area for a circle with a radius of '{rad}' = {rad * rad * Math.PI:F2}";
        */

        foreach (string s in output)
        {
            Console.WriteLine(s);
        }

    }

    static void InnerJoin(List<Category> categories, List<Product> products)
    {
        // Create the query that selects
        // a property from each element.
        var innerJoinQuery =
           from category in categories
           join prod in products on category.ID equals prod.CategoryID
           select new { Category = category.ID, Product = prod.Name, CatName = category.Name };

        Console.WriteLine("InnerJoin:");
        // Execute the query. Access results
        // with a simple foreach statement.
        foreach (var item in innerJoinQuery)
        {
            Console.WriteLine("{0,-10}{1} => {2}", item.Product, item.Category, item.CatName);
        }
        Console.WriteLine("InnerJoin: {0} items in 1 group.", innerJoinQuery.Count());
        Console.WriteLine(Environment.NewLine);
    }

    static void GroupJoin(List<Category> categories, List<Product> products)
    {
        // This is a demonstration query to show the output
        // of a "raw" group join. A more typical group join
        // is shown in the GroupInnerJoin method.
        var groupJoinQuery =
        from category in categories
        join prod in products on category.ID equals prod.CategoryID into prodGroup
        select prodGroup;
        //from prod in products
        //join category in categories on prod.CategoryID equals category.ID into prodGroup
        //select prodGroup;

        // Store the count of total items (for demonstration only).
        int totalItems = 0;

        Console.WriteLine("Simple GroupJoin:");

        // A nested foreach statement is required to access group items.
        foreach (var prodGrouping in groupJoinQuery)
        {
            Console.WriteLine("Group:");
            foreach (var item in prodGrouping)
            {
                totalItems++;
                Console.WriteLine("   {0,-10}{1}", item.Name, item.CategoryID);
                //Console.WriteLine("   {0,-10}{1}", item.Name, item.ID);
            }
        }
        Console.WriteLine("Unshaped GroupJoin: {0} items in {1} unnamed groups", totalItems, groupJoinQuery.Count());
        Console.WriteLine(System.Environment.NewLine);
    }

    static void GroupJoin3(List<Category> categories, List<Product> products)
    {

        var groupJoinQuery3 =
            from category in categories
            join product in products on category.ID equals product.CategoryID into prodGroup
            from prod in prodGroup
            orderby prod.CategoryID descending, prod.Name
            select new { Category = prod.CategoryID, ProductName = prod.Name };

        //Console.WriteLine("GroupInnerJoin:");
        int totalItems = 0;

        Console.WriteLine("GroupJoin3:");
        foreach (var item in groupJoinQuery3)
        {
            totalItems++;
            Console.WriteLine("   {0}:{1}", item.ProductName, item.Category);
        }

        Console.WriteLine("GroupJoin3: {0} items in 1 group", totalItems);
        Console.WriteLine(System.Environment.NewLine);
    }

    static void LeftOuterJoin(List<Category> categories, List<Product> products)
    {
        // Create the query.
        var leftOuterQuery =
           from category in categories
           join prod in products on category.ID equals prod.CategoryID into prodGroup
           select prodGroup.DefaultIfEmpty(new Product() { Name = "Nothing!", CategoryID = category.ID });

        // Store the count of total items (for demonstration only).
        int totalItems = 0;

        Console.WriteLine("Left Outer Join:");

        // A nested foreach statement  is required to access group items
        foreach (var prodGrouping in leftOuterQuery)
        {
            Console.WriteLine("Group:");
            foreach (var item in prodGrouping)
            {
                totalItems++;
                Console.WriteLine("  {0,-10}{1}", item.Name, item.CategoryID);
            }
        }
        Console.WriteLine("LeftOuterJoin: {0} items in {1} groups", totalItems, leftOuterQuery.Count());
        Console.WriteLine(System.Environment.NewLine);
    }

    static void LeftOuterJoin2(List<Category> categories, List<Product> products)
    {
        // Create the query.
        var leftOuterQuery2 =
           from category in categories
           join prod in products on category.ID equals prod.CategoryID into prodGroup
           from item in prodGroup.DefaultIfEmpty()
           select new { Name = item == null ? "Nothing!" : item.Name, CategoryID = category.ID };

        Console.WriteLine("LeftOuterJoin2: {0} items in 1 group", leftOuterQuery2.Count());
        // Store the count of total items
        int totalItems = 0;

        Console.WriteLine("Left Outer Join 2:");

        // Groups have been flattened.
        foreach (var item in leftOuterQuery2)
        {
            totalItems++;
            Console.WriteLine("{0,-10}{1}", item.Name, item.CategoryID);
        }
        Console.WriteLine("LeftOuterJoin2: {0} items in 1 group", totalItems);
    }
}

public class Student
{
    public required string First { get; init; }
    public required string Last { get; init; }
    public required int ID { get; init; }
    public required List<int> Scores;
}

public class Product
{
    public required string Name { get; init; }
    public required int CategoryID { get; init; }
}

public class Category
{
    public required string Name { get; init; }
    public required int ID { get; init; }
}


public class PetOwner
{
    public string Name { get; set; }
    public List<string> Pets { get; set; }
    //public List<string> PetsB { get; set; }
}
