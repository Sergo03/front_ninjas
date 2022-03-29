import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HeroDetails = () => {
    const { heroId } = useParams()
    const navigate = useNavigate();
    const [image, setImage] = useState('')
    const [hero, setHero] = useState({ currentHero: {} })

    // var imageUrl

    useEffect(() => {

        const getHero = async () => {
            const response = await axios.get(`http://localhost:3001/api/superhero/${heroId}`)
            setHero({ currentHero: response.data.data.selectHero })
        }
        getHero()
    }, [heroId])

    const hanldeBack = () => {
        navigate('/')
    }

    const onLoad = (e) => {
        
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('picture', file)

        const addImg = async () => {
            const res = await axios.post('http://localhost:3001/api/superhero/upload', formData)
            setImage(res.data.data)
        }
        addImg()
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const addHero = async () => {
            await axios({
                method: 'patch',
                url: `http://localhost:3001/api/superhero/${heroId}`,
                data: { images: image}
            });
        }
        addHero()
    }
    const remove=(e)=>{
        const removeImg = async () => {
            await axios({
                method: 'patch',
                url: `http://localhost:3001/api/superhero/${heroId}`,
                data: { images: ''}
            });
        }
        removeImg()
    }

    return (
        <div className='detail_div'>
            <button type='button' onClick={hanldeBack}>Go back</button>
            <div className='details_hero'>
            <img src={hero.currentHero.images} alt="img" width={100} height={100}/>
            <h2>nickname:{hero.currentHero.nickname}</h2>
            <span className='detail_name'>real_name: <span className='text'> {hero.currentHero.real_name}</span></span>
            <span className='detail_name'>origin_description:<span className='text'>{hero.currentHero.origin_description}</span></span>
            <span className='detail_name'>superpowers:<span className='text'>{hero.currentHero.superpowers}</span></span>
            <span className='detail_name'>catch_phrase:<span className='text'>{hero.currentHero.catch_phrase}</span></span>
            </div>
            
            <form onSubmit={handleSubmit} className='detail_form'>
            <label>download image <input type="file" accept="image/*" name="image" onChange={onLoad} /></label>
            <button type="submit">change image</button>
            </form>
            <button type="button" onClick={remove}>Remove image</button>
        </div>
    )
}
export default HeroDetails