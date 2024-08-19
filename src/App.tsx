import './App.scss';
//任何一個被 ReduxProvider 包裹的組件都可以訪問 store，並使用 useSelector 和 useDispatch 鉤子來讀取狀態和分派動作。
import { Provider as ReduxProvider } from 'react-redux';
import store from '../src/redux/store';
import Router from './router';
import { BookProvider } from './components/BookContext';

const App = () => {
  return (
    <BookProvider>
      <ReduxProvider store={store}>
        <Router />
      </ReduxProvider>
    </BookProvider>
  );
}

export default App;