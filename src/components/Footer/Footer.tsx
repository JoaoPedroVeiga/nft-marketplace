import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          STARSOFT © {currentYear} TODOS OS DIREITOS RESERVADOS
        </p>
      </div>
    </footer>
  );
};

export default Footer;