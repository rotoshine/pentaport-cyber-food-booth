import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/Layout'
import { Store } from '../../types/model'

interface Props {
  store: Store
}

export default function StorePage({ store }: Props) {
  return (
    <Layout>
      <h1>{store.title}</h1>
      <div style={{ display: 'flex', width: '100%', maxWidth: 1000, flexDirection: 'row' }}>
        <div>
          <img style={{ width: '100%' }} src={`https://pentaport2020foods.roto.codes${store.storeImage.url}`} />
        </div>
        {store.qrcode && (
          <div>
            <img style={{ width: '100%' }} src={`https://pentaport2020foods.roto.codes${store.qrcode?.url}`} />
          </div>
        )}
      </div>
      <ul>
        {store.menus?.map(menu => (
          <li
            style={{
              border: '1px solid #ccc',
              padding: 10,
              listStyle: 'none',
              fontFamily: 'NEXON Lv2 Gothic Bold',
              fontSize: 40,
              marginTop: 10,
            }}
          >
            {menu.name} / {menu.price}원
          </li>
        ))}
      </ul>
      <Link href="/">가게목록으로</Link>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params
  const res = await fetch(`https://pentaport2020foods.roto.codes/stores/${id}`)
  const store = await res.json()
  return {
    props: {
      store,
    },
  }
}
