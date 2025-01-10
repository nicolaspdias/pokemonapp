import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
import PokemonCard from "./PokemonCard";
import LoadingSpinner from "./LoadingSpinner";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: center;
  background-color: ${(props) =>
    props.theme === "light" ? "#ffffff" : "#000000"};
  color: ${(props) => (props.theme === "light" ? "#000000" : "#ffffff")};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 70%;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.$bgColor || props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 60px;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  margin-top: 90px;
  margin-bottom: 60px;
  width: 350px;
`;

const SearchBar = styled.div`
  background-color: ${(props) => props.theme.searchBarBackground};
  color: ${(props) => props.theme.searchBarText};
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin: 10px;
  width: 30%;
  border: none;
  border-radius: 30px;
  text-align: center;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.inputText};
`;

const SearchHint = styled.p`
  color: ${(props) => props.theme.searchHintText};
  font-size: 0.9rem;
  margin-top: 10px;
`;

const FilterTitle = styled.h3`
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  margin-top: 20px;
  gap: 20px;
`;

// Cores base para os tipos de Pokémon
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#F0B6BC",
};

// Função principal do componente
const PokemonList = () => {
  const { theme } = useTheme(); // Acessando o tema
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 10; // Número de Pokémon a serem carregados por vez

  // Função para buscar Pokémon geral
  const fetchPokemons = async (reset = false) => {
    if (reset) {
      setOffset(0);
      setPokemons([]);
    }
    setLoading(true);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar Pokémons!");
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemons((prevPokemons) =>
        reset ? detailedPokemons : [...prevPokemons, ...detailedPokemons]
      );
      setOffset((prevOffset) => (reset ? limit : prevOffset + limit));
    } catch (error) {
      console.error("Erro ao buscar Pokémons:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar Pokémon por tipo
  const fetchPokemonsByType = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!response.ok) throw new Error("Erro ao buscar Pokémons por tipo!");
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.pokemon.slice(0, 20).map(async (pokemonData) => {
          try {
            const res = await fetch(pokemonData.pokemon.url);
            if (!res.ok) throw new Error();
            return await res.json();
          } catch {
            return null;
          }
        })
      );
      setPokemons(detailedPokemons.filter((pokemon) => pokemon !== null));
    } catch (error) {
      console.error("Erro ao buscar Pokémons por tipo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar tipos de Pokémon
  const fetchTypes = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      if (!response.ok) throw new Error("Erro ao buscar tipos de Pokémon!");
      const data = await response.json();
      setTypes(data.results.filter((type) => type.name !== "unknown"));
    } catch (error) {
      console.error("Erro ao buscar tipos de Pokémon:", error);
    }
  };

  // Função para resetar filtros e carregar lista geral
  const handleReset = () => {
    setSearchTerm("");
    setSelectedType("");
    fetchPokemons(true);
  };

  // Atualiza a lista de Pokémon com base no tipo selecionado
  useEffect(() => {
    if (selectedType) {
      fetchPokemonsByType(selectedType);
    } else {
      fetchPokemons(true);
    }
  }, [selectedType]);

  // Carrega tipos e lista inicial de Pokémon na montagem
  useEffect(() => {
    fetchTypes();
    fetchPokemons(true);
  }, []);

  return (
    <Container theme={theme}>
      <Header>
        <Logo
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="PokeAPI Logo"
        />
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Procurar Pokémon"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!e.target.value) fetchPokemons(true);
            }}
          />
          <SearchHint>Pesquise por nome de Pokémon (ex: Pikachu)</SearchHint>
        </SearchBar>
      </Header>
      <Sidebar>
        <FilterTitle>Filtrar por:</FilterTitle>
        <ButtonContainer>
          {types.map((type) => (
            <Button
              key={type.name}
              $bgColor={typeColors[type.name]}
              onClick={() => setSelectedType(type.name)}
            >
              {type.name}
            </Button>
          ))}
          <Button onClick={handleReset}>Resetar</Button>
        </ButtonContainer>
      </Sidebar>
      <CardContainer>
        {loading && <LoadingSpinner />} {/* Usando o spinner de carregamento */}
        {!loading &&
          pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              typeColors={typeColors}
            />
          ))}
      </CardContainer>
      <Button onClick={() => fetchPokemons()}>Carregar mais...</Button>
    </Container>
  );
};

export default PokemonList;
