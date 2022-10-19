import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.params = params;
        this.setTitle("tweet");
    }

    async getHtml() {
        /* fonction qui appel la methode REST du backend */
        const id = Number(this.params.id);
        async function getData(url) {
            const response = await fetch(url);

            return response.json();
        }
        /* Appel du backend */
        const tweet = await getData(`/api/twitter/${id}`);
        console.log(tweet);

        return `
            <div class="container container-detail-tweet">
                <div class="container card mb-3">
                    <div class="row g-0">

                        <div class="col-md-4 container-detail-left">
                            <img src="${tweet.user.profile_image_url_https}" class="img-fluid rounded-start" alt="...">
                                <div>@${tweet.user.screen_name} (${tweet.user.name})</div>
                                    <p class="card-text"><small class="text-muted">${tweet.user.description}</small></p>
                                    <p class="card-text"><small class="text-muted">location: ${tweet.user.location}</small></p>
                        </div>

                        <div class="col-md-8 container-detail-right">
                            <div class="card-body">
                                <h5 class="card-title">${tweet.text}</h5>
                                <p class="card-text"><small class="text-muted">${new Date(tweet.created_at).toLocaleString()}</small></p>
                            </div>
                        </div>
                
                        <div class="card-footer">
                            <small class="text-muted tweet-footer">Retweet: ${tweet.retweet_count}</small>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }
    
}
