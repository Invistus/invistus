import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    toggleMenu: () => void
  };

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
    return (
        <header className="text-white p-2 d-flex justify-content-between">
            <div className="logo">
                <Link to="/">
                    <img src="/images/logo/invistus_logo.svg" alt="Logo" />
                </Link>
            </div>
            <button className="btn menu-button" onClick={toggleMenu}>
                <i className="fa fa-solid fa-bars fa-lg"></i>
            </button>
            {/* <button className="btn btn-light">UserProfile</button> */}
        </header>
    );
}

export default Header;
