import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Problem extends React.Component {
    constructor(props) {
        super(props);
        const min = 1;
        const max = 10;
        const rand1 = min + Math.random() * (max + 1 - min);
        const rand2 = min + Math.random() * (max + 1 - min);
        this.state = {
            'answer': 0,
            'num1': parseInt(rand1,10),
            'num2': parseInt(rand2, 10),
            'outcome': null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            answer: event.target.value,
        });
      }
    
    handleSelect(event) {
        this.setState({
            outcome: null
        });
    }

    handleSubmit(event) {
        if (parseInt(this.state.answer, 10) === this.calculateAnswer()){
            this.setState({outcome: 'Correct!!'})
        }
        else {
            this.setState({outcome: 'Incorrect.  Please try again.'})
        }
        event.preventDefault();
      }
    
    calculateAnswer() {
        return this.state.num1 + this.state.num2;
    }
    
    render() {
        let status;
        if(this.state.outcome !=null) {
            status = this.state.outcome
        }
        else {
            status = ''
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <p className='number'>{this.state.num1}</p>
                <p className='operator'>+ {this.state.num2}</p>
                <p className='equals'>____</p>
                <label className='input'>
                    <input
                        type='text'
                        style={{fontSize:'22px', width:'45px'}}
                        autoFocus='true'
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    />
                </label>
                {/* <input type="submit" value="Submit" /> */}
                <p>{status}</p>
            </form>
        ) 
    }
}

class Game extends React.Component {

    render() {
        return(
            <Problem />
        )
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );