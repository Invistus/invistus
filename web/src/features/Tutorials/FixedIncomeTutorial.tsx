import useTranslation from "language/useTranslation";
import React from "react"


export const FixedIncomeTutorial: React.FC = () => {   
    const { language } = useTranslation();
    return (translations[language] as any);
}

const pt = (
        <div className="tutorial-container">
        <h1>O que é Investimento de Renda Fixa?</h1>
        <p>
        Imagine que você emprestou dinheiro a um amigo e ele prometeu te devolver o mesmo valor mais um pequeno extra como agradecimento. 
        </p>
        <p>
        A renda fixa funciona de maneira similar, mas em vez de um amigo, é uma instituição financeira. Ao investir, 
        você "empresta" dinheiro para ela e, em troca, recebe o seu dinheiro de volta mais os juros acordados.
        </p>
        <h2>
        Tipos de Renda Fixa: CDB e LCA/LCI
        </h2>
        <h3>
        CDB (Certificado de Depósito Bancário)
        </h3>
        <p>
        É como se fosse um "empréstimo" que você faz ao banco. Em troca, ele te promete devolver o dinheiro com juros depois de um período determinado.
        </p>
        <h3>
        LCA (Letra de Crédito do Agronegócio) e LCI (Letra de Crédito Imobiliário)
        </h3>
        <p>
            Semelhante ao CDB, mas o dinheiro investido vai para financiamentos no setor de agronegócio (LCA) ou imobiliário (LCI). 
            Um benefício é que eles são <u>isentos de Imposto de Renda</u> para pessoas físicas.
        </p>
        <h3>Benefícios da Renda Fixa</h3>
        <p><b>Segurança:</b> Renda fixa é considerada um dos investmentos mais seguros.</p>
        <p><b>Previsibilidade:</b> Você sabe quanto vai receber no final do período.</p>
        <p><b>Diversidade:</b> Existem várias opções para escolher de acordo com seu perfil.</p>
        <h3>Riscos</h3>
        <p><b>Liquidez:</b> Dependendo do investmento, pode não ser fácil retirar o dinheiro antes do prazo.</p>
        <p><b>Rentabilidade:</b> Em alguns casos, pode não superar a inflação, fazendo você perder poder de compra.  </p>        
        <h2>Categorias: Pré-fixado e Pós-fixado</h2>
        <h3>Pré-fixado</h3>
        <p>
            Neste tipo, o rendimento é definido no momento em que você investe. Por exemplo, 
            se disserem que vai render 10% ao ano, esse será o seu rendimento, independentemente do que aconteça na economia.
        </p>
        <h3>Pós-fixado</h3>
        <p>
        o rendimento varia conforme um índice. Os mais comuns são:
        </p>
        <p><b>CDI:</b> Sigla para Certificado de Depósito Interbancário. Se um investmento rende 100% do CDI e este índice foi de 10% ao ano, seu dinheiro renderá esses 10%.</p>
        <p><b>Inflação (IPCA):</b> A rentabilidade é atrelada à inflação. Por exemplo, se o investmento for IPCA + 3% ao ano e a inflação foi de 5%, seu rendimento será de 8%.</p>
        <h2>Quando optar por investmentos Pré-fixados ou Pós-fixados?</h2>
        <p>
            A escolha entre investir em renda fixa pré-fixada ou pós-fixada não é uma ciência exata, 
            mas existem algumas situações e contextos que podem ajudar a direcionar sua decisão.
        </p>
        <h3>Pré-fixados</h3>
        <p><b>Previsibilidade do rendimento:</b> Se você gosta da ideia de saber exatamente quanto seu dinheiro vai render ao final do investmento, o pré-fixado é a melhor opção.</p>
        <p><b>Expectativa de queda nos juros:</b> Se você acredita que os juros da economia vão cair no futuro, pode ser interessante "travar" uma taxa de rendimento agora. Por exemplo, se o rendimento oferecido é de 10% ao ano e você espera que os juros caiam para 5%, você garante uma rentabilidade superior ao que seria oferecido no futuro.</p>
        <p><b>Planejamento financeiro:</b> Para objetivos financeiros específicos e de curto/médio prazo, o pré-fixado permite que você saiba o exato valor que terá no fim do período.</p>
        <h3>Pós-fixados</h3>
        <p><b>Proteção contra a inflação:</b> Investimentos atrelados ao IPCA garantem que seu dinheiro renda acima da inflação, preservando seu poder de compra. Ideal para objetivos de longo prazo, como aposentadoria.</p>
        <p><b>Expectativa de alta nos juros:</b> Se há previsão de que os juros da economia subam, investir no pós-fixado atrelado ao CDI, por exemplo, pode trazer rendimentos melhores. Isso porque o CDI tende a acompanhar a taxa de juros básica da economia.</p>
        <p><b>Flexibilidade:</b> Como o rendimento do pós-fixado está atrelado a índices econômicos, pode ser interessante para quem quer acompanhar o mercado e ter a possibilidade de ganhos variáveis.</p>
        <p><b>Diversificação:</b> Para quem já possui outros investmentos e deseja diversificar, os pós-fixados oferecem uma alternativa que varia de acordo com o comportamento do mercado.</p>
    </div>)

