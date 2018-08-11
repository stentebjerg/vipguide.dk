import pagesJson from '../feed/pages.json'

const PagesStore = {
    data: {
        currentPage: "home",
        title: "Vagtplan",
        allData: null,
    },

    initData: function() {
        var name = "allData";
        localStorage.clear();
        localStorage.setItem(name, JSON.stringify(pagesJson));
        this.data.allData = JSON.parse(localStorage.getItem(name));
    },

    loadFromLocalStorage: function(pageName) {
        var data = localStorage.getItem(pageName);
        if (data == null) { return data; }
        return JSON.parse(data);
    },
    
    refresh: function() {
        // localStorage.setItem(this.PS.currentPage, null);
        location.reload();
    },
};

export default PagesStore;
