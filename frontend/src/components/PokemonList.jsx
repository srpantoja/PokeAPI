import React from 'react'
import PokemonRow from './PokemonRow'

export default function PokemonList(props) {

    function makeTable(){
        return props.pokemons.map(
            (p, i) =>  <PokemonRow key={p} onePokemon={p} />           
            )
    }
    return (
        <div>
            <table className='table table-striped' style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>IMG</th>
                        <th>Type1</th>
                        <th>Type2</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {makeTable()}
                </tbody>
            </table>
        </div>
    )
}
