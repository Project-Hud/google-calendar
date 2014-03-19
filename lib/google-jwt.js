var googleapis = require('googleapis')
  , moment = require('moment')
  , credentials = new googleapis.auth.JWT
    ( process.env.EMAIL_ADDRESS
    , process.env.PRIVATE_KEY
    , ''
    , JSON.parse(process.env.SCOPES))
  , calendarId = process.env.CALENDAR_ID

module.exports = function (callback) {
  function connect() {
    googleapis.discover('calendar', 'v3')
      .withAuthClient(credentials)
      .execute(function (err, client) {
        if (err) return callback(err)

        var request = client.calendar.freebusy.query(
          { items:
            [{ id: calendarId }]
          , timeMin: new Date().toISOString()
          , timeMax: moment().add(4, 'hours').toDate().toISOString() })

        request.execute(function (error, res) {
          callback(error, res.calendars[calendarId])
        })

      })
  }

  credentials.authorize(function (error) {
    if (error) return callback(error)

    connect()
  })
}
