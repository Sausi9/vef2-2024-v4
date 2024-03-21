// components/Header.js
import Link from 'next/link';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">
              <p> Forsíða </p>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/games">
              <p>Allir leikir</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
