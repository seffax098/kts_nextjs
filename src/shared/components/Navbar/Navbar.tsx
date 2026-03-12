'use client';
import { usePathname } from 'next/navigation';
import Bag from '../icons/Bag';
import User from '../icons/User';
import Text from '../Text';
import Logo from './Logo';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`${styles.navbar}`}>
      <div className={styles.desktop}>
        <div className={`${styles.navbar__left}`}>
          <Link href={'/'} className={`${styles.link} ${styles.logo__link}`}>
            <Logo />
          </Link>
        </div>

        <div className={`${styles.navbar__center}`}>
          <Link
            href={'/'}
            className={`${styles.link} ${styles.product__link} ${styles[pathname === '/' ? 'link__active' : '']}`}
          >
            <Text
              className={`${styles.navbar__products} ${styles[pathname === '/' ? 'link-text__active' : '']}`}
              view={`${pathname === '/' ? 'p-20' : 'p-18'}`}
              color={`${pathname === '/' ? 'accent' : 'primary'}`}
            >
              Products
            </Text>
          </Link>
        </div>

        <div className={`${styles.navbar__right}`}>
          <Link href={'/cart'}
            className={`${pathname === '/cart' ? styles.link__activeIcon : styles.noactive} ${styles.link}`}>
            <span className={`${styles.navbar__bag}`}>
              <Bag width={30} height={30} color={`${pathname === '/cart' ? 'accent' : 'primary'}`}/>
            </span>
          </Link>
          <Link href={'/authorization'}
            className={`${pathname === '/authorization' ? styles.link__activeIcon : styles.noactive} ${styles.link}`}>
            <span className={`${styles.navbar__user}`}>
              <User width={30} height={30} color={`${pathname === '/authorization' ? 'accent' : 'primary'}`}/>
            </span>
          </Link>
        </div>
      </div>



      <div ref={menuRef} className={styles.mobile}>
        <div className={`${styles.navbar__left}`}>
          <Link href={'/'} className={`${styles.link} ${styles.logo__link}`}>
            <Logo />
          </Link>
        </div>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenu__open : ''}`}>
          <div className={styles.mobileMenu__left}>
            <Link
              href={'/'}
              className={`${styles.mobileMenu__link} ${styles[pathname === '/' ? 'mobile__link__active' : '']}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Text
                className={`${styles.mobile__navbar__products} ${styles[pathname === '/' ? 'mobile__link-text__active' : '']}`}
                view={`${pathname === '/' ? 'p-20' : 'p-18'}`}
                color={`${pathname === '/' ? 'accent' : 'primary'}`}
              >
                Products
              </Text>
            </Link>
          </div>
          <div className={styles.mobileMenu__right}>
            <Link href={'/authorization'}
              onClick={() => setIsMenuOpen(false)}>
              <Text
                className={`${styles.mobile__navbar__account}`}
                view={`${pathname === '/authorization' ? 'p-20' : 'p-18'}`}
                color={`${pathname === '/authorization' ? 'accent' : 'primary'}`}
              >
                Account
              </Text>
            </Link>
            <Link href={'/cart'}
              onClick={() => setIsMenuOpen(false)}>
              <Text
                className={`${styles.mobile__navbar__Cart}`}
                view={`${pathname === '/cart' ? 'p-20' : 'p-18'}`}
                color={`${pathname === '/cart' ? 'accent' : 'primary'}`}
              >
                Cart
              </Text>
            </Link>
          </div>
        </div>
        <button
          type="button"
          className={`${styles.mobileMenu__toggle} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" height={40} width={40}>
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path>
          </svg>
        </button>
      </div>

    </header>
  );
};

export default Navbar;
