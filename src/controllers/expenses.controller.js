import { ExpensesRepository } from "../repositories/expenses.repository.js"

export class ExpensesController {
    static instance
    constructor() {
        this.repository = new ExpensesRepository()
    }

    getAllExpenses = async (req, res) => {
        const allExpenses = await this.repository.getAllExpenses()
        return res.json(allExpenses)
    }

    createExpense = async (req, res) => {
        const expense = req.body

        const createdExpense = await this.repository.createExpense(expense)

        return res.json(createdExpense)
    }

    updateExpense = async (req, res) => {
        const id = Number(req.params.id)
        const expense = req.body

        const expenseUpdated = await this.repository.updateExpense({id, ...expense})

        return res.json(expenseUpdated)
    }

    deleteExpense = async (req, res) => {
        const id = Number(req.params.id)
    
        await this.repository.deleteExpense(id)
        return res.json({ ok: true })
    }
}