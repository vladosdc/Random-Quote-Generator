document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector('.generate-quote-btn');
    const quote = document.querySelector('.quotes-text');
    const authorQuote = document.querySelector('.author')

    async function quoteGeneration() {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (response.ok) {
            quote.textContent = "“" + data.content + "”";
            authorQuote.textContent =  "— " + data.author;
        }
        else {
            quote.textContent = "*Error503 (Too frequent generation of quotes, do not overload the server!)";
            quote.style.color = "red";
            quote.style.fontWeight = "bold";
            quote.style.fontStyle = "Italic"
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
