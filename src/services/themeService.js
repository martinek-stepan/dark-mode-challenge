import { BehaviorSubject } from 'rxjs';

// BehaviorSubject allows us to retrieve last value
const subject = new BehaviorSubject();

export const themeService = {
    // Helper to get last value
    lastValue: () => subject.value,
    // Function used to emit theme change to subscribers
    setMode: setToDark => {
        subject.next(setToDark);
    },
    // Helper to get observable object to subscribe to
    getThemeMode: () => subject.asObservable()
};
