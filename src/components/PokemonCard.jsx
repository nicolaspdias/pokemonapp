import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 10px;
  transition: transform 0.2s;
  background-color: ${(props) => props.theme.cardBackground};

  &:hover {
    transform: scale(1.05);
  }
`;

const PokemonImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$bgColor || props.theme.imageWrapperBackground};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

const PokemonImage = styled.img`
  width: 90%;
  height: auto;
`;

const PokemonInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
`;

const PokemonID = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
`;

const PokemonExp = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
`;

const PokemonName = styled.h2`
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  margin: 5px 0;
  text-transform: capitalize;
  align-self: flex-start;
`;

const PokemonTypeContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
  align-self: flex-start;
`;

const PokemonType = styled.div`
  background-color: ${(props) => props.$bgColor || props.theme.typeBackground};
  color: ${(props) => props.theme.typeText};
  border-radius: 10px;
  padding: 3px 8px;
  font-size: 0.8rem;
  font-weight: normal;
`;

const PokemonCard = ({ pokemon, typeColors }) => {
  return (
    <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
      <CardContainer>
      <PokemonImageWrapper
          $bgColor={typeColors[pokemon.types[0].type.name]}
        >
          <PokemonImage
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </PokemonImageWrapper>
        <PokemonInfoRow>
          <PokemonID>ID: {pokemon.id}</PokemonID>
          <PokemonExp>EXP: {pokemon.base_experience}</PokemonExp>
        </PokemonInfoRow>
        <PokemonName>{pokemon.name}</PokemonName>
        <PokemonTypeContainer>
          {pokemon.types.map((type) => (
            <PokemonType key={type.type.name} $bgColor={typeColors[type.type.name]}>
              {type.type.name}
            </PokemonType>
          ))}
        </PokemonTypeContainer>
      </CardContainer>
    </Link>
  );
};

export default PokemonCard;