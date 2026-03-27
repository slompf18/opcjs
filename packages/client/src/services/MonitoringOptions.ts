/** Options controlling how items are monitored within a subscription. */

export type MonitoringOptions = {
    /** Requested sampling interval in milliseconds. -1 = use subscription publishing interval. */
    samplingInterval?: number;
    /** Requested queue size for each monitored item. */
    queueSize?: number;
};
