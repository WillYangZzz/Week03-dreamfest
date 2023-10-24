import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

interface locations {
  id: number
  name: string
  description: string
}

export async function getAllLocations() {
  const value = await db('locations').select('*')
  return value
  // TODO: use knex to get the real location data from the database
}
// TODO: write some more database functions

getAllLocations()
