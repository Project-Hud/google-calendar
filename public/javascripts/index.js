(function () {
  var services = 0
    , okServices = 0
    , $iconSuccess = document.getElementsByClassName('js-success')
    , $iconDanger = document.getElementsByClassName('js-danger')
    , $iconLoading = document.getElementsByClassName('js-loading')
    , $textSuccess = document.getElementsByClassName('js-free')
    , $textDanger = document.getElementsByClassName('js-busy')
    , $textFreeMins = document.getElementsByClassName('js-free-mins')

  $iconSuccess[0].style.display = 'none'
  $iconDanger[0].style.display = 'none'

  document.getElementsByClassName('js-busy')[0].style.display = 'none'
    document.getElementsByClassName('js-free')[0].style.display = 'none'

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    var res = JSON.parse(request.response)

    if(res.busy.length === 0) {
      $iconSuccess[0].style.display = 'block'
      $textSuccess[0].style.display = 'block'

      $iconDanger[0].style.display = 'none'
      $textDanger[0].style.display = 'none'
    } else {
      $iconDanger[0].style.display = 'block'
      $textDanger[0].style.display = 'block'

      $iconSuccess[0].style.display = 'none'
      $textSuccess[0].style.display = 'none'

      var endDate = new Date(res.busy[0].end)
        , now = new Date()
        , difference = endDate - now
        , seconds = Math.floor((difference) / 1000)
        , minutes = Math.floor(seconds / 60)

      $textFreeMins[0].innerHTML = minutes

    }
  }

  request.open('GET', '/calendar-status', true)
  request.send()

  setInterval(function () {
    request.open('GET', '/calendar-status', true)
    request.send()
  }, 300000)

})()
