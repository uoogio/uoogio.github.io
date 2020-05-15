var connectionString = 'HostName=assignment4.azure-devices.net;DeviceId=MyNodeDevice;SharedAccessKey=axkIDEbJ+9SXl85TsQTpBhFbqDLDXMjw/45e6+e51Yg=';

// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);
let alert = '<div class="alert alert-warning" role="alert">'+
  'Seems like if your device/browser do not support accelerometer. Try to change device/browser.'+
  '</div>';

$(document).ready(function() {
  try {
    // Create Sensor
    let sensor = new Accelerometer({frequency:1});
    sensor.onerror = event => console.log(event.error.name, event.error.message);
    $('#stop').click( () =>{sensor.stop()} );
    $('#start').click( () =>{sensor.start()} );
    
    var temperature = 20 + (Math.random() * 15);
  var message = new Message(JSON.stringify({
    temperature: temperature,
    humidity: 60 + (Math.random() * 20)
  }));
  console.log('Sending message: ' + message.getData());

  // Send the message.
  client.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
      console.log('message sent');
    }
  });
  
    sensor.onreading = () => {
        console.log("Acceleration along X-axis: " + sensor.x);
        $('#x').text(sensor.x);
        console.log("Acceleration along Y-axis: " + sensor.y);
        $('#y').text(sensor.y);
        console.log("Acceleration along Z-axis: " + sensor.z);
        $('#z').text(sensor.z);
    }
    
    //sensor.start()
    
    //eventually add: sensor.stop()


    } catch(error) {
        console.log('Error creating sensor:')
        console.log(error);
        $('body').append($.parseHTML(alert));
        setTimeout( ()=>{$().alert('close')}, 2000 );
        //Fallback, do something else etc.
    }

   
  
});
