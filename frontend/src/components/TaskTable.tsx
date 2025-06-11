const TaskTable = ({ tasks, onEdit, onDelete }) => (
  <table className="w-full border overflow-x-auto">
    <thead className="bg-black text-white">
      <tr>
        <th className="border p-2">Title</th>
        <th className="border p-2">Due Date</th>
        <th className="border p-2">Priority</th>
        <th className="border p-2">Status</th>
        <th className="border p-2">Category</th>
        <th className="border p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <tr key={task._id}>
          <td className="border p-2">{task.title}</td>
          <td className="border p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
          <td className="border p-2">{task.priority}</td>
          <td className="border p-2">{task.completed ? 'Done' : 'Pending'}</td>
          <td className="border p-2">
            {task.category ? (
              <span
                className="px-2 py-1 rounded text-sm"
                style={{ backgroundColor: task.category.color }}
              >
                {task.category.name}
              </span>
            ) : (
              <span className="text-gray-500 italic">No category</span>
            )}
          </td>
          <td className="border p-2 text-center">
            <button
              onClick={() => onEdit(task)}
              className="text-white mr-2 bg-blue-600 p-2 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-white bg-red-600 p-2 rounded-lg"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default TaskTable;
