import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res) => {
  const locations = await db.getAllLocations()
  const viewData = { locations }
  res.render('showLocations', viewData)
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  const location = await db.getLocationById(id)
  const viewData = location

  res.render('editLocation', viewData)
})

// POST /locations/edit
router.post('/edit', async (req, res) => {
  const { id, name, description } = req.body
  const updatedLocation = { id, name, description }
  await db.updateLocation(updatedLocation)
  res.redirect('/locations')
})

export default router