const en = (
    <div className="tutorial-container">
    <h1>What is Fixed Income Investment?</h1>
    <p>
    Imagine you lent money to a friend, and they promised to return the same amount plus a little extra as a thank you. 
    </p>
    <p>
    Fixed income works in a similar way, but instead of a friend, it's a financial institution. When investing, 
    you "lend" money to it, and in return, you receive your money back plus the agreed interest.
    </p>
    <h2>
    Types of Fixed Income: CDB and LCA/LCI
    </h2>
    <h3>
    CDB (Bank Deposit Certificate)
    </h3>
    <p>
    It's like a "loan" you make to the bank. In exchange, they promise to return the money with interest after a determined period.
    </p>
    <h3>
    LCA (Agribusiness Credit Letter) and LCI (Real Estate Credit Letter)
    </h3>
    <p>
        Similar to CDB, but the invested money goes towards financing in the agribusiness sector (LCA) or real estate (LCI). 
        One benefit is that they are <u>exempt from Income Tax</u> for individuals.
    </p>
    <h3>Benefits of Fixed Income</h3>
    <p><b>Security:</b> Fixed income is considered one of the safest investments.</p>
    <p><b>Predictability:</b> You know how much you will receive at the end of the period.</p>
    <p><b>Diversity:</b> There are several options to choose from according to your profile.</p>
    <h3>Risks</h3>
    <p><b>Liquidity:</b> Depending on the investment, it may not be easy to withdraw the money before the term.</p>
    <p><b>Profitability:</b> In some cases, it may not exceed inflation, causing you to lose purchasing power.</p>
    <h2>Categories: Pre-fixed and Post-fixed</h2>
    <h3>Pre-fixed</h3>
    <p>
        In this type, the return is defined at the time you invest. For example, 
        if they say it will yield 10% per year, that will be your return, regardless of what happens in the economy.
    </p>
    <h3>Post-fixed</h3>
    <p>
    The return varies according to an index. The most common are:
    </p>
    <p><b>CDI:</b> Acronym for Interbank Deposit Certificate. If an investment yields 100% of CDI and this index was 10% per year, your money will yield those 10%.</p>
    <p><b>Inflation (CPI):</b> The profitability is tied to inflation. For example, if the investment is CPI + 3% per year and inflation was 5%, your return will be 8%.</p>
    <h2>When to choose Pre-fixed or Post-fixed investments?</h2>
    <p>
        The choice between investing in pre-fixed or post-fixed fixed income is not an exact science, 
        but there are some situations and contexts that can help guide your decision.
    </p>
    <h3>Pre-fixed</h3>
    <p><b>Return Predictability:</b> If you like the idea of knowing exactly how much your money will yield at the end of the investment, pre-fixed is the best option.</p>
    <p><b>Expectation of falling interest rates:</b> If you believe that the economy's interest rates will fall in the future, it might be interesting to "lock in" a yield rate now. For example, if the offered yield is 10% per year and you expect interest rates to drop to 5%, you ensure a higher profitability than what would be offered in the future.</p>
    <p><b>Financial planning:</b> For specific financial goals and short/medium term, pre-fixed allows you to know the exact value you will have at the end of the period.</p>
    <h3>Post-fixed</h3>
    <p><b>Protection against inflation:</b> Investments tied to the CPI ensure that your money yields above inflation, preserving your purchasing power. Ideal for long-term goals, such as retirement.</p>
    <p><b>Expectation of rising interest rates:</b> If there's an expectation that the economy's interest rates will rise, investing in post-fixed tied to CDI, for example, might yield better returns. This is because the CDI tends to follow the basic interest rate of the economy.</p>
    <p><b>Flexibility:</b> Since the yield of post-fixed is tied to economic indices, it might be interesting for those who want to follow the market and have the possibility of variable gains.</p>
    <p><b>Diversification:</b> For those who already have other investments and want to diversify, post-fixed offers an alternative that varies according to market behavior.</p>
</div>)

const translations: { [key: string]: any } = {
    pt,
    en
  };