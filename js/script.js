document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector('.generate-quote-btn');
    const quote = document.querySelector('.quotes-text');
    const authorQuote = document.querySelector('.author')

async function quoteGeneration() {
    try {
        const response = await fetch(
            "https://api.api-ninjas.com/v2/randomquotes",
            {
                method: "GET",
                headers: {
                    "X-Api-Key": API_KEY
                }
            }
        );

        const data = await response.json();

        if (response.ok) {
            quote.textContent = `“${data[0].quote}”`;
            authorQuote.textContent = `— ${data[0].author}`;

            quote.style.color = "";
            quote.style.fontWeight = "";
            quote.style.fontStyle = "";
        } else {
            quote.textContent =
                "*Error 503 (Too frequent generation of quotes, do not overload the server!)";

            quote.style.color = "red";
            quote.style.fontWeight = "bold";
            quote.style.fontStyle = "italic";
        }
    } catch (error) {
        console.error("Error:", error);

        quote.textContent = "*Failed to connect to the server";
        quote.style.color = "red";
    }
}

button.addEventListener("click", quoteGeneration);

quoteGeneration();
});


// Copy
let copyBlock = document.querySelector('.text-block')
let btnCopy = document.querySelector('.copy-btn')
let initialText = btnCopy.textContent
btnCopy.addEventListener('click', () => {
    let range = document.createRange()
    range.selectNode(copyBlock)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()
    btnCopy.textContent = "Copied!"
    btnCopy.classList.add('copy-btn-copied')
    setTimeout(() => {
        btnCopy.textContent = initialText
        btnCopy.classList.remove('copy-btn-copied')
    }, 650)
});

//Tweet (twitter)

let tweetButton = document.querySelector(".tweet-button");
tweetButton.addEventListener('click', () => {
    let textBlock = document.querySelector(".text-block").innerText;
    let tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(textBlock);
    window.open(tweetUrl);
});
