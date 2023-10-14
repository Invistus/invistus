import React, { PropsWithChildren, useState } from 'react';
import Header from './Header';
import LeftMenu from './LeftMenu';
import './layout.css';


const MainLayout = (props : PropsWithChildren) => {
    
    const [ menuVisible, setMenuVisible ] = useState(false);

    const toggleMenu = () => {
        const visible = !menuVisible;
        setMenuVisible(visible);
        return visible;
    };

    return (
        <div className="layout-container">
            <Header toggleMenu={toggleMenu} activedMenu={menuVisible}/>
            <div className="layout-body">
                <LeftMenu menuVisible={menuVisible} toggleMenu={toggleMenu}/>
                <div className={`content ${menuVisible && "menuVisible"}`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
