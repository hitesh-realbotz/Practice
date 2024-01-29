using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_Api_Versioning_Plain.API.Models.DTOs;

namespace Web_Api_Versioning_Plain.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var countriesDomainModel = CountriesData.Get();
            var response = new List<CountryDto>();

            foreach (var countryDomain in countriesDomainModel)
            {
                response.Add(new CountryDto
                {
                    Id = countryDomain.Id,
                    Name = countryDomain.Name
                });
            }
            return Ok(response);
        }
    }
}
