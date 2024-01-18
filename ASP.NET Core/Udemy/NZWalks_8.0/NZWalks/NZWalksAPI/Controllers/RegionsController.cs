using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NZWalksAPI.Models.Domain;
using NZWalksAPI.Models.DTO;
using NZWalksAPI.Repositories;

namespace NZWalksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly IRegionRepository regionRepository;
        private readonly IMapper mapper;

        public RegionsController(IRegionRepository regionRepository, IMapper mapper)
        {
            this.regionRepository = regionRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var regionsModel = await this.regionRepository.GetAllAsync();
            if (regionsModel == null)
            {
                return NotFound();
            }

            var regionsDto = this.mapper.Map<List<RegionDto>>(regionsModel);

            return Ok(regionsDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var regionDomainModel = await this.regionRepository.GetByIdAsync(id);
            if (regionDomainModel == null)
            {
                return NotFound();
            }
            var regionDto = this.mapper.Map<RegionDto>(regionDomainModel);

            //var regionDto = new RegionDto()
            //{
            //    Id = regionDomainModel.Id,
            //    Name = regionDomainModel.Name,
            //    Code = regionDomainModel.Code,
            //    RegionImageUrl = regionDomainModel.RegionImageUrl
            //};
            return Ok(regionDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddRegionRequestDto addRegionRequestDto)
        {
            var regionDomainModel =  this.mapper.Map<Region>(addRegionRequestDto);
            regionDomainModel = await this.regionRepository.CreateAsync(regionDomainModel);
            var regionDto = this.mapper.Map<RegionDto>(regionDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = regionDto.Id }, regionDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute]Guid id, [FromBody]UpdateRegionRequestDto updateRegionRequestDto)
        {
            var regionDomainModel = this.mapper.Map<Region>(updateRegionRequestDto);

            regionDomainModel = await this.regionRepository.UpdateAsync(id, regionDomainModel);

            if (regionDomainModel == null)
            {
                return NotFound();
            }
            var regionDto = this.mapper.Map<RegionDto>(regionDomainModel);

            return Ok(regionDto);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute]Guid id)
        {
            var regionDomainModel = await this.regionRepository.DeleteAsync(id);
            if (regionDomainModel == null)
            {
                return NotFound();
            }
            var regionDto = this.mapper.Map<RegionDto>(regionDomainModel);

            return Ok(regionDto);
        }

    }
}
