using Microsoft.EntityFrameworkCore;
using NZWalksAPI.Data;
using NZWalksAPI.Models.Domain;

namespace NZWalksAPI.Repositories
{
    public class SQLWalkRepository : IWalkRepository
    {
        private readonly NZWalksDbContext dbContext;

        public SQLWalkRepository(NZWalksDbContext dbContext
            )
        {
            this.dbContext = dbContext;
        }

        public async Task<Walk> CreateAsync(Walk walk)
        {
            await dbContext.AddAsync(walk);
            await dbContext.SaveChangesAsync();

            //for (int i = 1; i < 1000; i++)
            //{
            //    var difGuidId = Guid.Parse("54466F17-02AF-48E7-8ED3-5A4A8BFACF6F");
            //    var regGuidId = Guid.Parse("CFA06ED2-BF65-4B65-93ED-C9D286DDB0DE");
            //    var walkLoop = new Walk
            //    {
            //        Name = $"Name-{i}",
            //        Description = $"Description-{i}",
            //        LengthInKm = i,
            //        WalkImageUrl = $"WalkImageUrl-{i}",
            //        DifficultyId = difGuidId,
            //        RegionId = regGuidId,
            //    };
            //    await dbContext.AddAsync(walkLoop);
            //    await dbContext.SaveChangesAsync();
            //}
            return walk;
        }

        //public async Task<List<Walk>> GetAllAsync()
        public async Task<List<Walk>> GetAllAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool? isAscending = true)
        {
            
            var walks = this.dbContext.Walks.Include("Region").Include("Difficulty").AsQueryable();
            if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    walks = walks.Where(x => x.Name.Contains(filterQuery));
                }
            }
            if (string.IsNullOrWhiteSpace(sortBy) == false)
            {
                if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    walks = (bool)isAscending || isAscending == null ? walks.OrderBy(x => x.Name) : walks.OrderByDescending(x => x.Name);
                }
            }
            return await walks.ToListAsync();

            //return await this.dbContext.Walks.Include("Region").Include("Difficulty").ToListAsync();
        }

        public async Task<Walk?> GetByIdAsync(Guid id)
        {
            return await this.dbContext.Walks.Include("Region").Include("Difficulty").FirstOrDefaultAsync(walk => walk.Id == id);
        }

        public async Task<Walk?> UpdateAsync(Guid id, Walk walkDomainModel)
        {
            //DateTime startTime = DateTime.Now;
            var existingWalk = await this.dbContext.Walks.FirstOrDefaultAsync(walk => walk.Id == id);
            if (existingWalk == null)
            {
                return null;
            }
            existingWalk.Name = walkDomainModel.Name;
            existingWalk.Description = walkDomainModel.Description;
            existingWalk.LengthInKm = walkDomainModel.LengthInKm;
            existingWalk.WalkImageUrl = walkDomainModel.WalkImageUrl;
            existingWalk.RegionId = walkDomainModel.RegionId;
            existingWalk.DifficultyId = walkDomainModel.DifficultyId;
            await this.dbContext.SaveChangesAsync();
            existingWalk = await this.dbContext.Walks.Include("Region").Include("Difficulty").FirstOrDefaultAsync(walk => walk.Id == id);
            //DateTime endTime = DateTime.Now;
            //Console.WriteLine(startTime);
            //Console.WriteLine(endTime);
            //Console.WriteLine(endTime - startTime);
            return existingWalk;
        }

        public async Task<Walk?> DeleteAsync(Guid id)
        {
            var existingWalk = await this.dbContext.Walks.Include("Region").Include("Difficulty").FirstOrDefaultAsync(walk => walk.Id == id);
            if (existingWalk == null)
            {
                return null;
            }
            this.dbContext.Walks.Remove(existingWalk);
            await this.dbContext.SaveChangesAsync();

            return existingWalk;
        }
    }
}
