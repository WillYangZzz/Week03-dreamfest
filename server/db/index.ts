import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
  return (await db('locations').select()) as LocationData[]
  //console.log(dbLocations)
}

// TODO: write some more database functions

export async function getEventsByDay(day: string) {
  return await db('locations')
    .join('events', 'locations.id', 'events.location_id')
    .where('day', day)
    .select(
      'events.id',
      'events.name as eventName',
      'events.day',
      'events.description',
      'locations.name as locationName',
      'events.time'
    )
}

export async function getLocatioById(id: number) {
  return await db('locations')
    .where('id', id)
    .select('locations.id', 'locations.name', 'locations.description')
    .first()
}
