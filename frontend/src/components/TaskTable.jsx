import DataTable from 'react-data-table-component';

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
};

const statusColors = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-blue-100 text-blue-800',
};

const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#F9FAFB',
      borderBottomWidth: '1px',
      borderBottomColor: '#E5E7EB',
    },
  },
  headCells: {
    style: {
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      color: '#6B7280',
      letterSpacing: '0.05em',
    },
  },
  rows: {
    style: {
      fontSize: '0.875rem',
      '&:hover': {
        backgroundColor: '#F9FAFB',
      },
    },
  },
  cells: {
    style: {
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },
};

const TaskTable = ({
  tasks,
  totalRows,
  perPage,
  currentPage,
  onPageChange,
  onPerPageChange,
  onSort,
  onEdit,
  onDelete,
  onToggle,
  loading,
}) => {
  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
      sortField: 'title',
      grow: 2,
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.title}</div>
          {row.description && (
            <div className="text-gray-500 text-xs mt-1 truncate max-w-xs">
              {row.description}
            </div>
          )}
        </div>
      ),
    },
    {
      name: 'Priority',
      selector: (row) => row.priority,
      sortable: true,
      sortField: 'priority',
      width: '120px',
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[row.priority]}`}>
          {row.priority}
        </span>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      sortField: 'status',
      width: '130px',
      cell: (row) => (
        <button
          onClick={() => onToggle(row.id)}
          className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${statusColors[row.status]}`}
          title="Click to toggle status"
        >
          {row.status}
        </button>
      ),
    },
    {
      name: 'Due Date',
      selector: (row) => row.due_date,
      sortable: true,
      sortField: 'due_date',
      width: '140px',
      cell: (row) => {
        if (!row.due_date) return <span className="text-gray-400">No date</span>;
        const isOverdue = row.is_overdue;
        return (
          <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}>
            {new Date(row.due_date).toLocaleDateString()}
            {isOverdue && <span className="block text-xs">Overdue</span>}
          </span>
        );
      },
    },
    {
      name: 'Created',
      selector: (row) => row.created_at,
      sortable: true,
      sortField: 'created_at',
      width: '140px',
      cell: (row) => (
        <span className="text-gray-500 text-sm">
          {new Date(row.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      name: 'Actions',
      width: '150px',
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(row)}
            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium hover:bg-indigo-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs font-medium hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleSort = (column, sortDirection) => {
    if (column.sortField) {
      onSort(column.sortField, sortDirection);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <DataTable
        columns={columns}
        data={tasks}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={perPage}
        paginationDefaultPage={currentPage}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPerPageChange}
        sortServer
        onSort={handleSort}
        customStyles={customStyles}
        highlightOnHover
        responsive
        noDataComponent={
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg">No tasks found</p>
            <p className="text-sm mt-1">Create a new task to get started!</p>
          </div>
        }
        progressComponent={
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        }
      />
    </div>
  );
};

export default TaskTable;
