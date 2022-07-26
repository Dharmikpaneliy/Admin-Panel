import './App.css';
import { Route, Switch } from 'react-router-dom';
import Medicine from './Container/Medicine/Medicine';
import Doctor from './Container/Doctor/Doctor';
import Layout from './Components/Layout/Layout';
import Counter from './Container/Counter/Counter';
import { Provider } from 'react-redux';
import { configurestore } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
import PromicesExample from './Container/PromicesExample/PromicesExample';
import usememoExample from './Container/Hook Example/usememoExample';
import UsecallbackExample from './Container/Hook Example/UsecallbackExample';

function App() {

  let {store, persistor} = configurestore();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Switch>
              <Route exact path={"/medicine"} component={Medicine} />
              <Route exact path={"/doctor"} component={Doctor} />
              <Route exact path={"/counter"} component={Counter} />
              <Route exact path={"/promicesExample"} component={PromicesExample}/>
              <Route exact path={"/memoExample"} component={usememoExample}/>
              <Route exact path={"/callbackExample"} component={UsecallbackExample}/>
            </Switch>
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
