
// --------------------------
// React --------------------
// --------------------------
import React from 'react';
import { RouterProvider } from 'react-router-dom';


// --------------------------
// Components ---------------
// --------------------------
import router from './util/router';




const App = () => {
    return (

        <>

            <RouterProvider router={router} />

        </>
    );
}

export default App;
