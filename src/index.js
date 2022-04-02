import React from 'react';
import ReactDOM from 'react-dom';

import { ReactQueryDevtools } from "react-query/devtools";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import './index.css';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
     queries: {
       refetchOnWindowFocus: false,
     },
   },
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
