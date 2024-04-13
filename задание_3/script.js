const chatBox = document.getElementById('chatbox');
const mesI = document.getElementById('input');
const senB = document.getElementById('btn');
const locB = document.getElementById('btn_loc');

const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

socket.addEventListener('open', (event) => {
    console.log('WebSocket соединение установлено');
    });

    socket.addEventListener('message', (event) => {
        const mes = event.data;
        displayMes(mes);
        });
    

     socket.addEventListener('close', (event) => {
         console.log('WebSocket соединение закрыто');
         });

         function displayMes(mes) {
            const mesEl = document.createElement('p');
            mesEl.textContent = mes;
            chatBox.appendChild(mesEl);
            }

            senB.addEventListener('click', (event) => {
                const mes = mesI.value;
                if (mes !== '') {
                    socket.send(mes);
                    displayMes(mes);
                    mesI.value = '';
                }
                });

                locB.addEventListener('click', (event) => {
                    if ('geolocation' in navigator) {
                        navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;
                            const mapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15`;
                
                            displayMes(`Моя геолокация: ${mapLink}`);
                            socket.send(mapLink);
                        },
                        (error) => {
                            console.log('Ошибка геолокации:', error);
                        }
                        );
                    } else {
                        console.log('Геолокация не поддерживается');
                    }
                    });