import { useState, useEffect } from 'react';
import ItemForm from '../forms/ItemForm';
import { Item } from '../types';
import { useAddItem, useDeleteItem, useEditItem, useGetItems } from '../api/TodoItemApi';
import { Divider } from '@mui/material';

const ListPage = () => {
    const { items: initialItems, isLoading: isItemsLoading } = useGetItems();
    const { addItem } = useAddItem();
    const { editItem } = useEditItem();
    const { deleteItem } = useDeleteItem();
    const [items, setItems] = useState<Item[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);

    useEffect(() => {
        if (initialItems) {
            setItems(initialItems);
        }
    }, [initialItems]);

    const handleAddItem = async (newItem: Item) => {
        try {

            const addedItem = await addItem(newItem);

            setItems(prevItems => [...prevItems, addedItem]);


        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    const handleEditItem = async (id: number, updatedTitle: string) => {
        try {
            await editItem(id, updatedTitle);
            const updatedItems = items.map(item =>
                item.id === id ? { ...item, title: updatedTitle } : item
            );
            setItems(updatedItems);
        } catch (error) {
            console.error('Failed to edit item:', error);
        }
    };

    const handleDeleteItem = async (id: number) => {
        try {
            await deleteItem(id);
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const handleToggleEditMode = (id: number) => {
        setEditItemId(id === editItemId ? null : id);
    };

    return (
        <div>

            <ItemForm onSave={handleAddItem} onAdd={() => { }} />
            <Divider />
            {isItemsLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {editItemId === item.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={e => handleEditItem(item.id, e.target.value)}
                                    />
                                    <button onClick={() => handleToggleEditMode(item.id)}>Finish</button>
                                </div>
                            ) : (
                                <div>
                                    <span>{item.title}</span>
                                    <button onClick={() => handleToggleEditMode(item.id)}>Edit</button>
                                    <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListPage;