import HomeView from "./views/HomeView.js";
import TweetListView from "./views/TweetListView.js";
import AProposView from "./views/AProposView.js";
import TweetView from "./views/TweetView.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result =>
        result[1]);
            return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

/* on creer les routes */
const router = async () => {
    const routes = [
        { path: "/", view: HomeView },
        { path: "/tweets", view: TweetListView },
        { path: "/tweets/:id", view: TweetView },
        { path: "/apropos", view: AProposView }
    ];

    /* on va lier les routes */
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });

    /* retourne au / si la route est pas trouvée */
    let match = potentialMatches.find(potentialMatch => potentialMatch.result!== null);
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match))
    document.querySelector("#app").innerHTML = await view.getHtml();
};


window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            console.log(e.target);
            navigateTo(e.target.href)
        }
    })
    router();
});


