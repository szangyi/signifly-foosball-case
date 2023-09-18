import axios from 'axios';

export default async function TeamCreateAPI(newTeamData) {
    try {
        console.log(newTeamData); // Log the input data

        const response = await axios.post('/api/team_create', newTeamData, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });

        if (response.status === 200) {
            const createdTeam = response.data;
            return createdTeam; // Return the created team data
        } else {
            throw new Error(`Failed to create team: ${response.status}`);
        }
    } catch (error) {
        console.error('Team creation error:', error);
        throw error;
    }
}
