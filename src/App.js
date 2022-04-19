import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from './spinner/Spinner';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
// import './App.css';

const MainPage = lazy(() => import('./pages/MainPage'));
const Page404 = lazy(() => import('./pages/404'));

function App() {
  return (
    <Router>

    <Container maxWidth="lg">
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/character" />} />
            <Route path="character" element={<MainPage />} />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </main>
    </Container>

    </Router>
  );
}

export default App;
