import App from './app';

const app = new App();

const search = document.getElementsByName('search')[0];

search.addEventListener('keyup', (event) => {
    event.preventDefault();

    let text = search.value;

    if (text) {
        app.getCharactersByName(text);
    } else {
        app.getCharacters();
    } 
});

const btnVoltar = document.getElementById('btnVoltar');

btnVoltar.addEventListener('click', (event) => {
    event.preventDefault();

    document.getElementsByClassName('character')[0].classList.toggle('d-none');
    document.getElementsByClassName('infoCharacter')[0].classList.toggle('d-none');

});

app.getCharacters();

