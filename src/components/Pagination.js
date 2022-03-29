import React from 'react'

const Pagination = ({heroesPerPage, totalHeroes,paginate})=>{
const pageNumbers = []
for (let i=1; i <= Math.ceil(totalHeroes /heroesPerPage ); i++ ){
    pageNumbers.push(i)
}
    return (
   <div>
       <ul className='pagination_list'>
           {pageNumbers.map(number=>(
           
            <li key={number}> <button type="button" className='pagination_list' onClick={()=> paginate(number)}>{number}</button></li>
           ))}
       </ul>
   </div>
    )
}

export default Pagination