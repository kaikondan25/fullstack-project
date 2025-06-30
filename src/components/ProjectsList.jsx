import { useState } from 'react';

// Mock data for demonstration
const mockProjects = [
  { id: 1, title: 'Project Alpha', category: 'Web', username: 'alice', created_at: '2024-06-01' },
  { id: 2, title: 'Project Beta', category: 'Mobile', username: 'bob', created_at: '2024-06-02' },
  { id: 3, title: 'Project Gamma', category: 'Data', username: 'carol', created_at: '2024-06-03' },
  { id: 4, title: 'Project Delta', category: 'Web', username: 'dave', created_at: '2024-06-04' },
];

const sortOptions = [
  { value: 'recent', label: 'Recent Projects' },
  { value: 'category', label: 'Category Name' },
  { value: 'username', label: 'Username' },
  { value: 'title', label: 'Project Title' },
];

function sortProjects(projects, sortBy) {
  switch (sortBy) {
    case 'category':
      return [...projects].sort((a, b) => a.category.localeCompare(b.category));
    case 'username':
      return [...projects].sort((a, b) => a.username.localeCompare(b.username));
    case 'title':
      return [...projects].sort((a, b) => a.title.localeCompare(b.title));
    case 'recent':
    default:
      return [...projects].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
}

export default function ProjectsList() {
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const projectsPerPage = 2;

  const sorted = sortProjects(mockProjects, sortBy);
  const totalPages = Math.ceil(sorted.length / projectsPerPage);
  const paginated = sorted.slice((page - 1) * projectsPerPage, page * projectsPerPage);

  return (
    <div>
      <h2>Projects</h2>
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}>
          {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <table border="1" cellPadding="8" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Username</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.username}</td>
              <td>{p.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
