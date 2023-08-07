const pokedex = document.getElementById("pokedex");
const pokeCache = {};
let limit = 25;
export let offset = 0;
export let currentPage = 1;
export const totalPages = Math.ceil(200 / limit);

// Obiectul cu rutele API
export const FetchPokemons = {
  getPokemonList: async (page) => {
    const offset = (page - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemonList = data.results.map((result, index) => ({
      ...result,
      id: offset + index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        offset + index + 1
      }.png`,
    }));
    return pokemonList;
  },

  getPokemonDetails: async (id) => {
    if (!pokeCache[id]) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const res = await fetch(url);
      const pokeman = await res.json();
      pokeman.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      // Function to get basic Pokemon stats
      const pokeStats = async () => {
        const statsRes = await fetch(pokeman.stats[0].stat.url);
        pokeman.hp = pokeman.stats[0].base_stat; // HP
        pokeman.attack = pokeman.stats[1].base_stat; // Attack
        pokeman.defense = pokeman.stats[2].base_stat; // Defense
        pokeman.speed = pokeman.stats[5].base_stat; // Speed
      };

      const abilitiesEffectPromises = pokeman.abilities.map(
        async (abilityData) => {
          const abilityRes = await fetch(abilityData.ability.url);
          const abilityInfo = await abilityRes.json();
          const englishEffectEntry = abilityInfo.effect_entries.find(
            (entry) => entry.language.name === "en"
          );
          return {
            abilityName: abilityInfo.names.find(
              (name) => name.language.name === "en"
            ).name,
            effectEntries: [englishEffectEntry],
          };
        }
      );

      const abilitiesWithEffect = await Promise.all(abilitiesEffectPromises);
      pokeman.abilities = abilitiesWithEffect;

      // Get Pokemon stats
      await pokeStats();

      pokeCache[id] = pokeman;
    }
    return pokeCache[id];
  },
};

export default FetchPokemons;

export const fetchPokemon = async (page) => {
  const pokemonList = await FetchPokemons.getPokemonList(page);
  currentPage = page;
  updatePagination();
};

export function getColorForPokemon(index) {
  const colors = ["#58CD87", "#7BCDBA", "#89B3C2", "#9799CA", "#BD93D8"];
  const colorIndex = Math.floor(index / 5);
  return colors[colorIndex % colors.length];
}

export const displayPopup = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites["front_default"];
  const htmlString = `
    <div class="popup">
      <button id="closeBtn" onclick="closePopup()">Close</button>
      <div class="card">
        <img class="card-image" src="${image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p>
          <small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type}
        </p>
      </div>
    </div>
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

// Fetch the first page of Pokémon
fetchPokemon(currentPage);
