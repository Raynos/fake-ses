declare module 'util' {
  function format(formatExpr: unknown, ...param: unknown[]): string;
  function formatWithOptions(inspectOptions: NodeJS.InspectOptions, format: string, ...param: unknown[]): string;
  /** @deprecated since v0.11.3 - use a third party module instead. */
  function log(string: string): void;
  function inspect(object: unknown, showHidden?: boolean, depth?: number | null, color?: boolean): string;
  function inspect(object: unknown, options: NodeJS.InspectOptions): string;
  namespace inspect {
      let colors: {
          [color: string]: [number, number] | undefined;
      }
      let styles: {
          [style: string]: string | undefined;
      }
      let defaultOptions: NodeJS.InspectOptions
      /**
       * Allows changing inspect settings from the repl.
       */
      let replDefaults: NodeJS.InspectOptions
  }
  /** @deprecated since v4.0.0 - use `Array.isArray()` instead. */
  function isArray(object: unknown): object is unknown[];
  /** @deprecated since v4.0.0 - use `util.types.isRegExp()` instead. */
  function isRegExp(object: unknown): object is RegExp;
  /** @deprecated since v4.0.0 - use `util.types.isDate()` instead. */
  function isDate(object: unknown): object is Date;
  /** @deprecated since v4.0.0 - use `util.types.isNativeError()` instead. */
  function isError(object: unknown): object is Error;
  function inherits(constructor: unknown, superConstructor: unknown): void;
  function debuglog(key: string): (msg: string, ...param: unknown[]) => void;
  /** @deprecated since v4.0.0 - use `typeof value === 'boolean'` instead. */
  function isBoolean(object: unknown): object is boolean;
  /** @deprecated since v4.0.0 - use `Buffer.isBuffer()` instead. */
  function isBuffer(object: unknown): object is Buffer;
  /** @deprecated since v4.0.0 - use `typeof value === 'function'` instead. */
  function isFunction(object: unknown): boolean;
  /** @deprecated since v4.0.0 - use `value === null` instead. */
  function isNull(object: unknown): object is null;
  /** @deprecated since v4.0.0 - use `value === null || value === undefined` instead. */
  function isNullOrUndefined(object: unknown): object is null | undefined;
  /** @deprecated since v4.0.0 - use `typeof value === 'number'` instead. */
  function isNumber(object: unknown): object is number;
  /** @deprecated since v4.0.0 - use `value !== null && typeof value === 'object'` instead. */
  function isObject(object: unknown): boolean;
  /** @deprecated since v4.0.0 - use `(typeof value !== 'object' && typeof value !== 'function') || value === null` instead. */
  function isPrimitive(object: unknown): boolean;
  /** @deprecated since v4.0.0 - use `typeof value === 'string'` instead. */
  function isString(object: unknown): object is string;
  /** @deprecated since v4.0.0 - use `typeof value === 'symbol'` instead. */
  function isSymbol(object: unknown): object is symbol;
  /** @deprecated since v4.0.0 - use `value === undefined` instead. */
  function isUndefined(object: unknown): object is undefined;
  function deprecate<T extends (...args: unknown[]) => unknown>(fn: T, message: string): T;
  function isDeepStrictEqual(val1: unknown, val2: unknown): boolean;

  function callbackify(fn: () => Promise<void>): (callback: (err: NodeJS.ErrnoException) => void) => void;
  function callbackify<TResult>(fn: () => Promise<TResult>): (callback: (err: NodeJS.ErrnoException, result: TResult) => void) => void;
  function callbackify<T1>(fn: (arg1: T1) => Promise<void>): (arg1: T1, callback: (err: NodeJS.ErrnoException) => void) => void;
  function callbackify<T1, TResult>(fn: (arg1: T1) => Promise<TResult>): (arg1: T1, callback: (err: NodeJS.ErrnoException, result: TResult) => void) => void;
  function callbackify<T1, T2>(fn: (arg1: T1, arg2: T2) => Promise<void>): (arg1: T1, arg2: T2, callback: (err: NodeJS.ErrnoException) => void) => void;
  function callbackify<T1, T2, TResult>(fn: (arg1: T1, arg2: T2) => Promise<TResult>): (arg1: T1, arg2: T2, callback: (err: NodeJS.ErrnoException | null, result: TResult) => void) => void;
  function callbackify<T1, T2, T3>(fn: (arg1: T1, arg2: T2, arg3: T3) => Promise<void>): (arg1: T1, arg2: T2, arg3: T3, callback: (err: NodeJS.ErrnoException) => void) => void;
  function callbackify<T1, T2, T3, TResult>(
      fn: (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>): (arg1: T1, arg2: T2, arg3: T3, callback: (err: NodeJS.ErrnoException | null, result: TResult) => void) => void;
  function callbackify<T1, T2, T3, T4>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: NodeJS.ErrnoException) => void) => void;
  function callbackify<T1, T2, T3, T4, TResult>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: NodeJS.ErrnoException | null, result: TResult) => void) => void;
  function callbackify<T1, T2, T3, T4, T5>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: NodeJS.ErrnoException) => void) => void;
  function callbackify<T1, T2, T3, T4, T5, TResult>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: NodeJS.ErrnoException | null, result: TResult) => void) => void;
  function callbackify<T1, T2, T3, T4, T5, T6>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => Promise<void>,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, callback: (err: NodeJS.ErrnoException) => void) => void;
  function callbackify<T1, T2, T3, T4, T5, T6, TResult>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => Promise<TResult>
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, callback: (err: NodeJS.ErrnoException | null, result: TResult) => void) => void;

  function promisify<TResult>(fn: (callback: (err: Error | null, result: TResult) => void) => void): () => Promise<TResult>;
  function promisify(fn: (callback: (err?: Error | null) => void) => void): () => Promise<void>;
  function promisify<T1, TResult>(fn: (arg1: T1, callback: (err: Error | null, result: TResult) => void) => void): (arg1: T1) => Promise<TResult>;
  function promisify<T1>(fn: (arg1: T1, callback: (err?: Error | null) => void) => void): (arg1: T1) => Promise<void>;
  function promisify<T1, T2, TResult>(fn: (arg1: T1, arg2: T2, callback: (err: Error | null, result: TResult) => void) => void): (arg1: T1, arg2: T2) => Promise<TResult>;
  function promisify<T1, T2>(fn: (arg1: T1, arg2: T2, callback: (err?: Error | null) => void) => void): (arg1: T1, arg2: T2) => Promise<void>;
  function promisify<T1, T2, T3, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error | null, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>;
  function promisify<T1, T2, T3>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: (err?: Error | null) => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<void>;
  function promisify<T1, T2, T3, T4, TResult>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error | null, result: TResult) => void) => void,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>;
  function promisify<T1, T2, T3, T4>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err?: Error | null) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>;
  function promisify<T1, T2, T3, T4, T5, TResult>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error | null, result: TResult) => void) => void,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>;
  function promisify<T1, T2, T3, T4, T5>(
      fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err?: Error | null) => void) => void,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>;
  function promisify(fn: () => void): () => void;

  namespace types {
      function isunknownArrayBuffer(object: unknown): boolean;
      function isArgumentsObject(object: unknown): object is IArguments;
      function isArrayBuffer(object: unknown): object is ArrayBuffer;
      function isAsyncFunction(object: unknown): boolean;
      /* eslint-disable-next-line @typescript-eslint/ban-types */
      function isBooleanObject(object: unknown): object is Boolean;
      /* eslint-disable-next-line @typescript-eslint/ban-types */
      function isBoxedPrimitive(object: unknown): object is (Number | Boolean | String | Symbol /* | Object(BigInt) | Object(Symbol) */);
      function isDataView(object: unknown): object is DataView;
      function isDate(object: unknown): object is Date;
      function isExternal(object: unknown): boolean;
      function isFloat32Array(object: unknown): object is Float32Array;
      function isFloat64Array(object: unknown): object is Float64Array;
      function isGeneratorFunction(object: unknown): boolean;
      function isGeneratorObject(object: unknown): boolean;
      function isInt8Array(object: unknown): object is Int8Array;
      function isInt16Array(object: unknown): object is Int16Array;
      function isInt32Array(object: unknown): object is Int32Array;
      function isMap(object: unknown): boolean;
      function isMapIterator(object: unknown): boolean;
      function isModuleNamespaceObject(value: unknown): boolean;
      function isNativeError(object: unknown): object is Error;
      /* eslint-disable-next-line @typescript-eslint/ban-types */
      function isNumberObject(object: unknown): object is Number;
      function isPromise(object: unknown): boolean;
      function isProxy(object: unknown): boolean;
      function isRegExp(object: unknown): object is RegExp;
      function isSet(object: unknown): boolean;
      function isSetIterator(object: unknown): boolean;
      function isSharedArrayBuffer(object: unknown): boolean;
      function isStringObject(object: unknown): boolean;
      function isSymbolObject(object: unknown): boolean;
      function isTypedArray(object: unknown): object is NodeJS.TypedArray;
      function isUint8Array(object: unknown): object is Uint8Array;
      function isUint8ClampedArray(object: unknown): object is Uint8ClampedArray;
      function isUint16Array(object: unknown): object is Uint16Array;
      function isUint32Array(object: unknown): object is Uint32Array;
      function isWeakMap(object: unknown): boolean;
      function isWeakSet(object: unknown): boolean;
      function isWebAssemblyCompiledModule(object: unknown): boolean;
  }
}
