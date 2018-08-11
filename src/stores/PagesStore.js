const PagesStore = {
    data: {
        currentPage: "home",
        title: "Vagtplan",
        pages: JSON.parse(localStorage.pages).pages,
    }
};

export default PagesStore;
