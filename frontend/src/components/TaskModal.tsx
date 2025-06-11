import { useState, useEffect, useRef } from 'react';
import api from '../lib/axios';

const TaskModal = ({ task, onSave, onClose, userId }) => {
  const [form, setForm] = useState({
    title: '',
    dueDate: '',
    priority: 'Low',
    completed: false,
    category: '',
    reminder: ''
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('#4B5563'); // default color
  const modalRef = useRef(null);

  const colorOptions = [
    '#EF4444', // red
    '#F97316', // orange
    '#EAB308', // yellow
    '#10B981', // green
    '#3B82F6', // blue
    '#8B5CF6', // violet
    '#4B5563', // gray (default)
  ];

  useEffect(() => {
    if (task) setForm({ ...form, ...task });
    fetchCategories();
  }, [task]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await api.post('/categories', {
        name: newCategory,
        color: selectedColor
      });
      setCategories([...categories, res.data]);
      setForm({ ...form, category: res.data._id });
      setNewCategory('');
      setSelectedColor('#4B5563');
    } catch (err) {
      console.error('Category add failed:', err);
    }
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) return;
    onSave(form);
  };

  return (
    <div onClick={handleOverlayClick} className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form ref={modalRef} onSubmit={handleSubmit} className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">{task ? 'Edit Task' : 'New Task'}</h2>

        <input className="border p-2 w-full mb-2" placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} required />

        <input className="border p-2 w-full mb-2" type="date" value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />

        <select className="border p-2 w-full mb-2" value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
        </select>

        {/* Category Dropdown */}
        <select className="border p-2 w-full mb-2" value={form.category || ''}
          onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="">-- Select Category --</option>
          {Array.isArray(categories) && categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        {/* New Category Input + Color Picker */}
        <div className="flex mb-2 gap-2">
          <input className="border p-2 flex-grow" placeholder="New Category"
            value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <button type="button" className="bg-gray-300 px-3 rounded" onClick={handleAddCategory}>
            Add
          </button>
        </div>

        {/* Color Selection for New Category */}
        <div className="flex items-center gap-2 mb-4">
          {colorOptions.map((color) => (
            <div key={color}
              className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </div>

        {/* Reminder Input */}
        <div className="flex justify-between">
          <label className='mr-4'>Reminder</label>
          <input className="border p-2 w-full mb-2" type="datetime-local" value={form.reminder || ''}
          onChange={(e) => setForm({ ...form, reminder: e.target.value })} />
        </div>

        {/* Completed Checkbox */}
        <div className="mb-2">
          <label>
            <input type="checkbox" checked={form.completed}
              onChange={(e) => setForm({ ...form, completed: e.target.checked })} />
            <span className="ml-2">Completed</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Save</button>
          <button type="button" onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
