using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApiFinal.Models;

namespace WebApiFinal.Data
{
    public class WebApiFinalContext : DbContext
    {
        public WebApiFinalContext (DbContextOptions<WebApiFinalContext> options)
            : base(options)
        {
        }

        public DbSet<WebApiFinal.Models.Produtos> Produtos { get; set; } = default!;
    }
}
