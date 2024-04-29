import e from 'express';
import { expensesRouter } from './routes/expense.route.js';
import bodyParser from 'body-parser';

export class Server {
    constructor(port) {
        this.app = e();

        this.setMiddlewares()

        this.setRoutes();

        this.listen(port);
    }

    setMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    setRoutes() {
        this.app.use(e.static('public'));
        this.app.use('/api/expenses', expensesRouter);
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`ouvindo na porta ${port}`);
        })
    }
}