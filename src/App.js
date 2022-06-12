import './App.css';
import { Route, Switch } from 'react-router-dom';
import Medicine from './Container/Medicine/Medicine';
import Doctor from './Container/Doctor/Doctor';
import Layout from './Components/Layout/Layout';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path={"/medicine"} component={Medicine} />
          <Route exact path={"/doctor"} component={Doctor} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
