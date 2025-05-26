import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Routes } from './routes';
import { store } from './store';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
