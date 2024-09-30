import React from 'react';
import "./PageNotFound.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PageNotFound = () => {

    const navigate = useNavigate()

    return (
        <div className='page-not-found'>
            <div className=''>
            <h2>404 Page Not Found</h2>
            <div className='text-center mt-5'>
                <Button className='bg-dark border-0 fw-semibold' onClick={()=> navigate("/")}>Go to Home</Button>
            </div>
        </div>
        </div>
    );
}

export default PageNotFound;
