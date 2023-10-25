import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res) => {
  // TODO: Replace this with all of the locations in the database <-- Done
  const locations = await db.getAllLocations()
  const viewData = { locations }
  res.render('showLocations', viewData)
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  // TODO: Get the location based on its id and replace this viewData

  const locationData = await db.getLocationDataById(id)

  const viewData = {
    id: locationData.id,
    name: locationData.name,
    description: locationData.description,
    // 'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
  }

  res.render('editLocation', viewData)
})

// POST /locations/edit
router.post('/edit', async (req, res) => {
  const reqObject = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
  }
  const updatedData = await db.updateLocationDetails(reqObject)
  // TODO: Update the location in the database based on its id
  res.redirect('/locations')
})

export default router
