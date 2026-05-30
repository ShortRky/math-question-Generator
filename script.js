// Number Set Generator

class NumberGenerator {
    constructor() {
        this.currentOutput = '';
        this.init();
    }

    init() {
        this.bindEvents();
        this.generateOutput();
    }

    bindEvents() {
        document.getElementById('generate-button').addEventListener('click', () => {
            this.generateOutput();
        });

        document.getElementById('copy-output').addEventListener('click', () => {
            this.copyOutput();
        });

        document.getElementById('count-select').addEventListener('change', () => {
            this.generateOutput();
        });

        document.getElementById('mode-select').addEventListener('change', () => {
            this.generateOutput();
        });
    }

    generateOutput() {
        const count = parseInt(document.getElementById('count-select').value, 10);
        const mode = document.getElementById('mode-select').value;
        this.currentOutput = this.buildSets(count, mode);
        this.displayOutput(this.currentOutput);
    }

    buildSets(count, mode) {
        const sets = [];

        for (let i = 0; i < count; i++) {
            if (mode === 'single') {
                sets.push(this.generateDigitSequence());
            } else {
                sets.push(this.generateMultiplicationPair());
            }
        }

        return sets.join('\n');
    }

    generateDigitSequence() {
        const digits = ['0','1','2','3','4','5','6','7','8','9'];
        for (let i = digits.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [digits[i], digits[j]] = [digits[j], digits[i]];
        }
        return digits.join('');
    }

    generateMultiplicationPair() {
        const a = this.randomInteger(100, 999);
        const b = this.randomInteger(100, 999);
        return `${a} × ${b}`;
    }

    randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    displayOutput(text) {
        const output = document.getElementById('output');
        output.textContent = text;

        const historyList = document.getElementById('history-list');
        const li = document.createElement('li');
        li.textContent = text.split('\n')[0];
        historyList.insertBefore(li, historyList.firstChild);

        while (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }

    async copyOutput() {
        try {
            await navigator.clipboard.writeText(this.currentOutput);
            alert('Output copied to clipboard');
        } catch (error) {
            alert('Could not copy output.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NumberGenerator();
});
