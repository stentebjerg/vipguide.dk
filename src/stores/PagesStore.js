import pagesJson from '../feed/pages.json'

const PagesStore = {
    data: {
        currentPage: null,
        title: "Loading",
        allData: null,
        pagesLoadedCount: 0
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

    // Helper
    allLoaded: function () {
        var pagesToLoad = this.getValidPages(this.data.allData.pagesData).length;
        return pagesToLoad === this.data.pagesLoadedCount;
    },

    getValidPages: function (pages) {
        var resultArr = [];
        for (const p in pages) {
            if (this.validPage(pages[p])) resultArr.push(p);
        }
        return resultArr;
    },

    validPage: function (page) {
        return page.sheetNo != null && page.cols != null;
    },
};

export default PagesStore;
