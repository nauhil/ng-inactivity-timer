# ng-inactivity-timer

## Description

ng-inactivity-timer provides a service that keeps track of user activity based on custom activity monitors.

## Installation

Install the package by running
`npm install ng-inactivity-timer`

## Usage

### Provide a configuration for the service (numbers are in seconds):

```typescript
{
  provide: INACTIVITY_CONFIG,
  useValue: <InactivityConfig>{
    inactivityTime: 900,
    warningTime: 120
  }
}
```

### Create a custom activity monitor:

```typescript
export class ActivityMonitorService implements ActivityMonitor {
  public getMonitor() {
    return merge(
      // Add any events you would like to monitor.
      // These events are just examples.
      fromEvent(document, 'keyup'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'mousescroll'),
      fromEvent(document, 'mouseup'),
      fromEvent(document, 'mousedown')
    ).pipe(mapTo(undefined));
  }
  constructor() {}
}
```

### Provide the monitor:

```typescript
{
  provide: ACTIVITY_MONITOR,
  useClass: ActivityMonitorService
}
```

### Inject the inactivity service

```typescript
export class AppComponent {
  constructor(private inactivityTimerService: InactivityTimerService) {}
}
```

### Using the service

```typescript
// Start monitoring
// if called with true, will also trigger actvivity
this.inactivityTimerService.startMonitor();

// Stop monitoring
this.inactivityTimerService.stopMonitor();

// Get an observable emitting Timout objects describing the activity status
this.inactivityTimerService.getTimeOut().subscribe(activity => {
  // do something
});

// Trigger an activity (other than the ones provided by the monitor)
this.inactivityTimerService.activate();
```

### Using the Timout objects

The `getTimeOut()` function emits objects of the Timeout interface:

```typescript
export interface Timeout {
  showWarning: boolean;
  timedOut: boolean;
  timeLeft: number;
}
```

## Contribute
