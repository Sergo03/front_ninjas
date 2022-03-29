import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Heroes from './Heroes'
import Pagination from './Pagination';

const Home = () => {
    const [heroes, setHero] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [heroesPerPage] = useState(5)
    useEffect(() => {
        const getHeroes = async () => {
            setLoading(true)
            const response = await axios.get('http://localhost:3001/api/superhero/')

            setHero(response.data.data.superheroes)
            setLoading(false)
        }

        getHeroes()
    }, [])

    
    const lastHeroIndex = currentPage * heroesPerPage
    const firstHeroIndex = lastHeroIndex - heroesPerPage
    const currentHero = heroes.slice(firstHeroIndex, lastHeroIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)


    return (
        <>
        <Link to='/addsuperhero' className='link_create'>Add Superhero</Link>
            <Heroes heroes={currentHero} loading={loading} />
            <Pagination heroesPerPage={heroesPerPage} totalHeroes={heroes.length} paginate={paginate} />

            
        </>
    )
}
export default Home;

