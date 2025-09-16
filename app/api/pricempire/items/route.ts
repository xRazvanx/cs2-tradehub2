import { NextApiRequest, NextApiResponse } from 'next';

// Load environment variable
const API_KEY = process.env.PRICEMPIRE_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Fetch item prices from the Pricempire API
        const response = await fetch('https://api.pricempire.com/items', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Failed to fetch data from Pricempire API');
        }

        const data = await response.json();

        // Process and merge data to return id, name, price, and icon
        const items = data.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            icon: item.icon
        }));

        // Return the merged data as a JSON array
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}