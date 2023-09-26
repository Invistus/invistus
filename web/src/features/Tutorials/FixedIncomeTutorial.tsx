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
        <p><b>Segurança:</b> Renda fixa é considerada um dos investimentos mais seguros.</p>
        <p><b>Previsibilidade:</b> Você sabe quanto vai receber no final do período.</p>
        <p><b>Diversidade:</b> Existem várias opções para escolher de acordo com seu perfil.</p>
        <h3>Riscos</h3>
        <p><b>Liquidez:</b> Dependendo do investimento, pode não ser fácil retirar o dinheiro antes do prazo.</p>
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
        <p><b>CDI:</b> Sigla para Certificado de Depósito Interbancário. Se um investimento rende 100% do CDI e este índice foi de 10% ao ano, seu dinheiro renderá esses 10%.</p>
        <p><b>Inflação (IPCA):</b> A rentabilidade é atrelada à inflação. Por exemplo, se o investimento for IPCA + 3% ao ano e a inflação foi de 5%, seu rendimento será de 8%.</p>
        <h2>Quando optar por investimentos Pré-fixados ou Pós-fixados?</h2>
        <p>
            A escolha entre investir em renda fixa pré-fixada ou pós-fixada não é uma ciência exata, 
            mas existem algumas situações e contextos que podem ajudar a direcionar sua decisão.
        </p>
        <h3>Pré-fixados</h3>
        <p><b>Previsibilidade do rendimento:</b> Se você gosta da ideia de saber exatamente quanto seu dinheiro vai render ao final do investimento, o pré-fixado é a melhor opção.</p>
        <p><b>Expectativa de queda nos juros:</b> Se você acredita que os juros da economia vão cair no futuro, pode ser interessante "travar" uma taxa de rendimento agora. Por exemplo, se o rendimento oferecido é de 10% ao ano e você espera que os juros caiam para 5%, você garante uma rentabilidade superior ao que seria oferecido no futuro.</p>
        <p><b>Planejamento financeiro:</b> Para objetivos financeiros específicos e de curto/médio prazo, o pré-fixado permite que você saiba o exato valor que terá no fim do período.</p>
        <h3>Pós-fixados</h3>
        <p><b>Proteção contra a inflação:</b> Investimentos atrelados ao IPCA garantem que seu dinheiro renda acima da inflação, preservando seu poder de compra. Ideal para objetivos de longo prazo, como aposentadoria.</p>
        <p><b>Expectativa de alta nos juros:</b> Se há previsão de que os juros da economia subam, investir no pós-fixado atrelado ao CDI, por exemplo, pode trazer rendimentos melhores. Isso porque o CDI tende a acompanhar a taxa de juros básica da economia.</p>
        <p><b>Flexibilidade:</b> Como o rendimento do pós-fixado está atrelado a índices econômicos, pode ser interessante para quem quer acompanhar o mercado e ter a possibilidade de ganhos variáveis.</p>
        <p><b>Diversificação:</b> Para quem já possui outros investimentos e deseja diversificar, os pós-fixados oferecem uma alternativa que varia de acordo com o comportamento do mercado.</p>
    </div>)

const translations: { [key: string]: any } = {
    pt
  };