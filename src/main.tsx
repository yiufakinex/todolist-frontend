import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './layout/Layout';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  </React.StrictMode>,
)
