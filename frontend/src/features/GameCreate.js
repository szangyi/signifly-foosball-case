import axios from 'axios';

export default async function GameCreateAPI(newGameData) {
    try {
        console.log(newGameData); // Log the input data

        const response = await axios.post('/api/game_create', newGameData, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });

        if (response.status === 200) {
            const createdGame = response.data;
            return createdGame; // Return the created team data
        } else {
            throw new Error(`Failed to create team: ${response.status}`);
        }
    } catch (error) {
        console.error('Game creation error:', error);
        throw error;
    }
}
