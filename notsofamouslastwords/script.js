const prev = document.getElementById("prev");
const next = document.getElementById("next");
const quote = document.getElementById("quote");
const description = document.getElementById("description");
const imgBg = document.getElementById("bg-img");

{
    const btns = [ prev, next ];

    for (let i = 0; i < 2; i++) {
        const btn = btns[i];

        btn.addEventListener("mouseenter", () => {
            btn.style.textDecoration = "underline";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.textDecoration = "none";
        });
    }
}

const maximumPage = quotes.length - 1;
let currentPage = 0;
let lastAuthorHasImg = 0;

{
    const lastOpenedPage = localStorage.getItem("page");

    if (lastOpenedPage != null) {
        currentPage = parseInt(lastOpenedPage);
    } else {
        const randNum = Math.floor(Math.random() * (maximumPage + 1));
        localStorage.setItem("page", randNum.toString());
        currentPage = randNum
    }
}

function setPage() {
    const selectedPage = quotes[currentPage];
    const author = selectedPage[0];

    quote.textContent = `"${selectedPage[1]}" - ${author}`;
    description.textContent = selectedPage[2];

    const authorImg = authorImages[author];

    if (authorImg != null) {
        imgBg.src = authorImg;
        lastAuthorHasImg = 1;
        return;
    }

    if (lastAuthorHasImg == 1) {
        lastAuthorHasImg = 0;
        imgBg.src = "";
    }
}

function updatePage() {
    localStorage.setItem("page", currentPage.toString());
    setPage();
}

setPage();

prev.addEventListener("mousedown", () => {
    if (currentPage > 0) {
        currentPage -= 1;
    } else {
        currentPage = maximumPage;
    }

    updatePage();
});

next.addEventListener("mousedown", () => {
    if (currentPage < maximumPage) {
        currentPage += 1;
    } else {
        currentPage = 0;
    }

    updatePage();
});

{
    const contents = document.getElementById("container");

    const RAD_90 = Math.PI / 2;

    let t = 0;
    const startTime = performance.now();

    const intervalId = setInterval(() => {
        t = (performance.now() - startTime) / 2250;
        
        if (t >= 1) {
            contents.style.opacity = 1;
            imgBg.style.opacity = 0.25
            contents.style.translate = "0 0";
            clearInterval(intervalId);
            return;
        }

        contents.style.opacity = t;
        imgBg.style.opacity = 0.25 * t
        contents.style.translate = `0 ${(1 - Math.sin(RAD_90 * t)) * 18}vh`;
    }, 0);
}
