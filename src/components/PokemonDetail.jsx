import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${(props) => (props.theme === 'dark' ? '#121212' : '#fff')};
  color: ${(props) => (props.theme === 'dark' ? '#fff' : '#000')};
  transition: all 0.3s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  margin-bottom: 30px;
`;

const PokemonImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
  box-shadow: 0 4px 8px ${(props) => (props.theme === 'dark' ? '#000' : 'rgba(0, 0, 0, 0.2)')};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const PokemonName = styled.h1`
  font-size: 2.5rem;
  text-transform: capitalize;
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TypeTag = styled.span`
  background-color: ${(props) => props.$bgColor || '#ccc'};
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 1.1rem;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
  text-transform: uppercase;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`;

const AbilitiesAndMovesContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f8f8f8')};
  color: ${(props) => (props.theme === 'dark' ? '#fff' : '#000')};
  border: 1px solid ${(props) => (props.theme === 'dark' ? '#555' : '#ccc')};
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#444' : '#e0e0e0')};
  }
`;

const Explanation = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: ${(props) => (props.theme === 'dark' ? '#bbb' : '#555')};
`;

const BackButton = styled(Link)`
  margin-top: 40px;
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
`;

const PokemonDetail = () => {
  const { theme } = useTheme();
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [abilityExplanation, setAbilityExplanation] = useState('');
  const [selectedMove, setSelectedMove] = useState(null);
  const [moveExplanation, setMoveExplanation] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, [name]);

  const fetchAbilityExplanation = async (abilityUrl) => {
    const response = await fetch(abilityUrl);
    const data = await response.json();
    setAbilityExplanation(
      data.effect_entries.find((entry) => entry.language.name === 'en').effect
    );
  };

  const fetchMoveExplanation = async (moveUrl) => {
    const response = await fetch(moveUrl);
    const data = await response.json();
    setMoveExplanation(
      data.effect_entries.find((entry) => entry.language.name === 'en')?.effect ||
      'Descrição não encontrada.'
    );
  };

  if (!pokemon) return <div>Loading...</div>;

  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#F0B6BC',
  };

  return (
    <Container theme={theme}>
      <Header>
        <PokemonImage theme={theme} src={pokemon.sprites.front_default} alt={pokemon.name} />
        <InfoContainer>
          <PokemonName>{pokemon.name}</PokemonName>
          <TypeContainer>
            {pokemon.types.map((type) => (
              <TypeTag key={type.type.name} $bgColor={typeColors[type.type.name]}>
                {type.type.name}
              </TypeTag>
            ))}
          </TypeContainer>
          <StatsContainer>
            {pokemon.stats.map((stat) => (
              <Stat key={stat.stat.name}>
                <p>{stat.stat.name}</p>
                <p>{stat.base_stat}</p>
              </Stat>
            ))}
          </StatsContainer>
        </InfoContainer>
      </Header>

      <AbilitiesAndMovesContainer>
        <List>
          <h3>Lista de habilidades:</h3>
          {pokemon.abilities.map((ability) => (
            <Button
              theme={theme}
              key={ability.ability.name}
              onClick={() => {
                setSelectedAbility(ability.ability.name);
                fetchAbilityExplanation(ability.ability.url);
              }}
            >
              {ability.ability.name}
            </Button>
          ))}
          {selectedAbility && <Explanation theme={theme}>{abilityExplanation}</Explanation>}
        </List>

        <List>
          <h3>Lista de movimentos:</h3>
          {pokemon.moves.slice(0, 5).map((move) => (
            <Button
              theme={theme}
              key={move.move.name}
              onClick={() => {
                setSelectedMove(move.move.name);
                fetchMoveExplanation(move.move.url);
              }}
            >
              {move.move.name}
            </Button>
          ))}
          {selectedMove && <Explanation theme={theme}>{moveExplanation}</Explanation>}
        </List>
      </AbilitiesAndMovesContainer>

      <BackButton to="/">Back to List</BackButton>
    </Container>
  );
};

export default PokemonDetail;
