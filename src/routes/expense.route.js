import { Router } from 'express';
import { ExpensesController } from '../controllers/expenses.controller.js'

export const expensesRouter = Router()
export const ExpensesControl = new ExpensesController()

expensesRouter.get('/', ExpensesControl.getAllExpenses);
expensesRouter.delete('/:id', ExpensesControl.deleteExpense);
expensesRouter.patch('/:id', ExpensesControl.updateExpense)
expensesRouter.post('/', ExpensesControl.createExpense);