import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NotFoundPage from './pages/NotFound/NotFoundPage';
import ListPage from './pages/List/ListPage';
import StoreProvider from './stores/StoreProvider';
import SignUpPage from './pages/SignUp/SignUpPage.component';
import LoginPage from './pages/Login/LoginPage.component';
import WithHeader from './hocs/WithHeader';
import FavsPage from './pages/Favs/FavsPage';
import DetailPage from './pages/Detail/DetailPage';

function App() {
  return (
    <div className={styles.App}>
      <StoreProvider>
        <Router>
          <WithHeader>
            <Switch>
              <Route exact path="/" >
                <Redirect to="/list" />
              </Route>
              <Route path="/list" component={ListPage} />
              <Route path="/list/:id" component={DetailPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signUp" component={SignUpPage} />
              <Route exact path="/favs" component={FavsPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </WithHeader>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
