const express=require('express');
const router=express.Router();
const {v4:uuidv4}=require('uuid');
const fetch=require('node-fetch');
const scheduler=require('node-schedule');

router.get('/delete_scheduler_backpacking_trip/:dateParam/:package_date_id',(req,res)=>{
    
    const newDate=new Date(req.params.dateParam);
    const job=uuidv4();
    console.log(newDate,'delete_date_schedule');
    scheduler.scheduleJob(`${job}`,newDate,()=>{
        deleteBackpackingTripPackageDate(req.params.package_date_id); 
        scheduler.cancelJob(`${job}`);                     
    });  

    res.json({
        message:'request for scheduling has been sent to the server successfully'
    });
});


const deleteBackpackingTripPackageDate=(package_date_id)=>{

    fetch(`http://localhost:8000/admin/sub_routes/backpacking_trip_related_routes/backpacking_trip_package_dates/delete_date_and_cost_from_database/${package_date_id}`,{
        method:'DELETE'
    })
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    });
}








module.exports=router;