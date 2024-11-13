import { useState } from 'react';
import PropTypes from 'prop-types';
import pokemon from '../pokemon.json';
import './App.css';

const PokemonRow = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

PokemonRow.prototype = {
  pokeman: PropTypes.shape({
    name:PropTypes.shape({
      english: PropTypes.string,
    }),
    types: PropTypes.arrayOf(PropTypes.string),
  }),
};

function App() {
  const [filter, filterSet] = useState("");
  const [selectedItems, selectedItemSet] = React.useState(null)
  return (
    <div>
        <h1 className='title'>Pokeman Search</h1>  
       <input 
       type="text"
       value={filter}
       onChange={(event) => filterSet(event.target.value)}
       />

       <div style={{
         display: "grid",
        gridTemplateColumns: "1/2",
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
                  {pokemon.filter((pokemon => pokemon.name.english.toLowerCase().includes( filter.toLocaleLowerCase()))).slice(0, 20).map((pokemon) => (
                      <PokemonRow pokemon={pokemon} key={pokemon.id} />    
                  ))}
                </tbody>
          </table>
       </div>

     

    </div>
  )
}

export default App;
