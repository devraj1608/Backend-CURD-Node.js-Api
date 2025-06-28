module.exports = (req,res)=>{
    let baseurl = req.url.substring(0,req.url.lastIndexOf("/")+1);
    console.log(baseurl);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    if(req.url === "/api/movies"){
        res.statusCode = 200;
        res.setHeader = ("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end()
    }else if(!regexV4.test(id)){
        res.writeHead(400,{"Content-Type": "application/json"});
        res.end(JSON.stringify({
            title:"validation failed" ,
            message:"UUID is not valid"
        })
      );
    }else if(baseurl === "/api/movies/" && regexV4.test(id)){
        res.statusCode = 200;
        res.setHeader = ("Content-Type", "application/json");
        let filteredMovie = req.movies.filter((movie)=>{
            return movie.id === id;
        })
        if(filteredMovie.length>0){
            res.statusCode = 200;
            res.write(JSON.stringify(filteredMovie));
            res.end();
        }
        else{
            res.statusCode = 404;
            res.write(JSON.stringify({
                title:"not found",
                message:"Movie  not found"
                })
            );
            res.end();
        }
       
    }
    else{
        res.writeHead(404,{"Content-Type": "application/json"});
        res.end(JSON.stringify({
                    title:"not Found" ,
                    message:"Route not found"
                }));
    }
};