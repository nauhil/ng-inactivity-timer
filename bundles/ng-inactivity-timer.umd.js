(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-inactivity-timer', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global['ng-inactivity-timer'] = {}),global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,i0,rxjs,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ACTIVITY_MONITOR = new i0.InjectionToken('Activity Monitor');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INACTIVITY_CONFIG = new i0.InjectionToken('Inactivity Configuration');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var InactivityTimerService = /** @class */ (function () {
        function InactivityTimerService(config, monitor) {
            var _this = this;
            this.config = config;
            this.monitor = monitor;
            this.monitor$ = new rxjs.BehaviorSubject(true);
            this.artificialActivity$ = new rxjs.Subject();
            // Merge all monitors together, and activate them via register()
            this.timeout$ = this.monitor$.pipe(operators.filter(function (x) { return !!x; }), operators.switchMap(function (m) {
                return rxjs.merge(_this.monitor.getMonitor(), _this.artificialActivity$).pipe(operators.throttle(function () { return rxjs.interval(500); }), // Throttle - to stop spamming
                operators.startWith(undefined), // Trigger observable immediately
                operators.map(function () {
                    /** @type {?} */
                    var d = new Date();
                    d.setMinutes(d.getMinutes() + config.inactivityTime);
                    return d;
                }), operators.takeUntil(_this.monitor$.pipe(operators.filter(function (x) { return !x; }))));
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
                return this.timeout$.pipe(operators.switchMap(function (date) {
                    return rxjs.timer(0, 60000).pipe(operators.switchMap(function () {
                        /** @type {?} */
                        var f = new Date();
                        return rxjs.of({
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
                if (activate === void 0) {
                    activate = false;
                }
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                        deps: [INACTIVITY_CONFIG, ACTIVITY_MONITOR]
                    },] }
        ];
        /** @nocollapse */
        InactivityTimerService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [INACTIVITY_CONFIG,] }] },
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [ACTIVITY_MONITOR,] }] }
            ];
        };
        /** @nocollapse */ InactivityTimerService.ngInjectableDef = i0.defineInjectable({ factory: function InactivityTimerService_Factory() { return new InactivityTimerService(i0.inject(INACTIVITY_CONFIG), i0.inject(ACTIVITY_MONITOR, 8)); }, token: InactivityTimerService, providedIn: "root" });
        return InactivityTimerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.ACTIVITY_MONITOR = ACTIVITY_MONITOR;
    exports.INACTIVITY_CONFIG = INACTIVITY_CONFIG;
    exports.InactivityTimerService = InactivityTimerService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW5hY3Rpdml0eS10aW1lci51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLWluYWN0aXZpdHktdGltZXIvbGliL2FjdGl2aXR5LW1vbml0b3IudG9rZW4udHMiLCJuZzovL25nLWluYWN0aXZpdHktdGltZXIvbGliL2luYWN0aXZpdHktY29uZmlnLnRva2VuLnRzIiwibmc6Ly9uZy1pbmFjdGl2aXR5LXRpbWVyL2xpYi9pbmFjdGl2aXR5LXRpbWVyLnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2aXR5TW9uaXRvciB9IGZyb20gJy4vYWN0aXZpdHktbW9uaXRvci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgQUNUSVZJVFlfTU9OSVRPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBY3Rpdml0eU1vbml0b3I+KFxuICAnQWN0aXZpdHkgTW9uaXRvcidcbik7XG4iLCJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5hY3Rpdml0eUNvbmZpZyB9IGZyb20gJy4vaW5hY3Rpdml0eS1jb25maWcuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IElOQUNUSVZJVFlfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEluYWN0aXZpdHlDb25maWc+KFxuICAnSW5hY3Rpdml0eSBDb25maWd1cmF0aW9uJ1xuKTtcbiIsImltcG9ydCB7XG4gIGludGVydmFsIGFzIG9ic2VydmFibGVJbnRlcnZhbCxcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBPYnNlcnZhYmxlLFxuICBTdWJqZWN0LFxuICBvZixcbiAgdGltZXIsXG4gIG1lcmdlXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aXZpdHlNb25pdG9yIH0gZnJvbSAnLi9hY3Rpdml0eS1tb25pdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBQ1RJVklUWV9NT05JVE9SIH0gZnJvbSAnLi9hY3Rpdml0eS1tb25pdG9yLnRva2VuJztcbmltcG9ydCB7IEluYWN0aXZpdHlDb25maWcgfSBmcm9tICcuL2luYWN0aXZpdHktY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBJTkFDVElWSVRZX0NPTkZJRyB9IGZyb20gJy4vaW5hY3Rpdml0eS1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgc3dpdGNoTWFwLFxuICB0aHJvdHRsZSxcbiAgbWFwLFxuICBzdGFydFdpdGgsXG4gIGZpbHRlcixcbiAgdGFrZVVudGlsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIGRlcHM6IFtJTkFDVElWSVRZX0NPTkZJRywgQUNUSVZJVFlfTU9OSVRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSW5hY3Rpdml0eVRpbWVyU2VydmljZSB7XG4gIHByaXZhdGUgdGltZW91dCQ6IE9ic2VydmFibGU8RGF0ZSB8IG5ldmVyPjtcbiAgcHJpdmF0ZSBtb25pdG9yJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByaXZhdGUgYXJ0aWZpY2lhbEFjdGl2aXR5JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChJTkFDVElWSVRZX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEluYWN0aXZpdHlDb25maWcsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KEFDVElWSVRZX01PTklUT1IpXG4gICAgcHJpdmF0ZSBtb25pdG9yOiBBY3Rpdml0eU1vbml0b3JcbiAgKSB7XG4gICAgLy8gTWVyZ2UgYWxsIG1vbml0b3JzIHRvZ2V0aGVyLCBhbmQgYWN0aXZhdGUgdGhlbSB2aWEgcmVnaXN0ZXIoKVxuICAgIHRoaXMudGltZW91dCQgPSB0aGlzLm1vbml0b3IkLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgc3dpdGNoTWFwKG0gPT4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UodGhpcy5tb25pdG9yLmdldE1vbml0b3IoKSwgdGhpcy5hcnRpZmljaWFsQWN0aXZpdHkkKS5waXBlKFxuICAgICAgICAgIHRocm90dGxlKCgpID0+IG9ic2VydmFibGVJbnRlcnZhbCg1MDApKSwgLy8gVGhyb3R0bGUgLSB0byBzdG9wIHNwYW1taW5nXG4gICAgICAgICAgc3RhcnRXaXRoKHVuZGVmaW5lZCksIC8vIFRyaWdnZXIgb2JzZXJ2YWJsZSBpbW1lZGlhdGVseVxuICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGQuc2V0TWludXRlcyhkLmdldE1pbnV0ZXMoKSArIGNvbmZpZy5pbmFjdGl2aXR5VGltZSk7XG4gICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5tb25pdG9yJC5waXBlKGZpbHRlcih4ID0+ICF4KSkpXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgVGltZW91dCBvYmplY3RzIGRlc2NyaWJpbmcgY3VycmVudCB0aW1lb3V0IHN0YXRlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGU8VGltZW91dD5cbiAgICovXG4gIHB1YmxpYyBnZXRUaW1lT3V0KCk6IE9ic2VydmFibGU8VGltZW91dD4ge1xuICAgIHJldHVybiB0aGlzLnRpbWVvdXQkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGRhdGU6IERhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRpbWVyKDAsIDYwMDAwKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiBvZih7XG4gICAgICAgICAgICAgIHNob3dXYXJuaW5nOiB0aGlzLmNvbmZpZy53YXJuaW5nVGltZVxuICAgICAgICAgICAgICAgID8gZi5nZXRUaW1lKCkgKyB0aGlzLmNvbmZpZy53YXJuaW5nVGltZSA+IGRhdGUuZ2V0VGltZSgpXG4gICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgdGltZWRPdXQ6IGYuZ2V0VGltZSgpID4gZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgIHRpbWVMZWZ0OiBkYXRlLmdldFRpbWUoKSAtIGYuZ2V0VGltZSgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBsaXN0ZW5pbmcgZm9yIGFjdGl2aXR5LlxuICAgKiBAcGFyYW0gYWN0aXZhdGU9ZmFsc2UuIElmIHRydWUgd2lsbCByZXNldCB0aGUgYWN0aXZpdHkgdGltZXIgYXMgYW55IG90aGVyIGFjdGl2aXR5LlxuICAgKiBAcmV0dXJucyB2b2lkXG4gICAqL1xuICBwdWJsaWMgc3RhcnRNb25pdG9yKGFjdGl2YXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLm1vbml0b3IkLm5leHQodHJ1ZSk7XG4gICAgaWYgKGFjdGl2YXRlKSB7XG4gICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIGxpc3RlbmluZyBmb3IgYWN0aXZpdHkuXG4gICAqIEByZXR1cm5zIHZvaWRcbiAgICovXG4gIHB1YmxpYyBzdG9wTW9uaXRvcigpOiB2b2lkIHtcbiAgICB0aGlzLm1vbml0b3IkLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGEgcHJvZ3JhbW1hdGljIHdheSBvZiBzaW11bGF0aW5nIGFjdGl2aXR5LlxuICAgKiBXaWxsIHJlc2V0IHRoZSBhY3Rpdml0eSB0aW1lciBhcyBhbnkgb3RoZXIgYWN0aXZpdHkuXG4gICAqL1xuICBwdWJsaWMgYWN0aXZhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5hcnRpZmljaWFsQWN0aXZpdHkkLm5leHQodW5kZWZpbmVkKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVvdXQge1xuICBzaG93V2FybmluZzogYm9vbGVhbjtcbiAgdGltZWRPdXQ6IGJvb2xlYW47XG4gIHRpbWVMZWZ0OiBudW1iZXI7XG59XG4iXSwibmFtZXMiOlsiSW5qZWN0aW9uVG9rZW4iLCJCZWhhdmlvclN1YmplY3QiLCJTdWJqZWN0IiwiZmlsdGVyIiwic3dpdGNoTWFwIiwibWVyZ2UiLCJ0aHJvdHRsZSIsIm9ic2VydmFibGVJbnRlcnZhbCIsInN0YXJ0V2l0aCIsIm1hcCIsInRha2VVbnRpbCIsInRpbWVyIiwib2YiLCJJbmplY3RhYmxlIiwiSW5qZWN0IiwiT3B0aW9uYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUdBLFFBQWEsZ0JBQWdCLEdBQUcsSUFBSUEsaUJBQWMsQ0FDaEQsa0JBQWtCLENBQ25COzs7Ozs7QUNMRDtBQUdBLFFBQWEsaUJBQWlCLEdBQUcsSUFBSUEsaUJBQWMsQ0FDakQsMEJBQTBCLENBQzNCOzs7Ozs7QUNMRDtRQWdDRSxnQ0FDcUMsTUFBd0IsRUFHbkQsT0FBd0I7WUFKbEMsaUJBc0JDO1lBckJvQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtZQUduRCxZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQVAxQixhQUFRLEdBQUcsSUFBSUMsb0JBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztZQUM5Qyx3QkFBbUIsR0FBRyxJQUFJQyxZQUFPLEVBQVEsQ0FBQzs7WUFTaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaENDLGdCQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxHQUFBLENBQUMsRUFDaEJDLG1CQUFTLENBQUMsVUFBQSxDQUFDO2dCQUNULE9B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