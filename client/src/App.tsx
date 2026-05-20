import { Provider } from 'react-redux';
import { store } from './store';
import { UsersPage } from './pages/UsersPage';

function App() {
  return (
    <Provider store={store}>
      <UsersPage />
    </Provider>
  );
}

export default App;
