import React,{useEffect} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import Header from '../components/Header/Header'
import Products from '../components/Products/Products'

function Cart() {
    const navigate = useNavigate();
  return (
    
    <div>
        <Header/>
        <Products/>
    </div>
  )
}

export default Cart