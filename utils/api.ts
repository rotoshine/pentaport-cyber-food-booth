import { Order, Store } from '../types/model'

export const END_POINT = 'https://pentaport2020foods.roto.codes'

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${END_POINT}${url}`, options)

  if (res.ok) {
    return (await res.json()) as T
  } else {
    console.log(res)
    throw new Error('API 요청 중 뭔가 문제가 생겼음')
  }
}

export async function findAllStores() {
  return await request<Store[]>('/stores')
}

export async function findStoreById(id: string) {
  return await request<Store>(`/stores/${id}`)
}

export async function findAllOrders() {
  return await request<Order[]>('/orders')
}
