import Page from "components/pages/Page";

const HomePage: React.FC = () => {
  return (
    <Page title="Home">
      <h2>Welcome to the Home Page</h2>
      <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome to My App</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Page>
  );
}

export default HomePage;
