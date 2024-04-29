import { PrismaClient } from "@prisma/client"

export class ExpensesRepository {
    constructor(){
        this.prisma = new PrismaClient()
    }

    async createExpense({ date, name, value}){
        const expense = await this.prisma.expense.create({
            data: { 
                date, 
                name,
                value: String(value)
            }
        })
        return expense
    }

    async getAllExpenses(){
        const expenses = await this.prisma.expense.findMany()
        return expenses
    }

    async updateExpense({ id, name, date, value}){
        const expense = await this.prisma.expense.update({
            where: {
                id
            },
            data: {
                name,
                date,
                value: String(value)
            }
        })
        return expense
    }

    async deleteExpense(id){
        await this.prisma.expense.delete({where: {id}})
    }
}