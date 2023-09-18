import axios from 'axios';
import { useEffect } from 'react';

export default async function GamesGetAll(setGamesData) {
    try {
        const response = await axios.get('/api/games_get_all', { 
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            }, 
        })

        if (response.status === 200) {
            const gamesData = response.data;
            setGamesData(gamesData);
        }

    } catch (error) {
        console.log(`Something went wrong: ` + error)
    }
}
