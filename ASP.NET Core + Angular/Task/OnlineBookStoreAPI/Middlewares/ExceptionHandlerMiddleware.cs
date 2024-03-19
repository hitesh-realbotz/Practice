using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Errors;
using System.Net;
using System.Text;


namespace OnlineBookStoreAPI.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);

            }
            catch (DbUpdateException ex)
            {
                var errorId = Guid.NewGuid();
                var message = new StringBuilder();
                if (ex.InnerException is SqlException sqlException)
                {

                    if (sqlException.Number == 2601)
                    {
                        foreach (var entry in ex.Entries)
                        {
                            foreach (var property in entry.Properties)
                            {
                                var tableName = property.Metadata.DeclaringType.Name;
                                tableName = tableName.Substring(tableName.LastIndexOf('.') + 1);

                                if (property.Metadata.IsUniqueIndex() && ex.InnerException.Message.Contains(property.Metadata.Name) &&
                                    ex.InnerException.Message.Contains(tableName))
                                {
                                    message.AppendLine($"{property.CurrentValue} {property.Metadata.Name} alredy registered. Please register with another {property.Metadata.Name}.");
                                }
                            }
                        }
                    }
                    else if (sqlException.Number == 547)
                    {
                        foreach (var entry in ex.Entries)
                        {
                            foreach (var property in entry.Properties)
                            {
                                if (property.Metadata.IsForeignKey())
                                {
                                    message.AppendLine($"{property.CurrentValue} is invalid {property.Metadata.Name}. Please provide valid {property.Metadata.Name}.");
                                }
                            }
                        }
                    }
                    else
                    {
                        message.AppendLine("Something went wrong while inserting/updating data into database!");
                    }
                    context.Response.StatusCode = (int)HttpStatusCode.Conflict;
                    var error = new
                    {
                        Id = errorId,
                        Message = message.ToString(),

                    };
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsJsonAsync(error);

                }
            }
            catch (UnauthorizedAccessException ex)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(new ApiException((int)HttpStatusCode.Unauthorized, ex.Message, ex.StackTrace));

            }
            catch (BadHttpRequestException ex)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(new ApiException((int)HttpStatusCode.BadRequest, ex.Message, ex.StackTrace));

            }
            catch (Exception ex)
            {
                var errorId = Guid.NewGuid();
                var message = new StringBuilder();


                if (ex.GetType() == typeof(BadHttpRequestException))
                {
                    message.AppendLine(ex.Message);
                }
                else
                {
                    message.Append("Something went wrong!");
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                }
                var error = new
                {
                    Id = errorId,
                    Message = message.ToString(),

                };
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(error);
            }
        }

    }
}
