// Event Emitter - Event Driven Development
const EventEmitter = require('events');

const notificationService = new EventEmitter();

// notificationService.on('notify', (data)=>{

//     console.log(`in notify service: ${data}`);
//     // sendEmailToMyself(data)
//     // sendMailToBoss(data) 
// });

module.exports = notificationService;