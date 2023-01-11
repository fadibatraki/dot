// importing packages

const express = require('express')
const admin = require('firebase-admin')
const bcrypt = require('bcrypt')
const path = require('path')
const uuid = require('uuid-v4')
var nodemailer = require('nodemailer')
var cloudinary = require('cloudinary')


//firebase admin setup

var serviceAccount = require("./ecom-website-4959a-firebase-adminsdk-vpdh3-e2dc53280d.json")
const JSONTransport = require('nodemailer/lib/json-transport')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://ecom-website-4959a.appspot.com"
});
let db = admin.firestore()


cloudinary.config({
    cloud_name: 'dot-digital',
    api_key: '144656119445372',
    api_secret: '6tR6wR7A-cOXir2-Ri3YOQVAI4I'
});

var bucket = admin.storage().bucket()
    //var imagePath = "./public/img/"

async function uploadImage(imagePath) {

    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'image/png',
        cacheControl: 'public,max-age=31536000'
    }
    await bucket.upload(imagePath, {
        gzip: true,
        metadata: metadata
    })
}

//declare static path

let staticPath = path.join(__dirname, "public")

//initializing express.js

const app = express()
const port = process.env.PORT || 3000
    //moddlewares
app.use(express.static(staticPath))
app.use(express.json())
    //routes
    //home route
app.get("/", (req, res) => {
        res.sendFile(path.join(staticPath, "index.html"))
    })
    //signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"))
})
app.post('/signup', (req, res) => {
        let { name, email, password, number, tac, notification } = req.body
            //form validations
        if (name.length < 3) {
            return res.json({ 'alert': 'name must be 3 letters long' })
        }
        if (name.length < 3) {
            return res.json({ 'alert': 'name must 3 letters long' })
        } else if (!email.length)
            return res.json({ 'alert': 'enter your email' })
        else if (password.length < 8)
            return res.json({ 'alert': 'password should be 8 letters long' })
        else if (!number.length)
            return res.json({ 'alert': 'enter your phone number' })
        else if (!Number(number) || number.length < 10)
            return res.json({ 'alert': 'invalid number, please enter valid one' })
        else if (!tac)
            return res.json({ 'alert': 'you must agree to our terms and conditions, please read then check' })
                //store user in db

        db.collection('user').doc(email).get()
            .then(user => {
                if (user.exists) {
                    return res.json({ 'alert': 'email already exisits' })
                } else {
                    //encrypt the password before storing
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            req.body.password = hash
                            db.collection('user').doc(email).set(req.body)
                                .then(data => {
                                    res.json({
                                        name: req.body.name,
                                        email: req.body.email,
                                        seller: req.body.admin
                                    })
                                })
                        })
                    })
                }
            })
    })
    //login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"))
})

app.post('/login', (req, res) => {
    let { email, password } = req.body
    if (!email.length || !password.length) {
        return res.json({ 'alert': 'fill all the inputs please' })
    }
    db.collection('user').doc(email).get()
        .then(user => {
            if (!user.exists) { // if email does not exists
                return res.json({ 'alert': 'log in email does not exists' })
            } else {
                bcrypt.compare(password, user.data().password, (err, result) => {
                    if (result) {
                        let data = user.data()
                        return res.json({
                            name: data.name,
                            email: data.email,
                            seller: data.seller
                        })
                    } else {
                        return res.json({ 'alert': 'password is incorrect' })
                    }
                })
            }
        })
})

//admin
app.get('/admin', (req, res) => {
        res.sendFile(path.join(staticPath, 'admin.html'))
    })
    //add product
app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"))
})

app.get('/add-product/:id', (req, res) => {
        res.sendFile(path.join(staticPath, "addProduct.html"))
    })
    //upload image
