import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoutes from './Routes/AuthRoutes';


function AppAuthRoute() {

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });

    return (
        <>
            <Suspense fallback={<div>Loading... </div>}>
                <Routes>
                    {getRoutes(AuthRoutes)}
                    <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
                </Routes>
            </Suspense>
        </>
    );

}

export default AppAuthRoute;