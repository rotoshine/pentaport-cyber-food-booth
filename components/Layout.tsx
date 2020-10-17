import Head from 'next/head'
import React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

import styles from '../styles/Home.module.css'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Styled>
      <Global
        styles={`
          body {
            heigh: 100%;
          }
      `}
      />
      <div className="container">
        <Head>
          <title>Pentaport 2020 Cyber Food Booth </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="header"></header>
        <main>{children}</main>

        <footer className="footer">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </Styled>
  )
}

const Styled = styled.div`
  .header {
    background-image: url('/main_img1.jpg');
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 500px;

    @media (max-width: 440px) {
      height: 200px;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    flex-grow: 1;
    margin: 0 auto;
    max-width: 1000px;
    width: 100%;
    padding: 20px;
  }

  .footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
