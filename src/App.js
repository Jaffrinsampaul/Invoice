import './App.css';
import Routing from './components/routing';
import {Provider} from "react-redux"
import { store } from './components/redux/reduxHandling';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routing/>
      </Provider>
    </div>
  );
}

export default App;
