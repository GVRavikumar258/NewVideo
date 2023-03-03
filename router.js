const http=require('http');
const fs=require('fs/promises');
const { url } = require('inspector');
const port =5000

var ffmpeg = require('fluent-ffmpeg');
var axios = require('axios');

// make sure you set the correct path to your video file
var proc = ffmpeg('./Videos/input_video.mp4')
    .videoFilters({
  filter: 'drawtext',
  options: {
    fontfile:'font.ttf',
    text: 'Hi Sambrama',
    fontsize: 20,
    fontcolor: 'white',
    x: '(main_w/2-text_w/2)',
    y: 50,
    shadowcolor: 'black',
    shadowx: 2,
    shadowy: 2
  }
})
    .input('https://verse.mp3quran.net/arabic/shaik_abu_baker_alshatri/64/001002.mp3')
    .on('end', function () {
        console.log('file has been converted succesfully');
    })
    .on('error', function (err) {
        console.log('an error happened: ' + err.message);
    })
    // save to file
    .save('./out.mp4');

http.createServer(async(req,res)=>
{
    if(req.url==='/'||req.url==='/home')
    {
        res.statusCode=200
        res.statusMessage="all ok"
        res.setHeader("content-type","text/html")
        let data=await fs.readFile("./Hello.html","utf-8")
        res.end(data)
    }
    else if(req.url==='/style')
    {
        res.writeHead(200,"okay",{"content-type":"text/css"})
        let css=await fs.readFile("./Hello1.css","utf-8")
        res.end(css)
    }else if(req.url==='/script')
    {
        res.writeHead(200,"okay",{"content-type":"text/javascript"})
        let css=await fs.readFile("./Hello.js","utf-8")
        res.end(css)
    }
    else if(req.url==='/video')
    {
        res.writeHead(200,"okay",{"content-type":"video/mp4"})
        let video=await fs.readFile("./Videos/input_video.mp4")
        res.end(video)
    }
    else
    {
        res.writeHead(404,"something gone wrong",{"content-type":"text/html"})
        let pnf=await fs.readFile("./pagenotfound.html","utf-8")
        res.end(pnf)
    }
})
.listen(5000,(err)=>
{
    if(err)throw err;
    console.log('this server is running on port 5000.............!!!!!!!!!!!!!!!!!!!! ',port);
})