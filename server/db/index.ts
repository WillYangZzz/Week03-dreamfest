import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'
import { logDOM } from '@testing-library/dom'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const db = knex(config)

interface LocationOptional {
  id: number
  name: string
  description?: string
}

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
  return (await db('locations').select('id', 'name')) as LocationOptional[]
}
// full location info with description
export async function getAllLocationsWithDesc() {
  // TODO: use knex to get the real location data from the database
  return (await db('locations').select(
    'id',
    'name',
    'description'
  )) as LocationOptional[]
}

// TODO: write some more database functions
// TODO: use knex to get the real location data from the database

export async function getDayEvents(day: string) {
  return (await db('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where('events.day', day)
    .select(
      'events.id',
      'events.day',
      'events.time',
      'events.name as eventName',
      'events.description',
      'locations.name as locationName'
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

interface NewEvent {
  name: string
  description: string
  time: string
  locationId: number
  day: string
}
export async function addNewEvent(event: NewEvent) {
  const { name, description, time, locationId, day } = event

  await db('events').insert({
    name,
    description,
    time,
    day,
    location_id: locationId,
  })
}

export async function deleteEvent(id: number) {
  await db('events').where('id', id).del()
}
