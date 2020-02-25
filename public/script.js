document
    .querySelector('header button')
    .addEventListener("click", () => {
        document
            .querySelector('section')
            .classList.toggle('hide');
    });