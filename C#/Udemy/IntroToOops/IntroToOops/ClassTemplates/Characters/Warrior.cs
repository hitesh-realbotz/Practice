using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntroToOops.ClassTemplates.Characters
{
    internal class Warrior
    {
        private static int idCounter;
        private string name;
        private int damage;
        private int healthPoints;
        private int level;

        public static int IdCounter
        {
            get { return idCounter; }
            set { idCounter = value; }
        }

        public string Name { get; set; }
        //public string Name
        //{
        //    set
        //    {
        //        name = value;
        //    }
        //}
        public int Damage { get; set; }
        public int HealthPoints { get; set; }

        public int Level
        {
            get
            {
                return level;
            }
            set
            {
                try
                {
                    if (value >= 1 && value <= 100)
                    {
                        level = value;
                    }
                    else
                    {
                        throw new ArgumentOutOfRangeException(string.Empty, $"Inalid Level. Value is too {(value >= 1 ? "Big" : "Low")}.");
                        //Console.WriteLine($"Inalid Level. Value is too { (value >= 1 ? "Big" : "Low" ) }.");
                        //level = 1;
                    }
                }
                catch (ArgumentOutOfRangeException ex)
                {

                    Console.WriteLine("Exception Handled!");
                    Console.WriteLine(ex.Message);
                }
                //if (value >= 1 && value <= 100)
                //{
                //    level = value;
                //}
                //else
                //{
                //    throw new ArgumentOutOfRangeException(string.Empty, value, $"Inalid Level. Value is too {(value >= 1 ? "Big" : "Low")}.");
                //    //Console.WriteLine($"Inalid Level. Value is too { (value >= 1 ? "Big" : "Low" ) }.");
                //    //level = 1;
                //}

            }
        }

        public Warrior() : this("Bob", 10, 100, 55)
        {
            //Name = "Bob";
            //Damage = 10;
            //HealthPoints = 100;
        }
        public Warrior(string name, int damage, int healthPoints) : this(name, damage, healthPoints, 55)
        {
            //Name = name;
            //Damage = damage;
            //HealthPoints = healthPoints;
        }
        public Warrior(int damage, int healthPoints, string name) : this(name, damage, healthPoints, 55)
        {
            //Name = name;
            //Damage = damage;
            //HealthPoints = healthPoints;
        }

        public Warrior(string name, int damage, int healthPoints, int level)
        {
            IdCounter++;
            this.Name = name;
            this.Damage = damage;
            this.HealthPoints = healthPoints;
            this.Level = level;
        }

        public string GetName()
        {
            return this.name;
        }




    }
}
