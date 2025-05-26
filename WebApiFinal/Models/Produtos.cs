namespace WebApiFinal.Models
{
    public class Produtos : Base 
    {

        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public int Quantidade { get; set; }
        public int Valor { get; set; }
    }
}
