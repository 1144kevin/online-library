import './App.scss';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../src/redux/store';
import Router from './router'; 

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Router />  
    </ReduxProvider>
  );
}

export default App;