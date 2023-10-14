import React, { PropsWithChildren } from 'react';
import Header from './Header';
import LeftMenu from './LeftMenu';
import './layout.css';


const MainLayout = (props : PropsWithChildren) => {
    return (
        <div className="layout-container">
            <Header />
            <div className="layout-body">
                <LeftMenu />
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
