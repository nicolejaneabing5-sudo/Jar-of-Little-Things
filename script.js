// ===== LITTLE NOTES =====
const notes = [
    { category: "appreciation", label: "A LITTLE APPRECIATION", message: "You make ordinary moments feel special just by being part of them. 💗" },
    { category: "appreciation", label: "A LITTLE APPRECIATION", message: "I hope you know that your presence matters more than you realize. ♡" },
    { category: "reminder", label: "A GENTLE REMINDER", message: "You do not have to have everything figured out today. Take things one step at a time. 🌷" },
    { category: "reminder", label: "A GENTLE REMINDER", message: "Drink some water, take a breath, and give yourself a little kindness today. 🌼" },
    { category: "funny", label: "A SILLY LITTLE THING", message: "If being dramatic were an Olympic sport, we'd at least qualify for the finals. 😂" },
    { category: "funny", label: "A SILLY LITTLE THING", message: "We really can turn the smallest thing into a whole story. Never change. 🤣" },
    { category: "comfort", label: "A LITTLE COMFORT", message: "If today feels difficult, remember you can take a break. You do not need to solve everything at once. 🫶" },
    { category: "comfort", label: "A LITTLE COMFORT", message: "You are allowed to have quiet days. I hope tomorrow feels a little lighter. 💗" },
    { category: "memory", label: "A LITTLE MEMORY", message: "Some of the best memories are made from ordinary days we didn't want to end. 📸" },
    { category: "memory", label: "A LITTLE MEMORY", message: "I hope we keep collecting little stories that make us smile years from now. 🎞️" },
    { category: "heartfelt", label: "FROM THE HEART", message: "Thank you for being part of my story. I'm glad our paths crossed. 💌" },
    { category: "heartfelt", label: "FROM THE HEART", message: "No matter how busy life gets, I hope we always make room for more little memories. ♡" }
];

const pickNoteButton = document.getElementById("pickNote");
const anotherNoteButton = document.getElementById("anotherNote");
const noteCard = document.getElementById("noteCard");
const noteCategory = document.getElementById("noteCategory");
const noteMessage = document.getElementById("noteMessage");

function showNote(category = null) {
    const choices = category
        ? notes.filter(function (note) { return note.category === category; })
        : notes;

    if (choices.length === 0) return;

    const selectedNote = choices[Math.floor(Math.random() * choices.length)];
    noteCategory.textContent = selectedNote.label;
    noteMessage.textContent = selectedNote.message;

    noteCard.classList.remove("hidden");
    noteCard.style.animation = "none";
    void noteCard.offsetWidth;
    noteCard.style.animation = "appear 0.5s ease";
}

pickNoteButton.addEventListener("click", function () {
    showNote();
});

anotherNoteButton.addEventListener("click", function () {
    showNote();
});

document.querySelectorAll(".category-card").forEach(function (card) {
    card.addEventListener("click", function () {
        showNote(card.dataset.category);
        document.getElementById("jar").scrollIntoView({ behavior: "smooth" });
    });
});

// ===== BACKGROUND MUSIC =====
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
music.volume = 0.3;

musicToggle.addEventListener("click", async function () {
    if (music.paused) {
        try {
            await music.play();
            musicToggle.textContent = "⏸ Pause Music";
            musicToggle.classList.add("playing");
        } catch (error) {
            musicToggle.textContent = "⚠️ Music unavailable";
            console.warn("Please check that music.mp3 is in your website folder.", error);
        }
    } else {
        music.pause();
        musicToggle.textContent = "🎵 Play Music";
        musicToggle.classList.remove("playing");
    }
});

music.addEventListener("ended", function () {
    musicToggle.textContent = "🎵 Play Music";
    musicToggle.classList.remove("playing");
});

// ===== PASSWORD-PROTECTED MEMORIES =====
// Change this to a password only you and your friend know.
// Note: this is a simple front-end lock, not strong security for sensitive/private files.
const MEMORY_PASSWORD = "threefingercombo";

const memoryPasswordForm = document.getElementById("memoryPasswordForm");
const memoryPasswordInput = document.getElementById("memoryPassword");
const passwordMessage = document.getElementById("passwordMessage");
const memoryLockCard = document.getElementById("memoryLockCard");
const unlockedMemories = document.getElementById("unlockedMemories");
const lockMemoriesButton = document.getElementById("lockMemories");

memoryPasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (memoryPasswordInput.value === MEMORY_PASSWORD) {
        memoryLockCard.classList.add("hidden");
        unlockedMemories.classList.remove("hidden");
        passwordMessage.textContent = "";
        memoryPasswordInput.value = "";
        // Start loading memory media only after a successful unlock.
        unlockedMemories.querySelectorAll("img, video").forEach(function (media) {
            if (media.tagName === "IMG") {
                media.loading = "lazy";
            }
        });
    } else {
        passwordMessage.textContent = "Not quite! Try the password again. 💗";
        memoryPasswordInput.value = "";
        memoryPasswordInput.focus();
    }
});

function lockMemories() {
    // Pause videos and reset them when the memory area is locked again.
    unlockedMemories.querySelectorAll("video").forEach(function (video) {
        video.pause();
        video.currentTime = 0;
    });
    unlockedMemories.classList.add("hidden");
    memoryLockCard.classList.remove("hidden");
    memoryPasswordInput.value = "";
    passwordMessage.textContent = "";
}

lockMemoriesButton.addEventListener("click", lockMemories);

// ===== CLICK-TO-ENLARGE MEMORY PHOTOS =====
const memoryViewer = document.getElementById("memoryViewer");
const expandedMemory = document.getElementById("expandedMemory");
const closeMemoryButton = document.querySelector(".memory-close");

// Event delegation also works for every photo inside the unlocked section.
unlockedMemories.addEventListener("click", function (event) {
    const photo = event.target.closest(".memory-photo");
    if (!photo) return;

    expandedMemory.src = photo.src;
    expandedMemory.alt = photo.alt;
    memoryViewer.classList.remove("hidden");
    closeMemoryButton.focus();
});

function closeMemory() {
    memoryViewer.classList.add("hidden");
    expandedMemory.src = "";
}

closeMemoryButton.addEventListener("click", closeMemory);

memoryViewer.addEventListener("click", function (event) {
    if (event.target === memoryViewer) {
        closeMemory();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !memoryViewer.classList.contains("hidden")) {
        closeMemory();
    }
});


/* ===== PERSONALIZED FLOWER BOUQUETS ===== */

const bouquetReveal = document.getElementById("bouquetReveal");
const bouquetTitle = document.getElementById("bouquetTitle");
const bouquetMessage = document.getElementById("bouquetMessage");
const closeBouquet = document.getElementById("closeBouquet");

const bouquetMessages = {
    Ash: "For our lovely Ash 🌸 Thank you for being part of my life and for all the laughter, random moments, and memories we share. You deserve all the beautiful things this world has to offer. Never forget how appreciated you are. Here's a little bouquet to remind you that you are loved! ♡",

    Kharmee: "For our lovely Kharmee 🩵 Thank you for your thoughtful heart, your kindness, and all the little ways you make our days more special. May your life keep blooming with happiness, love, and beautiful surprises. You deserve a thousand flowers and so much more! ♡"
};

function showBouquet(name) {
    if (!bouquetMessages[name]) return;

    bouquetTitle.textContent = "A Little Bouquet for " + name + " ♡";
    bouquetMessage.textContent = bouquetMessages[name];

    bouquetReveal.classList.remove("ash-theme", "kharmee-theme");

    if (name === "Ash") {
        bouquetReveal.classList.add("ash-theme");
    } else {
        bouquetReveal.classList.add("kharmee-theme");
    }

    bouquetReveal.classList.remove("hidden");

    document.body.style.overflow = "hidden";
}

document.querySelectorAll(".bouquet-name-card").forEach(function (button) {
    button.addEventListener("click", function () {
        showBouquet(button.dataset.name);
    });
});

function hideBouquet() {
    bouquetReveal.classList.add("hidden");
    bouquetReveal.classList.remove("ash-theme", "kharmee-theme");
    document.body.style.overflow = "";
}

closeBouquet.addEventListener("click", hideBouquet);

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        !bouquetReveal.classList.contains("hidden")
    ) {
        hideBouquet();
    }
});