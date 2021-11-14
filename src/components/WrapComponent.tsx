import { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import WithHeader from '../hocs/WithHeader';
import DetailPage from '../pages/Detail/DetailPage';
import FavsPage from '../pages/Favs/FavsPage';
import ListPage from '../pages/List/ListPage';
import LoginPage from '../pages/Login/LoginPage.component';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import SignUpPage from '../pages/SignUp/SignUpPage.component';
import { StoreContext } from '../stores/StoreProvider';

const WrapComponent = () => {

  const [, , user] = useContext(StoreContext);

  return (
    <Router>
      <WithHeader>
        <Switch>
          <Route exact path="/" >
            <Redirect to="/list" />
          </Route>
          <Route exact path="/list" component={ListPage} />
          <Route path="/list/:id" component={DetailPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signUp" component={SignUpPage} />
          {user && <Route exact path="/favs" component={FavsPage} />}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </WithHeader>
    </Router>
  );
}

export default WrapComponent;
