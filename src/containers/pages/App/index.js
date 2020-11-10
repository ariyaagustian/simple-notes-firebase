// import logo from "../../../assets/img/logo/logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard";
import Register from "../Register";
import Login from "../Login";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Dashboard}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
