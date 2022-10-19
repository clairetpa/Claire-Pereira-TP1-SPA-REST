import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("HomeView");
    }
    async getHtml() {
        return `
            <div home-wrapper>
                <div class="jumbotron home-container">
                    <h1 class="display-4">Bienvenu sur mon site !</h1>
                    <p class="lead">En navigant sur ce site vous pourrez acceder a une liste de Tweets, et meme consulter leur detail si vous le souhaitez.</p>
                        <hr class="my-4 spacing-text">
                    <p>Pour demarrer, cliquez sur le bouton pour accéder a la liste des tweets.</p>
                    <p class="lead spacing-btn">
                        <a class="btn btn-primary btn-lg" href="/tweets" role="button" data-link>Aller sur la liste des tweets</a>
                    </p>
                </div>
            </div>
        `;
    }
}

