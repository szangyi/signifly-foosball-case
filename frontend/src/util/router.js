
// --------------------------
// React --------------------
// --------------------------
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// --------------------------
// Pages --------------------
// --------------------------
import Home from '../pages/Home';
import TournamentPlan from '../pages/TournamentPlan';
import LeaderBoard from '../pages/LeaderBoard';
import Teams from '../pages/Teams';


// --------------------------
// Components ---------------
// --------------------------
import RootLayoutNav from '../components/Layout/RootLayoutNav';


const router = createBrowserRouter([
    {
        id: 'root',
        // loader: navLoaderPublic,
        children: [
            {
                element: <RootLayoutNav />,
                children: [
                    { path: "/", element: <Home /> },
                    { path: "/tournament-plan", element: <TournamentPlan /> },
                    { path: "/leaderboard", element: <LeaderBoard /> },
                    { path: "/teams", element: <Teams /> },

                ]
            }
        ],
    },

]);


export default router;