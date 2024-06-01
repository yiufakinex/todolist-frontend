import { useState } from 'react';
import { Item } from '../types';


type Props = {
    onSave: (item: Item) => void;
    onAdd: () => void;
};

const ItemForm = ({ onSave, onAdd }: Props) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSave({ id: 0, title });
        setTitle('');
        onAdd();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a new item"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default ItemForm;