declare module 'events' {
  class Internal extends NodeJS.EventEmitter { }

  namespace Internal {
      function once(emitter: EventEmitter, event: string | symbol): Promise<unknown[]>;
       class EventEmitter extends Internal {
         /** @deprecated since v4.0.0 */
         static listenerCount(emitter: EventEmitter, event: string | symbol): number;
          static defaultMaxListeners: number;

          addListener(event: string | symbol, listener: (...args: unknown[]) => void): this;
          on(event: string | symbol, listener: (...args: unknown[]) => void): this;
          once(event: string | symbol, listener: (...args: unknown[]) => void): this;
          prependListener(event: string | symbol, listener: (...args: unknown[]) => void): this;
          prependOnceListener(event: string | symbol, listener: (...args: unknown[]) => void): this;
          removeListener(event: string | symbol, listener: (...args: unknown[]) => void): this;
          off(event: string | symbol, listener: (...args: unknown[]) => void): this;
          removeAllListeners(event?: string | symbol): this;
          setMaxListeners(n: number): this;
          getMaxListeners(): number;
          listeners(event: string | symbol): (() => void)[];
          rawListeners(event: string | symbol): (() => void)[];
          emit(event: string | symbol, ...args: unknown[]): boolean;
          eventNames(): (string | symbol)[];
          listenerCount(type: string | symbol): number;
       }
  }

  export = Internal;
}
