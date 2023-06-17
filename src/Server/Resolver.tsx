import {
  IncomingMessage,
  ServerResponse
} from 'http';

export interface Resolver {
  (
    request: IncomingMessage,
    response: ServerResponse,
    next: () => void
  ): void | Promise<void>;
}
