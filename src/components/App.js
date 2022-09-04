import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../Context/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivetRoute from "./PrivetRout";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute exact path="/signup" component={Signup} />
              <PublicRoute exact path="/login" component={Login} />
              <PrivetRoute exact path="/quiz/:id" component={Quiz} />
              <PrivetRoute exact path="/result/:id" component={Result} />
            </Switch>
          </Layout>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
