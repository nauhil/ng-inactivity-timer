import { Observable } from 'rxjs';
import { ActivityMonitor } from './activity-monitor.interface';
import { InactivityConfig } from './inactivity-config.interface';
export declare class InactivityTimerService {
    private config;
    private monitor;
    private timeout$;
    private monitor$;
    private artificialActivity$;
    constructor(config: InactivityConfig, monitor: ActivityMonitor);
    /**
     * Emits Timeout objects describing current timeout state
     * @returns Observable<Timeout>
     */
    getTimeOut(): Observable<Timeout>;
    /**
     * Starts listening for activity.
     * @param activate=false. If true will reset the activity timer as any other activity.
     * @returns void
     */
    startMonitor(activate?: boolean): void;
    /**
     * Stops listening for activity.
     * @returns void
     */
    stopMonitor(): void;
    /**
     * Provides a programmatic way of simulating activity.
     * Will reset the activity timer as any other activity.
     */
    activate(): void;
}
export interface Timeout {
    showWarning: boolean;
    timedOut: boolean;
    timeLeft: number;
}
