"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const links = [
  { href: "/galerie", label: "Galerie" },
  { href: "/artistes", label: "Artistes" },
  { href: "/#conseil", label: "Conseil" },
  { href: "/#apropos", label: "À propos" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/#top" className={styles.logo}>
        <Image src="/logo.jpg" alt="Galerie" width={32} height={32} priority />
      </Link>
      <nav className={styles.nav}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
