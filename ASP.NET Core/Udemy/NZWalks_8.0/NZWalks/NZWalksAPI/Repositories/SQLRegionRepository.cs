using Microsoft.EntityFrameworkCore;
using NZWalksAPI.Data;
using NZWalksAPI.Models.Domain;

namespace NZWalksAPI.Repositories
{
    public class SQLRegionRepository : IRegionRepository
    {
        private readonly NZWalksDbContext dbContext;

        public SQLRegionRepository(NZWalksDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Region> CreateAsync(Region region)
        {
            await this.dbContext.AddAsync(region);
            await this.dbContext.SaveChangesAsync();
            return region;
        }

       

        public async Task<List<Region>> GetAllAsync()
        {
            var regions = await this.dbContext.Regions.ToListAsync();
            if (regions == null)
            {
                return null;
            }
            return regions;
        }

        public async Task<Region?> GetByIdAsync(Guid id)
        {
            var region = await this.dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
           
            return region;
        }

        public async Task<Region?> UpdateAsync(Guid id, Region region)
        {
            var existingRegion = await this.dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if (existingRegion == null)
            {
                return null;
            }
            existingRegion.Code = region.Code;
            existingRegion.Name = region.Name;
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
