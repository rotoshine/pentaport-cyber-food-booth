import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Order } from '../types/model'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const loadOrders = async () => {
    const res = await fetch('https://pentaport2020foods.roto.codes/orders?_sort=created_at:DESC')
    const orders = await res.json()
    setOrders(orders)
  }
  useEffect(() => {
    loadOrders()

    setInterval(async () => {
      await loadOrders()
    }, 1000 * 30)
  }, [])

  return (
    <Layout>
      <h1>주문내역</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <div>
              메뉴명: {order.menu.name} / 주문자: {order.username}
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
