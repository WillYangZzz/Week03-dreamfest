import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res) => {
  // TODO: Replace this with all of the locations in the database
  const locations = await db.getAllLocations()

  const viewData = { locations }
  res.render('showLocations', viewData)
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res) => {
  const id = req.params.id
  const editedLocation = await db.getLocationById(id)
  console.log(editedLocation)

  // TODO: Get the location based on its id and replace this viewData

  const viewData = await db.getLocationById(id)
  res.render('editLocation', viewData)
})

// POST /locations/edit
router.post('/edit', async (req, res) => {
  const newLocation = req.body
  // ASSISTANCE: So you know what's being posted ;)
  // const newLocation= { id, name, description } = req.body

  // TODO: Update the location in the database based on its id
  await db.updateLocation(newLocation)
  res.redirect('/locations')
})

export default router
