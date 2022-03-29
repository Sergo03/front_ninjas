import React from 'react'
import { Link } from 'react-router-dom';
import style from './Style.module.css'

const Heroes = ({ heroes, loading }) => {
    
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className='list_item'>
             <ul >
            {
                heroes.map(({ _id, nickname, images }) => {
                    return <li key={_id} className={style.list_heroes}>
                        <Link to={`/hero/${_id}`} className={style.list_heroes_name}>{nickname}</Link>
                     <div className={style.about}>
                     <img className={style.list_heroes_img} src={images} alt="img" width={100} height={100}/>
                     </div> 
                    </li>
                })
            }
        </ul>
        </div>
       
    )
}

export default Heroes