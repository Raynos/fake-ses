declare module 'stream' {
  import * as events from 'events'

  class Internal extends events.EventEmitter {
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean }): T;
  }

  namespace Internal {
      class Stream extends Internal { }

      interface ReadableOptions {
          highWaterMark?: number;
          encoding?: string;
          objectMode?: boolean;
          read?(this: Readable, size: number): void;
          destroy?(this: Readable, error: Error | null, callback: (error: Error | null) => void): void;
          autoDestroy?: boolean;
      }

      class Readable extends Stream implements NodeJS.ReadableStream {
          readable: boolean;
          readonly readableHighWaterMark: number;
          readonly readableLength: number;
          constructor(opts?: ReadableOptions);
          _read(size: number): void;
          read(size?: number): string | Buffer;
          setEncoding(encoding: string): this;
          pause(): this;
          resume(): this;
          isPaused(): boolean;
          unpipe(destination?: NodeJS.WritableStream): this;
          unshift(chunk: unknown): void;
          wrap(oldStream: NodeJS.ReadableStream): this;
          push(chunk: unknown, encoding?: string): boolean;
          _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
          destroy(error?: Error): void;

          /**
           * Event emitter
           * The defined events on documents including:
           * 1. close
           * 2. data
           * 3. end
           * 4. readable
           * 5. error
           */
          addListener(event: 'close', listener: () => void): this;
          addListener(event: 'data', listener: (chunk: string | Buffer) => void): this;
          addListener(event: 'end', listener: () => void): this;
          addListener(event: 'readable', listener: () => void): this;
          addListener(event: 'error', listener: (err: Error) => void): this;

          emit(event: 'close'): boolean;
          emit(event: 'data', chunk: string | Buffer): boolean;
          emit(event: 'end'): boolean;
          emit(event: 'readable'): boolean;
          emit(event: 'error', err: Error): boolean;

          on(event: 'close', listener: () => void): this;
          on(event: 'data', listener: (chunk: string | Buffer) => void): this;
          on(event: 'end', listener: () => void): this;
          on(event: 'readable', listener: () => void): this;
          on(event: 'error', listener: (err: Error) => void): this;

          once(event: 'close', listener: () => void): this;
          once(event: 'data', listener: (chunk: string | Buffer) => void): this;
          once(event: 'end', listener: () => void): this;
          once(event: 'readable', listener: () => void): this;
          once(event: 'error', listener: (err: Error) => void): this;

          prependListener(event: 'close', listener: () => void): this;
          prependListener(event: 'data', listener: (chunk: string | Buffer) => void): this;
          prependListener(event: 'end', listener: () => void): this;
          prependListener(event: 'readable', listener: () => void): this;
          prependListener(event: 'error', listener: (err: Error) => void): this;

          prependOnceListener(event: 'close', listener: () => void): this;
          prependOnceListener(event: 'data', listener: (chunk: string | Buffer) => void): this;
          prependOnceListener(event: 'end', listener: () => void): this;
          prependOnceListener(event: 'readable', listener: () => void): this;
          prependOnceListener(event: 'error', listener: (err: Error) => void): this;

          removeListener(event: 'close', listener: () => void): this;
          removeListener(event: 'data', listener: (chunk: string | Buffer) => void): this;
          removeListener(event: 'end', listener: () => void): this;
          removeListener(event: 'readable', listener: () => void): this;
          removeListener(event: 'error', listener: (err: Error) => void): this;

          [Symbol.asyncIterator](): AsyncIterableIterator<string | Buffer>;
      }

      interface WritableOptions {
          highWaterMark?: number;
          decodeStrings?: boolean;
          defaultEncoding?: string;
          objectMode?: boolean;
          emitClose?: boolean;
          write?(this: Writable, chunk: unknown, encoding: string, callback: (error?: Error | null) => void): void;
          writev?(this: Writable, chunks: { chunk: unknown; encoding: string }[], callback: (error?: Error | null) => void): void;
          destroy?(this: Writable, error: Error | null, callback: (error: Error | null) => void): void;
          final?(this: Writable, callback: (error?: Error | null) => void): void;
          autoDestroy?: boolean;
      }

      class Writable extends Stream implements NodeJS.WritableStream {
          writable: boolean;
          readonly writableHighWaterMark: number;
          readonly writableLength: number;
          constructor(opts?: WritableOptions);
          _write(chunk: unknown, encoding: string, callback: (error?: Error | null) => void): void;
          _writev?(chunks: { chunk: unknown; encoding: string }[], callback: (error?: Error | null) => void): void;
          _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
          _final(callback: (error?: Error | null) => void): void;
          write(chunk: unknown, cb?: (error: Error | null | undefined) => void): boolean;
          write(chunk: unknown, encoding: string, cb?: (error: Error | null | undefined) => void): boolean;
          setDefaultEncoding(encoding: string): this;
          end(cb?: () => void): void;
          end(chunk: unknown, cb?: () => void): void;
          end(chunk: unknown, encoding: string, cb?: () => void): void;
          cork(): void;
          uncork(): void;
          destroy(error?: Error): void;

          /**
           * Event emitter
           * The defined events on documents including:
           * 1. close
           * 2. drain
           * 3. error
           * 4. finish
           * 5. pipe
           * 6. unpipe
           */
          addListener(event: 'close', listener: () => void): this;
          addListener(event: 'drain', listener: () => void): this;
          addListener(event: 'error', listener: (err: Error) => void): this;
          addListener(event: 'finish', listener: () => void): this;
          addListener(event: 'pipe', listener: (src: Readable) => void): this;
          addListener(event: 'unpipe', listener: (src: Readable) => void): this;
          addListener(event: string | symbol, listener: (...args: unknown[]) => void): this;

          emit(event: 'close'): boolean;
          emit(event: 'drain'): boolean;
          emit(event: 'error', err: Error): boolean;
          emit(event: 'finish'): boolean;
          emit(event: 'pipe', src: Readable): boolean;
          emit(event: 'unpipe', src: Readable): boolean;

          on(event: 'close', listener: () => void): this;
          on(event: 'drain', listener: () => void): this;
          on(event: 'error', listener: (err: Error) => void): this;
          on(event: 'finish', listener: () => void): this;
          on(event: 'pipe', listener: (src: Readable) => void): this;
          on(event: 'unpipe', listener: (src: Readable) => void): this;

          once(event: 'close', listener: () => void): this;
          once(event: 'drain', listener: () => void): this;
          once(event: 'error', listener: (err: Error) => void): this;
          once(event: 'finish', listener: () => void): this;
          once(event: 'pipe', listener: (src: Readable) => void): this;
          once(event: 'unpipe', listener: (src: Readable) => void): this;

          prependListener(event: 'close', listener: () => void): this;
          prependListener(event: 'drain', listener: () => void): this;
          prependListener(event: 'error', listener: (err: Error) => void): this;
          prependListener(event: 'finish', listener: () => void): this;
          prependListener(event: 'pipe', listener: (src: Readable) => void): this;
          prependListener(event: 'unpipe', listener: (src: Readable) => void): this;

          prependOnceListener(event: 'close', listener: () => void): this;
          prependOnceListener(event: 'drain', listener: () => void): this;
          prependOnceListener(event: 'error', listener: (err: Error) => void): this;
          prependOnceListener(event: 'finish', listener: () => void): this;
          prependOnceListener(event: 'pipe', listener: (src: Readable) => void): this;
          prependOnceListener(event: 'unpipe', listener: (src: Readable) => void): this;

          removeListener(event: 'close', listener: () => void): this;
          removeListener(event: 'drain', listener: () => void): this;
          removeListener(event: 'error', listener: (err: Error) => void): this;
          removeListener(event: 'finish', listener: () => void): this;
          removeListener(event: 'pipe', listener: (src: Readable) => void): this;
          removeListener(event: 'unpipe', listener: (src: Readable) => void): this;
      }

      interface DuplexOptions extends ReadableOptions, WritableOptions {
          allowHalfOpen?: boolean;
          readableObjectMode?: boolean;
          writableObjectMode?: boolean;
          read?(this: Duplex, size: number): void;
          write?(this: Duplex, chunk: unknown, encoding: string, callback: (error?: Error | null) => void): void;
          writev?(this: Duplex, chunks: { chunk: unknown; encoding: string }[], callback: (error?: Error | null) => void): void;
          final?(this: Duplex, callback: (error?: Error | null) => void): void;
          destroy?(this: Duplex, error: Error | null, callback: (error: Error | null) => void): void;
      }

      // Note: Duplex extends both Readable and Writable.
      class Duplex extends Readable implements Writable {
          writable: boolean;
          readonly writableHighWaterMark: number;
          readonly writableLength: number;
          constructor(opts?: DuplexOptions);
          _write(chunk: unknown, encoding: string, callback: (error?: Error | null) => void): void;
          _writev?(chunks: { chunk: unknown; encoding: string }[], callback: (error?: Error | null) => void): void;
          _destroy(error: Error | null, callback: (error: Error | null) => void): void;
          _final(callback: (error?: Error | null) => void): void;
          write(chunk: unknown, encoding?: string, cb?: (error: Error | null | undefined) => void): boolean;
          write(chunk: unknown, cb?: (error: Error | null | undefined) => void): boolean;
          setDefaultEncoding(encoding: string): this;
          end(cb?: () => void): void;
          end(chunk: unknown, cb?: () => void): void;
          end(chunk: unknown, encoding?: string, cb?: () => void): void;
          cork(): void;
          uncork(): void;

          addListener(event: 'data', listener: (chunk: string | Buffer) => void): this;
          addListener(event: 'end', listener: () => void): this;
          addListener(event: 'readable', listener: () => void): this;
          addListener(event: 'close', listener: () => void): this;
          addListener(event: 'drain', listener: () => void): this;
          addListener(event: 'error', listener: (err: Error) => void): this;
          addListener(event: 'finish', listener: () => void): this;
          addListener(event: 'pipe', listener: (src: Readable) => void): this;
          addListener(event: 'unpipe', listener: (src: Readable) => void): this;

          emit(event: 'data', chunk: unknown): boolean;
          emit(event: 'end'): boolean;
          emit(event: 'readable'): boolean;
          emit(event: 'close'): boolean;
          emit(event: 'drain'): boolean;
          emit(event: 'error', err: Error): boolean;
          emit(event: 'finish'): boolean;
          emit(event: 'pipe', src: Readable): boolean;
          emit(event: 'unpipe', src: Readable): boolean;

          on(event: 'data', listener: (chunk: string | Buffer) => void): this;
          on(event: 'end', listener: () => void): this;
          on(event: 'readable', listener: () => void): this;
          on(event: 'close', listener: () => void): this;
          on(event: 'drain', listener: () => void): this;
          on(event: 'error', listener: (err: Error) => void): this;
          on(event: 'finish', listener: () => void): this;
          on(event: 'pipe', listener: (src: Readable) => void): this;
          on(event: 'unpipe', listener: (src: Readable) => void): this;

          once(event: 'data', listener: (chunk: string | Buffer) => void): this;
          once(event: 'end', listener: () => void): this;
          once(event: 'readable', listener: () => void): this;
          once(event: 'close', listener: () => void): this;
          once(event: 'drain', listener: () => void): this;
          once(event: 'error', listener: (err: Error) => void): this;
          once(event: 'finish', listener: () => void): this;
          once(event: 'pipe', listener: (src: Readable) => void): this;
          once(event: 'unpipe', listener: (src: Readable) => void): this;

          prependListener(event: 'data', listener: (chunk: string | Buffer) => void): this;
          prependListener(event: 'end', listener: () => void): this;
          prependListener(event: 'readable', listener: () => void): this;
          prependListener(event: 'close', listener: () => void): this;
          prependListener(event: 'drain', listener: () => void): this;
          prependListener(event: 'error', listener: (err: Error) => void): this;
          prependListener(event: 'finish', listener: () => void): this;
          prependListener(event: 'pipe', listener: (src: Readable) => void): this;
          prependListener(event: 'unpipe', listener: (src: Readable) => void): this;

          prependOnceListener(event: 'data', listener: (chunk: string | Buffer) => void): this;
          prependOnceListener(event: 'end', listener: () => void): this;
          prependOnceListener(event: 'readable', listener: () => void): this;
          prependOnceListener(event: 'close', listener: () => void): this;
          prependOnceListener(event: 'drain', listener: () => void): this;
          prependOnceListener(event: 'error', listener: (err: Error) => void): this;
          prependOnceListener(event: 'finish', listener: () => void): this;
          prependOnceListener(event: 'pipe', listener: (src: Readable) => void): this;
          prependOnceListener(event: 'unpipe', listener: (src: Readable) => void): this;

          removeListener(event: 'data', listener: (chunk: string | Buffer) => void): this;
          removeListener(event: 'end', listener: () => void): this;
          removeListener(event: 'readable', listener: () => void): this;
          removeListener(event: 'close', listener: () => void): this;
          removeListener(event: 'drain', listener: () => void): this;
          removeListener(event: 'error', listener: (err: Error) => void): this;
          removeListener(event: 'finish', listener: () => void): this;
          removeListener(event: 'pipe', listener: (src: Readable) => void): this;
          removeListener(event: 'unpipe', listener: (src: Readable) => void): this;
      }

      type TransformCallback = (error?: Error | null, data?: unknown) => void;

      interface TransformOptions extends DuplexOptions {
          read?(this: Transform, size: number): void;
          write?(this: Transform, chunk: unknown, encoding: string, callback: (error?: Error | null) => void): void;
          writev?(this: Transform, chunks: { chunk: unknown; encoding: string }[], callback: (error?: Error | null) => void): void;
          final?(this: Transform, callback: (error?: Error | null) => void): void;
          destroy?(this: Transform, error: Error | null, callback: (error: Error | null) => void): void;
          transform?(this: Transform, chunk: unknown, encoding: string, callback: TransformCallback): void;
          flush?(this: Transform, callback: TransformCallback): void;
      }

      class Transform extends Duplex {
        constructor(opts?: TransformOptions);
        _transform(chunk: unknown, encoding: string, callback: TransformCallback): void;
        _flush(callback: TransformCallback): void;
      }

      function finished(stream: NodeJS.ReadableStream | NodeJS.WritableStream | NodeJS.ReadWriteStream, callback: (err?: NodeJS.ErrnoException | null) => void): () => void;
      namespace finished {
          function __promisify__(stream: NodeJS.ReadableStream | NodeJS.WritableStream | NodeJS.ReadWriteStream): Promise<void>;
      }

      function pipeline<T extends NodeJS.WritableStream>(stream1: NodeJS.ReadableStream, stream2: T, callback?: (err: NodeJS.ErrnoException | null) => void): T;
      function pipeline<T extends NodeJS.WritableStream>(stream1: NodeJS.ReadableStream, stream2: NodeJS.ReadWriteStream, stream3: T, callback?: (err: NodeJS.ErrnoException | null) => void): T;
      function pipeline<T extends NodeJS.WritableStream>(
          stream1: NodeJS.ReadableStream,
          stream2: NodeJS.ReadWriteStream,
          stream3: NodeJS.ReadWriteStream,
          stream4: T,
          callback?: (err: NodeJS.ErrnoException | null) => void,
      ): T;
      function pipeline<T extends NodeJS.WritableStream>(
          stream1: NodeJS.ReadableStream,
          stream2: NodeJS.ReadWriteStream,
          stream3: NodeJS.ReadWriteStream,
          stream4: NodeJS.ReadWriteStream,
          stream5: T,
          callback?: (err: NodeJS.ErrnoException | null) => void,
      ): T;
      function pipeline(streams: (NodeJS.ReadableStream | NodeJS.WritableStream | NodeJS.ReadWriteStream)[], callback?: (err: NodeJS.ErrnoException | null) => void): NodeJS.WritableStream;
      function pipeline(
          stream1: NodeJS.ReadableStream,
          stream2: NodeJS.ReadWriteStream | NodeJS.WritableStream,
          ...streams: (NodeJS.ReadWriteStream | NodeJS.WritableStream | ((err: NodeJS.ErrnoException | null) => void))[],
      ): NodeJS.WritableStream;
      namespace pipeline {
          function __promisify__(stream1: NodeJS.ReadableStream, stream2: NodeJS.WritableStream): Promise<void>;
          function __promisify__(stream1: NodeJS.ReadableStream, stream2: NodeJS.ReadWriteStream, stream3: NodeJS.WritableStream): Promise<void>;
          function __promisify__(stream1: NodeJS.ReadableStream, stream2: NodeJS.ReadWriteStream, stream3: NodeJS.ReadWriteStream, stream4: NodeJS.WritableStream): Promise<void>;
          function __promisify__(
              stream1: NodeJS.ReadableStream,
              stream2: NodeJS.ReadWriteStream,
              stream3: NodeJS.ReadWriteStream,
              stream4: NodeJS.ReadWriteStream,
              stream5: NodeJS.WritableStream,
          ): Promise<void>;
          function __promisify__(streams: (NodeJS.ReadableStream | NodeJS.WritableStream | NodeJS.ReadWriteStream)[]): Promise<void>;
          function __promisify__(
              stream1: NodeJS.ReadableStream,
              stream2: NodeJS.ReadWriteStream | NodeJS.WritableStream,
              ...streams: (NodeJS.ReadWriteStream | NodeJS.WritableStream)[],
          ): Promise<void>;
      }
  }

  export = Internal;
}
