const canvas = document.getElementById("feed-container");
const uploadForm = document.getElementById("upload-form");
const memeImageInput = document.getElementById("meme-image");
const memeCaptionInput = document.getElementById("meme-caption");

const localStorageKey = "memeFeed";

// Load memes from localStorage
let memes = JSON.parse(localStorage.getItem(localStorageKey)) || [];

// Render the meme feed
function renderFeed() {
    canvas.innerHTML = ""; // Clear the feed
    memes.forEach((meme, index) => {
        const memeCard = document.createElement("div");
        memeCard.className = "meme-card";
        memeCard.innerHTML = `
            <img src="${meme.image}" alt="Meme" class="meme-image">
            <p class="caption">${meme.caption}</p>
            <div class="reaction-bar">
                <button class="like-button">👍 <span class="like-count">${meme.likes}</span></button>
                <button class="dislike-button">👎 <span class="dislike-count">${meme.dislikes}</span></button>
            </div>
        `;

        // Add like/dislike functionality
        memeCard.querySelector(".like-button").addEventListener("click", () => {
            memes[index].likes += 1;
            saveMemes();
            renderFeed();
        });

        memeCard.querySelector(".dislike-button").addEventListener("click", () => {
            memes[index].dislikes += 1;
            saveMemes();
            renderFeed();
        });

        canvas.appendChild(memeCard);
    });
}

// Save memes to localStorage
function saveMemes() {
    localStorage.setItem(localStorageKey, JSON.stringify(memes));
}

// Handle meme upload
uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = memeImageInput.files[0];
    const caption = memeCaptionInput.value;

    if (!file || !caption) {
        alert("Please upload a meme and add a caption.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        memes.unshift({
            image: event.target.result,
            caption,
            likes: 0,
            dislikes: 0,
        });
        saveMemes();
        renderFeed();
    };

    reader.readAsDataURL(file);
    memeImageInput.value = "";
    memeCaptionInput.value = "";
});

// Initial render
renderFeed();
