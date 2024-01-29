using Web_Api_Versioning_Url_based.API.Models.Domains;

namespace Web_Api_Versioning_Url_based.API
{
    public class CountriesData
    {
        public static List<Country> Get()
        {
            var countries = new[]
            {
                new {Id = 1, Name = "India"},
                new {Id = 2, Name = "Japan"},
                new {Id = 3, Name = "USA"},
                new {Id = 4, Name = "Russia"},
                new {Id = 5, Name = "Germany"},
            };

            return countries.Select(c => new Country { Id = c.Id, Name = c.Name }).ToList();

        }
    }
}
