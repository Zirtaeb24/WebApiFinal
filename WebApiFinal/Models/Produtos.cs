namespace WebApiFinal.Models
{
    public class Produtos : Base 
    {

        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public int Quantidade { get; set; }
        public int Valor { get; set; }

        //tipos de dados

        //string nome = "Etec"; //tipo de referêdcia
        //char letra = 'E';

        //int valor = 10; //números inteiros
       // long valor1 = 10L; //números inteiros
       // byte valorB = 127; //números inteiros

       // double valorD = 10.5; //números reais
       // float valorf = 10.5f; //números reais

    }
}
