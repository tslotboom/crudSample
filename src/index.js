function buttonPush() {
    var http = new XMLHttpRequest()
    var url = '/sendButtonPush'
    http.open('PUT', url, true)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
            if (http.status == 200){
                console.log("Button pushed")
                getPushes()
            }
            else {
                console.log("Button not pushed")
            }
        }
    }
    http.send(null)
}

function getPushes() {
    var http = new XMLHttpRequest()
    var url = '/getButtonPushes'
    http.open('GET', url, true)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE){
            if (http.status == 200) {
                var response = JSON.parse(http.responseText)
                
                document.getElementById("buttonPushes").innerHTML = response[0].pushes
            }
            else {
                console.log("Error")
            }
        }
    }
    http.send(null)
}

