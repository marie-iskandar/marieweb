const openModal = (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
        return;
    }
    e.preventDefault();
    const modalId = e.currentTarget.getAttribute("commandfor");
    document.getElementById(modalId).showModal();
}

const closeModal = (e) => {
    e.preventDefault();
    document.getElementById(e.currentTarget.getAttribute("commandfor")).close();
};

const shuffled = (src) => {
    const arr = [...src];
    for (let i = 1; i < arr.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
    return arr;
};

for (const opener of document.querySelectorAll("[commandfor]")) {
    opener.addEventListener('click', openModal);
}

for (const closer of document.querySelectorAll(".close")) {
    closer.addEventListener('click', closeModal);
}

for (const toShuffle of document.querySelectorAll(".shuffled")) {
    toShuffle.replaceChildren(...shuffled(toShuffle.children));
}