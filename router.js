import "/pages/home.js";
import "/pages/pokemon.js";
import "/pages/not-found.js";

const WrappedElement = (element) => {
  document.getElementById("app").innerHTML = element;
  return element;
};

const routes = {
  "/": function () {
    return WrappedElement("<home-page></home-page>");
  },
  "/pokemon": function (id) {
    return WrappedElement(`<pokemon-page id=${id}></pokemon-page>`);
  },
  "/next/:page": function (page) {
    return WrappedElement(`<next-page page=${page}></next-page>`);
  },
  "/prev/:page": function (page) {
    return WrappedElement(`<prev-page page=${page}></prev-page>`);
  },
  NotFound() {
    return WrappedElement("<not-found-page></not-found-page>");
  },
};

function router() {
  const url = location.pathname;

  if (url in routes) {
    routes[url]();
  } else {
    const splittedUrl = url.split("/");
    const page = "/" + splittedUrl[1];
    const id = splittedUrl[2];

    if (page in routes) {
      routes[page](id);
    } else {
      const nextPage = "/next/" + splittedUrl[1];
      const prevPage = "/prev/" + splittedUrl[1];

      if (nextPage in routes) {
        routes[nextPage](splittedUrl[1]);
      } else if (prevPage in routes) {
        routes[prevPage](splittedUrl[1]);
      } else {
        routes.NotFound();
      }
    }
  }
}

export function pushState(page, data) {
  history.pushState({ ...data }, "string", `/${page}`);
  router();
}

window.addEventListener("load", router);
