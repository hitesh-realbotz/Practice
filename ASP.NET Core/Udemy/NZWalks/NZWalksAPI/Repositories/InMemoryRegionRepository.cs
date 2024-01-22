using NZWalksAPI.Models.Domain;

namespace NZWalksAPI.Repositories
{
    public class InMemoryRegionRepository : IRegionRepository
    {
        public Task<Region> CreateAsync(Region region)
        {
            throw new NotImplementedException();
        }

        public Task<Region?> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Region>> GetAllAsync()
        {
            var regions = new List<Region>
            {
                new Region
                {
                    Id = Guid.NewGuid(),
                    Name = "Test-1 Region",
                    Code = "TEST1",
                    RegionImageUrl = "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                },
                new Region
                {
                    Id = Guid.NewGuid(),
                    Name = "Test-2 Region",
                    Code = "TEST2",
                    RegionImageUrl = "https://images.unsplash.com/photo-1442483221814-59f7d8b22739?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
            };
            return regions;
        }

        public Task<Region?> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Region?> UpdateAsync(Guid id, Region region)
        {
            throw new NotImplementedException();
        }
    }
}
