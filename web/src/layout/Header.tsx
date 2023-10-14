import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    toggleMenu: () => boolean;
    activedMenu: boolean;
  };

const Header: React.FC<HeaderProps> = ({ toggleMenu, activedMenu }) => {

    const [ key, setKey ] = useState(0);

    const clickMenuButton = () => {
        setKey(prevKey => prevKey + 1);
        toggleMenu();
    }

    return (
        <header className="text-white p-2 d-flex justify-content-between">
            <div className="logo">
                <Link to="/">
                    <img src="/images/logo/invistus_logo.svg" alt="Logo" />
                </Link>
            </div>
            <button className="btn menu-button active" onClick={clickMenuButton}>
                <span>
                    { activedMenu 
                        ? <i key={key} className="fa fa-solid fa-xmark fa-2x"></i>
                        : <i key={key} className="fa fa-solid fa-bars fa-2x"></i> }
                </span>
            </button>
            {/* <button className="btn btn-light">UserProfile</button> */}
        </header>
    );
}

export default Header;
