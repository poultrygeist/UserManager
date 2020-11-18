export default function userGridDirective() {
    return {
        templateUrl: './modules/userGrid/userGrid.html',
        controller: ['$scope', '$http', function ($scope, $http) {
            //default the model
            if (!$scope.model) $scope.model = {
                searchText: "",
                records: []
            };

            let data = [];

            //on page load gather all of the required data from the JSON
            $http.get('./resources/users.json').then(result => {
                if (result.data) {
                    $scope.model.records = [];
                    result.data.forEach(item => data.push({
                        Name: item.name,
                        Age: item.age,
                        //moment allows for the date to be formatted easily without hacking the string output
                        RegisteredDate: moment.parseZone(item.registered, "YYYY-MM-DDThh:mm:ss Z").format("DD-MM-YYYY hh:mm:ss"),
                        Email: item.email,
                        Balance: item.balance
                    }));

                    $scope.model.records = data;
                }
            }).catch(ex => {
                //do some error handling here
                throw ex;
            });

            //Filter the users down by name
            $scope.filter = () => {
                const searchText = $scope.model.searchText.trim();
                if (searchText !== '') {
                    $scope.model.records = [
                        ...data.filter(x => {
                            return x.Name.toLowerCase().includes(searchText.toLowerCase());
                        })
                    ];
                } else {
                    $scope.model.records = data;
                }
            };

            //Reset ALL users balances, regardless of the current filter
            $scope.resetBalances = () => {
                //This could possibly be persisted either via an API call or even in the browser local storage
                $scope.model.searchText = "";
                $scope.model.records = [
                    ...data.map(x => {
                        x.Balance = "0.00";
                        return x;
                    })
                ]
            };
        }]
    }
}