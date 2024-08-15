 // JavaScript to create particles
 function createParticles() {
    const container = document.querySelector('.particles');
    for (let i = 10; i < 200; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 20 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
        container.appendChild(particle);
    }
}
createParticles();

function playGame() {
    // Exibir o modal de carregamento
    document.getElementById('loading-modal').style.display = 'flex';

    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.rules').style.display = 'block';
    }, 4000); // 4000 milissegundos = 4 segundos
}

function avancar() {
    document.querySelector('.rules').style.display = 'none';
    document.querySelector('.game-mode').style.display = 'block';
}

function startGame(mode) {
    // Exibir o modal de carregamento
    document.getElementById('loading-modal').style.display = 'flex';
    
    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        // Ocultar o modal de carregamento
        document.getElementById('loading-modal').style.display = 'none';

        // Redirecionar para a página correspondente ao modo escolhido
        switch (mode) {
            case 'addition':
                window.location.href = 'addition.html'; // Substitua pelo caminho real
                break;
            case 'subtraction':
                window.location.href = 'subtraction.html'; // Substitua pelo caminho real
                break;
            case 'multiplication':
                window.location.href = 'multiplication.html'; // Substitua pelo caminho real
                break;
            case 'division':
                window.location.href = 'division.html'; // Substitua pelo caminho real
                break;
            default:
                console.error('Modo de jogo inválido.');
                break;
        }
    }, 500); // 4000 milissegundos = 4 segundos
}


function generateAdditionQuestions(numQuestions) {
    const questions = [];

    for (let i = 0; i < numQuestions; i++) {
        // Gera dois números aleatórios para a adição
        const num1 = Math.floor(Math.random() * 1000) + 1;
        const num2 = Math.floor(Math.random() * 1000) + 1;
        const correctAnswer = num1 + num2;
        
        // Cria a pergunta com adição direta
        const questionText = `Qual é o resultado de ${num1} + ${num2}?`;
       
        // Gera respostas aleatórias
        const answers = [correctAnswer];
        while (answers.length < 4) {
            const randomAnswer = Math.floor(Math.random() * 2000) + 1; // Ajustado para permitir uma gama maior
            if (!answers.includes(randomAnswer) && randomAnswer !== correctAnswer) {
                answers.push(randomAnswer);
            }
        }

        // Embaralha as respostas
        answers.sort(() => Math.random() - 0.5);

        questions.push({
            question: questionText,
            answers: answers,
            correct: correctAnswer
        });
    }

    return questions;
}

// Cria 10 perguntas de adição
const questions = generateAdditionQuestions(10);

let currentQuestionIndex = 0;
let score = 0;

function showQuestion(questionIndex) {
    const questionContainer = document.getElementById('question-container');
    const question = questions[questionIndex];
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.answers.map((answer) => `
            <button class="answer-button" data-answer="${answer}">${answer}</button>
        `).join('')}
    `;

    // Adiciona os eventos de clique às respostas
    document.querySelectorAll('.answer-button').forEach(button => {
        button.addEventListener('click', () => handleAnswer(button));
    });
}

function handleAnswer(button) {
    const selectedAnswer = parseInt(button.getAttribute('data-answer'));
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('question-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    document.getElementById('score').innerText = score;
    resultContainer.style.display = 'block';
     // Redireciona para a página inicial após 5 segundos
     setTimeout(() => {
        window.location.href = 'index.html'; // Ajuste o caminho conforme necessário
    }, 5000); // 5000 milissegundos = 5 segundos
}

document.getElementById('next-button').addEventListener('click', () => {
    if (currentQuestionIndex === 0) {
        // Exibe a primeira pergunta
        showQuestion(currentQuestionIndex);
        // Esconde o botão "Iniciar"
        document.getElementById('next-button').style.display = 'none';
    }
});
