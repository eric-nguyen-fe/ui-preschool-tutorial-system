/* eslint-disable import/order */
import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Authencation from 'pages/Authencation';
import './App.scss';
import Error from 'pages/Error';
import UnderDevelop from 'pages/UnderDevelop';
import './i18n';
import Loading from 'components/atoms/Loading';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DEFAULT_QUERY_OPTION } from 'utils/constants';
import { Provider } from 'react-redux';
import { store } from 'store';
import OtherCalendar from 'pages/OtherCalendar';
import TablePage from 'pages/Table';
import Home from 'pages/Home';
import TableClass from 'pages/TableClass';
import TableStudent from 'pages/TableStudent';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/manager/tutor',
    element: <TablePage />,
  },
  {
    path: '/manager/class',
    element: <TableClass />,
  },
  {
    path: '/manager/student',
    element: <TableStudent />,
  },
  {
    path: '/calendar',
    element: <OtherCalendar />,
  },
  {
    path: '/login',
    element: <Authencation />,
  },
  {
    path: '/comming-soon/:name',
    element: <UnderDevelop />,
  },
  {
    path: '*',
    element: <Error />,
  },
];
const queryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTION
  }
});

const App: React.FC = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loading variant="fullScreen" />}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={`route-${index.toString()}`}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

export default App;
