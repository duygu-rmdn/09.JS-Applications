async function getInfo() {

    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const busses = document.getElementById('buses');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    
    busses.innerHTML = '';
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        if(res.status != 200){
            throw new Error('Error')
        }
        stopName.textContent = data.name;
        Object.entries(data.buses).forEach(element => {
            let li = document.createElement('li');
            li.textContent = `Bus ${element[0]} arrives in ${element[1]} minutes`;
            busses.appendChild(li);
        });
    } catch (err) {
        stopName.textContent = 'Error';
    }
}