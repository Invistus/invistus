import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LeftMenu = () => {
    const [isOpen, setIsOpen] = useState(true);

    const aSideClassName = `${isOpen ? 'menu-open' : 'menu-closed'} box-shadow`

    return (
        <aside className={aSideClassName} >
            {/* <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button> */}
            <div className="menu-items">
                <ul>
                    <li>Calculadora Financeira
                        <ul>
                            <li><Link to="/calculators/compound_interest">Juros Compostos</Link></li>
                            <li><Link to="/calculators/cdb_vs_lci_lca">CDB x LCA/LCI</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default LeftMenu;
