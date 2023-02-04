const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {

    const inputValue = document.getElementById("input").value;

    if (inputValue > 20 || inputValue < 1) {
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "Vous ne pouvez pas demander plus de 20 Photos";
        return;
    }

    imgs = "";

    try {
        btnEl.style.display = "none";
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=nO2syjVYVW49euetODk5ZFz_HHeJzvfiLAeHNI98-Ds`)
            .then((res) => res.json()
                .then((data) => {
                    console.log(data)
                    if (data){
                        data.forEach((pic) => {
                            imgs += `
                            <img src=${pic.urls.small} alt="image" />
                            `
                            galleryEl.style.display = "block"
                            galleryEl.innerHTML = imgs;
                            btnEl.style.display = "block";
                        });
                    }
                }));
        errorMessageEl.style.display = "none";
    } catch (error) {
        errorMessageEl.style.display = "block"
        errorMessageEl.innerHTML = "Une erreur est survenu revenai plus tard";
    }
}

btnEl.addEventListener("click", fetchImage);