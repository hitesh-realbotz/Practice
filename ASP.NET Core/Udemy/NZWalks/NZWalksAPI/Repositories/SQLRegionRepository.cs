using Microsoft.EntityFrameworkCore;
using NZWalksAPI.Data;
using NZWalksAPI.Models.Domain;
using NZWalksAPI.Models.DTO;

namespace NZWalksAPI.Repositories
{
    public class SQLRegionRepository : IRegionRepository
    {
        private readonly NZWalksDbContext dbContext;

        public SQLRegionRepository(NZWalksDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Region>> GetAllAsync()
        //public async Task<List<Region>> GetAllAsync(string? filterOn = null, string? filterQuery = null)
        {
            //var regions =  this.dbContext.Regions.AsQueryable();

            //if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery))
            //{
            //    if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
            //    {
            //        regions = regions.Where(x => x.Name.Contains(filterQuery));
            //    }
            //}
            //return await regions.ToListAsync();

            return await this.dbContext.Regions.ToListAsync();
        }

        public async Task<Region?> GetByIdAsync(Guid id)
        {
            //var a = from ab in this.dbContext.Regions
            //        join vg in this.dbContext.Walks
            //        on ab.Id equals vg.Id
            //        where vg.Id == id
            //        select new
            //        {
            //            ab.Id
            //        };

            //var region = this.dbContext.Regions.Find(id); //Only for searching on primary-key column
            return await this.dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Region?> CreateAsync(Region region)
        {
            await this.dbContext.AddAsync(region);
            await this.dbContext.SaveChangesAsync();
            return region;
        }

        public async Task<Region?> UpdateAsync(Guid id, Region region)
        {
            var existingRegion = await this.dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if (existingRegion == null)
            {
                return null;
            }
            existingRegion.Name = region.Name;
            existingRegion.Code = region.Code;
            existingRegion.RegionImageUrl = region.RegionImageUrl;

            await this.dbContext.SaveChangesAsync();
            return existingRegion;
        }

        public async Task<Region?> DeleteAsync(Guid id)
        {
            var existingRegion = await this.dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if (existingRegion == null)
            {
                return null;
            }
            this.dbContext.Remove(existingRegion);
            await this.dbContext.SaveChangesAsync();
            return existingRegion;
        }
    }
}
