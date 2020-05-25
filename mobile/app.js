'use strict'

const AWS = require("aws-sdk");

class Notification {
    constructor() {
        AWS.config.loadFromPath("./config.json");
        this.sns = new AWS.SNS();
    }

    sendMessage(message, phoneNumber, callback) {
        let params = {
            PhoneNumber: phoneNumber,
            Message: message
        }; 

        this.sns.publish(params, (e, r) => {
            if (e) {
                callback(e.message, null);
            } else {
                callback(null, r.MessageId);
            }
        })
    }
}

main();

function main() {
    let notification = new Notification();
    let message = "This is test message.";
    let phoneNumber = "91 1234567899"; //mobile number with country code
    notification.sendMessage(message, phoneNumber, (e, r) => {
        if (e) {
            console.log(e);
        } else {
            console.log(r);
        }
    })
    
}
