
module.exports = (() => {
    const notificationService = require('./notification-service')

    notificationService.on('notify', (data) => {
        console.log(`email service - sending email to boss: ${data}`);
    });
})(); 