import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories, updateCategory, GetCategory, deleteCategory } from '../../actions/categoryAction';

function CategoryManager() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const [formData, setFormData] = useState({ categoryName: '', CGST: '', SGST: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(GetCategory());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            dispatch(updateCategory(editId, formData)).then(()=>{
                dispatch(GetCategory())
            });
        } else {
            dispatch(createCategories(formData)).then(()=>[
                dispatch(GetCategory())
            ]);
        }
        setFormData({ categoryName: '', CGST: '', SGST: '' });
        setEditId(null);
    };

    const handleEdit = (category) => {
        setFormData(category);
        setEditId(category._id);
    };

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    };

    return (
        <div className="p-4 mx-auto max-w-xl bg-white font-[sans-serif]">
            <h1 className="text-2xl text-gray-800 font-bold text-center">Category Manager</h1>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <input type="text" value={formData.categoryName} onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })} placeholder="Category Name" className="w-full p-2 border" required />
                <input type="number" value={formData.CGST} onChange={(e) => setFormData({ ...formData, CGST: e.target.value })} placeholder="CGST %" className="w-full p-2 border" required />
                <input type="number" value={formData.SGST} onChange={(e) => setFormData({ ...formData, SGST: e.target.value })} placeholder="SGST %" className="w-full p-2 border" required />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white">{editId ? 'Update' : 'Add'} Category</button>
            </form>
            <ul className="mt-4">
                {categories?.categories.map((category) => (
                    <li key={category._id} className="flex justify-between items-center p-2 border mt-2">
                        {category.categoryName} (CGST: {category.CGST}%, SGST: {category.SGST}%)
                        <div>
                            <button className="text-blue-500 mr-2" onClick={() => handleEdit(category)}>Edit</button>
                            <button className="text-red-500" onClick={() => handleDelete(category._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryManager;
