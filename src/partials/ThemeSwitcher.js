import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {themeService} from '../services/themeService';

export default class ThemeSwitcher extends React.Component {

    constructor() {
        super();

        // Create initial state, themeService.lastValue() should always be set, since we are initializing theme in root component
        this.state = { darkTheme: themeService.lastValue() || false };
        // Bind this to changeTheme function so we can access state
        this.changeTheme = this.changeTheme.bind(this);
    }

    // React API, when component is mounted we subscribe to themeService
    componentDidMount() {
        this.subscription = themeService.getThemeMode().subscribe(setToDark => {
            // Prevent re-rendering when we get request to change state to current state
            if (setToDark !== this.state.darkTheme)
            {
                this.setState({ darkTheme: setToDark });
            }
        });
    }

    // React API, when component is to be unmounted we unsubscribe from themeService
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    // React API called when state is changed
    render() {
        // If state.darkTheme is true, show faSun icon with background color #FFA500 otherwise faMoon with background color #4D5B6B
        const icon = this.state.darkTheme ? faSun : faMoon;
        const color = this.state.darkTheme ? '#FFA500' : '#4D5B6B';
        // Register changeTheme function to button onClick event
        return (
            <button className="app__dark-mode-btn icon level-right" onClick={this.changeTheme}>
                <FontAwesomeIcon icon={icon} color={color}/>
            </button>
        );
    }

    // Helper function that will notify themeService about theme change request
    changeTheme() {
        themeService.setMode(!this.state.darkTheme);
    }

}