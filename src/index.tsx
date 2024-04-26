import React, { Suspense } from 'react';

import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history, store } from '@redux/configure-store';
import { routes } from './routes/routes';
import { Loader } from '@components/loader/loader';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Suspense fallback={<Loader />}>{routes}</Suspense>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
