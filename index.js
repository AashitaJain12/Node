const redis = require('ioredis');
const publisher = redis.createClient();
const subscriber = redis.createClient();

// Handle errors for both clients
publisher.on('error', (err) => {
    console.error('Publisher Redis client error:', err);
});

subscriber.on('error', (err) => {
    console.error('Subscriber Redis client error:', err);
});

// Subscribe to a channel
subscriber.subscribe('Student_Details', (err) => {
    if (err) {
        console.error('Error subscribing to channel:', err);
    } else {
        console.log('Subscribed to channel "Student_Details"');

        // Define the student details
        const studentDetails = {
            name: 'Anjali',
            age: 20,
            grade: 'A',
        };

        
        const message = JSON.stringify(studentDetails);

        // Publish the message to the channel
        publisher.publish('Student_Details', message, (err) => {
            if (err) {
                console.error('Error publishing message:', err);
            } else {
                console.log(`Student details published to channel "Student_Details"`);
            }
        });
    }
});

subscriber.on('message', (channel, message) => {
    try {
        const studentDetails = JSON.parse(message);
        console.log(`Received message from channel "${channel}":`, studentDetails);
    } catch (error) {
        console.error('Error parsing message:', error);
    }
});
