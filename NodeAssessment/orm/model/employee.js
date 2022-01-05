const Sequelize = require('sequelize');
var sequelize=require('../connection');

//employees Table model
var employee=sequelize.define('employee',{
    employee_id:{
      type: Sequelize.INTEGER,
      primaryKey:true
    },
    name:{
      type: Sequelize.DataTypes.TEXT,
      allowNull:false
    },
    status:{
      type: Sequelize.DataTypes.TEXT,
      allowNull:false
    },
    manager:{
      type: Sequelize.DataTypes.TEXT,
      allowNull:true
    },
    wfm_manager:{
      type: Sequelize.DataTypes.TEXT,
      allowNull:true
    },
    email:{
      type: Sequelize.DataTypes.TEXT,
      allowNull:true
    },
    lockstatus:{
      type: Sequelize.DataTypes.TEXT,
      allowNull:true
    },
    experience:{
      type:Sequelize.DataTypes.DECIMAL(5,0),
      allowNull:true
    },
    profile_id:{
      type:Sequelize.INTEGER,
      allowNull:true
    }
  },{
    //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  
  // If don't want createdAt
  createdAt: false,
  
  // If don't want updatedAt
  updatedAt: false
  }
);

//skill table model
var skill=sequelize.define('skill',{
    skillid:{
      type: Sequelize.DataTypes.DECIMAL(5,0),
      primaryKey:true
    },
    name:{
        type: Sequelize.DataTypes.TEXT,
        allowNull:false
    }
  },{
    //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  
  // If don't want createdAt
  createdAt: false,
  
  // If don't want updatedAt
  updatedAt: false
  }
);

//skillmap table model
var skillmap=sequelize.define('skillmap',null,{
        //don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      
      // If don't want createdAt
      createdAt: false,
      
      // If don't want updatedAt
      updatedAt: false
      }
);

//skillmap table have 2 foreign keys -> skillid and employee_id
skillmap.belongsTo(skill,{foreignKey: 'skillid'});
skillmap.belongsTo(employee,{foreignKey: 'employee_id'});

//As there is no primary key in skillmaps table -> sequelize adds id as primary key by default-> so removing id from skillmaps table
skillmap.removeAttribute('id'); 

//Syncing Skill table
skill.sync({force: false}).then(() => {
    console.log("Skill Table Synched!!!");
});

//Syncing SkillMap table
skillmap.sync({force: false}).then(() => {    
    console.log("SkillMap Table Synched!!!");
});

//Syncing Employee table
employee.sync({force: false}).then(() => {
    console.log("Employee Table Synched!!!");
});

var softlock = sequelize.define('softlock', {
  employee_id: {
     type: Sequelize.INTEGER,
     allowNull: false
 },
 manager: {
     type: Sequelize.TEXT,
     allowNull: false
 },
 reqdate: {
     type: Sequelize.DATE,    
     allowNull: false,
     defaultValue:Sequelize.NOW    
 },
 status: {
     type: Sequelize.TEXT,
     allowNull: false
 },
 lastupdated:{
  type: Sequelize.DataTypes.DATE,
  allowNull: false,
  defaultValue:Sequelize.NOW
},
 lockid: {
     type: Sequelize.INTEGER,
     primaryKey: true,
     autoIncrement: true
 },
 requestmessage: {
     type: Sequelize.TEXT,
     allowNull: false
 },
 wfmremark: {
     type: Sequelize.TEXT,
     allowNull: true
 },
 managerstatus: {
     type: Sequelize.TEXT,
     allowNull: true
 },
 mgrstatuscomment: {
     type: Sequelize.TEXT,
     allowNull: true
 },
 mgrlastupdate: {
     type: Sequelize.DataTypes.DATE,
     allowNull: true,
     defaultValue:Sequelize.NOW
 }
}
,{
 //don't add the timestamp attributes (updatedAt, createdAt)
timestamps: false,

// If don't want createdAt
createdAt: false,

// If don't want updatedAt
updatedAt: false
}

);
softlock.removeAttribute('id'); 
softlock.removeAttribute('createdAt'); 
softlock.removeAttribute('updatedAt'); 
softlock.belongsTo(employee, { foreignKey: 'employee_id' });

softlock.sync({force: false}).then(() => {
 
 console.log("softlock Synched!!!");
});

module.exports={employee:employee,skill:skill,skillmap:skillmap,softlock:softlock};