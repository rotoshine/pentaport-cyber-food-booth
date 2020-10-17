import Head from 'next/head'
import React from 'react'

import styles from '../styles/Home.module.css'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pentaport 2020 Cyber Food Booth </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}></header>
      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
