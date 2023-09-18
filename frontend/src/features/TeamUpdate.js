
// --------------------------
// REACT ---------------
// --------------------------
import axios from 'axios';
import { useEffect } from 'react';

export default async function TeamUpdateAPI(editedData) {
    try {

        console.log(editedData)
        console.log('maybe goes thru')

        // const response = await axios.post('/api/team_update', editedData, { withCredentials: false })
        // console.log('actually does hahaaa')


        const response = await axios.post('/api/team_update', editedData, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });

        console.log('actually does hahaaa')


        if (response.status === 200) {
            const teamsData = response.data;
            // setTeamsData(teamsData);
        }

    } catch (error) {
        console.log(`Something went wrong: ` + error)
    }
}