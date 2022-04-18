import React from 'react';
import ReactDOM from 'react-dom';

// import { ReactQueryDevtools } from "react-query/devtools";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from 'react-query'
import store from './store';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

// const queryClient = new QueryClient({
//   defaultOptions: {
//      queries: {
//        refetchOnWindowFocus: false,
//      },
//    },
// })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
