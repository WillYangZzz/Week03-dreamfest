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

  // eslint-disable-next-line promise/catch-or-return
  db.getAllLocations().then((locations) => {
    const viewData = { locations, days, day }
    res.render('addEvent', viewData)
  })
})

// POST /events/add
router.post('/add', async (req, res) => {
  const day = validateDay(req.body.day)

  const newEvent = {
    location_id: req.body.locationId,
    day: req.body.day,
    time: req.body.time,
    name: req.body.name,
    description: req.body.description,
  }
  await db.addNewEvent(newEvent)

  res.redirect(`/schedule/${day}`)
})

// POST /events/delete
router.post('/delete', async (req, res) => {
  const id = Number(req.body.id)
  const day = validateDay(req.body.day)

  await db.deleteEvent(id)

  res.redirect(`/schedule/${day}`)
})

// GET /events/3/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  const event = await db.getEventById(id)

  const allLocations = await db.getAllLocations()
  const locations = allLocations.map(function (item) {
    return {
      ...item,
      selected: event.locationId === item.id ? 'selected' : '',
    }
  })

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
  const day = validateDay(req.body.day)
  const eventId = req.body.id

  const updatedEvent = {
    location_id: req.body.locationId,
    day: req.body.day,
    time: req.body.time,
    name: req.body.name,
    description: req.body.description,
  }
  await db.updateEvent(eventId, updatedEvent)

  res.redirect(`/schedule/${day}`)
})
