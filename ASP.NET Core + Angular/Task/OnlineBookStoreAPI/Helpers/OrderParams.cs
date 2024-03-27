using OnlineBookStoreAPI.Constants;

namespace OnlineBookStoreAPI.Helpers
{
    public class OrderParams : PaginationParams
    {
        public string SortBy { get; set; } = Const.Date;
        public string SortOrder { get; set; } = Const.DESCENDING;
    }
}
