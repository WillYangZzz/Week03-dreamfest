import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res) => {
  // TODO: Replace this with all of the locations in the database
  // const locations = [
  //   {
  //     id: 1,
  //     name: 'TangleStage',
  //     description:
  //       'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Yella Yurt',
  //     description:
  //       "It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here!",
  //   },
  // ]

  const locations = await db.getAllLocations()

  const viewData = { locations }
  res.render('showLocations', viewData)
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  // TODO: Get the location based on its id and replace this viewData
  // const viewData = {
  //   id: id,
  //   name: 'TangleStage',
  //   description:
  //     'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
  // }

  const viewData = await db.getLocationById(id)

  res.render('editLocation', viewData)
})

// POST /locations/edit
router.post('/edit', async (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { id, name, description } = req.body

  // TODO: Update the location in the database based on its id

  const updatedLocation = req.body

  await db.updateLocation(req.body.id, updatedLocation)

  res.redirect('/locations')
})

export default router
