var randomstring = require("randomstring");

export function generateIdempotency() {
  return `${Date.now()}${randomstring.generate({
    length: 24,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  })}`;
}

export function generateIdempotencyShort() {
    return `${Date.now()}${randomstring.generate({
      length: 6,
      charset: 'alphanumeric',
      capitalization: 'lowercase'
    })}`;
  }

var sessionid = generateIdempotency();
var initDate = Date.now();

interface optionsinterface {
    mapname: string,
    eventtype: string,
    globallng: Number,
    globallat: Number,
    globalzoom: Number,
    mouselat?: Number,
    mouselng?: Number
}

export function uploadMapboxTrack(options:optionsinterface) {
    
    var calctimesincestart = Date.now() - initDate;

//requests from https://helianthus.mejiaforcontroller.com/
fetch('https://helios.mejiaforcontroller.com/mapbox', {
    mode: 'cors',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    body: JSON.stringify({
        sessionid: sessionid,
        eventid: generateIdempotencyShort(),
        mapname: options.mapname,
        eventtype: options.eventtype,
        timesincestart: calctimesincestart,
        globallat: options.globallat,
        globallng: options.globallng,
        globalzoom: options.globalzoom,
        mouselat: options.mouselat,
        mouselng: options.mouselng
    })
})
.then((info) => {
    console.log(info)
})
.catch((error) => {
    console.error(error)
})
}