/** Options for creating a subscription. All fields are optional; server will revise requested values. */

export interface SubscriptionOptions {
    /** Requested publishing interval in milliseconds. Default: 2000. */
    requestedPublishingInterval?: number;
    /** Requested lifetime count (number of publishing intervals before subscription times out). Default: 360000. */
    requestedLifetimeCount?: number;
    /** Requested max keep-alive count. Default: 60000. */
    requestedMaxKeepAliveCount?: number;
    /** Maximum number of notifications per publish response. 0 = no limit. Default: 200. */
    maxNotificationsPerPublish?: number;
    /** Subscription priority relative to other subscriptions. Default: 1. */
    priority?: number;
    /** Requested sampling interval in milliseconds. -1 = use subscription publishing interval. */
    samplingInterval?: number;
    /** Requested queue size for each monitored item. */
    queueSize?: number;
}
