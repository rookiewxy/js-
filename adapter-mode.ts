/*
 * @Description: 适配器模式
 * @Autor: wxy
 * @Date: 2022-02-15 17:58:26
 * @LastEditors: wxy
 * @LastEditTime: 2022-02-15 18:02:06
 */
// !适配器模式的作用是解决两个软件实体间的接口不兼容的问题
interface Logger {
  info(message: string): Promise<void>;
}

interface CloudLogger {
  sendToServer(message: string, type: string): Promise<void>;
}

class AliLogger implements CloudLogger {
  public async sendToServer(message: string, type: string): Promise<void> {
    console.info(message);
    console.info('This Message was saved with AliLogger');
  }
}

class CloudLoggerAdapter implements Logger {
  protected cloudLogger: CloudLogger;

  constructor (cloudLogger: CloudLogger) {
    this.cloudLogger = cloudLogger;
  }

  public async info(message: string): Promise<void> {
    await this.cloudLogger.sendToServer(message, 'info');
  }
}

class NotificationService {
  protected logger: Logger;
  
  constructor (logger: Logger) {    
    this.logger = logger;
  }

  public async send(message: string): Promise<void> {
    await this.logger.info(`Notification sended: ${message}`);
  }
}


(async () => {
  const aliLogger = new AliLogger();
  const cloudLoggerAdapter = new CloudLoggerAdapter(aliLogger);
  const notificationService = new NotificationService(cloudLoggerAdapter);
  await notificationService.send('Hello semlinker, To Cloud');
})();