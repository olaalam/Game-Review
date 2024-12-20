import { Details } from "./details.js";
import { UI } from "./ui.js";

export class Games {
    constructor() {
        this.ui = new UI();
        this.initEventListeners();
        this.displayGames("mmorpg");
    }

    async displayGames(category) {
        const data = await this.getData(category);
        if (data) {
            this.ui.displayGames(data);
            this.initCardClickEvents(data);
        }
    }

    initEventListeners() {
        const categoryLinks = document.querySelectorAll('.navbar-nav .nav-link');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const category = link.textContent.trim().toLowerCase();
                this.displayGames(category);
            });
        });
    }

    async getData(category) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("d-none");
        try {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '1efcedbfcemsh9a5481bfbb10c75p1c9d3bjsn66dfe2e86abd',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);

            if (response.ok) {
                let data = await response.json();
                console.log('API Response:', data);
                return data;
            } else {
                console.error('HTTP error:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            loading.classList.add("d-none");
        }
    }

    initCardClickEvents(data) {
        const gameCards = document.querySelectorAll(".game-card");
        gameCards.forEach(card => {
            card.addEventListener('click', () => {
                const gameId = card.dataset.id; 
                document.querySelector(".games").classList.add("d-none"); 
                document.querySelector("nav").classList.add("d-none"); 
                document.querySelector(".details").classList.remove("d-none"); 
                new Details(gameId);
            });
        });
    }
}
