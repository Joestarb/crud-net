using Microsoft.EntityFrameworkCore;
using WebApiEstudiantes.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Cadena de conexion BD    
var connectionString = builder.Configuration.GetConnectionString("ConnectionString");
// Revisar servicio para la conexion
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173") // URL de tu aplicación React
                          .AllowAnyMethod() // Permitir cualquier método (GET, POST, etc.)
                          .AllowAnyHeader()); // Permitir cualquier cabecera
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
