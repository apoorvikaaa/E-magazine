// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// Business Logic
let currentLocation = 1;
const totalPapers = 15; // 15 papers = 30 pages
const maxLocation = totalPapers + 1;

// 1. Automatically Generate Pages
for (let i = 1; i <= totalPapers; i++) {
    const newPaper = document.createElement('div');
    newPaper.classList.add('paper');
    newPaper.id = `p${i}`;
    newPaper.style.zIndex = totalPapers - i + 1;

    const frontImgNum = (i * 2) - 1;
    const backImgNum = i * 2;

    newPaper.innerHTML = `
        <div class="front">
            <div class="front-content">
                <img src="images/${frontImgNum}.png" class="page-img" alt="Page ${frontImgNum}">
            </div>
        </div>
        <div class="back">
            <div class="back-content">
                <img src="images/${backImgNum}.png" class="page-img" alt="Page ${backImgNum}">
            </div>
        </div>
    `;
    book.appendChild(newPaper);
}

// Event Listeners
prevBtn.addEventListener("click", goPrevPage); // Linked to goPrev
nextBtn.addEventListener("click", goNextPage);

function openBook() {
    // If screen width is greater than 768px, shift the book
    if (window.innerWidth > 768) {
        book.style.transform = "translateX(50%)";
    } else {
        // On mobile, keep it centered but maybe shift slightly
        book.style.transform = "translateX(0%)";
    }
    
    // Ensure buttons stay visible
    prevBtn.style.opacity = "1";
    nextBtn.style.opacity = "1";
}

function closeBook(isAtBeginning) {
    if (window.innerWidth > 768) {
        if(isAtBeginning) {
            book.style.transform = "translateX(0%)";
        } else {
            book.style.transform = "translateX(100%)";
        }
    } else {
        // On mobile, just keep it centered
        book.style.transform = "translateX(0%)";
    }
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        // Correctly initialize 'targetPaper' BEFORE using it
        const targetPaper = document.querySelector(`#p${currentLocation}`);
        
        if(currentLocation === 1) {
            openBook();
        }

        targetPaper.classList.add("flipped");
        targetPaper.style.zIndex = currentLocation;

        if(currentLocation === totalPapers) {
            closeBook(false);
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        const targetPaper = document.querySelector(`#p${currentLocation - 1}`);

        if(currentLocation === 2) {
            closeBook(true);
        }
        if(currentLocation === maxLocation) {
            openBook();
        }

        targetPaper.classList.remove("flipped");
        
        // Fix: Ensure the Z-index returns to the top of the "unflipped" stack
        targetPaper.style.zIndex = totalPapers - (currentLocation - 2);

        currentLocation--;
    }
}
const fullscreenBtn = document.querySelector("#fullscreen-btn");

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }
});
