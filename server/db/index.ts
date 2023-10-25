import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'
import { describe } from 'vitest'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const connection = knex(config)

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
  return (await connection('locations').select()) as LocationData[]
}

// TODO: write some more database functions
//show events for a day function
export async function getEventsDay(day: string) {
  return (await connection('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where('day', day)
    .select(
      'events.day',
      'events.time',
      'events.name as eventName',
      'locations.name as locationName',
      'events.description'
    )) as EventData[]
}

export async function getLocationById(id: number) {
  return (await connection('locations')
    .where('id', id)
    .select('id', 'name', 'description')
    .first()) as Location[]
}
export async function updateLocation(updatedLocation: Location) {
  return await connection('locations')
    .where('id', updatedLocation.id)
    .update(updatedLocation)
}

export async function addEvenets(addedEvent: Location) {
  return await connection('locations')
    .where('id', addedEvent.id)
    .upsert(addedEvent)
}
