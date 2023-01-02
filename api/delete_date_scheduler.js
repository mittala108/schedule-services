const express=require('express');
const router=express.Router();
const {v4:uuidv4}=require('uuid');
const fetch=require('node-fetch');
const scheduler=require('node-schedule');

router.get('/delete_scheduler_backpacking_trip/:dateParam/:package_date_id',(req,res)=>{
    
    console.log('i am here');
    const newDate=new Date(req.params.dateParam);
    console.log(newDate);
    console.log(req.params.package_date_id);
    const job=uuidv4();
    scheduler.scheduleJob(`${job}`,newDate,()=>{
        deleteBackpackingTripPackageDate(req.params.package_date_id); 
        console.log("ddhdhdhdhdbjhadjhbjbbjbjhbjhbjbjbjhb");
        scheduler.cancelJob(`${job}`);                     
    });  

    res.json({
        message:'request for scheduling has been sent to the server successfully'
    });
});


const deleteBackpackingTripPackageDate=(package_date_id)=>{

    fetch(`http://18.206.146.145:8000/admin/sub_routes/backpacking_trip_related_routes/backpacking_trip_package_dates/delete_date_and_cost_from_database/${package_date_id}`,{
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