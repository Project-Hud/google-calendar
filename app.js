var Widget = new require('hud-widget')
  , widget = new Widget()
  , googleJwt = require('./lib/google-jwt')

widget.get('/', function (req, res) {
  res.render('index', { title: 'Calendar' })
})

widget.get('/calendar-status', function (req, res) {
  googleJwt(function (error, calendar) {
    res.json(calendar)
  })
})
