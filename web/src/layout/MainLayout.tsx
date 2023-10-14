import React, { PropsWithChildren, useState } from 'react';
import Header from './Header';
import LeftMenu from './LeftMenu';
import './layout.css';


const MainLayout = (props : PropsWithChildren) => {
    
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };

    return (
        <div className="layout-container">
            <Header toggleMenu={toggleMenu} />
            <div className="layout-body">
                <LeftMenu menuVisible={menuVisible} toggleMenu={toggleMenu}/>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
