using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Services.Interfaces;


namespace OnlineBookStoreAPI.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary cloudinary;
        private readonly IConfiguration config;

        public PhotoService(IOptions<CloudinarySettings> configuration, IConfiguration config)
        {
            var acc = new Account
                (
                    configuration.Value.CloudName,
                    configuration.Value.ApiKey,
                    configuration.Value.ApiSecret
                );
            this.cloudinary = new Cloudinary(acc);
            this.config = config;
        }

        //Upload photo to cloudinary
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    //Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                    Transformation = new Transformation().Width(500).Height(500)
                                                .Crop("limit").Gravity(Gravity.Center)
                                                .Chain()
                                                .Crop("fill").Gravity(Gravity.Center),

                    Folder = config["ProjectName"]
                };
                uploadResult = await this.cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        //Delete photo from cloudinary
        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            return await this.cloudinary.DestroyAsync(deleteParams);
        }
    }
}
