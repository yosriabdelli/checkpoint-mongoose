const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const {Schema}=mongoose


mongoose.connect(process.env.DB_URI,{ useUnifiedTopology: true,useNewUrlParser: true })


.then(()=>{console.log('DB connected')})
.catch(err=>console.log(err))

const Person=Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    favoriteFoods:{
        type:[String]
    }
})

const PersonModel=mongoose.model('person',Person)

const newPerson= new PersonModel({
    name:'yosri',
    age:28,
    favoriteFoods:['pizza','malfouf']
})

newPerson.save()

PersonModel.create([{
    name:'ahmed',
    age:25,
    favoriteFoods:['jelbena','tajin']
},
{
    name:'salah',
    age:55,
    favoriteFoods:['mlou5ia','maffouna']
},
{
    name:'Mary',
    age:55,
    favoriteFoods:['mlou5ia','maffouna']
}])

PersonModel.find({}).then(res=> console.log(res)).catch(err=>console.log(err))

PersonModel.findOne({age:55}).then(res=> console.log(res)).catch(err=>console.log(err))

var edited=PersonModel.findById('60b539eca74f603b64256aae').then(res=> res).catch(err=>console.log(err))



PersonModel.findOneAndUpdate({_id:'60b539eca74f603b64256aae'},{name:'me7rez'},{ new: true }).then(res=> console.log(res)).catch(err=>console.log(err))


PersonModel.findByIdAndRemove('60b539eca74f603b64256aae').then(res=> console.log(res)).catch(err=>console.log(err))

PersonModel.remove({name:'Mary'}).then(res=> console.log(res)).catch(err=>console.log(err))


PersonModel.findOne({favoriteFoods:['burritos']}).sort({name:1}).limit(2).select(['age']).then(res=> console.log(res)).catch(err=>console.log(err))

app.listen(5000,()=>{
    console.log(`listening on port ${5000}`)
})

