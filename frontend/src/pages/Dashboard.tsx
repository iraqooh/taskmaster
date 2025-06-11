import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { useAuth } from '../contexts/AuthContext';
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal';
import DeleteModal from '../components/DeleteModal';

interface Category {
  _id: string;
  name: string;
  color: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  category: string | Category | null;
  userId: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchTasks = async () => {
    try {      
      const res = await api.get('/tasks');
      console.log(res.data);
      
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/tasks/${deleteId}`);
      fetchTasks();
    } catch (err) {
      console.error('Delete failed:', err);
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleSave = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
      } else {
        await api.post('/tasks', { ...taskData, userId: user._id });
      }
      await fetchTasks();
      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <>
      <div className="max-w-4xl min-h-screen mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Tasks</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCreate}
          >
            + New Task
          </button>
        </div>

        {tasks.length > 0 ? (
          <TaskTable
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : <div className='text-center font-bold border p-4 rounded-lg'>You don&apos;t have any tasks!</div>}

        {modalOpen && (
          <TaskModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            task={editingTask}
            userId={user.id}
          />
        )}

        {showDeleteModal && (
          <DeleteModal
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </>
  );
}
