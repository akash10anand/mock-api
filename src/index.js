const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/OrderRequest', (req, res) => {
  if ("credentials" in req.headers == false || req.header('credentials') == "invalid") {
    res.status(401).send({
      "status": "Error",
      "message": "Invalid Or Missing Credentials."
    })
  } else {
    if (req.header('credentials') == "valid" && req.body.webhookUrl == 'valid') {
      res.status(200).send({
        "type":"Success",
        "message":"Slot recxIsLVV12dA1Xcc reserved successfully."
      })
    } else {
      if (req.header('credentials') == "valid" && req.body.webhookUrl != 'valid') {
        res.status(500).send({
          "status": "Error",
          "message": "Invalid webhook."
        })
      }
    }
  }
});

let getDate = (days) => {
  var currDate = new Date();
  newDate = new Date(currDate.setDate(currDate.getDate() + days))
  return newDate.toJSON().split('T')[0];
}
const week1 = 1;
const week2 = 7;
const week3 = 14;

app.get('/capacity', (req, res) => {
  if(req.query.therapy == 'non-existant'){
    res.status(500).json({
      "msg": "therapy does not exist!"
    })
  } else{
    if(req.query.client_site_id == 'cs001'){
      res.status(200).json({
        "plant_id": req.query.client_site_id,
            "Dates": [
                getDate(week1 + 1),
                getDate(week1 + 2),
                getDate(week2 + 1),
                getDate(week2 + 2),
                getDate(week2 + 3),
                getDate(week3 + 1),
                getDate(week3 + 2),
                getDate(week3 + 3),
                getDate(week3 + 4),
                getDate(week3 + 5)
            ]
      })
  } else {
    res.status(200).json({
      "plant_id": req.query.client_site_id,
          "Dates": []
    })
  }
  }
});


app.listen(8080, '0.0.0.0', () => {
  console.log('server started');
});