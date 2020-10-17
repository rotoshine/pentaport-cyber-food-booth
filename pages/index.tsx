import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

import { Store } from '../types/model'
import styled from '@emotion/styled'

interface Props {
  stores: Store[]
}

export default function Home({ stores }: Props) {
  return (
    <Layout>
      <Styled>
        <h1>Cyber Food Booth 🍔</h1>
        <div className="grid">
          {stores?.map(store => (
            <Link href={`/store/${store.id}`}>
              <div className="item">
                <img src={`https://pentaport2020foods.roto.codes${store.storeImage.url}`} />
                <div>{store.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </Styled>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://pentaport2020foods.roto.codes/stores')
  const stores = await res.json()
  return {
    props: {
      stores,
    },
  }
}

const Styled = styled.div`
  .grid {
    display: grid;
    width: 100%;
    row-gap: 10px;
    column-gap: 10px;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 768) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 440px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .grid .item {
    width: 250px;
    padding: 10px;
  }

  .grid .item:hover {
    background-color: #e6f7ff;
  }

  .grid img {
    object-fit: contain;
    width: 250px;
    height: 300px;
  }
`
