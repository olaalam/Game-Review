import { UI } from './ui.js'; 

export class Details {
    constructor(gameId) {
        this.ui = new UI(); 
        this.getGameDetails(gameId);
    }

    async getGameDetails(gameId) {
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

            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options);

            if (response.ok) {
                const data = await response.json();
                console.log('Game Details:', data);

                this.ui.displayDetails([data], 0); 
                this.addCloseButtonListener();
            } else {
                console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            loading.classList.add("d-none");
        }
    }
    addCloseButtonListener() {
        const closeBtn = document.getElementById('btnClose'); 
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
               
                document.querySelector(".details").classList.add("d-none");

              
                document.querySelector(".games").classList.remove("d-none");
                document.querySelector("nav").classList.remove("d-none");
            });
        } else {
            console.error('Close button not found in the DOM.');
        }
    }
}
