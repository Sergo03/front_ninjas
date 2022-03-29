import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CreateSuperhero = () => {

    const navigate = useNavigate()
    const [nickname, setNickName] = useState('')
    const [real_name, setRealName] = useState('')
    const [origin_description, setOriginDescription] = useState('')
    const [superpowers, setSuperpowers] = useState('')
    const [catch_phrase, setCatchPhrase] = useState('')


    var imageUrl

    const onLoad = (e) => {

        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('picture', file)

        const addImg = async () => {
            const res = await axios.post('http://localhost:3001/api/superhero/upload', formData)
            imageUrl = res.data.data
        }
        addImg()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const addHero = async () => {
            await axios({
                method: 'post',
                url: 'http://localhost:3001/api/superhero/',
                data: {
                    nickname: nickname,
                    real_name: real_name,
                    origin_description: origin_description,
                    superpowers: superpowers,
                    catch_phrase: catch_phrase,
                    images: imageUrl
                }
            });
        }
        addHero()


        setNickName('')
        setRealName('')
        setOriginDescription('')
        setSuperpowers('')
        setCatchPhrase('')
    }
    const handleinput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'nickname':
                setNickName(value);
                break;

            case 'real_name':
                setRealName(value);
                break;
            case 'origin_description':
                setOriginDescription(value);
                break;
            case 'superpowers':
                setSuperpowers(value);
                break;
            case 'catch_phrase':
                setCatchPhrase(value);
                break;
            default:
                console.log(`Поле ${name} не обрабатываются `);
        };
    }


    const hanldeBack = () => {
        navigate('/')
    }



    return (
        <div className='create_div'>
            <button type='button' onClick={hanldeBack}>Go back</button>
            <h1>Add Superhero</h1>
            <form onSubmit={handleSubmit} className='create_form'>
                <label className='create_label' >nickname:
                    <input type="text" name="nickname" className='create_input' value={nickname} onChange={handleinput} />
                </label>
                <label className='create_label'>real_name: <input type="text" className='create_input' name="real_name" value={real_name} onChange={handleinput} /></label>
                <label className='create_label'>origin_description: <input type="text" className='create_input' name="origin_description" value={origin_description} onChange={handleinput} /></label>
                <label className='create_label'>superpowers: <input type="text" className='create_input' name="superpowers" value={superpowers} onChange={handleinput} /></label>
                <label className='create_label'>catch_phrase: <input type="text" className='create_input' name="catch_phrase" value={catch_phrase} onChange={handleinput} /></label>
                <label>Images <input type="file" accept="image/*" name="image" onChange={onLoad} /></label>
                <button type="submit">Add superhero</button>
            </form>
        </div>
    )
}
export default CreateSuperhero