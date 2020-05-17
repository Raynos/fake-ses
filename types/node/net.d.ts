declare module 'net' {
  import * as stream from 'stream'
  import * as events from 'events'
  import * as dns from 'dns'

  type LookupFunction = (hostname: string, options: dns.LookupOneOptions, callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void) => void;

  interface AddressInfo {
      address: string;
      family: string;
      port: number;
  }

  interface SocketConstructorOpts {
      fd?: number;
      allowHalfOpen?: boolean;
      readable?: boolean;
      writable?: boolean;
  }

  interface TcpSocketConnectOpts {
      port: number;
      host?: string;
      localAddress?: string;
      localPort?: number;
      hints?: number;
      family?: number;
      lookup?: LookupFunction;
  }

  interface IpcSocketConnectOpts {
      path: string;
  }

  type SocketConnectOpts = TcpSocketConnectOpts | IpcSocketConnectOpts;

  class Socket extends stream.Duplex {
    constructor(options?: SocketConstructorOpts);

    // Extended base methods
    write(buffer: Buffer | Uint8Array | string, cb?: (err?: Error) => void): boolean;
    write(str: Buffer | Uint8Array | string, encoding?: string, cb?: (err?: Error) => void): boolean;

    connect(options: SocketConnectOpts | number | string, connectionListener?: () => void): this;
    connect(port: number, host: string, connectionListener?: () => void): this;

    setEncoding(encoding?: string): this;
    pause(): this;
    resume(): this;
    setTimeout(timeout: number, callback?: () => void): this;
    setNoDelay(noDelay?: boolean): this;
    setKeepAlive(enable?: boolean, initialDelay?: number): this;
    address(): AddressInfo | string;
    unref(): void;
    ref(): void;

      readonly bufferSize: number;
      readonly bytesRead: number;
      readonly bytesWritten: number;
      readonly connecting: boolean;
      readonly destroyed: boolean;
      readonly localAddress: string;
      readonly localPort: number;
      readonly remoteAddress?: string;
      readonly remoteFamily?: string;
      readonly remotePort?: number;

      // Extended base methods
      end(cb?: () => void): void;
      end(buffer: Buffer | Uint8Array | string, cb?: () => void): void;
      end(str: Buffer | Uint8Array | string, encoding?: string, cb?: () => void): void;

      /**
       * events.EventEmitter
       *   1. close
       *   2. connect
       *   3. data
       *   4. drain
       *   5. end
       *   6. error
       *   7. lookup
       *   8. timeout
       */
      addListener(event: string, listener: ((...args: unknown[]) => void)): this;
      addListener(event: 'close', listener: (hadError: boolean) => void): this;
      addListener(event: 'connect' | 'drain' | 'end' | 'timeout', listener: () => void): this;
      addListener(event: 'data', listener: (data: Buffer) => void): this;
      addListener(event: 'error', listener: (err: Error) => void): this;
      addListener(event: 'lookup', listener: (err: Error, address: string, family: string | number, host: string) => void): this;

      emit(event: string | symbol, ...args: unknown[]): boolean;
      emit(event: 'close', hadError: boolean): boolean;
      emit(event: 'connect' | 'drain' | 'end' | 'timeout'): boolean;
      emit(event: 'data', data: Buffer): boolean;
      emit(event: 'error', err: Error): boolean;
      emit(event: 'lookup', err: Error, address: string, family: string | number, host: string): boolean;

      on(event: string, listener: (...args: unknown[]) => void): this;
      on(event: 'close', listener: (hadError: boolean) => void): this;
      on(event: 'connect' | 'drain' | 'end' | 'timeout', listener: () => void): this;
      on(event: 'data', listener: (data: Buffer) => void): this;
      on(event: 'error', listener: (err: Error) => void): this;
      on(event: 'lookup', listener: (err: Error, address: string, family: string | number, host: string) => void): this;

      once(event: string, listener: (...args: unknown[]) => void): this;
      once(event: 'close', listener: (hadError: boolean) => void): this;
      once(event: 'connect' | 'drain' | 'end' | 'timeout', listener: () => void): this;
      once(event: 'data', listener: (data: Buffer) => void): this;
      once(event: 'error', listener: (err: Error) => void): this;
      once(event: 'lookup', listener: (err: Error, address: string, family: string | number, host: string) => void): this;

      prependListener(event: string, listener: (...args: unknown[]) => void): this;
      prependListener(event: 'close', listener: (hadError: boolean) => void): this;
      prependListener(event: 'connect' | 'drain' | 'end' | 'timeout', listener: () => void): this;
      prependListener(event: 'data', listener: (data: Buffer) => void): this;
      prependListener(event: 'error', listener: (err: Error) => void): this;
      prependListener(event: 'lookup', listener: (err: Error, address: string, family: string | number, host: string) => void): this;

      prependOnceListener(event: string, listener: (...args: unknown[]) => void): this;
      prependOnceListener(event: 'close', listener: (hadError: boolean) => void): this;
      prependOnceListener(event: 'connect' | 'drain' | 'end' | 'timeout', listener: () => void): this;
      prependOnceListener(event: 'data', listener: (data: Buffer) => void): this;
      prependOnceListener(event: 'error', listener: (err: Error) => void): this;
      prependOnceListener(event: 'lookup', listener: (err: Error, address: string, family: string | number, host: string) => void): this;
  }

  interface ListenOptions {
      port?: number;
      host?: string;
      backlog?: number;
      path?: string;
      exclusive?: boolean;
      readableAll?: boolean;
      writableAll?: boolean;
      /**
       * @default false
       */
      ipv6Only?: boolean;
  }

  // https://github.com/nodejs/node/blob/master/lib/net.js
  class Server extends events.EventEmitter {
    constructor(connectionListener?: (socket: Socket) => void);
    constructor(options?: { allowHalfOpen?: boolean; pauseOnConnect?: boolean }, connectionListener?: (socket: Socket) => void);

    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): this;
    listen(port?: number, hostname?: string, listeningListener?: () => void): this;
    listen(port?: number, backlog?: number, listeningListener?: () => void): this;
    listen(port?: number, listeningListener?: () => void): this;
    listen(path: string, backlog?: number, listeningListener?: () => void): this;
    listen(path: string, listeningListener?: () => void): this;
    listen(options: ListenOptions, listeningListener?: () => void): this;
    listen(handle: unknown, backlog?: number, listeningListener?: () => void): this;
    listen(handle: unknown, listeningListener?: () => void): this;
    close(callback?: (err?: Error) => void): this;
    address(): AddressInfo | string | null;
    getConnections(cb: (error: Error | null, count: number) => void): void;
    ref(): this;
    unref(): this;
      maxConnections: number;
      connections: number;
      listening: boolean;

      /**
       * events.EventEmitter
       *   1. close
       *   2. connection
       *   3. error
       *   4. listening
       */
      addListener(event: string, listener: (...args: unknown[]) => void): this;
      addListener(event: 'close' | 'listening', listener: () => void): this;
      addListener(event: 'connection', listener: (socket: Socket) => void): this;
      addListener(event: 'error', listener: (err: Error) => void): this;

      emit(event: string | symbol, ...args: unknown[]): boolean;
      emit(event: 'close' | 'listening'): boolean;
      emit(event: 'connection', socket: Socket): boolean;
      emit(event: 'error', err: Error): boolean;

      on(event: string, listener: (...args: unknown[]) => void): this;
      on(event: 'close' | 'listening', listener: () => void): this;
      on(event: 'connection', listener: (socket: Socket) => void): this;
      on(event: 'error', listener: (err: Error) => void): this;

      once(event: string, listener: (...args: unknown[]) => void): this;
      once(event: 'close' | 'listening', listener: () => void): this;
      once(event: 'connection', listener: (socket: Socket) => void): this;
      once(event: 'error', listener: (err: Error) => void): this;

      prependListener(event: string, listener: (...args: unknown[]) => void): this;
      prependListener(event: 'close' | 'listening', listener: () => void): this;
      prependListener(event: 'connection', listener: (socket: Socket) => void): this;
      prependListener(event: 'error', listener: (err: Error) => void): this;

      prependOnceListener(event: string, listener: (...args: unknown[]) => void): this;
      prependOnceListener(event: 'close' | 'listening', listener: () => void): this;
      prependOnceListener(event: 'connection', listener: (socket: Socket) => void): this;
      prependOnceListener(event: 'error', listener: (err: Error) => void): this;
  }

  interface TcpNetConnectOpts extends TcpSocketConnectOpts, SocketConstructorOpts {
      timeout?: number;
  }

  interface IpcNetConnectOpts extends IpcSocketConnectOpts, SocketConstructorOpts {
      timeout?: number;
  }

  type NetConnectOpts = TcpNetConnectOpts | IpcNetConnectOpts;

  function createServer(connectionListener?: (socket: Socket) => void): Server;
  function createServer(options?: { allowHalfOpen?: boolean; pauseOnConnect?: boolean }, connectionListener?: (socket: Socket) => void): Server;
  function connect(options: NetConnectOpts | string, connectionListener?: () => void): Socket;
  function connect(port: number, host?: string, connectionListener?: () => void): Socket;
  function createConnection(options: NetConnectOpts | string, connectionListener?: () => void): Socket;
  function createConnection(port: number, host?: string, connectionListener?: () => void): Socket;
  function isIP(input: string): number;
  function isIPv4(input: string): boolean;
  function isIPv6(input: string): boolean;
}
