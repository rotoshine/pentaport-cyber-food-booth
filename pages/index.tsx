import { GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'

import { Store } from '../types/model'

interface Props {
  stores: Store[]
}

export default function Home({ stores }: Props) {
  return (
    <Layout>
      <h1>Cyber Food Booth 🍔</h1>
      <div className={styles.grid}>
        {stores?.map(store => (
          <Link href={`/store/${store.id}`}>
            <div className="item">
              <img src={`https://pentaport2020foods.roto.codes${store.storeImage.url}`} />
              <div>{store.title}</div>
            </div>
          </Link>
        ))}
      </div>
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
