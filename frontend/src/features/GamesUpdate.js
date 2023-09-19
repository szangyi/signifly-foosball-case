
// --------------------------
// REACT ---------------
// --------------------------
import axios from 'axios';
import { useEffect } from 'react';

export default async function GamesUpdateAPI(editedData) {
    try {

        console.log(editedData)

        const response = await axios.post('/api/games_update', editedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const teamsData = response.data;
        }

    } catch (error) {
        console.log(`Something went wrong: ` + error)
    }
}