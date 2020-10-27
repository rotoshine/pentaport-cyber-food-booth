/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import Layout from '../../components/Layout'
import { getFullPath } from '../../utils/image'
import { Menu, Store } from '../../types/model'
import { findAllStores, findStoreById } from '../../utils/api'

interface Props {
  store?: Store
}

export default function StorePage({ store }: Props) {
  const [visibleOrderModal, setVisibleOrderModal] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const [orderUsername, setOrderUsername] = useState('')

  if (!store) {
    return <div>Loading..</div>
  }

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
      <Head>
        <title>Cyber Food Booth - {store.title}</title>
        <meta name="description" content="먹어보고 말해! 츄라이츄라이!" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nytimesbits" />
        <meta name="twitter:creator" content="@nickbilton" />
        <meta property="og:url" content={`https://pentaport-cyber-food-booth.vercel.app/stores/${store.id}`} />
        <meta property="og:title" content={`Cyber Food Booth - ${store.title}`} />
        <meta property="og:description" content="먹어보고 말해! 츄라이츄라이!" />
        <meta property="og:image" content={getFullPath(store.storeImage.url)} />
      </Head>
      {visibleOrderModal && selectedMenu && (
        <Modal
          isOpen={visibleOrderModal}
          css={css`
            background-color: #fff;
            padding: 1rem;
            border: 1px solid #ccc;
            max-width: 500px;
            width: 80%;
            height: auto;
            top: 50%;
            left: 50%;

            transform: translate(-50%, -50%);
            position: relative;
          `}
        >
          <h2>주문 확인</h2>
          <div>
            <div>
              <p>주문하시겠습니까?</p>
              <p>메뉴명: {selectedMenu.name}</p>
              <p>가격: {selectedMenu.price}원</p>
            </div>
          </div>
          <form onSubmit={handleOrder}>
            <div>
              <input
                css={css`
                  width: 100%;
                  font-size: 2rem;

                  @media (max-width: 440px) {
                    font-size: 1rem;
                  }
                `}
                placeholder="주문자 이름을 적어주세요"
                onChange={e => setOrderUsername(e.target.value)}
              />
            </div>
            <div>
              <button
                css={css`
                  width: 100%;
                `}
                type="submit"
                disabled={orderUsername.length === 0}
              >
                주문하기
              </button>
            </div>
          </form>
          <button
            css={css`
              position: absolute;
              top: 20px;
              right: 20px;
            `}
            onClick={() => {
              setVisibleOrderModal(false)
              setSelectedMenu(null)
            }}
          >
            X
          </button>
        </Modal>
      )}
      <h1>{store.title}</h1>
      <div
        css={css`
          display: flex;
          width: 100%;
          max-width: 1000px;
          flex-direction: row;

          @media (max-width: 440px) {
            flex-direction: column;
          }
        `}
      >
        <div
          css={css`
            width: ${store.storeImage.width}px;
            height: ${store.storeImage.height}px;
          `}
        >
          <img
            css={css`
              width: 100%;
            `}
            src={`${getFullPath(store.storeImage.url)}`}
            alt={`${store.title}의 가게 포스터`}
          />
        </div>
        {store.qrcode && (
          <div
            css={css`
              width: 30rem;

              @media (max-width: 768px) {
                flex: 1;
              }

              @media (max-width: 440px) {
                width: 100%;
              }
            `}
          >
            <img
              css={css`
                width: 100%;
              `}
              src={`${getFullPath(store.qrcode.url)}`}
            />
          </div>
        )}
      </div>
      <ul
        css={css`
          padding: 0;
        `}
      >
        {store.menus?.map(menu => (
          <li
            key={menu.id}
            css={css`
              border: 1px solid #ccc;
              padding: 1rem;
              list-style: none;
              font-family: 'NEXON Lv2 Gothic Bold';
              font-size: 4rem;
              margin-top: 1px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              @media (max-width: 440px) {
                font-size: 1rem;
                width: 100%;
              }
              margin-top: 0.5rem;
              cursor: pointer;

              &:hover {
                background-color: #eee;
              }
            `}
            onClick={() => handleMenuClick(menu)}
          >
            <div>{menu.name}</div>
            <div>{menu.price && menu.price > 0 ? `${menu.price}원` : '무료!!'}</div>
          </li>
        ))}
      </ul>
      <Link href="/">가게목록으로</Link>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = await findAllStores()

  const paths = stores.map(store => ({
    params: { id: store.id },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params
  try {
    const store = await findStoreById(id as string)
    return {
      props: {
        store,
      },
      revalidate: 10,
    }
  } catch (e) {
    console.log(e)
  }
}
