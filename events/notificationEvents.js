import { EventEmitter } from 'events';

class NotificationEmitter extends EventEmitter {}

const notificationEvents = new NotificationEmitter();

export default notificationEvents;
