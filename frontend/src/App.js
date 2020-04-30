import React, { useState, useEffect } from 'react'
import PokemonList from './components/PokemonList'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagination from './components/Pagination'
import axios from 'axios'

export default function App() {
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=30")
  const [nextPageUrl, setNextPageUrl] = useState("")
  const [prevPageUrl, setPrevPageUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
      })
      .catch(
        (error) => console.log(error)
      )

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  if (loading) return "Loading..."

  return (
    <Router>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <ul className='navbar-nav nr-auto' align='center'>
            <li>
              <Link to={'/'} className='nav-link'>POKEDEX</Link>
            </li>
            <li>
              <Link to={'/create'} className='nav-link'>MY TEAM</Link>
            </li>
            <li>
              <Link to={'/edit'} className='nav-link'>MY POKEMONS</Link>
            </li>
            <li>
              <Link to={'/list'} className='nav-link'>FIND POKEMON</Link>
            </li>
          </ul>
        </nav>
        <p>
          <thead>
            <tr>
              <th >
                <Pagination
                gotoPageBTN={gotoPrevPage ? gotoPrevPage : null}
                name={'Previous'}
              />
              </th>
              <th>
                <Pagination
                gotoPageBTN={gotoNextPage ? gotoNextPage : null}
                name={'Next'}
              /></th>
            </tr>
          </thead>


          <PokemonList pokemons={pokemon} />
        </p>
      </div>
    </Router>
  )
}
