var sequelize=require('../orm/connection');
const passport=require('passport')
var express=require("express")
var route = express.Router();
var model=require('../orm/model/employee')

route.get("/manager/:name",async function(request,response){
   try{
      const employees = await model.skillmap.findAll({
         group: ['employee_id'],
         attributes: ['employee_id'], //select *
         include: [{
            model: model.employee,
            attributes: ['name', 'experience','manager'],
            required: true, //inner join
            where:{manager:request.params.name,lockstatus:'not_requested'}  //condition not requested lock
           }
           ,{
              model:model.skill,
              attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.col('skill.name')), 'skills']],
              require:true //inner join
           }
         ]
      })

      let managers=[];
      employees.map(employee => {
         let manager={
            EmployeeId:employee.dataValues.employee_id,
            Name:employee.dataValues.employee.name,
            Skills:employee.dataValues.skill.dataValues.skills,
            Experience:employee.dataValues.employee.experience,
            Manager:employee.dataValues.employee.manager
         }
         managers.push(manager)
      });
      if(managers.length>0) 
      {
         response.json(managers)
      }
      else
         response.status(401).send("Failed")
   }
   catch(e)
   {
      console.log(e)
           response.status(500)
   }
   
   })
   route.get("/:employeeid",async function(request,response){
      try{
         const employees = await model.employee.findOne({where:{employee_id:request.params.employeeid }})
         let result = employees.dataValues
         
         if(result!=null) 
            {
               response.json(
                  {
                     name:result.name
                  }
               )
            }
            else
                 response.status(401).send("Failed")
      }
      catch(e)
      {
         console.log(e)
              response.status(500)
      }
      
      })
   route.post("/softlock",passport.authenticate('jwt',{session:false}),async function(request,response){
      try{
       
         let ans={ 
               employee_id: request.body.employee_id, 
               manager: request.body.username,
               status:'waiting',
               requestmessage:request.body.requestmessage
         }
         const softlock = await model.softlock.create(ans);
         console.log("check data update")
         console.log(softlock)
         let employee = await model.employee.findOne({ where: { employee_id: request.body.employee_id } })
         employee.lockstatus = 'request_waiting';
         await employee.save();
         response.send("Requested successfully!")
      }
      catch(e)
      {
         console.log(e)
              response.status(500)
      }
})

route.get("/wfm/:name",passport.authenticate('jwt',{session:false}),async function(request,response){
   try {
      const manager_requests = await model.softlock.findAll({
         group: ['employee_id'],
         attributes: ['employee_id','manager','reqdate','requestmessage'],
         required: true,
         include: [{
           model: model.employee,
           attributes: ['wfm_manager'],
           required: true,
           where: { wfm_manager: request.params.name, lockstatus: 'request_waiting' }
        }]
      })

      let wfm_managers = [];
      manager_requests.map(employee => {
         let wfm_manager = {
            EmployeeId: employee.dataValues.employee_id,
            Manager: employee.dataValues.manager,
            reqDate: employee.dataValues.reqdate,
            requestmessage: employee.dataValues.requestmessage,
            wfm_manager: employee.dataValues.employee.wfm_manager
         }
         wfm_managers.push(wfm_manager)
      });

      if (wfm_managers.length > 0) {
         response.json(wfm_managers)
      }
      else
         response.status(401).send("Failed")
   }

   catch (e) {
      console.log(e)
      response.status(500)
   }
});

      route.post("/softlockstatus",passport.authenticate('jwt',{session:false}),async function(request,response){
         try{   
            let softlock = await model.softlock.findOne({ where: { employee_id: request.body.employee_id } })      
            softlock.managerstatus = request.body.status;      
            await softlock.save();     
            let employee = await model.employee.findOne({ where: { employee_id: request.body.employee_id } })     
            employee.lockstatus =  request.body.status==='accepted'? 'locked':'not_requested';      
            await employee.save();     
            response.send("Requested status updated successfully!")     
         }
      
         catch (e) {      
            console.log(e)      
            response.status(500)      
         }      
      });

module.exports=route