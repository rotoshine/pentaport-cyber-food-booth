export interface Store {
  id: string
  title: string
  storeImage: Image
  qrcode?: Image
  menus: Menu[]
}

export interface Menu {
  name: string
  price: number
  id: string
}

export interface Image {
  url: string
}
