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
  return await db('locations').select('id', 'name', 'description')

   
}
getAllLocations()
// TODO: write some more database functions


//creating a function to get the events by the day
export async function getEventsByDay(day : string){
  const eventDay = await db('events')
  .join('locations', 'location_id', 'locations.id')
  .where("day", day)
  .select()

  return eventDay 
  
}
getEventsByDay

//creating a function to get the location by ID
export async function getLocationById(id: number){
   return await db('locations').where("locations.id", id).first()

}
getLocationById

//Creating a function to update the location. 
export async function updateLocation(updatedLocation : Location){
  await db('locations').update({
    name : updatedLocation.name,
    description : updatedLocation.description,
    id : updatedLocation.id
  }).where("locations.id", updatedLocation.id)

}