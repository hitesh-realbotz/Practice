using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NZWalksAPI.Data;
using NZWalksAPI.Models.Domain;
using NZWalksAPI.Models.DTO;
using NZWalksAPI.Repositories;
using System.Diagnostics;

namespace NZWalksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly NZWalksDbContext dbContext;
        private readonly IRegionRepository regionRepository;
        private readonly IMapper mapper;

        public RegionsController(NZWalksDbContext dbContext, IRegionRepository regionRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.regionRepository = regionRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetALL()
        {

            
            var regionsDomain = await this.regionRepository.GetAllAsync();

            //var regionsDto = new List<RegionDto>();
            //foreach (var regionDomain in regionsDomain)
            //{
            //    regionsDto.Add(new RegionDto()
            //    {
            //        Id = regionDomain.Id,
            //        Name = regionDomain.Name,
            //        Code = regionDomain.Code,
            //        RegionImageUrl = regionDomain.RegionImageUrl
            //    });
            //}

            var regionsDto = mapper.Map<List<RegionDto>>(regionsDomain);

            return Ok(regionsDto);
        }

        [HttpGet]
        //[Route("{id:Guid}")]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        //public IActionResult GetByID(Guid id)
        {
            //var regionDomain = await this.dbContext.Regions.FirstOrDefaultAsync(r => r.Id == id);
            var regionDomain = await regionRepository.GetByIdAsync(id);

            if (regionDomain == null)
            {
                return NotFound();
            }
            //var regionDto = new RegionDto()
            //{
            //    Id = regionDomain.Id,
            //    Name = regionDomain.Name,
            //    Code = regionDomain.Code,
            //    RegionImageUrl = regionDomain.RegionImageUrl
            //};

            var regionDto = mapper.Map<RegionDto>(regionDomain);

            return Ok(regionDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddRegionRequestDto addRegionRequestDto)
        {
            //var regionDomainModel = new Region()
            //{
            //    Name = addRegionRequestDto.Name,
            //    Code = addRegionRequestDto.Code,
            //    RegionImageUrl = addRegionRequestDto.RegionImageUrl
            //};
            var regionDomainModel = mapper.Map<Region>(addRegionRequestDto);

            //await this.dbContext.AddAsync(regionDomainModel);
            //await this.dbContext.SaveChangesAsync();
            regionDomainModel = await this.regionRepository.CreateAsync(regionDomainModel);

            //var regionDto = new RegionDto()
            //{
            //    Id = regionDomainModel.Id,
            //    Name = regionDomainModel.Name,
            //    Code = regionDomainModel.Code,
            //    RegionImageUrl = regionDomainModel.RegionImageUrl
            //};
            var regionDto = mapper.Map<RegionDto>(regionDomainModel);


            return CreatedAtAction(nameof(GetById), new { Id = regionDto.Id }, regionDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateRegionRequestDto updateRegionRequestDto)
        {
            //var regionDomainModel = new Region()
            //{
            //    Code = updateRegionRequestDto.Code,
            //    Name = updateRegionRequestDto.Name,
            //    RegionImageUrl = updateRegionRequestDto.RegionImageUrl
            //};
            var regionDomainModel = mapper.Map<Region>(updateRegionRequestDto);

            regionDomainModel = await this.regionRepository.UpdateAsync(id, regionDomainModel);
            if (regionDomainModel == null)
            {
                return NotFound();
            }
            //var regionDto = new RegionDto()
            //{
            //    Id = regionDomainModel.Id,
            //    Code = regionDomainModel.Code,
            //    Name = regionDomainModel.Name,
            //    RegionImageUrl = regionDomainModel.RegionImageUrl
            //};
            var regionDto = mapper.Map<RegionDto>(regionDomainModel);
            return Ok(regionDto);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var regionDomainModel = await this.regionRepository.DeleteAsync(id);
            if (regionDomainModel == null)
            {
                return NotFound();
            }

            //var regionDto = new RegionDto()
            //{
            //    Id = regionDomainModel.Id,
            //    Code = regionDomainModel.Code,
            //    Name = regionDomainModel.Name,
            //    RegionImageUrl = regionDomainModel.RegionImageUrl
            //};
            var regionDto = mapper.Map<RegionDto>(regionDomainModel);
            return Ok(regionDto);

        }
    }
}
