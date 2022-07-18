import Login from './component/Login';
import Register from './component/Register';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router className="App">
        <Switch>
            <Route path="/register"><Register /></Route>
            <Route path="/login"><Login /></Route>
        </Switch>
    </Router>
  );
}

export default App;
