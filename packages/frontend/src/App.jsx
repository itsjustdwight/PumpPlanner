//App.jsx
import "./App.css";
import HomeScreen from "./HomeScreen";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";
import SignUp from "./Signup"; // <== import your sign-up component
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/login" component={ProductScreen} />
      <Route exact path="/cart" component={CartScreen} />
      
      {/* NEW SIGNUP ROUTE */}
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  );
}

export default App;
