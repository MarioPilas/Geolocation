import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
import Error from './Error';



class App extends React.Component {
   
    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ lat: position.coords.latitude })
            },
            (err) => this.setState({ errorMessage: err.message })
        );
    }

    componentDidUpdate() {
        console.log('My component was updated');
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat) {
            return <Error />
        }

        if(this.state.lat && !this.state.errorMessage) {
            return <SeasonDisplay lat={this.state.lat} />
        }

    return <Spinner message='Just click Allow :)' />
    }

    render(){
    return <div className='border red'>{this.renderContent()}</div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));