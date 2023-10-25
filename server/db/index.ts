import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

// EVENTS
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

export async function getEventById(eventId: number) {
  return await db('events')
    .select(
      'id',
      'location_id as locationId',
      'day',
      'time',
      'name',
      'description'
    )
    .where('id', eventId)
    .first()
}

export async function updateEvent(updatedEvent: Event) {
  const { id, locationId, day, time, name, description } = updatedEvent

  return db('events')
    .where('id', updatedEvent.id)
    .update({ id, location_id: locationId, day, time, name, description })
}

export async function addNewEvent(newEvent: EventData) {
  const { locationId, day, time, name, description } = newEvent

  const snakeNewEvent = {
    location_id: locationId,
    day,
    time,
    name,
    description,
  }
  return db('events').insert(snakeNewEvent)
}

export async function deleteEvent(eventId: number) {
  return db('events').where('id', eventId).delete()
}

// LOCATIONS
export async function getAllLocations() {
  return (await db('locations').select(
    'id',
    'name',
    'description'
  )) as Location[]
}

export async function getLocationById(id: number) {
  return (await db('locations').where('id', id).first()) as Location
}

export async function updateLocation(location: Location) {
  return await db('locations').where('id', location.id).update(location)
}
