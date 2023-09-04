import CompoundInterestForm from 'components/calculators/CompoundInterestForm';
import Page from 'pages/Page';

const HomePage: React.FC = () => {
  return (
    <Page title="Juros Compostos">
        <div className="box-container box-shadow ">
          <h1>Juros Compostos</h1>
          <CompoundInterestForm />
        </div>
    </Page>
  );
}

export default HomePage;
