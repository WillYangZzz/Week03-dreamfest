import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location } from '../../models/Location.ts'
import type { EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

export async function getAllLocations() {
  const value = await db('locations').select('*')
  return value
}

getAllLocations()

export async function getEventByDay(day: string) {
  return (await db('events')
    .join('locations', 'events.location_id', 'locations.id')
    .select(
      'events.id as id',
      'events.day as day',
      'events.time as time',
      'events.name as eventName',
      'locations.name as locationName',
      'events.description as description'
    )
    .where('events.day', day)) as EventData[]
}

export async function getLocationById(id: string) {
  return await db('locations')
    .select(
      'locations.id as id',
      'locations.name as name',
      'locations.description as description'
    )
    .where('locations.id', id)
    .first()
}

export async function updateLocation(updatedLocation: Location) {
  return await db('locations')
    .update({
      id: updatedLocation.id,
      name: updatedLocation.name,
      description: updatedLocation.description,
    })
    .where('locations.id', updatedLocation.id)
}
