using Microsoft.AspNetCore.Mvc;

namespace MyDotnetBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class PokemonTypesController : ControllerBase
{
    private static readonly Dictionary<string, string[]> PokemonData = new Dictionary<string, string[]>
    {
        { "Charizard", new string[] { "Fire", "Flying" } },
        { "Blastoise", new string[] { "Water" } },
        { "Venusaur", new string[] { "Grass", "Poison" } },
        { "Pikachu", new string[] { "Electric" } },
        { "Gengar", new string[] { "Ghost", "Poison" } }
    };


    private readonly ILogger<PokemonTypesController> _logger;

    public PokemonTypesController(ILogger<PokemonTypesController> logger)
    {
        _logger = logger;
    }


    [HttpGet(Name = "GetPokemonTypes")]
    public Pokemon Get()
    {
        var randomIndex = Random.Shared.Next(PokemonData.Count);
        var randomPokemon = PokemonData.ElementAt(randomIndex);

        return new Pokemon
        {
            Name = randomPokemon.Key,
            Types = randomPokemon.Value
        };
    }
}
