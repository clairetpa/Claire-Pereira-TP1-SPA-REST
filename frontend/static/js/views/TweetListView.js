import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.params = params;
        this.setTitle("tweets");
    }

    async getHtml() {
        /* fonction qui appel la methode REST du backend */
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        }

        /* Appel du backend */
        const data = await getData('/api/twitter');
        let domString="";
        /* Pour chaque tweet on affiche un element dans la liste des tweets */
        data.statuses.forEach((el) => {
            domString+=
            `
            <div class="container-list-tweet">

                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto" data-link>
                        <div class="fw-lighter fst-italic" data-link>${new Date(el.created_at).toLocaleString()}</div>
                        <div class="fw-bold" data-link>${el.user.name}</div>
                        ${el.text}
                    </div>

                    <div class="detail-tweet-btn">
                    <a href='/tweets/${el.id}' class="btn btn-primary " role="button" data-link>detail</a>
                    </div>        
                </li>

            <div>
            `;
        });
        

        return `
            <ol class="list-group container">
                ${domString}
            </ol>
        `;
    }
    
}
