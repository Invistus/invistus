import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header className="text-white p-2 d-flex justify-content-between">
            <div className="logo">
                <Link to="/">
                    <img src="/images/logo/invistus_logo.svg" alt="Logo" />
                </Link>
            </div>
            <button className="btn btn-light">UserProfile</button>
        </header>
    );
}

export default Header;
