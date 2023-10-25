import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'
type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

export async function getAllLocations() {
  // Done: use knex to get the real location data from the database
  return (await db('locations').select()) as LocationData[]
}

// TODO: write some more database functions
export async function getEventsByDay(day: string) {
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

export async function getLocationById(id: number) {
  return (await db('locations')
    .select(
      'locations.id as id',
      'locations.name as name',
      'locations.description as description'
    )
    .where('locations.id', id)
    .first()) as Location
}

export async function updateLocation(updatedLocation: Location) {
  await db('locations')
    .update({
      id: updatedLocation.id,
      name: updatedLocation.name,
      description: updatedLocation.description,
    })
    .where('locations.id', updatedLocation.id)
}
