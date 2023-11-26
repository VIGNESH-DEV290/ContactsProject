const express=require('express')
const mongoose=require('mongoose')
const app=express()
mongoose.connect("mongodb://127.0.0.1/contacts")

const contactSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String
})
const Contact=mongoose.model('contact',contactSchema)

app.use( express.json ())
app.get("/contacts",async(req,res)=>{
    try{
const contacts=await Contact.find()
res.json(contacts)
    }
    catch(error){
res.status(500).json({message:error.message})
    }
})
app.get("/contacts/:id",async (req,res)=>{
    try{
        const contact1=await Contact.findById(req.params.id);
        res.json(contact1)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})


app.post("/contacts",async (req,res)=>{
    const newcontact=new Contact({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    })
    try{
        const savedContact=await newcontact.save()
        res.status(201).json(savedContact)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
app.put("/contacts/:id",async(req,res)=>{
    try{
        const contact2= await Contact.findByIdAndUpdate(req.params.id,{
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone
        })
        res.json(contact2)
    }
    catch(error){
        res.status(500).json({messsage:error.message})

    }
    
})
app.delete("/contacts/:id",async(req,res)=>{
    try{
        const contact3=await Contact.findByIdAndDelete(req.params.id);
        res.json({message:"Deleted successfully"})
    }catch(error)
    {
res.status(500).json({message:error.message})

    }
})

app.listen(12345,()=>{
    console.log("sever is running")
})









