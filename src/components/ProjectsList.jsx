import { useState } from 'react';
import styles from './ProjectsList.module.css';

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
    <div className={styles.container}>
      <h2 className={styles.title}>Projects</h2>
      <div>
        <select className={styles.sort} value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}>
          {sortOptions.map(opt => <option key={opt.value} value={opt.value}>Order by {opt.label}</option>)}
        </select>
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Project Title</th>
            <th className={styles.th}>Username</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((p, i) => (
            <tr className={styles.tr} key={p.id}>
              <td className={styles.td}>{p.title}</td>
              <td className={styles.td}>{p.username}</td>
              <td className={styles.td}>{p.category}</td>
              <td className={styles.td}>{p.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button className={styles.pageBtn} onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <span className={styles.pageNum}>{page}</span>
        <button className={styles.pageBtn} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
