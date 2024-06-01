import { useQuery } from "react-query";
import { Item } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetItems = () => {
    const getItems = async (): Promise<Item[]> => {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get items');
        }

        return response.json();
    };

    const { data: items, isLoading } = useQuery('fetchItems', getItems);

    return { items, isLoading };
};

export const useAddItem = () => {
    const addItem = async (newItem: Item): Promise<Item> => {
        const response = await fetch(`${API_BASE_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        if (!response.ok) {
            throw new Error('Failed to add item');
        }

        return response.json();
    };

    return { addItem };
};

export const useEditItem = () => {
    const editItem = async (id: number, updatedTitle: string): Promise<Item> => {
        const response = await fetch(`${API_BASE_URL}/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: updatedTitle }),
        });

        if (!response.ok) {
            throw new Error('Failed to edit item');
        }

        return response.json();
    };

    return { editItem };
};

export const useDeleteItem = () => {
    const deleteItem = async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
    };

    return { deleteItem };
};