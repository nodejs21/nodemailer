var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');
var http = require("http");

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = process.env.PORT || 3000;
    app.get('/', function (req, res) {
      res.render('index');
    });
    app.post('/sendmessage', function (req, res) {
        http.get(`http://api.smilesn.com/sendsms?hash=ae6bbae837163f85661618c10e42b8a89e820621&sendernum=8583&textmessage=${req.body.message}&receivenum=${req.body.number};`, response => {res.send(response);})
    });
    app.post('/send-email', async function (req, res) {
      console.log(JSON.stringify(req.body, undefined, 2));
      var transporter = nodeMailer.createTransport({
         service: 'gmail',
         auth: {
                user: req.body.user,
                pass: req.body.pass
            }
        });
      let mailOptions = {
          from: req.body.from, // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body
          html: '<b>NodeJS Email Tutorial</b>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
