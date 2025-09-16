import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

// PrimeReact CSS
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
