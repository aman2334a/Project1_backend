const express=require(`express`)
const app=express()
const mongoose=require(`mongoose`)
const PORT=7000
const cors=require('cors')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const adminRoutes=require('./app/routes/adminRoutes')
const userRoutes=require('./app/routes/userRoutes')



app.use('/v1/admin',adminRoutes)
app.use('/v1',userRoutes)

app.get(`/test`,(req,res)=>{
    res.status(200).send(`hello bro`)
})


const uri="mongodb+srv://AmanKumar2334:8YTNtyvaf-Gmdd5@cluster0.tnhjy1i.mongodb.net/project1"

mongoose.connect(uri).then(
    () => { console.log(`Database connected =====>`) },
    err => { console.log(err) }
  );
app.listen(PORT, (() => {
    console.log(`server running on ===> ` + PORT)
})) 