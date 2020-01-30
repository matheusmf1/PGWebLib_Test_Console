const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Validation = require('../models/validation');
const User = require('../models/user');

const router = express.Router();

router.use( authMiddleware );

router.get( '/', async ( req, res ) => {
  try {

    const projects = await Project.find().populate( ['user', 'validations'] );
    return res.send( { projects } );

  } catch (error) {
    res.status(400).send( { error: 'Error on loading projects' } );
  }
});

router.get( '/:project', async ( req, res ) => {
  try {

    const project = await Project.findOne( { title: req.params.project }).populate( ['validations'] );
   
    if( !project )
      return res.status(404).send( { error: 'Project not found' } );

    return res.send( { project } );
    
  } catch (error) {
    res.status(400).send( { error: 'Error on loading project' } );
  }
});

router.post( '/', async ( req, res ) => {
  try {

    const { title, description } = req.body;

    const userProj = await User.findById( req.userId ).select('+password').select('projects');
    console.log('UserProj: ', userProj);

    const project = await new Project( { title, description, assignedTo: userProj._id });
   
    const check = await Project.findOne( { title: title } ).where( { assignedTo: userProj._id } );
  
    console.log('project: ', project);
    console.log('check: ', check);
   
    if ( check )
      return res.status(400).send( { error: 'Project Already in this User' } );

    userProj.projects.push( project );
    
    await project.save();
    await userProj.save();

    res.status(200).send( { project } );
  } catch ( error ) {
    console.log('erro: ', error);
    res.status(400).send( { error: 'Error creating new project' } )
  }
});

router.put( '/:projectId', async ( req, res ) => {
  try {

    const { title, description, validations } = req.body;

    const project = await Project.findByIdAndUpdate( req.params.projectId, { 
      title, 
      description
    });

    project.validations = [];
    await Validation.remove( { project: project._id } );

    await Promise.all( validations.map( async val => {
      const projectVal = new Validation( { ...val, project: project._id } );

      await projectVal.save();

      project.validations.push( projectVal );
    }));

    await project.save();

    res.send( { project } );

  } catch (error) {
    console.log(error)
    res.status(400).send( { error: 'Error updating new project' } )
  }
});

router.delete( '/:project', async ( req, res ) => {
  try {

    const project = await Project.findOne( { title: req.params.project } ).populate( ['validations'] );

    if ( !project )
      return res.status(404).send( { error: 'Project not found'} );

    const user = await User.findOne( { id: req.userId } ).select('+password');

    const userProj = user.projects.forEach( async ( proj, index, obj ) => {
     
      if ( proj.toString === project._id.toString ) {
        obj.splice( index, 1 );
        await user.save();
      }
    });

    const validations = project.validations.forEach( async ( v ) => {
      await Validation.findOneAndDelete( { title: v.title } );
    });

    await Project.findOneAndDelete( { title: req.params.project } );
    
    return res.status(200).send( { ok: true } );
    
  } catch (error) {
    res.status(400).send( { error: 'Error on deleting project' } );
  }
});


module.exports = app => app.use( '/main/projects', router );