import useTranslation from 'language/useTranslation';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LeftMenu = () => {
    const [isOpen ] = useState(true);

    const aSideClassName = `${isOpen ? 'menu-open' : 'menu-closed'} box-shadow`

    const { t } = useTranslation();

    return (
        <aside className={aSideClassName} >
            {/* <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button> */}
            <div className="menu-items">
                <ul>
                    <li>Calculadora Financeira
                        <ul>
                            <li><Link to="/calculators/compound_interest">{t('compoundInterest.label')}</Link></li>
                            <li><Link to="/calculators/fixed_income_benchmark">{t('fixedIncomeBenchmark.label')}</Link></li>
                            <li><Link to="/calculators/real_state_benchmark">{t('realEstateBenchmark.label')}</Link></li>
                        </ul>
                    </li>
                    <li>Tutoriais
                        <ul>
                            <li><Link to="/tutorials/fixed_income">{t('fixedIncome.label')}</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default LeftMenu;
