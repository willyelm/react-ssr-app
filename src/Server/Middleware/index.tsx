import { Resolver } from '../Resolver';

export interface Middleware {
  (...args): Resolver;
}
