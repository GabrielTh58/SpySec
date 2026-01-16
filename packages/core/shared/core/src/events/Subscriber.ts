export interface Subscriber<T> {
  subscribe(): void; 
  // A ação real. "Quando o evento chegar, rode isso aqui"
  handle(event: T): Promise<void>;
  } 