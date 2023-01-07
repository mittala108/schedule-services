const express=require('express');
const router=express.Router();
const {v4:uuidv4}=require('uuid');
const fetch=require('node-fetch');
const scheduler=require('node-schedule');

router.get('/send_review_message_backpacking_trip/:dateParam/:user_ns',(req,res)=>{

    const newDate=new Date(req.params.dateParam);
    const job=uuidv4();
    console.log(newDate,'send_review_message_schedule');
    scheduler.scheduleJob(`${job}`,newDate,()=>{
        console.log(newDate,'send_review_message_schedule');
        //sendReviewMessageToCustomer(req.params.user_ns);
        scheduler.cancelJob(`${job}`);
    });

    res.json({
        message:'request for scheduling to send reviews notification to user has been received successfully'
    });



});


const sendReviewMessageToCustomer=(user_ns)=>{

    const jsonPayLoad={
        "user_ns":user_ns
    };


    fetch('https://www.uchat.com.au/api/iwh/1971d09d8c28e042e424188499eed502',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(jsonPayLoad)
    })
    .then(response=>{

    })
    .catch(err=>{
        console.log(err);
    })
}








module.exports=router;