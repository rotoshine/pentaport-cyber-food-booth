import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../../components/Layout'
import { Store } from '../../types/model'

interface Props {
  store: Store
}

export default function StorePage({ store }: Props) {
  const handleMenuClick = () => {}

  return (
    <Layout>
      <Helmet>
        <title>Cyber Food Booth - {store.title}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nytimesbits" />
        <meta name="twitter:creator" content="@nickbilton" />
        <meta property="og:url" content={`https://pentaport-cyber-food-booth.vercel.app/stores/${store.id}`} />
        <meta property="og:title" content={`Cyber Food Booth - ${store.title}`} />
        <meta property="og:description" content="먹어보고 말해! 츄라이츄라이!" />
        <meta property="og:image" content={`https://pentaport2020foods.roto.codes${store.storeImage.url}`} />
      </Helmet>
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
            onClick={() => handleMenuClick(menu)}
          >
            {menu.name} / {menu.price && menu.price > 0 ? `${menu.price}원` : '무료!!'}
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
