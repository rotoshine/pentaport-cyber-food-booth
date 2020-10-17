import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Order } from '../types/model'
import { findAllOrders } from '../utils/api'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const loadOrders = async () => {
    const orders = await findAllOrders()
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
      <table>
        <thead>
          <tr>
            <th>메뉴명</th>
            <th>주문자</th>
            <th>주문시간</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.menu.name}</td>
              <td>{order.username}</td>
              <td>{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}
