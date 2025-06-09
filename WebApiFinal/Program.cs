using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApiFinal.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<WebApiFinalContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebApiFinalContext") ?? throw new InvalidOperationException("Connection string 'WebApiFinalContext' not found.")));


// Add services to the container.

builder.Services.AddControllers();

//Politicas de Cors Origin
builder.Services.AddCors(EtecAll =>
{
    EtecAll.AddPolicy("AllowAll",
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();

        }

        );
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("EtecAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
