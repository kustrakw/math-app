import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Problem(props) {
    const answer = props.showAnswer ? props.answer : null;
    const answerBottomMargin = props.showAnswer ? '40px' : '10px';
    let num1Margin = '33px';
    let num2Margin = '10px';
    let answerLeftMargin = answer < 10 ? '30px' : '20px';


    if (props.num1 > 9 || props.num2 > 9) {
        if (props.num1 < 10) {
            num1Margin = '45px';
            answerLeftMargin = '32px';        
        }
        else if(props.num2 < 10) {
            num2Margin = '15px';
            num1Margin = '24px';
            answerLeftMargin = '24px';        
        }
        else {
            answerLeftMargin = '30px';
        }
    }

    return(
    <div>
        <p 
            className='number' 
            style={{marginLeft: num1Margin}}>{props.num1}
        </p>
        <p 
            className='operator' 
            style={{marginLeft: num2Margin}}>{props.operator} {props.num2}
        </p>
        <p className='equals'>____</p>
        <p 
            className='answer' 
            style={{
                marginBottom: answerBottomMargin,
                marginLeft: answerLeftMargin, 
            }}>
            {answer}
        </p>
    </div>
    )
} 

class Game extends React.Component {
    constructor(props) {
        super(props);

        const rand1 = this.generateRandmoNumber();
        const rand2 = this.generateRandmoNumber();
        const operator = '+';
        const answer = this.calculateAnswer(rand1, rand2, operator);
        
        this.state = {
            outcome: null,
            input: '',
            problems: [{
                num1: rand1, 
                num2: rand2, 
                operator: operator,
                answer: answer,
            }],
            problemNumber: 0,
            showHistory: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        if (this.state.problems[this.state.problemNumber].answer === parseInt(this.state.input,10)){
            this.setState({outcome: 'Correct!!'});

            const rand1 = this.generateRandmoNumber();
            const rand2 = this.generateRandmoNumber();
            const operator = '+';
            const answer = this.calculateAnswer(rand1, rand2, operator)
            const problems = this.state.problems.slice();

            setTimeout(() => {
                    this.setState({
                    outcome: null,
                    input: '',
                    problems: problems.concat({
                        num1: rand1,
                        num2: rand2,
                        operator: operator,
                        answer: answer,
                    }),
                    problemNumber: this.state.problemNumber + 1,
                });
            }, 1000);
        }
        else {
            const input = this.state.input;
            this.setState({
                outcome: input + ' is incorrect.  Please try again.',
                input: ''
            });
        }
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            input: event.target.value,
        });
    }

    generateRandmoNumber() {
        const min = 1;
        const max = 10;
        return parseInt(min + Math.random() * (max + 1 - min), 10);
    }

    calculateAnswer(num1, num2, operator) {
        switch(operator) {
            case '+':
                return num1 + num2;
            default:
                return num1 + num2;
        }
    }

    componentDidUpdate() {
        const element = document.getElementById('input');
        element.scrollIntoView({behavior: 'smooth'});
    }

    render() {
        const problems = this.state.problems.slice();

        const problemList = problems.map((problem, problemNumber) => {
            return(
                    <Problem
                    num1 = {problem.num1}
                    num2 = {problem.num2}
                    operator = {problem.operator}
                    answer = {problem.answer}
                    showAnswer = {this.state.showHistory && (problemNumber !== this.state.problemNumber)}      
                    key = {problemNumber}
                    />
            )
            
        });

        const problemRender = this.state.showHistory ? problemList : problemList[this.state.problemNumber];

        return(
            <form onSubmit={this.handleSubmit}>
                {problemRender}
                <label className='input'>
                    <input
                        type='text'
                        id='input'
                        value={this.state.input}
                        style={{fontSize:'22px', width:'45px'}}
                        autoFocus={true}
                        onChange={this.handleChange}
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