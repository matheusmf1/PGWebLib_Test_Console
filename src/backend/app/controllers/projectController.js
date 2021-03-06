const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Validation = require('../models/validation');
const User = require('../models/user');

router.use( authMiddleware );

router.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST','UPDATE','DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});


// Render main page with all user projects
router.get( '/', async ( req, res ) => {
  try {
    
    const projects = await Project.find().where( { assignedTo: req.userId } ).populate(  ['validations'] );
    res.status(200).render( 'main', { projects: projects } );

  } catch ( error ) {
    console.log('Erro: ', error);
    res.status(400).send( { error: 'Error on loading projects' } );
  }
});

router.post( '/', async ( req, res ) => {
  try {

    const { title, description } = req.body;

    const userProj = await User.findByIdAndUpdate( req.userId ).select('projects');
    
    const project = await new Project( { title, description, assignedTo: userProj._id } );
   
    const check = await Project.findOne( { title: title } ).where( { assignedTo: userProj._id } );
   
    if ( check )
      return res.status(400).send( { error: 'Project Already in this User' } );

    await project.save();
    await userProj.updateOne( { $push: { projects: project } } );
    const projects = await Project.find( { assignedTo: req.userId } ); 

    res.status(200).render( 'main', { projects: projects } );
  } catch ( error ) {
    console.log('erro: ', error);
    res.status(400).send( { error: 'Error creating new project' } );
  }
});


// Get all projects from the logged user - JSON
router.get( '/projs', async ( req, res ) => {
  try {

    const projects = await Project.find( { assignedTo: req.userId } ).populate( ['validations'] );
    res.status(200).send( { projects } );

  } catch ( error ) {
    console.log('Erro: ', error);
    res.status(400).send( { error: 'Error on loading projects' } );
  }
});

// Get a specific project - JSON
router.get( '/projs/:project', async ( req, res ) => {
  try {

    const project = await Project.findOne( { title: req.params.project }).populate( ['validations'] );
   
    if( !project )
      return res.status(404).send( { error: 'Project not found' } );

    return res.send( { project } );
    
  } catch (error) {
    res.status(400).send( { error: 'Error on loading project' } );
  }
});

// Returns the updated proj - JSON
router.put( '/projs/:projectName', async ( req, res ) => {
  try {

    const { title, description } = req.body;

    const project = await Project.findOne( { assignedTo: req.userId, title: req.params.projectName } );

    if ( !project )
      res.status(404).send( {  Error: "Project not Found"  } );
    
    const projectUpdate = await Project.findOne( { _id: project._id } );
    
    await projectUpdate.updateOne( { title: title, description: description } );

    res.status(200).send( { ok: true } );

  } catch (error) {
    console.log(error)
    res.status(400).send( { error: 'Error updating new project' } )
  }
});

router.delete( '/projs/:project', async ( req, res ) => {
  try {

    const project = await Project.findOne( { title: req.params.project } ).populate( ['validations'] );

    if ( !project )
      return res.status(404).send( { error: 'Project not found'} );

    const user = await User.findByIdAndUpdate( req.userId ).select('projects');
 
    const check = user.projects;

    if ( check ) {
      const userProj = check.indexOf( project._id );
      check.splice( userProj, 1 );

      await user.updateOne( { projects: check } );
    }
    else{
      return res.status(404).send( { error: 'Error on loading User Projecs'} );
    }

    const validations = project.validations;

    if ( validations ) {
      validations.forEach( async ( v ) => {
      await Validation.findOneAndDelete( { title: v.title } );
    })};


    await Project.findOneAndDelete( { title: req.params.project } );
    
    return res.status(200).send( { ok: true } );
    
  } catch (error) {
    console.log( error)
    res.status(400).send( { error: 'Error on deleting project' } );
  }
});

// Get all projects from all users - JSON
router.get( '/allproj', async ( req, res ) => {
  try {

    const projects = await Project.find().populate( ['user', 'validations'] );
    res.status(200).send( { projects } );

  } catch (error) {
    console.log('Erro: ', error);
    res.status(400).send( { error: 'Error on loading all projects' } );
  }
});



module.exports = app => app.use( '/main', router );