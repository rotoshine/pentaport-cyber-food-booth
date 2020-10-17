import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { Helmet } from 'react-helmet'
import Modal from 'react-modal'

import Layout from '../../components/Layout'
import { Menu, Store } from '../../types/model'

interface Props {
  store: Store
}

export default function StorePage({ store }: Props) {
  const [visibleOrderModal, setVisibleOrderModal] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const [orderUsername, setOrderUsername] = useState('')

  const handleMenuClick = (menu: Menu) => {
    setVisibleOrderModal(true)
    setSelectedMenu(menu)
  }
  const handleOrder = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('https://pentaport2020foods.roto.codes/orders', {
        method: 'POST',
        body: JSON.stringify({
          username: orderUsername,
          menu: selectedMenu.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        setVisibleOrderModal(false)
        setSelectedMenu(null)

        alert('주문완료!')
      } else {
        alert('주문 실패! 로토를 갈궈보세요.')
      }
    } catch (e) {
      alert(e.message)
    }
  }
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
      {visibleOrderModal && selectedMenu && (
        <Modal
          isOpen={visibleOrderModal}
          style={{
            content: {
              maxWidth: 500,
              width: '100%',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <h2>주문 확인</h2>
          <div>
            <strong>주문하시겠습니까? 메뉴명: {selectedMenu.name}</strong>
          </div>
          <form onSubmit={handleOrder}>
            <div>
              <input
                style={{
                  width: '100%',
                  fontSize: 40,
                }}
                placeholder="주문자 이름을 적어주세요"
                onChange={e => setOrderUsername(e.target.value)}
              />
            </div>
            <div>
              <button style={{ width: '100%' }} type="submit">
                주문하기
              </button>
            </div>
          </form>
          <button
            disabled={orderUsername.length === 0}
            onClick={() => {
              setVisibleOrderModal(false)
              setSelectedMenu(null)
            }}
          >
            취소
          </button>
        </Modal>
      )}
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
