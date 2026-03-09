import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from '../api/taskApi';
import TaskTable from '../components/TaskTable';
import TaskFilters from '../components/TaskFilters';
import TaskForm from '../components/TaskForm';
import DueReminders from '../components/DueReminders';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    sort_by: 'created_at',
    sort_order: 'desc',
    per_page: 10,
    page: 1,
  });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;
      params.sort_by = filters.sort_by;
      params.sort_order = filters.sort_order;
      params.per_page = filters.per_page;
      params.page = filters.page;

      const res = await getTasks(params);
      setTasks(res.data.data || []);
      setTotalRows(res.data.meta?.total || 0);
    } catch {
      toast.error('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.search, fetchTasks]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handlePerPageChange = (newPerPage) => {
    setFilters((prev) => ({ ...prev, per_page: newPerPage, page: 1 }));
  };

  const handleSort = (sortField, sortDirection) => {
    setFilters((prev) => ({
      ...prev,
      sort_by: sortField,
      sort_order: sortDirection,
    }));
  };

  const handleCreateTask = async (data) => {
    try {
      await createTask(data);
      toast.success('Task created successfully!');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        Object.values(errors).flat().forEach((msg) => toast.error(msg));
      } else {
        toast.error('Failed to create task.');
      }
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      await updateTask(editingTask.id, data);
      toast.success('Task updated successfully!');
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        Object.values(errors).flat().forEach((msg) => toast.error(msg));
      } else {
        toast.error('Failed to update task.');
      }
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      toast.success('Task deleted successfully!');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task.');
    }
  };

  const handleToggleTask = async (id) => {
    try {
      await toggleTask(id);
      toast.success('Task status updated!');
      fetchTasks();
    } catch {
      toast.error('Failed to update task status.');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Due Date Reminders */}
      <DueReminders />

      {/* Filters */}
      <TaskFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Task Table */}
      <TaskTable
        tasks={tasks}
        totalRows={totalRows}
        perPage={filters.per_page}
        currentPage={filters.page}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
        loading={loading}
      />

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
