const connection = require('../connection');

export default class {
    createNews({title, content, creator, shared, status, isPinned, tag}, callback){

    }

    updateNews({id, title, content, creator, shared, tag}, callback){

    }

    changeNewsStatus({id, status}, callback){

    }

    switchNewsPinned({id, isPinned}, callback){

    }

    deleteNews({id}, callback){

    }

    newsList({search, orderby, order, rows}, callback){

    }

    newListByTag({tag, search, orderby, order, rows}, callback){
        
    }
}