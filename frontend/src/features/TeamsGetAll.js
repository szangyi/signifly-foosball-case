
// --------------------------
// REACT ---------------
// --------------------------
import axios from 'axios';
import { useEffect } from 'react';

export default async function TeamsGetAll(setTeamsData) {
    try {

        const response = await axios.get('/api/teams_get_all', { withCredentials: false })

        if (response.status === 200) {
            const teamsData = response.data;
            setTeamsData(teamsData);
        }

    } catch (error) {
        console.log(`Something went wrong: ` + error)
    }
}