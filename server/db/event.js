const connection = require('./connection')

module.exports = {
  getEventById,
  addEvent,
  updateEvent
}

function getEventById (id, db = connection) {
  return db('events')
    .leftJoin('eventVolunteers', 'eventVolunteers.event_id', 'events.id')
    .leftJoin('users', 'eventVolunteers.user_id', 'users.id')
    .leftJoin('gardens', 'events.garden_id', 'gardens.id')
    .leftJoin('extraVolunteers', 'events.id', 'extraVolunteers.event_id')
    .select('name', 'address', 'attended', 'events.id as id', 'events.garden_id as gardenId', 'title', 'date', 'events.description', 'volunteers_needed as volunteersNeeded', 'user_id as userId', 'username', 'users.first_name', 'users.last_name', 'extraVolunteers.first_name as extraVolFirstName', 'extraVolunteers.last_name as extraVolLastName')
    .where('events.id', id)
    .then(result => {
      console.log(result)
      const event = result[0]
      return {
        id: event.id,
        gardenId: event.gardenId,
        gardenName: event.name,
        gardenAddress: event.address,
        volunteersNeeded: event.volunteersNeeded,
        title: event.title,
        date: event.date,
        description: event.description,
        volunteers: !result.some(evts => evts.userId) ? [] : result.map((volunteer) => {
          return {
            userId: volunteer.userId,
            username: volunteer.username,
            firstName: volunteer.first_name,
            lastName: volunteer.last_name,
            attended: result.find(evt => evt.userId === volunteer.userId).attended ? result.find(evt => evt.userId === volunteer.userId).attended : false
          }
        }),
        extraVolunteers: !result.some(evt => evt.extraVolFirstName) ? [] : result.map((extraVolunteer) => {
          return {
            eventId: extraVolunteer.eventId,
            firstName: extraVolunteer.extraVolFirstName,
            lastName: extraVolunteer.extraVolLastName
          }
        })
      }
    })
}

function addEvent (newEvent, db = connection) {
  const { gardenId, title, date, description, volunteersNeeded } = newEvent
  return db('events')
    .insert({
      garden_id: gardenId,
      volunteers_needed: volunteersNeeded,
      title,
      date,
      description
    })
    .then((ids) => getEventById(ids[0], db))
}

function updateEvent (updatedEvent, db = connection) {
  const { id, title, date, description, volunteersNeeded } = updatedEvent
  return db('events').where('id', id)
    .update({
      volunteers_needed: volunteersNeeded,
      title,
      date,
      description
    })
    .then(() => getEventById(id, db))
}
