(function () {
  var $container = $('.js-container')
    , $free = $('.js-free')
    , $busy = $('.js-busy')
    , $textFreeMins = $('.js-free-mins')

  function setFree(startDate) {
    $container.removeClass('busy').addClass('free')
    $free.show()
    $busy.hide()

    if (startDate) {
      $textFreeMins.text('For the next '+ moment(startDate).fromNow(true))
    } else {
      $textFreeMins.text('For a while')
    }
  }

  function setBusy(endDate) {
    $container.removeClass('free').addClass('busy')
    $free.hide()
    $busy.show()

    $textFreeMins.text('Available in roughly '+ moment(endDate).fromNow())
  }

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState !== 4 || request.status !== 200) return

    var res = JSON.parse(request.response)

    if(res.busy.length === 0) {
      setFree()
    } else {

      var startDate = new Date(res.busy[0].start)
        , now = new Date()

      if (startDate > now) return setFree(startDate)

      var endDate = new Date(res.busy[0].end)

      setBusy(endDate)

    }
  }

  request.open('GET', '/calendar-status', true)
  request.send()

  setInterval(function () {
    request.open('GET', '/calendar-status', true)
    request.send()
  }, 30000) // 30 seconds

})()
