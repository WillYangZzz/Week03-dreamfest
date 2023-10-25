import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'
import { logDOM } from '@testing-library/dom'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

// interface Location {
//   id: number
//   name: string
//   description: string
// }

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
  return (await db('locations').select(
    'id',
    'name',
    'description'
  )) as Location[]
}

// TODO: write some more database functions
// TODO: use knex to get the real location data from the database

export async function getDayEvents(day: string) {
  return (await db('events')
    .where('day', day)
    .select(
      'id',
      'location_id',
      'day',
      'time',
      'name',
      'description'
    )) as EventData[]
}

export async function getLocationById(id: number) {
  return (await db('locations')
    .where('id', id)
    .select('id', 'name', 'description')
    .first()) as Location[]
}

export async function updateLocation(updatedLocation: Location) {
  await db('locations').where('id', updatedLocation.id).update({
    name: updatedLocation.name,
    description: updatedLocation.description,
  })
}
