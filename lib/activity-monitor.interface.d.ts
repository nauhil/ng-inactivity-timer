import { Observable } from 'rxjs';
export interface ActivityMonitor {
    getMonitor: () => Observable<void>;
}
