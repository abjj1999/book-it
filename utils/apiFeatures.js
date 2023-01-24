class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const location = this.queryString.location ? {
            address: {
                $regex: this.queryString.location,
                $options: 'i'
            }
        }: {}

        console.log(location)

        this.query = this.query.find({...location});

        return this;
    }
    filter() {
        const queryCopy = {...this.queryString};
        
        // Removing fields from the query
        const removeFields = ['location', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);
        
        
        this.query = this.query.find(queryCopy);

        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);

        

        return this;
    }
}

export default ApiFeatures;