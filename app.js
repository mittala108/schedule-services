const express=require('express');
const app=express();
const port=9000;
const bodyParser=require('body-parser');
const cors=require('cors');
const deleteDateSchedulerRoute=require('./api/delete_date_scheduler');
const sendReviewMessageToUserScheduler=require('./api/send_review_message_to_user_scheduler');
const scheduler=require('node-schedule');
const jwt=require('jsonwebtoken');

app.listen(port,()=>{
    console.log(`listening to the port at ${port}`);

});

app.use(cors({
    origin:"*"
}));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/experiment1',(req,res)=>{
    var token=jwt.sign({username:'aman'},'amanmittal');
    console.log(token);
});

app.use('/schedule_jobs/delete_date_scheduler',deleteDateSchedulerRoute);
app.use('/schedule_jobs/send_review_message_to_user_scheduler',sendReviewMessageToUserScheduler);


app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=406;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});