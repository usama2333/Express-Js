class Apifeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
      
    }

    filter() {
        let queryString = JSON.stringify(this.queryStr);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        const queryObj = JSON.parse(queryString);
  
      //   console.log(queryObj,'advance filtering')
  
  
      //   remove await here for sorting
          // const movies = await Movie.find(queryObj);
  
          //for filtering logic use this below
          // let query = Movie.find(queryObj);
  
          //for sorting,limit,and pagination use this
            //    let query = Movie.find();

            //for class
            //this will not works on sort,limit
            //  this.query = this.query.find(queryObj)
            this.query = this.query.find()
             return this
    }

    sort() {
        // for sorting logic
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;

    }

    limitFields() {
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields)

        } else{
            this.query = this.query.select('-__v')
        }

        return this;

    }
    paginate() {
         //Pagination
        //127.0.0.1:3000/api/v1/movies/?page=2&limit=10
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;

        //Page 1 = 1-10, page2 = 11 - 20 , page3 = 21-30
        const skip = (page-1) * limit; //This is give skip limit
        this.query = this.query.skip(skip).limit(limit);

        // if(this.queryStr.page){
        //     const moviesCount = await Movie.countDocuments(); //This retuen all documents
        //     if(skip >= moviesCount){
        //         throw new Error("This page is not found")
        //     }
        // }
        return this;

    }


}

module.exports = Apifeatures;