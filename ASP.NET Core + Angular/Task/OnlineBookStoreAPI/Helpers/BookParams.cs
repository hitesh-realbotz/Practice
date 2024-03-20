using OnlineBookStoreAPI.Constants;

namespace OnlineBookStoreAPI.Helpers
{
    public class BookParams : PaginationParams
    {
        public int MinPrice { get; set; } = 0;
        public int MaxPrice { get; set; } 
        public string SortBy { get; set; } = Const.TITLE;
        public string SortOrder { get; set; } = Const.ASCENDING;

    }
}
