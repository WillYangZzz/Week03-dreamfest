import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res) => {
  const locationArray = await db.getAllLocationsWithDesc()
  const viewLocation = { locations: locationArray }
  res.render('showLocations', viewLocation)
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  // TODO: Get the location based on its id and replace this viewData

  const viewData = await db.getLocationById(id)
  res.render('editLocation', viewData)
})

// POST /locations/edit
router.post('/edit', async (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  const updatedLocation = req.body
  await db.updateLocation(updatedLocation)

  // TODO: Update the location in the database based on its id
  res.redirect('/locations')
})

export default router
