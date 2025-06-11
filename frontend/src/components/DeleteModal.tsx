const DeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="bg-white p-6 rounded shadow-lg text-center">
      <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this task?</p>
      <div className="flex justify-center gap-4">
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Yes, Delete</button>
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  </div>
);
export default DeleteModal;
