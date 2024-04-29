const inputAddExpenseEl = document.querySelector('.add-expense input')
const expenseDateEl = document.querySelector('#date')
const expenseValueEl = document.querySelector('#expense-value')

const buttonAddExpenseEl = document.querySelector('.add-expense button')
const expenseListEl = document.querySelector('.expense-list')
const noExpenseEl = document.querySelector('.no-expense')

const formatNumbers = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format
 
buttonAddExpenseEl.addEventListener('click', () => {
    const name = inputAddExpenseEl.value
    const date = expenseDateEl.value
    const value = expenseValueEl.value
    createExpense(name, date, value)
})
 
function deleteExpense(id) {
    fetch(`http://localhost:6842/api/expenses/${id}`, { method: 'DELETE' })
      .then(() => {
        getAllExpenses()
    })
  }
 
function createExpense(name, date, value) {
    fetch('http://localhost:6842/api/expenses/', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, date: date, value: value})
    })
        .then(() => {
            getAllExpenses()
        })
}
 
function updateExpense(id, name, date, value) {
    fetch('http://localhost:6842/api/expenses/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, date: date, value: value})
    })
        .then(() => {
            getAllExpenses()
        })
}
 
function mountExpense(expense) {
    const expenseEl = document.createElement('label')
    const deleteButtonEl = document.createElement('button')
    const dateEl = document.createElement('input')
    const nameEl = document.createElement('p')
    const valueEl = document.createElement('p')
 
    expenseEl.className = 'expense'

    deleteButtonEl.innerHTML = 'Deletar'
    deleteButtonEl.addEventListener('click', () => {
        deleteExpense(expense.id)
    })

    dateEl.type = 'date'
    dateEl.name = 'expense-' + expense.id
    dateEl.value = expense.date

    nameEl.innerHTML = expense.name

    valueEl.innerHTML = formatNumbers(expense.value)
 
    expenseEl.appendChild(dateEl)
    expenseEl.appendChild(nameEl)
    expenseEl.appendChild(valueEl)
    expenseEl.appendChild(deleteButtonEl)
 
    expenseListEl.appendChild(expenseEl)
}
 
function getAllExpenses() {
    fetch('http://localhost:6842/api/expenses')
        .then((response) => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                expenseListEl.innerHTML = '<p class="no-expenses active">Nenhum gasto cadastrado.</p>'
            } else {
                expenseListEl.innerHTML = ''
                data.forEach(mountExpense)
            }
        })
}
 
 
getAllExpenses()