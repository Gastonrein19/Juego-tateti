document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const board = document.getElementById('board');
    const player1Btn = document.getElementById('player1');
    const player2Btn = document.getElementById('player2');
    const crossBtn = document.getElementById('cross');
    const circleBtn = document.getElementById('circle');
    const scorePlayer1 = document.getElementById('scorePlayer1');
    const scorePlayer2 = document.getElementById('scorePlayer2');
    const backgroundMusic = document.getElementById('background-music');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let score = { player1: 0, player2: 0 };

    // Funciones de música
    function startMusic() {
        backgroundMusic.play();
    }

    function resetMusic() {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    }

    function stopMusic() {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }

    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        document.getElementById('players').style.display = 'block';
        startMusic(); // Inicia la música cuando se presiona "Iniciar Juego"
    });

    resetBtn.addEventListener('click', () => {
        resetGame();
        resetScore();
        resetBtn.style.display = 'none';
        playAgainBtn.style.display = 'none';
        startBtn.style.display = 'inline-block';
        document.getElementById('players').style.display = 'none';
        document.getElementById('symbols').style.display = 'none';
        document.getElementById('score').style.display = 'none';
        board.style.display = 'none';
        resetMusic(); // Reanuda la música de fondo
    });

    playAgainBtn.addEventListener('click', () => {
        resetGame();
        playAgainBtn.style.display = 'none';
        board.style.display = 'grid';
        resetMusic(); // Reanuda la música de fondo
    });

    player1Btn.addEventListener('click', () => {
        document.getElementById('players').style.display = 'none';
        document.getElementById('symbols').style.display = 'block';
    });

    player2Btn.addEventListener('click', () => {
        document.getElementById('players').style.display = 'none';
        document.getElementById('symbols').style.display = 'block';
    });

    crossBtn.addEventListener('click', () => {
        document.getElementById('symbols').style.display = 'none';
        document.getElementById('score').style.display = 'block';
        board.style.display = 'grid';
        currentPlayer = 'X';
        renderBoard();
    });

    circleBtn.addEventListener('click', () => {
        document.getElementById('symbols').style.display = 'none';
        document.getElementById('score').style.display = 'block';
        board.style.display = 'grid';
        currentPlayer = 'O';
        renderBoard();
    });

    function renderBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'default');
            cell.dataset.index = i;
            cell.addEventListener('click', cellClick);
            cell.textContent = boardState[i];
            if (boardState[i] === 'X') cell.classList.add('x');
            if (boardState[i] === 'O') cell.classList.add('o');
            board.appendChild(cell);
        }
    }

    function cellClick() {
        const index = this.dataset.index;
        if (!boardState[index]) {
            boardState[index] = currentPlayer;
            this.textContent = currentPlayer;
            this.classList.remove('default');
            this.classList.add(currentPlayer.toLowerCase());
            if (checkWinner()) {
                highlightWinner();
                setTimeout(() => {
                    alert(`¡Jugador ${currentPlayer} ha ganado!`);
                    score[currentPlayer === 'X' ? 'player1' : 'player2']++;
                    updateScore();
                    resetBtn.style.display = 'inline-block';
                    playAgainBtn.style.display = 'inline-block';
                }, 100);
            } else if (boardState.every(cell => cell !== '')) {
                setTimeout(() => {
                    alert('¡Empate!');
                    resetBtn.style.display = 'inline-block';
                    playAgainBtn.style.display = 'inline-block';
                }, 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6] // diagonal
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return line;
            }
        }
        return false;
    }

    function highlightWinner() {
        const winningLine = checkWinner();
        if (winningLine) {
            winningLine.forEach(index => {
                document.querySelectorAll('.cell')[index].classList.add('winner');
            });
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        renderBoard();
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('x', 'o', 'winner');
            cell.classList.add('default');
        });
    }

    function resetScore() {
        score.player1 = 0;
        score.player2 = 0;
        updateScore();
    }

    function updateScore() {
        scorePlayer1.textContent = score.player1;
        scorePlayer2.textContent = score.player2;
    }
});