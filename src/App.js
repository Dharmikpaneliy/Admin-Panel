import './App.css';
import { Route, Switch } from 'react-router-dom';
import Medicine from './Container/Medicine/Medicine';
import Doctor from './Container/Doctor/Doctor';
import Layout from './Components/Layout/Layout';
import Counter from './Container/Counter/Counter';
import { Provider } from 'react-redux';
import { configurestore } from './Redux/Store';

function App() {
 
  let store = configurestore();

  return (
    <>
    <Provider store={store}>
      <Layout>
        <Switch>
          <Route exact path={"/medicine"} component={Medicine} />
          <Route exact path={"/doctor"} component={Doctor} />
          <Route exact path={"/counter"} component={Counter}/>
        </Switch>
      </Layout>
      </Provider>
    </>
  );
}

export default App;
