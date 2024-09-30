import React, { useEffect } from 'react';
import "./Dashboard.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    useEffect(()=>
    {
        axios.get("http://localhost:5000/auth/verify").then(res => {
            if(res.data.status)
            {
                console.log(res.data);
                
            }
            else
            {
                navigate("/")
            }
        })
    })
    return (
        <div className='dashboard-page'>
            Dashboard
        </div>
    );
}

export default Dashboard;
