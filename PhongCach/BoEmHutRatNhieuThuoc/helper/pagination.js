module.exports = (objectPagination, query, countProducts) =>{
    if(query.page){
        objectPagination.currenPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currenPage - 1) * objectPagination.limitItem;
    
    const totalPage = Math.ceil(countProducts/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;

    return objectPagination;
}