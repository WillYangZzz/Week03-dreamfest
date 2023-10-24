import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const connection = knex(config)

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
  return await connection('locations').select()
}

// TODO: write some more database functions

export async function getEventByDay(day: string) {
  return await connection('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where('events.day', day)
    .select(
      'events.id as id',
      'events.day as day',
      'events.time as time',
      'events.name as eventName',
      'events.description as description',
      'locations.name as locationName'
    )
}
