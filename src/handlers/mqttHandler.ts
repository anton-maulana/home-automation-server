const mqtt = require('mqtt');

export default class MqttHandler {
    static mqttClient: any = null;
    static topic: string;

    constructor() {

    }

    static connect(host: string, username: string, password: string, topic: string) {
        this.topic = topic;
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(host, { username: username, password: password });

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });

        // mqtt subscriptions
        this.mqttClient.subscribe(this.topic, { qos: 0 });

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            console.log(message.toString());
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message to topic: mytopic
    static sendMessage(message) {
        this.mqttClient.publish(this.topic, message);
    }
}
