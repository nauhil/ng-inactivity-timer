import { InjectionToken, Inject, Injectable, Optional, defineInjectable, inject } from '@angular/core';
import { interval, BehaviorSubject, Subject, of, timer, merge } from 'rxjs';
import { switchMap, throttle, map, startWith, filter, takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const ACTIVITY_MONITOR = new InjectionToken('Activity Monitor');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const INACTIVITY_CONFIG = new InjectionToken('Inactivity Configuration');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class InactivityTimerService {
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
            return merge(this.monitor.getMonitor(), this.artificialActivity$).pipe(throttle(() => interval(500)), // Throttle - to stop spamming
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
/** @nocollapse */ InactivityTimerService.ngInjectableDef = defineInjectable({ factory: function InactivityTimerService_Factory() { return new InactivityTimerService(inject(INACTIVITY_CONFIG), inject(ACTIVITY_MONITOR, 8)); }, token: InactivityTimerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ACTIVITY_MONITOR, INACTIVITY_CONFIG, InactivityTimerService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW5hY3Rpdml0eS10aW1lci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctaW5hY3Rpdml0eS10aW1lci9saWIvYWN0aXZpdHktbW9uaXRvci50b2tlbi50cyIsIm5nOi8vbmctaW5hY3Rpdml0eS10aW1lci9saWIvaW5hY3Rpdml0eS1jb25maWcudG9rZW4udHMiLCJuZzovL25nLWluYWN0aXZpdHktdGltZXIvbGliL2luYWN0aXZpdHktdGltZXIuc2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZpdHlNb25pdG9yIH0gZnJvbSAnLi9hY3Rpdml0eS1tb25pdG9yLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBBQ1RJVklUWV9NT05JVE9SID0gbmV3IEluamVjdGlvblRva2VuPEFjdGl2aXR5TW9uaXRvcj4oXG4gICdBY3Rpdml0eSBNb25pdG9yJ1xuKTtcbiIsImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmFjdGl2aXR5Q29uZmlnIH0gZnJvbSAnLi9pbmFjdGl2aXR5LWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgSU5BQ1RJVklUWV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48SW5hY3Rpdml0eUNvbmZpZz4oXG4gICdJbmFjdGl2aXR5IENvbmZpZ3VyYXRpb24nXG4pO1xuIiwiaW1wb3J0IHtcbiAgaW50ZXJ2YWwgYXMgb2JzZXJ2YWJsZUludGVydmFsLFxuICBCZWhhdmlvclN1YmplY3QsXG4gIE9ic2VydmFibGUsXG4gIFN1YmplY3QsXG4gIG9mLFxuICB0aW1lcixcbiAgbWVyZ2Vcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpdml0eU1vbml0b3IgfSBmcm9tICcuL2FjdGl2aXR5LW1vbml0b3IuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFDVElWSVRZX01PTklUT1IgfSBmcm9tICcuL2FjdGl2aXR5LW1vbml0b3IudG9rZW4nO1xuaW1wb3J0IHsgSW5hY3Rpdml0eUNvbmZpZyB9IGZyb20gJy4vaW5hY3Rpdml0eS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IElOQUNUSVZJVFlfQ09ORklHIH0gZnJvbSAnLi9pbmFjdGl2aXR5LWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBzd2l0Y2hNYXAsXG4gIHRocm90dGxlLFxuICBtYXAsXG4gIHN0YXJ0V2l0aCxcbiAgZmlsdGVyLFxuICB0YWtlVW50aWxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgZGVwczogW0lOQUNUSVZJVFlfQ09ORklHLCBBQ1RJVklUWV9NT05JVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBJbmFjdGl2aXR5VGltZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB0aW1lb3V0JDogT2JzZXJ2YWJsZTxEYXRlIHwgbmV2ZXI+O1xuICBwcml2YXRlIG1vbml0b3IkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJpdmF0ZSBhcnRpZmljaWFsQWN0aXZpdHkkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KElOQUNUSVZJVFlfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogSW5hY3Rpdml0eUNvbmZpZyxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoQUNUSVZJVFlfTU9OSVRPUilcbiAgICBwcml2YXRlIG1vbml0b3I6IEFjdGl2aXR5TW9uaXRvclxuICApIHtcbiAgICAvLyBNZXJnZSBhbGwgbW9uaXRvcnMgdG9nZXRoZXIsIGFuZCBhY3RpdmF0ZSB0aGVtIHZpYSByZWdpc3RlcigpXG4gICAgdGhpcy50aW1lb3V0JCA9IHRoaXMubW9uaXRvciQucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBzd2l0Y2hNYXAobSA9PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSh0aGlzLm1vbml0b3IuZ2V0TW9uaXRvcigpLCB0aGlzLmFydGlmaWNpYWxBY3Rpdml0eSQpLnBpcGUoXG4gICAgICAgICAgdGhyb3R0bGUoKCkgPT4gb2JzZXJ2YWJsZUludGVydmFsKDUwMCkpLCAvLyBUaHJvdHRsZSAtIHRvIHN0b3Agc3BhbW1pbmdcbiAgICAgICAgICBzdGFydFdpdGgodW5kZWZpbmVkKSwgLy8gVHJpZ2dlciBvYnNlcnZhYmxlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZC5zZXRNaW51dGVzKGQuZ2V0TWludXRlcygpICsgY29uZmlnLmluYWN0aXZpdHlUaW1lKTtcbiAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLm1vbml0b3IkLnBpcGUoZmlsdGVyKHggPT4gIXgpKSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBUaW1lb3V0IG9iamVjdHMgZGVzY3JpYmluZyBjdXJyZW50IHRpbWVvdXQgc3RhdGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxUaW1lb3V0PlxuICAgKi9cbiAgcHVibGljIGdldFRpbWVPdXQoKTogT2JzZXJ2YWJsZTxUaW1lb3V0PiB7XG4gICAgcmV0dXJuIHRoaXMudGltZW91dCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZGF0ZTogRGF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGltZXIoMCwgNjAwMDApLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGYgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG9mKHtcbiAgICAgICAgICAgICAgc2hvd1dhcm5pbmc6IHRoaXMuY29uZmlnLndhcm5pbmdUaW1lXG4gICAgICAgICAgICAgICAgPyBmLmdldFRpbWUoKSArIHRoaXMuY29uZmlnLndhcm5pbmdUaW1lID4gZGF0ZS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICB0aW1lZE91dDogZi5nZXRUaW1lKCkgPiBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgdGltZUxlZnQ6IGRhdGUuZ2V0VGltZSgpIC0gZi5nZXRUaW1lKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGxpc3RlbmluZyBmb3IgYWN0aXZpdHkuXG4gICAqIEBwYXJhbSBhY3RpdmF0ZT1mYWxzZS4gSWYgdHJ1ZSB3aWxsIHJlc2V0IHRoZSBhY3Rpdml0eSB0aW1lciBhcyBhbnkgb3RoZXIgYWN0aXZpdHkuXG4gICAqIEByZXR1cm5zIHZvaWRcbiAgICovXG4gIHB1YmxpYyBzdGFydE1vbml0b3IoYWN0aXZhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMubW9uaXRvciQubmV4dCh0cnVlKTtcbiAgICBpZiAoYWN0aXZhdGUpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgbGlzdGVuaW5nIGZvciBhY3Rpdml0eS5cbiAgICogQHJldHVybnMgdm9pZFxuICAgKi9cbiAgcHVibGljIHN0b3BNb25pdG9yKCk6IHZvaWQge1xuICAgIHRoaXMubW9uaXRvciQubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvdmlkZXMgYSBwcm9ncmFtbWF0aWMgd2F5IG9mIHNpbXVsYXRpbmcgYWN0aXZpdHkuXG4gICAqIFdpbGwgcmVzZXQgdGhlIGFjdGl2aXR5IHRpbWVyIGFzIGFueSBvdGhlciBhY3Rpdml0eS5cbiAgICovXG4gIHB1YmxpYyBhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmFydGlmaWNpYWxBY3Rpdml0eSQubmV4dCh1bmRlZmluZWQpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZW91dCB7XG4gIHNob3dXYXJuaW5nOiBib29sZWFuO1xuICB0aW1lZE91dDogYm9vbGVhbjtcbiAgdGltZUxlZnQ6IG51bWJlcjtcbn1cbiJdLCJuYW1lcyI6WyJvYnNlcnZhYmxlSW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUdBLE1BQWEsZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQ2hELGtCQUFrQixDQUNuQjs7Ozs7Ozs7Ozs7QUNMRDtBQUdBLE1BQWEsaUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQ2pELDBCQUEwQixDQUMzQjs7Ozs7O0FDTEQsTUEyQmEsc0JBQXNCOzs7OztJQUtqQyxZQUNxQyxNQUF3QixFQUduRCxPQUF3QjtRQUhHLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBR25ELFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBUDFCLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztRQUM5Qyx3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDOztRQVNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDaEIsU0FBUyxDQUFDLENBQUM7WUFDVCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FDcEUsUUFBUSxDQUFDLE1BQU1BLFFBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUNwQixHQUFHLENBQUM7O3NCQUNJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDcEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNyRCxPQUFPLENBQUMsQ0FBQzthQUNWLENBQUMsRUFDRixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDL0MsQ0FBQztTQUNILENBQUMsQ0FDSCxDQUFDO0tBQ0g7Ozs7O0lBTU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3ZCLFNBQVMsQ0FBQyxDQUFDLElBQVU7WUFDbkIsT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDekIsU0FBUyxDQUFDOztzQkFDRixDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO29CQUNSLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7MEJBQ2hDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFOzBCQUN0RCxLQUFLO29CQUNULFFBQVEsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDdEMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFO2lCQUN2QyxDQUFDLENBQUM7YUFDSixDQUFDLENBQ0gsQ0FBQztTQUNILENBQUMsQ0FDSCxDQUFDO0tBQ0g7Ozs7OztJQU9NLFlBQVksQ0FBQyxRQUFRLEdBQUcsS0FBSztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtLQUNGOzs7OztJQU1NLFdBQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7Ozs7OztJQU1NLFFBQVE7UUFDYixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzFDOzs7WUFsRkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQzthQUM1Qzs7Ozs0Q0FPSSxNQUFNLFNBQUMsaUJBQWlCOzRDQUN4QixRQUFRLFlBQ1IsTUFBTSxTQUFDLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7OzsifQ==