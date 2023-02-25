import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { userContext } from './userContext/userContext';

// ----------------------------------------------------------------------

export default function App() {
  const defaultValue = JSON.parse(localStorage.getItem('loginState')) || { email: '', password: '' };
  const [context, setContext] = useState(defaultValue);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <userContext.Provider value={[context, setContext]}>
            <Router />
          </userContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
