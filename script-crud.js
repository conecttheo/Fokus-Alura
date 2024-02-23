
// Esta linha pega o botão de adicionar tarefa baseado na classe CSS.
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
// esta linha seleciona nosso formulário de adicionar tarefa.
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
// pegamos a área de texto onde o usuário digita a descrição da tarefa.
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
// Esta é a nossa lista (ou array) de tarefas. Ela começa vazia porque ainda não adicionamos nenhuma tarefa.
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" 
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li
}


// Agora, adicionamos um ouvinte de eventos ao botão. Quando o botão for clicado, esta função será executada.
btnAdicionarTarefa.addEventListener('click', () => {
    // Esta linha vai alternar a visibilidade do nosso formulário.
    formAdicionarTarefa.classList.toggle('hidden')
})
// Aqui, estamos ouvindo o evento de 'submit' do nosso formulário. 
// Esse evento ocorre quando tentamos enviar o formulário (geralmente, apertando o botão 'Enter' ou clicando em um botão de submit).
formAdicionarTarefa.addEventListener('submit', (evento) => {
    // Esta linha evita que a página recarregue (comportamento padrão de um formulário). Nós não queremos isso!
    evento.preventDefault();
    const descricaoTarefa = textarea.value
    // Aqui, criamos um objeto tarefa com a descrição vinda da nossa textarea.
    const tarefa = {
        descricao: textarea.value
    }
    // Depois, adicionamos essa tarefa ao nosso array de tarefas.
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    // E, finalmente, armazenamos nossa lista de tarefas no localStorage. 
    // Convertendo o array para uma string em formato JSON para poder armazenar.
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});