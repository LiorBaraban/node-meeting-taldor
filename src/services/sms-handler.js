// Event Handler
module.exports = (() => {
    const notificationService = require('./_notification-service')

    notificationService.on('notify', (data) => {
        console.log(`sms service - sending sms to my phone: ${data}`);
    });
})();
