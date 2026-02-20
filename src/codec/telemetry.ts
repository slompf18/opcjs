/**
 * @fileoverview Telemetry context adapter for structured logging
 * @module codec/telemetry
 */

/**
 * ITelemetryContext provides structured logging for codec operations.
 * Implements FR-059 observability requirements.
 * 
 * @see FR-059 - Structured logging for encode/decode operations
 */
export interface ITelemetryContext {
  /**
   * Create a logger for a specific component.
   * @param componentName The name of the component (e.g., 'BinaryEncoder')
   * @returns A logger instance
   */
  createLogger(componentName: string): ILogger;
}

/**
 * ILogger provides logging methods with structured data.
 */
export interface ILogger {
  /**
   * Log an informational message.
   * @param message The log message
   * @param data Optional structured data
   */
  info(message: string, data?: Record<string, any>): void;

  /**
   * Log a warning message.
   * @param message The log message
   * @param data Optional structured data
   */
  warn(message: string, data?: Record<string, any>): void;

  /**
   * Log an error message.
   * @param message The log message
   * @param error Optional error object
   * @param data Optional structured data
   */
  error(message: string, error?: Error, data?: Record<string, any>): void;

  /**
   * Log a debug message.
   * @param message The log message
   * @param data Optional structured data
   */
  debug(message: string, data?: Record<string, any>): void;
}

/**
 * ConsoleLogger implements ILogger using console output.
 * This is a simple default implementation.
 */
class ConsoleLogger implements ILogger {
  constructor(private componentName: string) {}

  info(message: string, data?: Record<string, any>): void {
    console.log(`[INFO] [${this.componentName}] ${message}`, data || '');
  }

  warn(message: string, data?: Record<string, any>): void {
    console.warn(`[WARN] [${this.componentName}] ${message}`, data || '');
  }

  error(message: string, error?: Error, data?: Record<string, any>): void {
    console.error(`[ERROR] [${this.componentName}] ${message}`, error, data || '');
  }

  debug(message: string, data?: Record<string, any>): void {
    console.debug(`[DEBUG] [${this.componentName}] ${message}`, data || '');
  }
}

/**
 * DefaultTelemetryContext provides a default console-based telemetry context.
 */
export class DefaultTelemetryContext implements ITelemetryContext {
  createLogger(componentName: string): ILogger {
    return new ConsoleLogger(componentName);
  }
}

/**
 * NoOpLogger implements ILogger with no-op methods for production where logging is disabled.
 */
class NoOpLogger implements ILogger {
  info(): void {}
  warn(): void {}
  error(): void {}
  debug(): void {}
}

/**
 * NoOpTelemetryContext provides a no-op telemetry context.
 */
export class NoOpTelemetryContext implements ITelemetryContext {
  createLogger(): ILogger {
    return new NoOpLogger();
  }
}
