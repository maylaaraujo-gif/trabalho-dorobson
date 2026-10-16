const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "1. Qual é a sua principal meta ao começar a treinar na academia?",
        alternativas: [
            {
                texto: "Ganhar massa muscular (hipertrofia) e aumentar a força.",
                afirmacao: "Foco no ganho de massa muscular e hipertrofia.",
                pontos: 2
            },
            {
                texto: "Melhorar o condicionamento físico, saúde e perder gordura.",
                afirmacao: "Foco em condicionamento físico, saúde e perda de gordura.",
                pontos: 2
            },
            {
                texto: "Ir apenas de vez em quando sem uma meta definida.",
                afirmacao: "Falta de metas claras e constância nos treinos.",
                pontos: 0
            }
        ]
    },
    {
        enunciado: "2. Como você organiza a sua rotina de alimentação e hidratação nos dias de treino?",
        alternativas: [
            {
                texto: "Bebo bastante água e mantenho uma alimentação equilibrada com proteínas e carboidratos.",
                afirmacao: "Atenção adequada à hidratação e nutrição para recuperação muscular.",
                pontos: 2
            },
            {
                texto: "Tento comer bem, mas costumo esquecer de beber água suficiente ao longo do dia.",
                afirmacao: "Boa intenção na alimentação, mas precisa melhorar a hidratação.",
                pontos: 1
            },
            {
                texto: "Vou treinar em jejum sem orientação e não me preocupo com a alimentação.",
                afirmacao: "Descuido com a nutrição, o que pode prejudicar o rendimento e a saúde.",
                pontos: 0
            }
        ]
    },
    {
        enunciado: "3. Qual é a sua atitude em relação ao descanso e aos dias de recuperação (rest days)?",
        alternativas: [
            {
                texto: "Respeito os dias de descanso para os músculos se recuperarem e crescerem.",
                afirmacao: "Compreensão de que o descanso é fundamental para a evolução física.",
                pontos: 2
            },
            {
                texto: "Tento descansar, mas fico ansioso e acabo fazendo aeróbico pesado todos os dias.",
                afirmacao: "Dificuldade em gerenciar o descanso necessário para o corpo.",
                pontos: 1
            },
            {
                texto: "Treino o mesmo grupo muscular todos os dias sem dar tempo de recuperação.",
                afirmacao: "Risco de overtraining por falta de pausa e descanso muscular.",
                pontos: 0
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let respostasUsuario = [];
let pontuacaoTotal = 0;

function telaInicial() {
    caixaPerguntas.textContent = "Bem-vindo ao Quiz de Academia! Descubra qual é o seu perfil de treino e compromisso fitness.";
    textoResultado.textContent = "";
    caixaAlternativas.textContent = "";

    const botaoIniciar = document.createElement("button");
    botaoIniciar.textContent = "Iniciar Quiz";
    botaoIniciar.addEventListener("click", iniciarQuiz);
    caixaAlternativas.appendChild(botaoIniciar);
}

function iniciarQuiz() {
    atual = 0;
    respostasUsuario = [];
    pontuacaoTotal = 0;
    textoResultado.textContent = "";
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    respostasUsuario.push({
        pergunta: perguntaAtual.enunciado,
        escolha: opcaoSelecionada.texto,
        afirmacao: opcaoSelecionada.afirmacao,
        pontos: opcaoSelecionada.pontos
    });

    pontuacaoTotal += opcaoSelecionada.pontos;
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Resumo do seu Perfil Maromba";
    
    const pontuacaoMaxima = perguntas.length * 2;
    let perfil = "";
    
    if (pontuacaoTotal >= 5) {
        perfil = "🔥 Atleta Focado (Foco e Disciplina Maxima)";
    } else if (pontuacaoTotal >= 3) {
        perfil = "⚡ Praticante Consistente (No caminho certo)";
    } else {
        perfil = "🏋️ Iniciante Despreparado (Precisa de mais disciplina)";
    }

    let resumoHtml = `<p><strong>Desempenho:</strong> ${pontuacaoTotal} de ${pontuacaoMaxima} pontos</p>`;
    resumoHtml += `<p><strong>Seu Perfil:</strong> ${perfil}</p><br>`;
    resumoHtml += `<p><strong>Resumo das suas escolhas:</strong></p>`;

    respostasUsuario.forEach((item, index) => {
        resumoHtml += `
            <p>
                <strong>Questão ${index + 1}:</strong> ${item.afirmacao}<br>
                <em>Sua resposta: "${item.escolha}"</em>
            </p>
        `;
    });

    textoResultado.innerHTML = resumoHtml;
    caixaAlternativas.textContent = "";

    const botaoJogarNovamente = document.createElement("button");
    botaoJogarNovamente.textContent = "Refazer Quiz";
    botaoJogarNovamente.addEventListener("click", iniciarQuiz);
    caixaAlternativas.appendChild(botaoJogarNovamente);

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Tela Inicial";
    botaoReiniciar.addEventListener("click", telaInicial);
    caixaAlternativas.appendChild(botaoReiniciar);
}

telaInicial();