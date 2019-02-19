/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { interval as observableInterval, BehaviorSubject, Subject, of, timer, merge } from 'rxjs';
import { ACTIVITY_MONITOR } from './activity-monitor.token';
import { INACTIVITY_CONFIG } from './inactivity-config.token';
import { Inject, Injectable, Optional } from '@angular/core';
import { switchMap, throttle, map, startWith, filter, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./inactivity-config.token";
import * as i2 from "./activity-monitor.token";
export class InactivityTimerService {
    /**
     * @param {?} config
     * @param {?} monitor
     */
    constructor(config, monitor) {
        this.config = config;
        this.monitor = monitor;
        this.monitor$ = new BehaviorSubject(true);
        this.artificialActivity$ = new Subject();
        // Merge all monitors together, and activate them via register()
        this.timeout$ = this.monitor$.pipe(filter(x => !!x), switchMap(m => {
            return merge(this.monitor.getMonitor(), this.artificialActivity$).pipe(throttle(() => observableInterval(500)), // Throttle - to stop spamming
            startWith(undefined), // Trigger observable immediately
            map(() => {
                /** @type {?} */
                const d = new Date();
                d.setMinutes(d.getMinutes() + config.inactivityTime);
                return d;
            }), takeUntil(this.monitor$.pipe(filter(x => !x))));
        }));
    }
    /**
     * Emits Timeout objects describing current timeout state
     * @return {?} Observable<Timeout>
     */
    getTimeOut() {
        return this.timeout$.pipe(switchMap((date) => {
            return timer(0, 60000).pipe(switchMap(() => {
                /** @type {?} */
                const f = new Date();
                return of({
                    showWarning: this.config.warningTime
                        ? f.getTime() + this.config.warningTime > date.getTime()
                        : false,
                    timedOut: f.getTime() > date.getTime(),
                    timeLeft: date.getTime() - f.getTime()
                });
            }));
        }));
    }
    /**
     * Starts listening for activity.
     * @param {?=} activate
     * @return {?} void
     */
    startMonitor(activate = false) {
        this.monitor$.next(true);
        if (activate) {
            this.activate();
        }
    }
    /**
     * Stops listening for activity.
     * @return {?} void
     */
    stopMonitor() {
        this.monitor$.next(false);
    }
    /**
     * Provides a programmatic way of simulating activity.
     * Will reset the activity timer as any other activity.
     * @return {?}
     */
    activate() {
        this.artificialActivity$.next(undefined);
    }
}
InactivityTimerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                deps: [INACTIVITY_CONFIG, ACTIVITY_MONITOR]
            },] }
];
/** @nocollapse */
InactivityTimerService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [INACTIVITY_CONFIG,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ACTIVITY_MONITOR,] }] }
];
/** @nocollapse */ InactivityTimerService.ngInjectableDef = i0.defineInjectable({ factory: function InactivityTimerService_Factory() { return new InactivityTimerService(i0.inject(i1.INACTIVITY_CONFIG), i0.inject(i2.ACTIVITY_MONITOR, 8)); }, token: InactivityTimerService, providedIn: "root" });
if (false) {
    /** @type {?} */
    InactivityTimerService.prototype.timeout$;
    /** @type {?} */
    InactivityTimerService.prototype.monitor$;
    /** @type {?} */
    InactivityTimerService.prototype.artificialActivity$;
    /** @type {?} */
    InactivityTimerService.prototype.config;
    /** @type {?} */
    InactivityTimerService.prototype.monitor;
}
/**
 * @record
 */
