import express from 'express'

import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET /schedule/friday
router.get('/:day', async (req, res) => {
  const day = validateDay(req.params.day)
  const dayEvents = await db.getDayEvents(day)
  const viewData = { day: day, events: dayEvents }
  res.render('showDay', viewData)
})

export default router
