import { useState } from 'react';
import PropTypes from 'prop-types';
import pokemon from '../pokemon.json';
import './App.css';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>
);

PokemonRow.prototype = {
  pokeman: PropTypes.shape({
    name:PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
   onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.PropTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defence": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
}

function App() {
  const [filter, filterSet] = useState("");
  const [selectedItem, selectedItemSet] = useState(null);
  return (
    <div style={{
      margin: "auto",
      width: "800"
    }}>
        <h1 className='title'>Pokeman Search</h1>  
       <input 
       type="text"
       value={filter}
       onChange={(event) => filterSet(event.target.value)}
       />

       <div style={{
         display: "grid",
        gridTemplateColumns: "70% 30%",
        gridColumnGap: "1rem",
       }}>
          <table width="100%">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
            </thead>

              <tbody>
                {pokemon.filter((pokemon => 
                pokemon.name.english.toLowerCase().includes(filter.toLocaleLowerCase()))).slice(0, 20).map((pokemon) => (
                  <PokemonRow 
                  pokemon={pokemon} 
                  key={pokemon.id} 
                  onSelect={(pokemon) => selectedItemSet(pokemon)}/>    
                ))}
              </tbody>
          </table>

          {selectedItem && <PokemonInfo {...selectedItem} />
       }
       </div>
      
    </div>
  )
}

export default App;