export function Timeout() { }
if (false) {
    /** @type {?} */
    Timeout.prototype.showWarning;
    /** @type {?} */
    Timeout.prototype.timedOut;
    /** @type {?} */
    Timeout.prototype.timeLeft;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5hY3Rpdml0eS10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctaW5hY3Rpdml0eS10aW1lci8iLCJzb3VyY2VzIjpbImxpYi9pbmFjdGl2aXR5LXRpbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxRQUFRLElBQUksa0JBQWtCLEVBQzlCLGVBQWUsRUFFZixPQUFPLEVBQ1AsRUFBRSxFQUNGLEtBQUssRUFDTCxLQUFLLEVBQ04sTUFBTSxNQUFNLENBQUM7QUFFZCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUNMLFNBQVMsRUFDVCxRQUFRLEVBQ1IsR0FBRyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFNeEIsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFLakMsWUFDcUMsTUFBd0IsRUFHbkQsT0FBd0I7UUFIRyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUduRCxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQVAxQixhQUFRLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFDOUMsd0JBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQVFoRCxnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNoQixTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FDcEUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsOEJBQThCO1lBQ3ZFLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxpQ0FBaUM7WUFDdkQsR0FBRyxDQUFDLEdBQUcsRUFBRTs7c0JBQ0QsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUNwQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMvQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7O0lBTU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3ZCLFNBQVMsQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ3pCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7O3NCQUNQLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDcEIsT0FBTyxFQUFFLENBQUM7b0JBQ1IsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVzt3QkFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUN4RCxDQUFDLENBQUMsS0FBSztvQkFDVCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ3RDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRTtpQkFDdkMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFPTSxZQUFZLENBQUMsUUFBUSxHQUFHLEtBQUs7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDOzs7OztJQU1NLFdBQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBTU0sUUFBUTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7O1lBbEZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7YUFDNUM7Ozs7NENBT0ksTUFBTSxTQUFDLGlCQUFpQjs0Q0FDeEIsUUFBUSxZQUNSLE1BQU0sU0FBQyxnQkFBZ0I7Ozs7O0lBUDFCLDBDQUEyQzs7SUFDM0MsMENBQXNEOztJQUN0RCxxREFBa0Q7O0lBR2hELHdDQUEyRDs7SUFDM0QseUNBRWdDOzs7OztBQXdFcEMsNkJBSUM7OztJQUhDLDhCQUFxQjs7SUFDckIsMkJBQWtCOztJQUNsQiwyQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpbnRlcnZhbCBhcyBvYnNlcnZhYmxlSW50ZXJ2YWwsXG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgT2JzZXJ2YWJsZSxcbiAgU3ViamVjdCxcbiAgb2YsXG4gIHRpbWVyLFxuICBtZXJnZVxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2aXR5TW9uaXRvciB9IGZyb20gJy4vYWN0aXZpdHktbW9uaXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQUNUSVZJVFlfTU9OSVRPUiB9IGZyb20gJy4vYWN0aXZpdHktbW9uaXRvci50b2tlbic7XG5pbXBvcnQgeyBJbmFjdGl2aXR5Q29uZmlnIH0gZnJvbSAnLi9pbmFjdGl2aXR5LWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSU5BQ1RJVklUWV9DT05GSUcgfSBmcm9tICcuL2luYWN0aXZpdHktY29uZmlnLnRva2VuJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHN3aXRjaE1hcCxcbiAgdGhyb3R0bGUsXG4gIG1hcCxcbiAgc3RhcnRXaXRoLFxuICBmaWx0ZXIsXG4gIHRha2VVbnRpbFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBkZXBzOiBbSU5BQ1RJVklUWV9DT05GSUcsIEFDVElWSVRZX01PTklUT1JdXG59KVxuZXhwb3J0IGNsYXNzIEluYWN0aXZpdHlUaW1lclNlcnZpY2Uge1xuICBwcml2YXRlIHRpbWVvdXQkOiBPYnNlcnZhYmxlPERhdGUgfCBuZXZlcj47XG4gIHByaXZhdGUgbW9uaXRvciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcml2YXRlIGFydGlmaWNpYWxBY3Rpdml0eSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSU5BQ1RJVklUWV9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBJbmFjdGl2aXR5Q29uZmlnLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChBQ1RJVklUWV9NT05JVE9SKVxuICAgIHByaXZhdGUgbW9uaXRvcjogQWN0aXZpdHlNb25pdG9yXG4gICkge1xuICAgIC8vIE1lcmdlIGFsbCBtb25pdG9ycyB0b2dldGhlciwgYW5kIGFjdGl2YXRlIHRoZW0gdmlhIHJlZ2lzdGVyKClcbiAgICB0aGlzLnRpbWVvdXQkID0gdGhpcy5tb25pdG9yJC5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIHN3aXRjaE1hcChtID0+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKHRoaXMubW9uaXRvci5nZXRNb25pdG9yKCksIHRoaXMuYXJ0aWZpY2lhbEFjdGl2aXR5JCkucGlwZShcbiAgICAgICAgICB0aHJvdHRsZSgoKSA9PiBvYnNlcnZhYmxlSW50ZXJ2YWwoNTAwKSksIC8vIFRocm90dGxlIC0gdG8gc3RvcCBzcGFtbWluZ1xuICAgICAgICAgIHN0YXJ0V2l0aCh1bmRlZmluZWQpLCAvLyBUcmlnZ2VyIG9ic2VydmFibGUgaW1tZWRpYXRlbHlcbiAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBkLnNldE1pbnV0ZXMoZC5nZXRNaW51dGVzKCkgKyBjb25maWcuaW5hY3Rpdml0eVRpbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMubW9uaXRvciQucGlwZShmaWx0ZXIoeCA9PiAheCkpKVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIFRpbWVvdXQgb2JqZWN0cyBkZXNjcmliaW5nIGN1cnJlbnQgdGltZW91dCBzdGF0ZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFRpbWVvdXQ+XG4gICAqL1xuICBwdWJsaWMgZ2V0VGltZU91dCgpOiBPYnNlcnZhYmxlPFRpbWVvdXQ+IHtcbiAgICByZXR1cm4gdGhpcy50aW1lb3V0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChkYXRlOiBEYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aW1lcigwLCA2MDAwMCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZiA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gb2Yoe1xuICAgICAgICAgICAgICBzaG93V2FybmluZzogdGhpcy5jb25maWcud2FybmluZ1RpbWVcbiAgICAgICAgICAgICAgICA/IGYuZ2V0VGltZSgpICsgdGhpcy5jb25maWcud2FybmluZ1RpbWUgPiBkYXRlLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgIHRpbWVkT3V0OiBmLmdldFRpbWUoKSA+IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICB0aW1lTGVmdDogZGF0ZS5nZXRUaW1lKCkgLSBmLmdldFRpbWUoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbGlzdGVuaW5nIGZvciBhY3Rpdml0eS5cbiAgICogQHBhcmFtIGFjdGl2YXRlPWZhbHNlLiBJZiB0cnVlIHdpbGwgcmVzZXQgdGhlIGFjdGl2aXR5IHRpbWVyIGFzIGFueSBvdGhlciBhY3Rpdml0eS5cbiAgICogQHJldHVybnMgdm9pZFxuICAgKi9cbiAgcHVibGljIHN0YXJ0TW9uaXRvcihhY3RpdmF0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5tb25pdG9yJC5uZXh0KHRydWUpO1xuICAgIGlmIChhY3RpdmF0ZSkge1xuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyBsaXN0ZW5pbmcgZm9yIGFjdGl2aXR5LlxuICAgKiBAcmV0dXJucyB2b2lkXG4gICAqL1xuICBwdWJsaWMgc3RvcE1vbml0b3IoKTogdm9pZCB7XG4gICAgdGhpcy5tb25pdG9yJC5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIHByb2dyYW1tYXRpYyB3YXkgb2Ygc2ltdWxhdGluZyBhY3Rpdml0eS5cbiAgICogV2lsbCByZXNldCB0aGUgYWN0aXZpdHkgdGltZXIgYXMgYW55IG90aGVyIGFjdGl2aXR5LlxuICAgKi9cbiAgcHVibGljIGFjdGl2YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuYXJ0aWZpY2lhbEFjdGl2aXR5JC5uZXh0KHVuZGVmaW5lZCk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaW1lb3V0IHtcbiAgc2hvd1dhcm5pbmc6IGJvb2xlYW47XG4gIHRpbWVkT3V0OiBib29sZWFuO1xuICB0aW1lTGVmdDogbnVtYmVyO1xufVxuIl19