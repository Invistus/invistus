import useTranslation from 'language/useTranslation';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LeftMenuProps {
    menuVisible: boolean;
    toggleMenu: () => void;
  }

const LeftMenu: React.FC<LeftMenuProps> = ({ menuVisible = false, toggleMenu }) => {
    const [isOpen ] = useState(true);

    const aSideClassName = `menu ${isOpen ? 'menu-open' : 'menu-closed'} ${!menuVisible ? 'hide' : ''} box-shadow`

    const { t } = useTranslation();
      
    return (
        <aside className={aSideClassName} >
            {/* <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button> */}
            <div className="menu-items">
                <ul>
                    <li>Calculadora Financeira
                        <ul>
                            <li><Link to="/calculators/compound_interest" onClick={toggleMenu}>{t('compoundInterest.label')}</Link></li>
                            <li><Link to="/calculators/fixed_income_benchmark" onClick={toggleMenu}>{t('fixedIncomeBenchmark.label')}</Link></li>
                            <li><Link to="/calculators/real_state_benchmark" onClick={toggleMenu}>{t('realEstateBenchmark.label')}</Link></li>
                        </ul>
                    </li>
                    <li>Tutoriais
                        <ul>
                            <li><Link to="/tutorials/fixed_income" onClick={toggleMenu}>{t('fixedIncome.label')}</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default LeftMenu;
