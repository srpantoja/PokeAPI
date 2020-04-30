import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function PokemonRow(props) {
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [pokeID, setPokeID] = useState(0)
    const [pokeName, setPokeName] = useState('')
    const [pokeIMG, setPokeIMG] = useState('')
    const [pokeType, setPokeType] = useState([])
    const [Pokemon, setPokemon] = useState([])

    useEffect(() => {

        axios.get(currentPageUrl + props.onePokemon)
            .then(
                res => {
                    setPokemon(res.data)
                    setPokeID(res.data.id)
                    setPokeName(res.data.name)
                    setPokeIMG(res.data.sprites.front_default)
                    setPokeType(res.data.types)

                }
            )
            .catch(
                (error) => console.log(error)
            )

    }, [currentPageUrl])

    if (pokeType.length === 1)
        pokeType.push({
            "slot": null,
            "type": {
                "name": "no have",
                "url": "null"

            }
        })
    return (
        <tr>
            <td>{pokeID}</td>
            <td>{pokeName}</td>
            <td><img src={pokeIMG} /></td>

            {pokeType.map(
                (t, i) => {
                    if (t === null)
                        return <td key={null}></td>
                    return <td key={i}> {t.type.name}</td>
                }
            )}
            <td style={{ textAlign: "center" }}>
                <button className='btn btn-outline-dark'>Information</button>
            </td>
        </tr>

    )
}
