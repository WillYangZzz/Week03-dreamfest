import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

// const testLocation = {
//   id: 1,
//   name: 'TangleStage',
//   description: 'Not the biggest stage, but perhaps the most hip.'
// }

interface Location {
  id: number
  name: string
  description: string
}

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
  return (await db('locations').select(
    'id',
    'name',
    'description'
  )) as Location[]
}

// TODO: write some more database functions
