import React from 'react';
import {themeService} from '../services/themeService';

const USE_DARK_MODE_KEY = 'dark-mode';
const DARK_MODE_CLASS_NAME = 'dark-mode';

export default class AppContainer extends React.Component {
    constructor()
    {
        super();

        this.darkMode = false;
        // Initialize theme
        this.initTheme();
    }

    // Retrieve USE_DARK_MODE_KEY from localStorage (false if missing)
    // Call setMode function of themeService to let subscibers know which if we are using dark theme
    initTheme()
    {
        let useDarkTheme = (localStorage.getItem(USE_DARK_MODE_KEY) === 'true');
        themeService.setMode(useDarkTheme);
    }

    // Sets USE_DARK_MODE_KEY in localStorage to true
    // Updates state with additional class, "dark-mode"
    setDarkTheme()
    {
        localStorage.setItem(USE_DARK_MODE_KEY, "true");
        this.darkMode = true;
        document.querySelector('html').classList.add(DARK_MODE_CLASS_NAME);

    }

    // Sets USE_DARK_MODE_KEY in localStorage to false
    // Updates state with classes excluding "dark-mode"
    setLightTheme()
    {
        localStorage.setItem(USE_DARK_MODE_KEY, "false");
        this.darkMode = false;
        document.querySelector('html').classList.remove(DARK_MODE_CLASS_NAME); 
    }

    // React API, when component is mounted we subscribe to themeService
    componentDidMount() 
    {        
        // themeService.getThemeMode() returns observable object, which we are subscribing to
        // we save returned subscription object to this to be able to unsubcribe
        // BehaviorSubject used returns last value when subscribed to
        this.subscription = themeService.getThemeMode().subscribe(setToDark => {
            // Do not change state if new state is same as current state
            if (this.darkMode === setToDark)
            {
                return;
            }
            // Based on incoming value we either change theme to dark or light
            if (setToDark) {
                this.setDarkTheme();
            } else {
                this.setLightTheme();
            }
        });
    }

    // React API, when component is to be unmounted we unsubscribe from themeService
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    // React API called when state is changed
    render() {
        const {children} = this.props;

        return (
            <div className="app-container">
                {children}
            </div>
        );
    }

}