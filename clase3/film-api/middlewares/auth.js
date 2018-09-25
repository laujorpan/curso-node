module.exports = function(req,res,next) {
    if (req.session && req.session.user){
        next();
    }else{
        console.log("Not authorized")
        res.redirect('/');
    }

}