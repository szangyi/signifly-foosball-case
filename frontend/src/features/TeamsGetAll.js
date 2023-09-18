
// --------------------------
// REACT ---------------
// --------------------------
import axios from 'axios';
import { useEffect } from 'react';

export default async function TeamsGetAll(setTeamsData) {
    try {

        const response = await axios.get('/api/teams_get_all', { withCredentials: false })
        const teamsData = response.data;
        setTeamsData(teamsData);

        // if (response.status === 200) {
        //     const teamsData = response.data;
        //     setTeamsData(teamsData);
        // }

    } catch (error) {
        // if (error.response.status === 400) {
        //     const errorMessage = { // Page specific error message
        //         message: "We could not fetch the data. Try again!",
        //         statusCode: error.response.status,
        //     };
        //     setErrorMessage(errorMessage);
        // } else {
        //     const errorMessage = { // General error message
        //         statusCode: error.response.status,
        //     };
        //     setErrorMessage(errorMessage);
        // }

        console.log("your code sucks")
    }
}