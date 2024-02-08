using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text;

namespace StudentManagementPortal.Middlewares
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
            catch (Exception ex)
            {
                var errorId = Guid.NewGuid();
                var message = new StringBuilder();
                
                if (ex.GetType() == typeof(DbUpdateException))
                {
                    var exception = (DbUpdateException)ex;
                    foreach (var entry in exception.Entries)
                    {
                        foreach (var property in entry.Properties)
                        {
                            var tableName = property.Metadata.DeclaringType.Name;
                            tableName = tableName.Substring(tableName.LastIndexOf('.') + 1);

                            if (ex.InnerException.Message.Contains(property.Metadata.Name) &&
                                ex.InnerException.Message.Contains(tableName))
                            {
                                message.AppendLine($"{property.Metadata.Name} alredy registered. Please register with another {property.Metadata.Name}.");
                            }
                        }
                    }
                    context.Response.StatusCode = (int)HttpStatusCode.Conflict;
                }
               
                else
                {
                    message.Append("Exception Occured!");
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
