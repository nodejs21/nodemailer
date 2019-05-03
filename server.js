var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = process.env.PORT || 3000;
    app.get('/', function (req, res) {
      res.render('index');
    });
    app.post('/send-email', async function (req, res) {
      console.log(JSON.stringify(req.body, undefined, 2));
      let testAccount = await nodeMailer.createTestAccount();
      let transporter = nodeMailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
              user: testAccount.user,
              pass: testAccount.pass
          }
      });
      let mailOptions = {
          from: '"Safi Ullah" <ndoejs21@gmail.com>', // sender address
          to: "nodejs21@gmail.com", // list of receivers
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
