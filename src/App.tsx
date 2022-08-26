import React, {lazy, Suspense} from 'react';
import './i18next';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {PAGES} from '@constants/pages';

import Toasts from '@shared/Toasts';
import PrivateRoute from '@shared/PrivateRoute';

import Layout from './components/layout';

const Calendar = lazy(() => import('./components/pages/Calendar'));
const Organizers = lazy(() => import('./components/pages/Organizers'));
const Login = lazy(() => import('./components/pages/Login'));
const Registration = lazy(() => import('./components/pages/Registration'));
const RemindPassword = lazy(() => import('./components/pages/RemindPassword'));
const ConfirmEmail = lazy(() => import('./components/pages/ConfirmEmail'));
const ResetPassword = lazy(() => import('./components/pages/ResetPassword'));
const NewCommunity = lazy(() => import('./components/pages/NewCommunity'));
const NewEvent = lazy(() => import('./components/pages/NewEvent'));
const NewTournament = lazy(() => import('./components/pages/NewTournament'));
const Profile = lazy(() => import('./components/pages/Profile'));

export default () => (
  <BrowserRouter>
    <Toasts>
      <Layout>
        <Suspense fallback={<div />}>
          <Routes>
            <Route path={PAGES.HOME} element={<Calendar />} />
            <Route path={PAGES.CALENDAR} element={<Calendar />} />
            <Route path={PAGES.COMMUNITIES} element={<Organizers />} />
            <Route path={PAGES.LOGIN} element={<Login />} />
            <Route path={PAGES.REGISTRATION} element={<Registration />} />
            <Route path={PAGES.REMIND_PASSWORD} element={<RemindPassword />} />
            <Route path={PAGES.CONFIRM_EMAIL} element={<ConfirmEmail />} />
            <Route path={PAGES.RESET_PASSWORD} element={<ResetPassword />} />
            <Route
              path={PAGES.CREATE_COMMUNITY}
              element={
                <PrivateRoute>
                  <NewCommunity />
                </PrivateRoute>
              }
            />
            <Route
              path={PAGES.CREATE_EVENT}
              element={
                <PrivateRoute>
                  <NewEvent />
                </PrivateRoute>
              }
            />
            <Route
              path={PAGES.CREATE_TOURNAMENT}
              element={
                <PrivateRoute>
                  <NewTournament />
                </PrivateRoute>
              }
            />
            <Route
              path={PAGES.PROFILE}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </Toasts>
  </BrowserRouter>
);
