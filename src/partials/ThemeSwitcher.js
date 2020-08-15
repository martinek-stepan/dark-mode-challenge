import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

export default class ThemeSwitcher extends React.Component {

    constructor() {
        super();

        //Get HTML node
        let htmlNode = document.querySelector('html');
        // Check if we are currently using dark-mode
        let isDark = htmlNode.classList.contains("dark-mode");
        // Check local storage for saved property 'dark-mode' to achieve persistance
        let shouldBeDark = (localStorage.getItem('dark-mode') === 'true');
        
        // If we have changed to dark-mode before (it was saved in local storage) and page is currently not using dark-mode (default load/reload)
        // Add class "dark-mode" to html node and change isDark to true
        if (shouldBeDark && !isDark)
        {
            htmlNode.classList.add("dark-mode");
            isDark = true;
        }
        // Create initial state based on isDark
        this.state = { darkTheme: isDark };
        // Bind this to changeTheme function so we can access state
        this.changeTheme = this.changeTheme.bind(this);
    }

    render() {
        // If state.darkTheme is true, show faSun icon with background color #FFA500 otherwise faMoon with background color #4D5B6B
        // Register changeTheme function to button onClick event
        return (
            <button className="app__dark-mode-btn icon level-right" onClick={this.changeTheme}>
                <FontAwesomeIcon icon={this.state.darkTheme ? faSun : faMoon} color={this.state.darkTheme ? '#FFA500' : '#4D5B6B'}/>
            </button>
        );
    }

    changeTheme() {
        // Update local storage with oposite value of current state.darkTheme
        localStorage.setItem('dark-mode', (!this.state.darkTheme).toString());
        // Switch to light
        if (this.state.darkTheme)
        {
            document.querySelector('html').classList.remove('dark-mode');
        }
        // Switch to dark
        else
        {
            document.querySelector('html').classList.add('dark-mode');
        }
        // Update state to rerender button
        this.setState({...this.state, darkTheme: !this.state.darkTheme});
    }
}