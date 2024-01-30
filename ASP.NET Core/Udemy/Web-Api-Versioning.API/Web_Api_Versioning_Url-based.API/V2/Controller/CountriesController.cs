using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_Api_Versioning_Url_based.API.Models.DTOs;

namespace Web_Api_Versioning_Url_based.API.V2.Controller
{
    [Route("api/v2/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var countriesDomainModel = CountriesData.Get();
            var response = new List<CountryDtoV2>();

            foreach (var countryDomain in countriesDomainModel)
            {
                response.Add(new CountryDtoV2
                {
                    Id = countryDomain.Id,
                    CountryName = countryDomain.Name
                });
            }
            return Ok(response);
        }
    }
}
