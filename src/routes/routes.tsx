import { AuthPage, ChangePassword, ConfirmEmail, Login, Registration } from '@pages/auth-page';
import { MainPage } from '@pages/main-page';
import { Navigate, Route, Routes } from 'react-router-dom';
import * as results from '@pages/result-page/components/result/results';
import { Paths } from './paths';
import { PrivateRoute } from './privateRoute';
import { Result, ResultPage } from '@pages/result-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { CalendarPage } from '@pages/calendar-page';
import { ProfilePage } from '@pages/profile-page';
import { SettingsPage } from '@pages/settings-page';
import { ErrorPage } from '@pages/error-page';
import { TrainingPage } from '@pages/training-page';
import { AchievementsPage } from '@pages/achievements-page';

export const routes = (
    <Routes>
        <Route element={<PrivateRoute />}>
            <Route path={Paths.MAIN} element={<MainPage />} />
            <Route path={Paths.FEEDBACKS} element={<FeedbacksPage />} />
            <Route path={Paths.CALENDAR} element={<CalendarPage />} />
            <Route path={Paths.PROFILE} element={<ProfilePage />} />
            <Route path={Paths.SETTINGS} element={<SettingsPage />} />
            <Route path={Paths.TRAINING} element={<TrainingPage />} />
            <Route path={Paths.ACHIEVEMENTS} element={<AchievementsPage />} />
        </Route>

        <Route path='/' element={<Navigate to={Paths.MAIN} />} />

        <Route path={Paths.AUTH} element={<AuthPage />}>
            <Route path={Paths.LOGIN} element={<Login />} />
            <Route path={Paths.REGISTRATION} element={<Registration />} />
            <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmail />} />
            <Route path={Paths.CHANGE_PASSWORD} element={<ChangePassword />} />
        </Route>
        <Route path={Paths.RESULT} element={<ResultPage />}>
            <Route path={Paths.ERROR_LOGIN} element={<Result {...results.resultLoginError} />} />
            <Route
                path={Paths.ERROR_USER_EXIST}
                element={<Result {...results.resultRegistrationEmailError} />}
            />
            <Route path={Paths.ERROR} element={<Result {...results.resultRegistrationError} />} />
            <Route
                path={Paths.SUCCESS}
                element={<Result {...results.resultRegistrationSuccess} />}
            />
            <Route
                path={Paths.ERROR_CHECK_EMAIL_NO_EXIST}
                element={<Result {...results.resultCheckEmailError} />}
            />
            <Route
                path={Paths.ERROR_CHECK_EMAIL}
                element={<Result {...results.resultCheckError} />}
            />
            <Route
                path={Paths.ERROR_CHANGE_PASSWORD}
                element={<Result {...results.resultChangeError} />}
            />
            <Route
                path={Paths.SUCCESS_CHANGE_PASSWORD}
                element={<Result {...results.resultChangeSuccess} />}
            />
        </Route>

        <Route path='*' element={<ErrorPage />} />
    </Routes>
);
