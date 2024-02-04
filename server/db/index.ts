import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationName } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

// Locations
export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
  return (await db('locations').select(
    'id',
    'name',
    'description'
  )) as Location[]
}

// TODO: write some more database functions

//Location
export async function getLocationById(id: number) {
  return (await db('locations as l').where('l.id', id).first()) as Location[]
}

//Event
export async function getEventsByDay(day: string) {
  return (await db('events as e')
    .where('e.day', day)
    .join('locations as l', 'e.location_id', 'l.id')
    .select(
      'e.id',
      'e.name as eventName',
      'e.location_id',
      'e.time',
      'e.description',
      'e.day',
      'l.name as locationName'
    )) as EventWithLocation[]
}
