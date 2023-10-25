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
  return await db('locations').select()
}

export async function getEventDetails(day: string) {
  return await db('events')
    .join('locations', 'locations.id', 'events.location_id')
    .where('events.day', day)
    .select(
      'events.id as id',
      'day',
      'time',
      'events.name as eventName',
      'events.description as description',
      'locations.name as locationName'
    )
}

export async function getLocationById(id: number) {
  return await db('locations').where('locations.id', id).first()
}

export async function editLocation(location: Location) {
  return await db('locations')
    .where('locations.id', location.id)
    .update(location)
}

export async function editEvent(event: Event) {
  const eventEdit = {
    location_id: event.locationId,
    day: event.day,
    time: event.time,
    name: event.name,
    description: event.description,
  }
  return await db('events').insert(eventEdit)
}

export async function deleteEvent(id: number) {
  return await db('events').where('events.id', id).del()
}

export async function getEventById(id: number) {
  return await db('events')
    .where('events.id', id)
    .select(
      'id',
      'events.location_id as locationId',
      'day',
      'time',
      'name',
      'description'
    )
    .first()
}

export async function locationWithoutDescription() {
  // TODO: use knex to get the real location data from the database
  return await db('locations').select(
    'locations.id as id',
    'locations.name as name'
  )
}
