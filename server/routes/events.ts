import express from 'express'

import { eventDays, capitalise, validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()
export default router

// GET /events/add/friday
router.get('/add/:day', async (req, res) => {
  const day = validateDay(req.params.day)
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day ? 'selected' : '',
  }))

  // TODO: Replace this with all of the locations in the database
  const locations = await db.getAllLocations()

  const viewData = { locations, days, day }
  console.log(viewData)
  res.render('addEvent', viewData)
})

// POST /events/add
router.post('/add', async (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { name, description, time, locationId } = req.body
  const day = validateDay(req.body.day)
  const event = req.body

  // TODO: Add the event to the database and then redirect
  await db.editEvent(event)

  res.redirect(`/schedule/${day}`)
})

// POST /events/delete
router.post('/delete', async (req, res) => {
  const id = Number(req.body.id)
  const day = validateDay(req.body.day)

  // TODO: Delete the event from the database using its id

  await db.deleteEvent(id)

  res.redirect(`/schedule/${day}`)
})

// GET /events/3/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  // TODO: Replace event below with the event from the database using its id
  const event = await db.getEventById(id)
  const locationID = event.locationId
  // console.log(locationID)

  // TODO: Replace locations below with all of the locations from the database

  const locationsArray = await db.locationWithoutDescription()
  const locations = locationsArray.map((location) => {
    if (locationID == location.id) {
      return { ...location, selected: 'selected' }
    } else return { ...location, selected: '' }
  })

  // This is done for you with an array of days imported from the helpers file
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === event.day ? 'selected' : '',
  }))

  const viewData = { event, locations, days }
  res.render('editEvent', viewData)
})

// POST /events/edit
router.post('/edit', async (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  const { name, description, time } = req.body
  const id = Number(req.body.id)
  const day = validateDay(req.body.day)
  const locationId = Number(req.body.locationId)

  const editEvent = {
    id,
    locationId,
    day,
    time,
    name,
    description,
  }

  await db.editForm(editEvent)

  // TODO: Update the event in the database using the identifiers created above

  res.redirect(`/schedule/${day}`)
})
