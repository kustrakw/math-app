import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Problem(props) {
    let num1Margin = '33px';
    let num2Margin = '10px'

    if (props.num1 > 9 || props.num2 > 9) {
        if (props.num1 < 10) {
            num1Margin = '45px';
        }
        if(props.num2 < 10) {
            num2Margin = '15px';
            num1Margin = '24px'
        }        
    }

    return(
    <div>
        <p className='number' style={{marginLeft: num1Margin}}>{props.num1}</p>
        <p className='operator' style={{marginLeft: num2Margin}}>{props.operator} {props.num2}</p>
        <p className='equals'>____</p>
    </div>
    )
} 

class Game extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            num1: this.generateRandmoNumber(),
            num2: this.generateRandmoNumber(),
            outcome: null,
            input: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSubmit(event) {
        if (this.calculateAnswer() === parseInt(this.state.input,10)){
            this.setState({outcome: 'Correct!!'});
            setTimeout(() => {
                    this.setState({
                    num1: this.generateRandmoNumber(),
                    num2: this.generateRandmoNumber(),
                    outcome: null,
                    input: '',
                });
            }, 1000);
        }
        else {
            this.setState({outcome: 'Incorrect.  Please try again.'})
        }
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            input: event.target.value,
        });
    }

    handleSelect(event) {
        this.setState({
            outcome: null
        });
    }

    generateRandmoNumber() {
        const min = 1;
        const max = 10;
        return parseInt(min + Math.random() * (max + 1 - min), 10);
    }

    calculateAnswer() {
        return this.state.num1 + this.state.num2;
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Problem
                num1 = {this.state.num1}
                num2 = {this.state.num2}
                operator = '+'
                />
                <label className='input'>
                    <input
                        type='text'
                        value={this.state.input}
                        style={{fontSize:'22px', width:'45px'}}
                        autoFocus={true}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    />
                </label>
                <p>{this.state.outcome}</p>
            </form>
        )
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );