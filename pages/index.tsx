import { GetStaticProps } from 'next'
import Link from 'next/link'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import Layout from '../components/Layout'
import { findAllStores } from '../utils/api'

import { Store } from '../types/model'
import { getFullPath } from '../utils/image'

interface Props {
  stores: Store[]
}

export default function Home({ stores }: Props) {
  return (
    <Layout>
      <h1>Cyber Food Booth 🍔</h1>
      <div
        css={css`
          display: grid;
          width: 100%;
          row-gap: 10px;
          column-gap: 10px;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 1fr;
          place-items: start;
          @media (max-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
          }
          @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 440px) {
            grid-template-columns: repeat(1, 1fr);
          }

          > * {
            width: 100%;
          }
        `}
      >
        {stores?.map(store => (
          <Link href={`/store/${store.id}`} key={store.id}>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                padding: 10px;
                margin: auto;
                cursor: pointer;
              `}
            >
              <div
                css={css`
                  width: 100%;
                  height: 100%;
                `}
              >
                <img
                  css={css`
                    width: 100%;
                    heigt: 100%;
                  `}
                  src={getFullPath(store.storeImage.url)}
                />
              </div>
              <div
                css={css`
                  font-size: 1.5rem;
                  margin-top: 0.8rem;
                `}
              >
                {store.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const stores = await findAllStores()
  return {
    props: {
      stores,
    },
    revalidate: 10,
  }
}