app.post('/add-product', (req, res) => {
    let {
        Id,
        Name,
        Manufactor,
        Model,
        ArabicTag,
        EnglishTag,
        ChinaTag,
        Color,
        PackageSize,
        Weight,
        Innerbox,
        CtnSize,
        Link,
        Category,
        Specification,
        Images,
        Packages,
        Videos,
        Tags,
        Private,
        Email,
        Categories,
        CategorySelectedIndex,
        draft,
        id
    } = req.body
        //validation
    if (!draft) {
        if (!Name.length) {
            return res.json({ 'alert': 'product name is empty' })
        } else if (!Manufactor.length) {
            return res.json({ 'alert': 'manufactor is empty' })
        } else if (!Category.length) {
            return res.json({ 'alert': 'category not chosen' })
        }
    }

    //add product

    let prdName = id == undefined ? `${Name.toLowerCase()}-${Id}` : id
    db.collection('products').doc(prdName).set(req.body)
        .then(data => {
            res.json({ 'product': Name })
        })
        .catch(err => {
            return res.json({ 'alert': 'some error occured. Try again' })
        })

    Images.forEach(img => {
        var imagePath = `./public/img/${Category}/${img}`
        uploadImage(imagePath)
    })
    Videos.forEach(vid => {
        var videoPath = `./public/img/${Category}/${vid}`
        uploadImage(videoPath)
    })
})
app.get('/images', async(req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:dev_setups')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});
app.post('/upload-image', async(req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.json({ msg: 'Image uploaded' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});
//get products
app.post('/get-products', (req, res) => {
    let { email, id, tag } = req.body

    if (id) {
        docRef = db.collection('products').doc(id)
    } else if (tag) {
        docRef = db.collection('products').where('Tags', 'array-contains', tag)
    } else if (email) {
        docRef = db.collection('products').where('Email', '==', email)
    } else {
        docRef = db.collection('products')
    }

    docRef.get()
        .then(products => {
            if (products.empty) {
                return res.json('no products')
            }
            let productArr = []
            if (id) {
                return res.json(products.data())
            } else {
                products.forEach(item => {
                    let data = item.data()
                    data.id = item.id
                    productArr.push(data)
                })
                res.json(productArr)
            }



        })
})

app.post('/delete-product', (req, res) => {
        let { id } = req.body
        db.collection("products").doc(id).delete()
            .then(data => {
                res.json('success')
            }).catch(err => {
                res.json('Error')
            })
    })
    //product page

app.get('/products/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"))
})
app.get('/search/:key', (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"))
})

app.get('/news', (req, res) => {
    res.sendFile(path.join(staticPath, "news.html"))
})


app.get('/add-news', (req, res) => {
    res.sendFile(path.join(staticPath, "addNew.html"))
})


app.post('/add-news', (req, res) => {
    let {
        Id,
        EnglishTitle,
        ArabicTitle,
        Date,
        EnglishSpecification,
        ArabicSpecification,
        Images,
        Private,
        Email,
        draft,
        id
    } = req.body
        //validation
    if (!draft) {
        if (!EnglishTitle.length) {
            return res.json({ 'alert': 'post english title is empty' })
        } else if (!ArabicTitle.length) {
            return res.json({ 'alert': 'post arabic title is empty' })
        }
    }

    //add post

    let postName = id == undefined ? `${EnglishTitle.toLowerCase()}-${Id}` : id
    db.collection('news').doc(postName).set(req.body)
        .then(data => {
            res.json({ 'post': postName })
        })
        .catch(err => {
            return res.json({ 'alert': 'some error occured. Try again' })
        })

    Images.forEach(img => {
        var imagePath = `./public/img/news/${img}`
        uploadImage(imagePath)
    })
})
app.get('/add-news/:id', (req, res) => {
        res.sendFile(path.join(staticPath, "addNew.html"))
    })
    //get news
app.post('/get-news', (req, res) => {
    let { email, id, tag } = req.body

    if (id) {
        docRef = db.collection('news').doc(id)
    } else if (tag) {
        docRef = db.collection('news').where('Tags', 'array-contains', tag)
    } else if (email) {
        docRef = db.collection('news').where('Email', '==', email)
    } else {
        docRef = db.collection('news')
    }

    docRef.get()
        .then(news => {
            if (news.empty) {
                return res.json('no news')
            }
            let newsArr = []
            if (id) {
                return res.json(news.data())
            } else {
                news.forEach(item => {
                    let data = item.data()
                    data.id = item.id
                    newsArr.push(data)
                })
                res.json(newsArr)
            }
        })
})
app.get('/post/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "post.html"))
})
app.post('/delete-news', (req, res) => {
    let { id } = req.body
    db.collection("news").doc(id).delete()
        .then(data => {
            res.json('success')
        }).catch(err => {
            res.json('Error')
        })
})

//lottery (town center)
app.get('/lottery', (req, res) => {
    res.sendFile(path.join(staticPath, "lottery.html"))
})
app.post('/lottery', (req, res) => {
        let { userId, name, phonenumber, opinion, lovedProducts } = req.body

        if (!name.length) {
            return res.json({ 'alert': 'الرجاء ادخال الاسم' })
        } else if (!phonenumber.length) {
            return res.json({ 'alert': 'الرجاء ادخال الرقم' })
        }
        db.collection('uservote').doc(name).set(req.body)
            .then(data => {
                res.json({ lottery: req.body.name })
                let transporter = nodemailer.createTransport({
                    JSONTransport: true,
                    service: 'hotmail',
                    auth: {
                        user: 'dot-digital@hotmail.com',
                        pass: 'dotdigital@2121'
                    }
                })

                var mailOptions = {
                    from: 'dot-digital@hotmail.com',
                    to: 'eliastomeh@hotmail.com',
                    subject: 'تقرير يانصيب المول',
                    text: `${name+","+phonenumber}`
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) console.log(err)
                    else console.log('email sent: ' + info.response)
                })
            })

        .catch(err => {
            return res.json({ 'alert': 'some error occured. Try again' })
        })

    })

