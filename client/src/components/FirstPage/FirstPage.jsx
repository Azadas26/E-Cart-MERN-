import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

function FirstPage() {
    const navigate = useNavigate();
    const [pro,setPro] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/', {
      }).then((res)=>
      {
        console.log(res.data.pro[1]);
        setPro(res.data.pro)
      })
      }, [])
  return (
    <div className='row p-5'>
        {
        pro.map((obj,index)=>
        {
            return(
                   <div className="card col-md-3 m-auto pt-5" style={{width: "18rem"}}>
                        <img className="card-img-top" src="../../../../server/public/adminpro/654f1c37eea67dc1a45a7187.jpg" alt="Card image cap" />
                        <div className="card-body">
                         <h5 className="card-title">{obj.pname}</h5>
                         <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                </div>
            )
        })
    }
    </div>
  )
}

export default FirstPage