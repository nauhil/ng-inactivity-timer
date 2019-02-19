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
var ACTIVITY_MONITOR = new InjectionToken('Activity Monitor');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var INACTIVITY_CONFIG = new InjectionToken('Inactivity Configuration');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var InactivityTimerService = /** @class */ (function () {
    function InactivityTimerService(config, monitor) {
        var _this = this;
        this.config = config;
        this.monitor = monitor;
        this.monitor$ = new BehaviorSubject(true);
        this.artificialActivity$ = new Subject();
        // Merge all monitors together, and activate them via register()
        this.timeout$ = this.monitor$.pipe(filter(function (x) { return !!x; }), switchMap(function (m) {
            return merge(_this.monitor.getMonitor(), _this.artificialActivity$).pipe(throttle(function () { return interval(500); }), // Throttle - to stop spamming
            startWith(undefined), // Trigger observable immediately
            map(function () {
                /** @type {?} */
                var d = new Date();
                d.setMinutes(d.getMinutes() + config.inactivityTime);
                return d;
            }), takeUntil(_this.monitor$.pipe(filter(function (x) { return !x; }))));
        }));
    }
    /**
     * Emits Timeout objects describing current timeout state
     * @returns Observable<Timeout>
     */
    /**
     * Emits Timeout objects describing current timeout state
     * @return {?} Observable<Timeout>
     */
    InactivityTimerService.prototype.getTimeOut = /**
     * Emits Timeout objects describing current timeout state
     * @return {?} Observable<Timeout>
     */
    function () {
        var _this = this;
        return this.timeout$.pipe(switchMap(function (date) {
            return timer(0, 60000).pipe(switchMap(function () {
                /** @type {?} */
                var f = new Date();
                return of({
                    showWarning: _this.config.warningTime
                        ? f.getTime() + _this.config.warningTime > date.getTime()
                        : false,
                    timedOut: f.getTime() > date.getTime(),
                    timeLeft: date.getTime() - f.getTime()
                });
            }));
        }));
    };
    /**
     * Starts listening for activity.
     * @param activate=false. If true will reset the activity timer as any other activity.
     * @returns void
     */
    /**
     * Starts listening for activity.
     * @param {?=} activate
     * @return {?} void
     */
    InactivityTimerService.prototype.startMonitor = /**
     * Starts listening for activity.
     * @param {?=} activate
     * @return {?} void
     */
    function (activate) {
        if (activate === void 0) { activate = false; }
        this.monitor$.next(true);
        if (activate) {
            this.activate();
        }
    };
    /**
     * Stops listening for activity.
     * @returns void
     */
    /**
     * Stops listening for activity.
     * @return {?} void
     */
    InactivityTimerService.prototype.stopMonitor = /**
     * Stops listening for activity.
     * @return {?} void
     */
    function () {
        this.monitor$.next(false);
    };
    /**
     * Provides a programmatic way of simulating activity.
     * Will reset the activity timer as any other activity.
     */
    /**
     * Provides a programmatic way of simulating activity.
     * Will reset the activity timer as any other activity.
     * @return {?}
     */
    InactivityTimerService.prototype.activate = /**
     * Provides a programmatic way of simulating activity.
     * Will reset the activity timer as any other activity.
     * @return {?}
     */
    function () {
        this.artificialActivity$.next(undefined);
    };
    InactivityTimerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    deps: [INACTIVITY_CONFIG, ACTIVITY_MONITOR]
                },] }
    ];
    /** @nocollapse */
    InactivityTimerService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [INACTIVITY_CONFIG,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ACTIVITY_MONITOR,] }] }
    ]; };
    /** @nocollapse */ InactivityTimerService.ngInjectableDef = defineInjectable({ factory: function InactivityTimerService_Factory() { return new InactivityTimerService(inject(INACTIVITY_CONFIG), inject(ACTIVITY_MONITOR, 8)); }, token: InactivityTimerService, providedIn: "root" });
    return InactivityTimerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ACTIVITY_MONITOR, INACTIVITY_CONFIG, InactivityTimerService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW5hY3Rpdml0eS10aW1lci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctaW5hY3Rpdml0eS10aW1lci9saWIvYWN0aXZpdHktbW9uaXRvci50b2tlbi50cyIsIm5nOi8vbmctaW5hY3Rpdml0eS10aW1lci9saWIvaW5hY3Rpdml0eS1jb25maWcudG9rZW4udHMiLCJuZzovL25nLWluYWN0aXZpdHktdGltZXIvbGliL2luYWN0aXZpdHktdGltZXIuc2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZpdHlNb25pdG9yIH0gZnJvbSAnLi9hY3Rpdml0eS1tb25pdG9yLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBBQ1RJVklUWV9NT05JVE9SID0gbmV3IEluamVjdGlvblRva2VuPEFjdGl2aXR5TW9uaXRvcj4oXG4gICdBY3Rpdml0eSBNb25pdG9yJ1xuKTtcbiIsImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmFjdGl2aXR5Q29uZmlnIH0gZnJvbSAnLi9pbmFjdGl2aXR5LWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgSU5BQ1RJVklUWV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48SW5hY3Rpdml0eUNvbmZpZz4oXG4gICdJbmFjdGl2aXR5IENvbmZpZ3VyYXRpb24nXG4pO1xuIiwiaW1wb3J0IHtcbiAgaW50ZXJ2YWwgYXMgb2JzZXJ2YWJsZUludGVydmFsLFxuICBCZWhhdmlvclN1YmplY3QsXG4gIE9ic2VydmFibGUsXG4gIFN1YmplY3QsXG4gIG9mLFxuICB0aW1lcixcbiAgbWVyZ2Vcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpdml0eU1vbml0b3IgfSBmcm9tICcuL2FjdGl2aXR5LW1vbml0b3IuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFDVElWSVRZX01PTklUT1IgfSBmcm9tICcuL2FjdGl2aXR5LW1vbml0b3IudG9rZW4nO1xuaW1wb3J0IHsgSW5hY3Rpdml0eUNvbmZpZyB9IGZyb20gJy4vaW5hY3Rpdml0eS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IElOQUNUSVZJVFlfQ09ORklHIH0gZnJvbSAnLi9pbmFjdGl2aXR5LWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBzd2l0Y2hNYXAsXG4gIHRocm90dGxlLFxuICBtYXAsXG4gIHN0YXJ0V2l0aCxcbiAgZmlsdGVyLFxuICB0YWtlVW50aWxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgZGVwczogW0lOQUNUSVZJVFlfQ09ORklHLCBBQ1RJVklUWV9NT05JVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBJbmFjdGl2aXR5VGltZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB0aW1lb3V0JDogT2JzZXJ2YWJsZTxEYXRlIHwgbmV2ZXI+O1xuICBwcml2YXRlIG1vbml0b3IkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJpdmF0ZSBhcnRpZmljaWFsQWN0aXZpdHkkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KElOQUNUSVZJVFlfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogSW5hY3Rpdml0eUNvbmZpZyxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoQUNUSVZJVFlfTU9OSVRPUilcbiAgICBwcml2YXRlIG1vbml0b3I6IEFjdGl2aXR5TW9uaXRvclxuICApIHtcbiAgICAvLyBNZXJnZSBhbGwgbW9uaXRvcnMgdG9nZXRoZXIsIGFuZCBhY3RpdmF0ZSB0aGVtIHZpYSByZWdpc3RlcigpXG4gICAgdGhpcy50aW1lb3V0JCA9IHRoaXMubW9uaXRvciQucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBzd2l0Y2hNYXAobSA9PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSh0aGlzLm1vbml0b3IuZ2V0TW9uaXRvcigpLCB0aGlzLmFydGlmaWNpYWxBY3Rpdml0eSQpLnBpcGUoXG4gICAgICAgICAgdGhyb3R0bGUoKCkgPT4gb2JzZXJ2YWJsZUludGVydmFsKDUwMCkpLCAvLyBUaHJvdHRsZSAtIHRvIHN0b3Agc3BhbW1pbmdcbiAgICAgICAgICBzdGFydFdpdGgodW5kZWZpbmVkKSwgLy8gVHJpZ2dlciBvYnNlcnZhYmxlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZC5zZXRNaW51dGVzKGQuZ2V0TWludXRlcygpICsgY29uZmlnLmluYWN0aXZpdHlUaW1lKTtcbiAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLm1vbml0b3IkLnBpcGUoZmlsdGVyKHggPT4gIXgpKSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBUaW1lb3V0IG9iamVjdHMgZGVzY3JpYmluZyBjdXJyZW50IHRpbWVvdXQgc3RhdGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxUaW1lb3V0PlxuICAgKi9cbiAgcHVibGljIGdldFRpbWVPdXQoKTogT2JzZXJ2YWJsZTxUaW1lb3V0PiB7XG4gICAgcmV0dXJuIHRoaXMudGltZW91dCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZGF0ZTogRGF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGltZXIoMCwgNjAwMDApLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGYgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG9mKHtcbiAgICAgICAgICAgICAgc2hvd1dhcm5pbmc6IHRoaXMuY29uZmlnLndhcm5pbmdUaW1lXG4gICAgICAgICAgICAgICAgPyBmLmdldFRpbWUoKSArIHRoaXMuY29uZmlnLndhcm5pbmdUaW1lID4gZGF0ZS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICB0aW1lZE91dDogZi5nZXRUaW1lKCkgPiBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgdGltZUxlZnQ6IGRhdGUuZ2V0VGltZSgpIC0gZi5nZXRUaW1lKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGxpc3RlbmluZyBmb3IgYWN0aXZpdHkuXG4gICAqIEBwYXJhbSBhY3RpdmF0ZT1mYWxzZS4gSWYgdHJ1ZSB3aWxsIHJlc2V0IHRoZSBhY3Rpdml0eSB0aW1lciBhcyBhbnkgb3RoZXIgYWN0aXZpdHkuXG4gICAqIEByZXR1cm5zIHZvaWRcbiAgICovXG4gIHB1YmxpYyBzdGFydE1vbml0b3IoYWN0aXZhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMubW9uaXRvciQubmV4dCh0cnVlKTtcbiAgICBpZiAoYWN0aXZhdGUpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgbGlzdGVuaW5nIGZvciBhY3Rpdml0eS5cbiAgICogQHJldHVybnMgdm9pZFxuICAgKi9cbiAgcHVibGljIHN0b3BNb25pdG9yKCk6IHZvaWQge1xuICAgIHRoaXMubW9uaXRvciQubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvdmlkZXMgYSBwcm9ncmFtbWF0aWMgd2F5IG9mIHNpbXVsYXRpbmcgYWN0aXZpdHkuXG4gICAqIFdpbGwgcmVzZXQgdGhlIGFjdGl2aXR5IHRpbWVyIGFzIGFueSBvdGhlciBhY3Rpdml0eS5cbiAgICovXG4gIHB1YmxpYyBhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmFydGlmaWNpYWxBY3Rpdml0eSQubmV4dCh1bmRlZmluZWQpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZW91dCB7XG4gIHNob3dXYXJuaW5nOiBib29sZWFuO1xuICB0aW1lZE91dDogYm9vbGVhbjtcbiAgdGltZUxlZnQ6IG51bWJlcjtcbn1cbiJdLCJuYW1lcyI6WyJvYnNlcnZhYmxlSW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUdBLElBQWEsZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQ2hELGtCQUFrQixDQUNuQjs7Ozs7Ozs7Ozs7QUNMRDtBQUdBLElBQWEsaUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQ2pELDBCQUEwQixDQUMzQjs7Ozs7O0FDTEQ7SUFnQ0UsZ0NBQ3FDLE1BQXdCLEVBR25ELE9BQXdCO1FBSmxDLGlCQXNCQztRQXJCb0MsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFHbkQsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFQMUIsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO1FBQzlDLHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7O1FBU2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxFQUNoQixTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ1QsT0FBTyxLQUFLLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQ3BFLFFBQVEsQ0FBQyxjQUFNLE9BQUFBLFFBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQztZQUN2QyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ3BCLEdBQUcsQ0FBQzs7b0JBQ0ksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUNwQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxDQUFDO2FBQ1YsQ0FBQyxFQUNGLFNBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBQSxDQUFDLENBQUMsQ0FBQyxDQUMvQyxDQUFDO1NBQ0gsQ0FBQyxDQUNILENBQUM7S0FDSDs7Ozs7Ozs7O0lBTU0sMkNBQVU7Ozs7SUFBakI7UUFBQSxpQkFpQkM7UUFoQkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDdkIsU0FBUyxDQUFDLFVBQUMsSUFBVTtZQUNuQixPQUFPLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUN6QixTQUFTLENBQUM7O29CQUNGLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDcEIsT0FBTyxFQUFFLENBQUM7b0JBQ1IsV0FBVyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVzswQkFDaEMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7MEJBQ3RELEtBQUs7b0JBQ1QsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUN0QyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUU7aUJBQ3ZDLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FDSCxDQUFDO1NBQ0gsQ0FBQyxDQUNILENBQUM7S0FDSDs7Ozs7Ozs7Ozs7SUFPTSw2Q0FBWTs7Ozs7SUFBbkIsVUFBb0IsUUFBZ0I7UUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7Ozs7Ozs7O0lBTU0sNENBQVc7Ozs7SUFBbEI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjs7Ozs7Ozs7OztJQU1NLHlDQUFROzs7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMxQzs7Z0JBbEZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7aUJBQzVDOzs7O2dEQU9JLE1BQU0sU0FBQyxpQkFBaUI7Z0RBQ3hCLFFBQVEsWUFDUixNQUFNLFNBQUMsZ0JBQWdCOzs7aUNBbkM1QjtDQXVCQTs7Ozs7Ozs7Ozs7Ozs7In0=