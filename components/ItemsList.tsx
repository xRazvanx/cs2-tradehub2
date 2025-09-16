import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface Item {
  id: number;
  name: string;
  price: number;
  icon: string;
}

const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch('/api/pricempire/items');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ItemsList: React.FC = () => {
  const { data, error, isLoading } = useQuery<Item[]>('items', fetchItems);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {data?.map(item => (
        <li key={item.id}>
          <img src={item.icon} alt={item.name} style={{ width: '20px', height: '20px' }} />
          <span>{item.name} - ${item.price}</span>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;