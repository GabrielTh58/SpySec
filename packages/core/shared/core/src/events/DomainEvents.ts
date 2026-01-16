export interface IDomainEvent {
    dateTimeOccurred: Date;
    getAggregateId(): string; 
}


export class DomainEvents {
  private static handlersMap: { [key: string]: Array<(event: any) => void> } = {};

  static register(callback: (event: any) => void, eventClassName: string): void {
    if (!this.handlersMap[eventClassName]) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
    console.log(`[DomainEvents] Handler registrado para: ${eventClassName}`);
  }

  static dispatch(event: IDomainEvent): void {
    const eventClassName = event.constructor.name;

    if (this.handlersMap[eventClassName]) {
      const handlers = this.handlersMap[eventClassName];
      
      console.log(`[DomainEvents] Disparando ${eventClassName} para ${handlers.length} ouvintes.`);
      
      handlers.forEach((handler) => {
        handler(event);
      });
    }
  }

  static clearHandlers(): void {
    this.handlersMap = {};
  }
}