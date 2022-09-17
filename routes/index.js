const jwt = require('jsonwebtoken');


var express = require('express');
var router = express.Router();
var db = require('../database/connect');
var db2 = require('../database/connect2');
var db3 = require('../database/connect3');
var db4 = require('../database/connect4')


router.get('/', function (req, res, next) {
  res.json("Server is Runningggg")
});

/* LOGIN */
router.post('/login', function (req, res, next) {
  console.log(req.body);

  db2.find({}, (err, docs) => {
    var check = docs.find((un) => {
      return un.username == req.body.username && un.password == req.body.password;
    })


    if (check != null) {

      var token = jwt.sign({ id: check._id }, 'mk');
      var name = check.name;
      var username = check.username
      var phone = check.phone
      var role = check.role

      obj = {
        name,
        username,
        phone,
        role,
        token
      }


      res.status(200).json(obj)

      // res.status(200).json(check)
    }

    if (check == null) {
      res.status(400).json('Tài khoản hoặc mật khẩu không chính xác')
    }
  })

});



/* PRODUCTS. */
router.get('/api/listpet', function (req, res, next) {
  db.find({}, (err, docs) => {
    res.json(docs)
  })
});

router.post('/admin/addproduct', function (req, res, next) {

  const product = new db({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    detail: req.body.detail,

  })

  product.save().then(() => {
    res.redirect('/')
  })
    .catch((err) => {
      if (err) throw err;
    });
});

router.get('/delete/product/:id', function (req, res, next) {
  db.deleteOne({ _id: req.params.id }, (err) => {
    if (err) throw err;
    res.redirect('http://localhost:3000/admin')
  })
})

router.post('/edit/product', function (req, res, next) {
  db.updateOne({ _id: req.body.id }, {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    detail: req.body.detail,
  },
    function (err) {
      if (err) throw err;
      res.redirect('/');
    })
});


/* ADD USER */

router.get('/api/users', function (req, res, next) {
  db2.find({}, (err, docs) => {
    res.json(docs)
  })
});




router.post('/signup', function (req, res, next) {

  db2.find({}, (err, docs) => {
    var check = docs.find((un) => {
      return un.username.toUpperCase() === req.body.username.toUpperCase();
    })


    if (check == null) {
      const users = new db2({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role
      })

      users.save().then(() => {
        res.status(200).json('Đăng kí thành công')
      })
        .catch((err) => {
          if (err) throw err;
        });
    }

    if (check != null) {
      res.status(400).json('Tài khoản đã tồn tại')
    }
  })

});

router.get('/delete/users/:id', function (req, res, next) {
  db2.deleteOne({ _id: req.params.id }, (err) => {
    if (err) throw err;
    res.redirect('http://localhost:3000/admin')
  })
})


/* Cart */
router.get('/api/order', function (req, res, next) {
  db3.find({}, (err, docs) => {
    res.json(docs)
  })
});



router.post('/cart', function (req, res, next) {

  const Cart = new db3({
    accout: req.body.name,
    fullname: req.body.fullname,
    address: req.body.address,
    phone: req.body.phone,
    listOrder: req.body.listOrder,
    tong: req.body.tong,
    note: req.body.note
  })

  Cart.save().then(() => {
    res.redirect('/')
  })
    .catch((err) => {
      if (err) throw err;
    });

});

router.get('/delete/order/:id', function (req, res, next) {
  db3.deleteOne({ _id: req.params.id }, (err) => {
    if (err) throw err;
    res.redirect('http://localhost:3000/admin')
  })
})

router.post('/detail/cmt', function (req, res, next) {

  const cmt = new db4({
    idProduct: req.body.idProduct,
    cmt: req.body.cmt,
    name: req.body.name,
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    minute: req.body.minute,

  })

  cmt.save().then(() => {
    res.redirect('/')
  })
    .catch((err) => {
      if (err) throw err;
    });

});

router.get('/detail/cmt/:id', function (req, res, next) {
  db4.find({ idProduct: req.params.id }, (err, docs) => {
    res.json(docs)
  })

})

router.get('/delete/cmt/:id', function (req, res, next) {
  db4.deleteOne({ _id: req.params.id }, (err) => {
    if (err) throw err;
    res.redirect('http://localhost:3000')
  })
})

router.get('/comment', function (req, res, next) {
  db4.find({}, (err, docs) => {
    res.json(docs)
  })

})







module.exports = router;
