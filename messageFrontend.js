function renderData(data) {

    let countries = []

    data.forEach(function (message) {
        let index = countries.findIndex((country => country.name === message.originatingCountry))
        if(index === null) {
            countries.push({ [message.originatingCountry] : 1})
        }
        else {
            countries[index][message.originatingCountry] = countries[index][message.originatingCountry] + 1
        }
    })

    return new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: countries.keys(),
            datasets: [
                {
                    label: "Number of originating transfers",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    data: countries.values()
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Number of originating transfers'
            }
        }
    })
}

module.exports.renderData = renderData