app.get('/dotplus', (req, res) => {
    res.sendFile(path.join(staticPath, "dotplus.html"))
})

app.get('/lottery', (req, res) => {
    res.sendFile(path.join(staticPath, "lottery.html"))
})
app.post('/support', (req, res) => {
    let {Id,Subject,Sender,Message} = req.body
        //validation
    if (!Sender.length) 
        return res.json({ 'alert': 'الرجاء ادخال ايميل' })
        else if (!Message.length) 
            return res.json({ 'alert': 'الرجاء ادخال المشكلة' })

    db.collection('support').doc(Id).set(req.body)
        .then(data => {
            res.json({ 'alert': 'تم ارسال المشكلة, شكرا على تفهمكم' })
        })
        .catch(err => {
            return res.json({ 'alert': 'some error occured. Try again' })
        })

})

app.post('/get-info', (req, res) => {
    let { email} = req.body

docRef = db.collection('info').doc('information')

    docRef.get()
        .then(info => {
            if (info.empty) {
                return res.json('no info')
            }
            else
            return res.json(info.data())
        })
})
app.post('/save-info',(req,res)=>{
    let {FirstTitle,SecTitle,ThirdTitle,FirstContent,SecContent,ThirdContent} = req.body

    if(!FirstTitle.length || !SecTitle.length || !ThirdTitle.length || !FirstContent.length || !SecContent.length || !ThirdContent.length){
        return res.json({'alert':'يرجى كتابة المعلومات بشكل كامل'})
    }

    db.collection('info').doc('information').set(req.body)
    .then(data =>{
        res.json({'success':'done'})
    })
    .catch(err=>{
        return res.json({'alert':'Error'})
    })
    
})
    // 404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"))
})
app.use((req, res) => {
    res.redirect('/404')
})
app.listen(port, () => {
    console.log('listening on port: ' + port)
})