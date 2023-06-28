import axios from 'axios';

export async function fetchData(limit: number): Promise<any> {
    try {
        const response = await axios.get(
            'https://api.api-ninjas.com/v1/facts',
            {
                headers: {
                    'X-Api-Key': 'I4H2nQwOgNmZRaRD9ermhQ==sUCGoy3QWJohzMt9'
                },
                params: {
                    limit: limit
                }
            }
        );
        console.log('fetched fact data api: ' + response.data);

        return response.data;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}
