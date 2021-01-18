import axios from 'axios';

export default class App {

    constructor() {
        this.baseUrl = 'http://localhost:3333/characters';
    }

    async getCharacters(offset = 0) {
        try{
            const result = await axios.get(`${this.baseUrl}?offset=${offset}`);
            this.populateCharacters(result.data.results)
            this.setPagination(result.data.total, result.data.offset);
            
        } catch (error) {
            console.log(error);
        }    
    }

    async getCharactersByName(name, offset = 0) {
        try{
            const result = await axios.get(`${this.baseUrl}/name?name=${name}&offset=${offset}`);
            this.populateCharacters(result.data.results)
            this.setPagination(result.data.total, result.data.offset, name);            
        } catch (error) {
            console.log(error);
        }
    }

    async getInfoCharacter(id) {
        try{
            const result = await axios.get(`${this.baseUrl}/character?id=${id}`);
            this.populateCharacter(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    populateCharacters(data){
        document.querySelector('.characters').innerHTML = '';

        data.forEach(item => {
            const image = item.thumbnail.path;

            if (image === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' 
                || image === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708') {
                item.thumbnail.path = 'https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo';
                item.thumbnail.extension = 'svg';
            }         

            const img = `<div class="d-inline-flex image">
                          <img class="bd-placeholder-img m-1 rounded" width="140" height="140" src="${item.thumbnail.path}.${item.thumbnail.extension}">
                          </img>
                          <div class="nameCharacter" idCharacter="${item.id}">
                            <p>${item.name}</p>  
                          </div>
                        </div>`;

            document.querySelector('.characters').innerHTML += img;

           this.atribuirEvento(item.id);            
        });
    }

    populateCharacter(data){
        console.log(data);

        document.querySelector('.details').innerHTML = '';

        document.getElementsByClassName('character')[0].classList.toggle('d-none');
        document.getElementsByClassName('infoCharacter')[0].classList.toggle('d-none');

        let img = data.results[0].thumbnail.path;
        let imgExtension = data.results[0].thumbnail.extension;
        if (img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' 
            || img === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708') {
            img = 'https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo';
            imgExtension = 'svg';
        }
        
        let description = data.results[0].description;
        if (!description) {
            description = 'Não informado'
        }
        
        const details = `<img class="bd-placeholder-img float-left" width="400" height="400" src="${img}.${imgExtension}">
                            <p class="m-2">Nome: ${data.results[0].name}</p></br>
                            <p class="m-2">Descrição: ${description}</p>`;

        document.querySelector('.details').innerHTML = details;
    }

    setPagination(totalItems, offset, name){
        const pages = Math.ceil(totalItems / 30);
        const activePage = offset / 30 + 1;
    
        document.querySelector('.pagination').innerHTML = '';
    
        for(let i = 1; i <= pages; i++){
            const li = `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            
            document.querySelector('.pagination').innerHTML += li;
    
            for (let link of document.getElementsByClassName('page-link')){
                link.addEventListener('click', (event) => {
                    event.preventDefault();
    
                    const page = event.target.dataset.page;
                    const offset = (parseInt(page) - 1 ) * 30;
                    if (!name) {
                        this.getCharacters(offset);
                    } else {
                        this.getCharactersByName(name, offset);
                    }                    
                });
            }

            if (i === activePage) {
                let item = document.querySelector(`[data-page="${i}"]`).parentElement;
                item.classList.add("active");                
            }
        }
    }
    
    atribuirEvento(id) {
        let image = document.querySelector(`[idCharacter="${id}"]`).parentElement;

        image.addEventListener('click', (event) => {
            this.getInfoCharacter(id);
        });
    }    
}



