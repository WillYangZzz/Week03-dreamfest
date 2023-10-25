import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

interface locations {
  id: number
  name: string
  description: string
}

export async function getAllLocations() {
  const locations = await db('locations').select('*')
  return locations
  // TODO: use knex to get the real location data from the database
}
// TODO: write some more database functions

export async function getAllEventsByDay(day: string) {
  const events = await db('events')
    .join('locations', 'location_id', 'locations.id')
    .where('day', day)
    .select()
  return events
}

export async function getLocationDataById(id: number) {
  const location = await db('locations').where('id', id).select().first()
  return location
}

interface location {
  id: number
  name: string
  description: string
}

export async function updateLocationDetails(reqObject: location) {
  const { id, name, description } = reqObject
  return db('locations')
    .where('id', id)
    .update({ id: id, name: name, description: description })
}

interface event {
  name: string
  description: string
  time: string
  locationId: number
  day: string
}
export async function addEvent(reqObject: event) {
  const { name, description, time, locationId, day } = reqObject
  return await db('events')
    .join('locations', 'location_id', 'locations.id')
    .insert({
      name: name,
      description: description,
      time: time,
      locationId: locationId,
      day: day,
    })
}
