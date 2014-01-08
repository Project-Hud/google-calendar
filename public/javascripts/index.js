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

  function setFree() {
    $iconSuccess[0].style.display = 'block'
    $textSuccess[0].style.display = 'block'

    $iconDanger[0].style.display = 'none'
    $textDanger[0].style.display = 'none'
  }

  function setBusy(minutes) {
    $iconDanger[0].style.display = 'block'
    $textDanger[0].style.display = 'block'

    $iconSuccess[0].style.display = 'none'
    $textSuccess[0].style.display = 'none'

    $textFreeMins[0].innerHTML = minutes
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

      if (startDate > now) return setFree()

      var endDate = new Date(res.busy[0].end)
        , difference = endDate - now
        , seconds = Math.floor((difference) / 1000)
        , minutes = Math.floor(seconds / 60)

      setBusy(minutes)

    }
  }

  request.open('GET', '/calendar-status', true)
  request.send()

  setInterval(function () {
    request.open('GET', '/calendar-status', true)
    request.send()
  }, 30000) // 30 seconds

})()
