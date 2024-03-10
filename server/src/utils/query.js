const DEFAULT_PAGE_LIMIT = 0; // if we pass 0 to mongo limit it will return all

function getPagination(query) {
    const page = Math.abs(parseInt(query.page)) || 1;
    const limit = Math.abs(parseInt(query.limit)) || DEFAULT_PAGE_LIMIT;
    const skip = (page - 1) * limit;

    return { 
        skip,
        limit
    }
}

module.exports = {
    getPagination
}