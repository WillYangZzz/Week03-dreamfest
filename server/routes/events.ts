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
  const locations = await db.getAllLocations() // this line replaces the above location array of objects
  const viewData = { locations, days, day }
  res.render('addEvent', viewData)
})

// POST /events/add
router.post('/add', async (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  const event = req.body
  const day = validateDay(req.body.day)
  await db.addNewEvent(event)
  res.redirect(`/schedule/${day}`)
})

// POST /events/delete
router.post('/delete', async (req, res) => {
  const id = Number(req.body.id)
  const day = validateDay(req.body.day)
  await db.deleteEvent(id)
  // TODO: Delete the event from the database using its id
  res.redirect(`/schedule/${day}`)
})

// GET /events/3/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  // TODO: Replace event below with the event from the database using its id
  const event = {
    id: id,
    locationId: 1,
    day: 'friday',
    time: '2pm - 3pm',
    name: 'Slushie Apocalypse I',
    description:
      'This is totally a description of this really awesome event that will be taking place during this festival at the Yella Yurt. Be sure to not miss the free slushies cause they are rad!',
  }

  // TODO: Replace locations below with all of the locations from the database
  const locations = [
    { id: 1, name: 'TangleStage', selected: '' },
    { id: 2, name: 'Yella Yurt', selected: 'selected' },
    { id: 3, name: 'Puffy Paddock', selected: '' },
    { id: 4, name: 'Kombucha Karavan', selected: '' },
  ]

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
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // TODO: Update the event in the database using the identifiers created above

  const day = 'friday' // TODO: Remove this line

  res.redirect(`/schedule/${day}`)
})
