// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// //import './index.css'
// import { BrowserRouter } from 'react-router-dom'
// //import CSS Bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/styles.css';





// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//   <BrowserRouter>
//   <App />
//   </BrowserRouter>
//   </React.StrictMode>,
// )
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// Import React Query dan Devtools
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// Import CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';

// Membuat instance QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* Menambahkan React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);

