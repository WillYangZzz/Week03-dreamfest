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
  return (await connection('locations').select()) as LocationData[]
}

// TODO: write some more database functions
//show events for a day function
export async function getEventsDay(day: string) {
  return (await connection('events').where('day', day).select()) as EventData[]
}
