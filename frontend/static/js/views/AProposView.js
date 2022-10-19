import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("AProposView");
    }
    async getHtml() {
        return `
            <div class="jumbotron jumbotron-fluid">
                <div class="container container-apropos">
                
                    <h6 class="display-6">Ce site est un exercice de Single Page Application</h6>

                    <p class="lead">Il a été créer pour le tp1 du cours de Technique Avancée de programmation.</p>
                    <p class="lead text-primary">Merci pour votre visite !</p>

                </div>
            </div>
        `;
    }
}