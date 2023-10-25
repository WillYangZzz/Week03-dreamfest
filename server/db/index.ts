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

  return (await db('locations').select(
    'id',
    'name as locationName',
    'description'
  )) as LocationData[]
}

// TODO: write some more database functions

export async function getLocationById(id: number) {
  return await db('locations').where('id', id).select().first()
}

export async function updateLocation(updatedLocation: Location) {
  await db('locations')
    .where('locations.id', updatedLocation.id)
    .update(updatedLocation)
}

export async function getEventsByDay(day: string) {
  return await db('events')
    .join('locations', 'locations.id', 'events.location_id')
    .where('day', day)
    .select(
      'events.id',
      'day',
      'time',
      'events.name as eventName',
      'events.description',
      'locations.name as locationName'
    )
}

export async function addNewEvent(event: EventData) {
  const { name, description, locationId, day, time } = event
  const dbEvent = {
    location_id: locationId,
    day,
    time,
    name,
    description,
  }

  return await db('events').insert(dbEvent)
}

export async function deleteEvent(id: number) {
  return db('events').where('events.id', id).del()
}

export async function getEventById(inputId: number) {
  const event = await db('events').where('events.id', inputId).select().first()
  const { id, location_id, day, time, name, description } = event
  const dbEvent = {
    id,
    locationId: location_id,
    day,
    time,
    name,
    description,
  }

  return dbEvent
}
