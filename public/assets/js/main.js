const app = angular.module('gastos-App', []);


app.controller("GastosController", ($scope, $http) =>{
    $scope.formatNumbers = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format

    $scope.date = ''
    $scope.value = ''
    $scope.name = ''
    $scope.expenseList = []

    $scope.addExpense = ()=>{
        if (!$scope.name || !$scope.value || !$scope.date){
            return alert("Digite em todos os campos.")
        }
        $http.post("http://localhost:6842/api/expenses", 
            {date: $scope.date, name: $scope.name, value: $scope.value})
        .then(() => {
            $scope.loadExpenseList()
        }, () => {
            alert("Aconteceu algum erro")
        })
    }

    $scope.deleteExpense = (id)=>{
        $http.delete('http://localhost:6842/api/expenses/' + id).then(() =>{
            $scope.loadExpenseList()
        })
    }

    $scope.updateExpense = (id) => {
        const expense = $scope.expenseList.find(expense => expense.id === id)

        $http.patch('http://localhost:6842/api/expenses/' + id,
        task
    ).then(() => {
        $scope.loadExpenseList
    })
    }

    $scope.loadExpenseList = async()=> {
        const { data } = await $http.get("http://localhost:6842/api/expenses")
        $scope.expenseList = data
        $scope.$apply()
    }
    $scope.loadExpenseList()
})