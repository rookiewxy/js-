/*
 * @Description: 发布订阅模式
 * @Autor: wxy
 * @Date: 2022-02-15 18:15:14
 * @LastEditors: wxy
 * @LastEditTime: 2022-02-15 18:17:35
 */

// !发布/订阅是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，然后分别发送给不同的订阅者
type EventHandler = (...args: any[]) => any;

class EventEmitter {
  private c = new Map<string, EventHandler[]>();

  // 订阅指定的主题
  subscribe(topic: string, ...handlers: EventHandler[]) {
    let topics = this.c.get(topic);
    if (!topics) {
      this.c.set(topic, topics = []);
    }
    topics.push(...handlers);
  }

  // 取消订阅指定的主题
  unsubscribe(topic: string, handler?: EventHandler): boolean {
    if (!handler) {
      return this.c.delete(topic);
    }

    const topics = this.c.get(topic);
    if (!topics) {
      return false;
    }
    
    const index = topics.indexOf(handler);

    if (index < 0) {
      return false;
    }
    topics.splice(index, 1);
    if (topics.length === 0) {
      this.c.delete(topic);
    }
    return true;
  }

  // 为指定的主题发布消息
  publish(topic: string, ...args: any[]): any[] | null {
    const topics = this.c.get(topic);
    if (!topics) {
      return null;
    }
    return topics.map(handler => {
      try {
        return handler(...args);
      } catch (e) {
        console.error(e);
        return null;
      }
    });
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.subscribe("ts", (msg) => console.log(`收到订阅的消息：${msg}`) );

eventEmitter.publish("ts", "TypeScript发布订阅模式");
eventEmitter.unsubscribe("ts");
eventEmitter.publish("ts", "TypeScript发布订阅模式");
