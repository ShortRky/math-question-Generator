// Math Question Generator - Glass HUD

class MathGenerator {
    constructor() {
        this.score = 0;
        this.timeElapsed = 0;
        this.timerInterval = null;
        this.currentQuestion = null;
        this.currentAnswer = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.startTimer();
        this.generateQuestion();
    }

    bindEvents() {
        document.getElementById('new-question').addEventListener('click', () => {
            this.generateQuestion();
        });
        
        document.getElementById('reveal-answer').addEventListener('click', () => {
            this.revealAnswer();
        });
        
        document.getElementById('topic-select').addEventListener('change', () => {
            this.generateQuestion();
        });
        
        document.getElementById('difficulty-select').addEventListener('change', () => {
            this.generateQuestion();
        });
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeElapsed++;
            document.getElementById('timer').textContent = `Time: ${this.timeElapsed}s`;
        }, 1000);
    }

    getTopic() {
        return document.getElementById('topic-select').value;
    }

    getDifficulty() {
        return document.getElementById('difficulty-select').value;
    }

    generateQuestion() {
        const topic = this.getTopic();
        const difficulty = this.getDifficulty();
        
        // Hide answer when generating new question
        document.getElementById('answer').classList.add('hidden');
        
        switch(topic) {
            case 'basic':
                this.generateBasic(difficulty);
                break;
            case 'long-mult':
                this.generateLongMultiplication(difficulty);
                break;
            case 'algebra':
                this.generateAlgebra(difficulty);
                break;
            case 'geometry':
                this.generateGeometry(difficulty);
                break;
            case 'trigonometry':
                this.generateTrigonometry(difficulty);
                break;
            case 'statistics':
                this.generateStatistics(difficulty);
                break;
            case 'calculus':
                this.generateCalculus(difficulty);
                break;
            case 'diff-eq':
                this.generateDiffEq(difficulty);
                break;
        }
    }

    // Basic Arithmetic: +, -, *, /
    generateBasic(difficulty) {
        const ops = ['+', '-', '×', '÷'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a, b, question, answer;
        
        const range = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 100 : 1000;
        
        switch(op) {
            case '+':
                a = Math.floor(Math.random() * range) + 1;
                b = Math.floor(Math.random() * range) + 1;
                question = `${a} + ${b} = ?`;
                answer = a + b;
                break;
            case '-':
                a = Math.floor(Math.random() * range) + 1;
                b = Math.floor(Math.random() * a) + 1;
                question = `${a} - ${b} = ?`;
                answer = a - b;
                break;
            case '×':
                a = Math.floor(Math.random() * (difficulty === 'easy' ? 15 : difficulty === 'medium' ? 30 : 50)) + 1;
                b = Math.floor(Math.random() * (difficulty === 'easy' ? 15 : difficulty === 'medium' ? 30 : 50)) + 1;
                question = `${a} \\times ${b} = ?`;
                answer = a * b;
                break;
            case '÷':
                b = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20)) + 1;
                a = b * (Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
                question = `${a} \\div ${b} = ?`;
                answer = a / b;
                break;
        }
        
        this.displayQuestion(question, answer);
    }

    // Long Multiplication - insanely long numbers
    generateLongMultiplication(difficulty) {
        let digits1, digits2;
        
        if (difficulty === 'easy') {
            digits1 = 4;
            digits2 = 3;
        } else if (difficulty === 'medium') {
            digits1 = 6;
            digits2 = 4;
        } else {
            digits1 = 9;
            digits2 = 4;
        }
        
        const a = this.generateLargeNumber(digits1);
        const b = this.generateLargeNumber(digits2);
        const question = `${a} \\times ${b} = ?`;
        const answer = a * b;
        
        this.displayQuestion(question, answer);
    }

    generateLargeNumber(digits) {
        let num = '';
        for (let i = 0; i < digits; i++) {
            num += Math.floor(Math.random() * 10);
        }
        return parseInt(num);
    }

    // Algebra: Linear, Quadratic, Polynomials
    generateAlgebra(difficulty) {
        const types = ['linear', 'quadratic', 'polynomial'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let question, answer;
        
        if (type === 'linear') {
            const a = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
            const b = Math.floor(Math.random() * (difficulty === 'easy' ? 20 : difficulty === 'medium' ? 50 : 100)) + 1;
            const x = Math.floor(Math.random() * 10) + 1;
            question = `${a}x + ${b} = ${a * x + b}, \\text{ find } x`;
            answer = x;
        } else if (type === 'quadratic') {
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * 10) - 5;
            const c = Math.floor(Math.random() * 10) + 1;
            // Generate a quadratic that factors nicely
            const roots = this.getRandomFactors(c);
            const x1 = roots[0];
            const x2 = roots[1];
            const actualB = a * (x1 + x2);
            const actualC = a * x1 * x2;
            question = `${a}x^2 ${actualB >= 0 ? '+' : ''}${actualB}x + ${actualC} = 0, \\text{ find } x`;
            answer = `x = ${x1} \\text{ or } x = ${x2}`;
        } else {
            // Polynomial addition/subtraction
            const a1 = Math.floor(Math.random() * 5) + 1;
            const a2 = Math.floor(Math.random() * 5) + 1;
            const b1 = Math.floor(Math.random() * 10) + 1;
            const b2 = Math.floor(Math.random() * 10) + 1;
            question = `(${a1}x^2 + ${b1}x) + (${a2}x^2 + ${b2}x) = ?`;
            answer = `${a1 + a2}x^2 + ${b1 + b2}x`;
        }
        
        this.displayQuestion(question, answer);
    }

    getRandomFactors(c) {
        const factors = [];
        for (let i = 1; i <= Math.sqrt(c); i++) {
            if (c % i === 0) {
                factors.push([i, c / i]);
            }
        }
        return factors.length > 0 ? factors[Math.floor(Math.random() * factors.length)] : [1, c];
    }

    // Geometry
    generateGeometry(difficulty) {
        const types = ['pythagorean', 'area', 'circle'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let question, answer;
        
        if (type === 'pythagorean') {
            const a = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
            const b = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
            const c = Math.sqrt(a * a + b * b);
            const findHypotenuse = Math.random() > 0.5;
            
            if (findHypotenuse) {
                question = `\\text{Right triangle: } a = ${a}, b = ${b}, \\text{ find } c`;
                answer = `c = ${c.toFixed(2)}`;
            } else {
                const cInt = Math.sqrt(a * a + b * b);
                question = `\\text{Right triangle: } a = ${a}, c = ${cInt.toFixed(0)}, \\text{ find } b`;
                answer = `b = ${b}`;
            }
        } else if (type === 'area') {
            const shape = Math.random() > 0.5 ? 'rectangle' : 'triangle';
            if (shape === 'rectangle') {
                const l = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
                const w = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
                question = `\\text{Rectangle: length } = ${l}, \\text{ width } = ${w}, \\text{ find area}`;
                answer = `A = ${l * w}`;
            } else {
                const b = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
                const h = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
                question = `\\text{Triangle: base } = ${b}, \\text{ height } = ${h}, \\text{ find area}`;
                answer = `A = ${(b * h / 2)}`;
            }
        } else {
            const r = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50)) + 1;
            const findArea = Math.random() > 0.5;
            if (findArea) {
                question = `\\text{Circle: radius } r = ${r}, \\text{ find area}`;
                answer = `A = ${Math.PI * r * r}`;
            } else {
                question = `\\text{Circle: radius } r = ${r}, \\text{ find circumference}`;
                answer = `C = ${2 * Math.PI * r}`;
            }
        }
        
        this.displayQuestion(question, answer);
    }

    // Trigonometry
    generateTrigonometry(difficulty) {
        const types = ['basic', 'identity', 'triangle'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let question, answer;
        
        if (type === 'basic') {
            const angles = [30, 45, 60, 90];
            const angle = angles[Math.floor(Math.random() * angles.length)];
            const funcs = ['\\sin', '\\cos', '\\tan'];
            const func = funcs[Math.floor(Math.random() * funcs.length)];
            
            let value;
            if (angle === 30) value = func === '\\sin' ? '0.5' : func === '\\cos' ? '\\frac{\\sqrt{3}}{2}' : '0.577';
            else if (angle === 45) value = func === '\\sin' ? '\\frac{\\sqrt{2}}{2}' : func === '\\cos' ? '\\frac{\\sqrt{2}}{2}' : 1;
            else if (angle === 60) value = func === '\\sin' ? '\\frac{\\sqrt{3}}{2}' : func === '\\cos' ? '0.5' : '1.732';
            else value = func === '\\sin' ? 1 : func === '\\cos' ? 0 : '\\text{undefined}';
            
            question = `${func}(${angle}^\\circ) = ?`;
            answer = value;
        } else if (type === 'identity') {
            const identities = [
                ['\\sin^2(x) + \\cos^2(x) = 1', '1'],
                ['1 + \\tan^2(x) = \\sec^2(x)', '\\sec^2(x)'],
                ['\\sin(2x) = 2\\sin(x)\\cos(x)', '2\\sin(x)\\cos(x)']
            ];
            const id = identities[Math.floor(Math.random() * identities.length)];
            question = `\\text{Simplify: } ${id[0]}`;
            answer = id[1];
        } else {
            const angle = Math.floor(Math.random() * 90) + 1;
            const hyp = Math.floor(Math.random() * 20) + 5;
            const opp = Math.round(hyp * Math.sin(angle * Math.PI / 180));
            const adj = Math.round(hyp * Math.cos(angle * Math.PI / 180));
            
            question = `\\text{Right triangle: angle } = ${angle}^\\circ, \\text{ hypotenuse } = ${hyp}, \\text{ find opposite side}`;
            answer = `\\text{opposite} = ${opp}`;
        }
        
        this.displayQuestion(question, answer);
    }

    // Statistics
    generateStatistics(difficulty) {
        const types = ['mean', 'probability', 'std-dev'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let question, answer;
        
        if (type === 'mean') {
            const count = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
            const values = [];
            for (let i = 0; i < count; i++) {
                values.push(Math.floor(Math.random() * 100) + 1);
            }
            const mean = values.reduce((a, b) => a + b, 0) / values.length;
            question = `\\text{Find mean: } [${values.join(', ')}]`;
            answer = `\\text{Mean} = ${mean.toFixed(2)}`;
        } else if (type === 'probability') {
            const total = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50;
            const success = Math.floor(Math.random() * total) + 1;
            const prob = (success / total).toFixed(4);
            question = `\\text{Probability: } \\frac{${success}}{${total} = ?`;
            answer = `${prob} \\text{ or } ${success}:${total-1}`;
        } else {
            const values = [10, 15, 20, 25, 30];
            const mean = 20;
            const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
            const stdDev = Math.sqrt(variance);
            question = `\\text{Find standard deviation: } [${values.join(', ')}]`;
            answer = `\\sigma = ${stdDev.toFixed(2)}`;
        }
        
        this.displayQuestion(question, answer);
    }

    // Calculus
    generateCalculus(difficulty) {
        const types = ['derivative', 'integral', 'limit'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let question, answer;
        
        if (type === 'derivative') {
            const a = Math.floor(Math.random() * 5) + 1;
            const n = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 5;
            const power = Math.floor(Math.random() * n) + 1;
            question = `\\frac{d}{dx}(${a}x^{${power}}) = ?`;
            answer = `${a * power}x^{${power - 1}}`;
        } else if (type === 'integral') {
            const a = Math.floor(Math.random() * 5) + 1;
            const n = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 5;
            const power = Math.floor(Math.random() * n) + 1;
            question = `\\int ${a}x^{${power-1}} dx = ?`;
            answer = `${a}x^{${power}} + C`;
        } else {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            question = `\\lim_{x \\to ${a}} (x^2 + ${b}x - ${a*b}) = ?`;
            answer = `${a * a + b * a - a * b}`;
        }
        
        this.displayQuestion(question, answer);
    }

    // Differential Equations
    generateDiffEq(difficulty) {
        const types = ['first-order', 'separable', 'linear'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let question, answer;
        
        if (type === 'first-order') {
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            question = `\\frac{dy}{dx} + ${a}y = ${b}, \\text{ solve for } y`;
            answer = `y = ${b/a}(1 - e^{-${a}x}) + Ce^{-${a}x}`;
        } else if (type === 'separable') {
            const a = Math.floor(Math.random() * 5) + 1;
            question = `\\frac{dy}{dx} = ${a}xy, \\text{ solve for } y`;
            answer = `y = Ce^{${a}x^2/2}}`;
        } else {
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            question = `x\\frac{dy}{dx} + y = ${a}x^2, \\text{ solve for } y`;
            answer = `y = ${a}x + Ce^{-x}`;
        }
        
        this.displayQuestion(question, answer);
    }

    displayQuestion(question, answer) {
        this.currentQuestion = question;
        this.currentAnswer = answer;
        
        katex.render(question, document.getElementById('question'), {
            displayMode: true
        });
        
        // Add to history
        const historyList = document.getElementById('history-list');
        const li = document.createElement('li');
        li.textContent = question.substring(0, 50) + (question.length > 50 ? '...' : '');
        historyList.insertBefore(li, historyList.firstChild);
        
        // Keep only last 10
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }

    revealAnswer() {
        if (this.currentAnswer) {
            document.getElementById('answer').classList.remove('hidden');
            katex.render(this.currentAnswer, document.getElementById('answer'), {
                displayMode: true
            });
            this.score++;
            document.getElementById('score').textContent = `Score: ${this.score}`;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MathGenerator();
});