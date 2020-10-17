import Head from 'next/head'
import React from 'react'

/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import Link from 'next/link'
interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Global
        styles={`
          body {
            heigh: 100%;
          }

          @font-face {
            font-family: 'NEXON Lv2 Gothic Bold';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic Bold.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          
          @font-face {
            font-family: 'MaplestoryOTFLight';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFLight.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          
          html,
          body {
            margin: 0;
            font-family: 'MaplestoryOTFLight';
          }
          
          a {
            color: inherit;
            text-decoration: none;
          }
          
          * {
            box-sizing: border-box;
          }
          
      `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <Head>
          <title>Pentaport 2020 Cyber Food Booth </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Link href="/">
          <header
            css={css`
              background-image: url('/main_img1.jpg');
              background-size: cover;
              background-position: center;
              width: 100%;
              height: 300px;
              @media (max-width: 768px) {
                height: 200px;
              }
            `}
          ></header>
        </Link>
        <main
          css={css`
            flex: 1;
            flex-grow: 1;
            margin: 0 auto;
            max-width: 1000px;
            width: 100%;
            padding: 20px;
          `}
        >
          {children}
        </main>

        <footer
          css={css`
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              margin-left: 0.5rem;
            }

            a {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .logo {
              height: 1rem;
            }
          `}
        >
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
          </a>
        </footer>
      </div>
    </>
  )
}
