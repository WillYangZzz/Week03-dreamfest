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

export async function getEventDetails() {
  return await db('events')
    .join('locations', 'locations.id', 'events.location_id')
    .select(
      'events.id as id',
      'day',
      'time',
      'events.name as eventName',
      'events.description as description',
      'locations.name as locationName'
    )
}

// events: [
//     {
//       id: 1,
//       day: 'friday',
//       time: '2pm - 3pm',
//       eventName: 'Slushie Apocalypse I',
//       description:
//         'This is totally a description of this really awesome event that will be taking place during this festival at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
//       locationName: 'TangleStage',
//     },

// TODO: write some more database functions
