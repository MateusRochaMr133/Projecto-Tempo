document.querySelector('.busca').addEventListener('submit', async(event) => {
    /* Async - Requisiçao assincrona se voce nao colocar async nao ira funciona o await */

    event.preventDefault();
    /* Capturando o value do input e atribuindo a variável */
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        /* == > Verifica a tipagem */
        clearInfo();
        LoaderTime();
        
        /* EncodeURI - Ira preencher os espaços vazios, ou seja ira substituir por caracteres especiais como #, % entre outros */
        /* fetch - Ira ler algo */
        /* Await fica aguardando a resposta */
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&lang=pt_br&units=metric&appid=d06cdb298fafc83c520d5ab677fc477e`);

        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name : json.name,
                country : json.sys.country,
                temp : json.main.temp,
                tempIcon : json.weather[0].icon,
                windSpeed : json.wind.speed,
                windAngle : json.wind.deg
            });
        }
        
        else {
            clearInfo();
            showWarning('Cidade Não Encontrada');
        }
        /* Funçao que fara desaparecer o loader depois que o valor do input tiver preenchido a tela */
        DesaparecerLoadTime();
    }

    else {
        clearInfo();
    }

})

function showInfo(json) {
    /* Retirando a mensagem da tela antes de exibir os resultados */
    showWarning('');

    /* Pegando a div titulo no html e trocando com o innerHTML e colocando 2 arquivos json dentro, a mesma coisa serve para os debaixo */
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp}
    <sup>ºC</sup>`

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    /* Alterando o display do elemento para que ele seja exibido na tela pois ele esta como display none e estamos trocando o display para block para ele ser exibido na tela */
    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function LoaderTime() {
    document.querySelector('.loader').style.display = 'block';
}

function DesaparecerLoadTime() {
    document.querySelector('.loader').style.display = 'none'
}
