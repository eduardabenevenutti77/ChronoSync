import CardRetratil from '../../components/cards/cards';
import CountTime from '../../components/countTime/countTime';
import './style-time.css'
// import Footer from '../../components/footer/footer'

export default function Time() {
    return (
        <>
        <div className="container">
            <p id="title">ChronoSync</p>
            <p>ChronoSync é um cronômetro desenvolvido para ajudá-lo a gerenciar seu tempo de forma prática e eficiente.</p>
            <ul>
                <li>Acompanhar atividades do dia a dia</li>
                <li>Controlar o tempo de tarefas ou sessões de estudos</li>
                <li>Monitorar exercícios físicos ou pausas no trabalho</li>
            </ul>
            <p id='marker'>Quer saber como funciona? Dá uma olhada nessas dicas!</p>
            <div id='containerCard'>
                <CardRetratil 
                    titulo="1️⃣ Iniciar"
                    conteudo="Clique no botão Iniciar para começar a contagem do tempo."
                    detalhes="O cronômetro será exibido em formato HH:MM:SS, atualizando em tempo real enquanto você realiza suas tarefas."
                />
                <CardRetratil 
                    titulo="2️⃣ Pausar"
                    conteudo="Quando precisar interromper, clique no botão Pausar."
                    detalhes="O tempo será mantido no momento exato da pausa, permitindo que você retome de onde parou sempre que necessário."
                />
                <CardRetratil 
                    titulo="3️⃣ Reiniciar"
                    conteudo="Quer começar novamente? Clique no botão Reiniciar."
                    detalhes="Isso irá zerar o cronômetro e prepará-lo para uma nova contagem, perfeito para reiniciar sua produtividade ou acompanhar outra atividade."
                />
            </div>
            <CountTime />
        </div>
        </>
    );
}