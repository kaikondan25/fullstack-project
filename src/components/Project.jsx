import styles from './ProjectsList.module.css';

export default function Project({ project }) {
  return (
    <tr className={styles.tr} key={project.id}>
      <td className={styles.td}>{project.title}</td>
      <td className={styles.td}>{project.username}</td>
      <td className={styles.td}>{project.category}</td>
      <td className={styles.td}>{new Date(project.created_at).toLocaleDateString()}</td>
    </tr>
  );
}
