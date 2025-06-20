import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addProduct, updateProduct, deleteProduct } from '../features/products/productSlice';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    TextField,
    Button,
    Box,
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

export default function ProductListPage() {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.products);

    const [formData, setFormData] = useState({ title: '', price: '' });
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAdd = () => {
        if (!formData.title || !formData.price) return;
        dispatch(addProduct({ ...formData, price: parseFloat(formData.price) }));
        setFormData({ title: '', price: '' });
    };

    const handleEdit = (product) => {
        setEditId(product.id);
        setFormData({ title: product.title, price: product.price });
    };

    const handleUpdate = () => {
        dispatch(updateProduct({ id: editId, ...formData, price: parseFloat(formData.price) }));
        setEditId(null);
        setFormData({ title: '', price: '' });
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Product List</Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                />
                {editId ? (
                    <Button onClick={handleUpdate} variant="contained">Update</Button>
                ) : (
                    <Button onClick={handleAdd} variant="contained">Add</Button>
                )}
            </Box>

            <List sx={{ mt: 3 }}>
                {items.map((product) => (
                    <ListItem
                        key={product.id}
                        secondaryAction={
                            <>
                                <IconButton edge="end" onClick={() => handleEdit(product)}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleDelete(product.id)}>
                                    <Delete />
                                </IconButton>
                            </>
                        }
                        divider
                    >
                        <ListItemText primary={product.title} secondary={`Price: $${product.price}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
