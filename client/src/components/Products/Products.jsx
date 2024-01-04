import React,{useEffect} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3001/viewcart', {
  }).then((res)=>
  {

    console.log(res);
    if(res.data.login)
    {
        navigate('/')
    }
    else
    {
        navigate('/login')
    }
  })
  }, [])
  
  return (
    <div>Products</div>
  )
}

export default Products