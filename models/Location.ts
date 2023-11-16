export interface LocationData {
  name: string
}

export interface LocationDataWithDesc {
  name: string
  description: string
}

export interface Location extends LocationData {
  id: number
}

export interface LocationWithDesc extends LocationDataWithDesc {
  id: number
}
