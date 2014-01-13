(function () {
  var $iconSuccess = document.getElementsByClassName('js-success')
    , $iconDanger = document.getElementsByClassName('js-danger')
    , $textSuccess = document.getElementsByClassName('js-free')
    , $textDanger = document.getElementsByClassName('js-busy')
    , $textFreeMins = document.getElementsByClassName('js-free-mins')

  $iconSuccess[0].style.display = 'none'
  $iconDanger[0].style.display = 'none'

  document.getElementsByClassName('js-busy')[0].style.display = 'none'
  document.getElementsByClassName('js-free')[0].style.display = 'none'

  function setFree(startDate) {
    $iconSuccess[0].style.display = 'block'
    $textSuccess[0].style.display = 'block'

    $iconDanger[0].style.display = 'none'
    $textDanger[0].style.display = 'none'

    $textFreeMins[0].innerHTML = moment(startDate).fromNow(true)
  }

  function setBusy(endDate) {
    $iconDanger[0].style.display = 'block'
    $textDanger[0].style.display = 'block'

    $iconSuccess[0].style.display = 'none'
    $textSuccess[0].style.display = 'none'

    $textFreeMins[1].innerHTML = moment(endDate).fromNow()
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
