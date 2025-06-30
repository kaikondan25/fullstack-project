import { useState, useEffect } from 'react';
import styles from './ProjectsList.module.css';

const sortOptions = [
  { value: 'recent', label: 'Recent Projects' },
  { value: 'category', label: 'Category Name' },
  { value: 'username', label: 'Username' },
  { value: 'title', label: 'Project Title' },
];

export default function ProjectsList() {
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const projectsPerPage = 2;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/projects?page=${page}&sort_by=${sortBy}&limit=${projectsPerPage}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setTotal(0);
        setLoading(false);
      });
  }, [page, sortBy]);

  const totalPages = Math.ceil(total / projectsPerPage);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Projects</h2>
      <div>
        <select className={styles.sort} value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}>
          {sortOptions.map(opt => <option key={opt.value} value={opt.value}>Order by {opt.label}</option>)}
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
            {projects.map((p) => (
              <tr className={styles.tr} key={p.id}>
                <td className={styles.td}>{p.title}</td>
                <td className={styles.td}>{p.username}</td>
                <td className={styles.td}>{p.category}</td>
                <td className={styles.td}>{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.pagination}>
        <button className={styles.pageBtn} onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <span className={styles.pageNum}>{page}</span>
        <button className={styles.pageBtn} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
