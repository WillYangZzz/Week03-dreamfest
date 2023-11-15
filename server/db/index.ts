import knexFile from './knexfile.js'
import knex from 'knex'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const connection = knex(config)

export async function getAllLocations() {
  return await connection('locations').select()
}

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

export async function getLocationById(id: number) {
  return await connection('locations')
    .where('locations.id', id)
    .select()
    .first()
}

export async function updateLocation(id: number, updatedLocation: object) {
  return await connection('locations')
    .where('locations.id', id)
    .update(updatedLocation)
}

export async function addNewEvent(newEvent: object) {
  return await connection('events').insert(newEvent)
}

interface EventData {
  location_id: number
  day: string
  time: string
  name: string
  description: string
}

export async function updateEvent(id: number, updatedEvent: EventData) {
  return await connection('events').where('id', id).update(updatedEvent)
}

export async function deleteEvent(id: number) {
  return await connection('events').where('events.id', id).del()
}

export async function getEventById(id: number) {
  return await connection('events')
    .where('events.id', id)
    .select(
      'events.id as id',
      'events.location_id as locationId',
      'events.day as day',
      'events.time as time',
      'events.name as name',
      'events.description as description'
    )
    .first()
}
