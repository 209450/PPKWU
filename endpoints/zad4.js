
searchStaff = (req, res, next) =>{
    console.log(req.query.search)
    // res.json({a: 33})
    next()
}

module.exports = {searchStaff}