const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Validation = require('../models/validation');

const router = express.Router();

router.use( authMiddleware );

router.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST','UPDATE','DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});


// Returns a JSON
router.get( '/', async ( req, res ) => {
  try {

    const validation = await Validation.find(); 
    
    if ( !validation )
      return res.status(404).send( { error: 'Error on loading Validations' } );

    return res.status(200).send( { validation } );

  } catch (error) {
    console.log(error)
    res.status(400).send( { error: 'Error on loading Validations' } );
  }
});


router.post( '/', async ( req, res ) => {
  try {
    const { title, info, projectTitle } = req.body;
    
    const project = await Project.findOne( { title: projectTitle } ).where( { assignedTo: req.userId } );
    
    if ( !project ) 
      return res.status(404).send( { error: 'Project Does not Exists' } );

    const validation = await new Validation( { title, info, project: project._id } );


    const checkVal = await Validation.findOne( { title: title } ).where( { project: project._id } );

    if ( checkVal )
      return res.status(400).send( { error: 'Validation already in this User'} );
  
    project.validations.push( validation );

    await validation.save();
    await project.save(); 

    return res.status(200).redirect('/main/');
  } catch ( error ) {
    console.log( error );
    res.status(400).send( { error: 'Error creating new Validation' } );
  }
});

// Returns the rendered validation page
router.get('/:proj/:val', async ( req, res ) => {
  try{

    const project = await Project.findOne( { title: req.params.proj } ).where( { assignedTo: req.userId } );
  
    if ( !project )
      return res.status(404).send( { error: 'Project not found'} );

    const validation = await Validation.findOne( { title: req.params.val } ).where( { project: project._id } );
  
    if ( !validation )
      return res.status(404).send( { error: 'Validation not found' } );

    const data =  JSON.parse(validation.info);

    res.status(200).render( 'validation', { projeto: project.title, titulo: validation.title, validacao: data } );

  } catch( err ) {
    console.log( err );
    return res.status(400).send( { error: 'Error on loading Validation' } )
  }
});


// Returns the specefic validation in json
router.get('/:proj/:val/json', async ( req, res ) => {
  try{

    const project = await Project.findOne( { title: req.params.proj } ).where( { assignedTo: req.userId } );
  
    if ( !project )
      return res.status(404).send( { error: 'Project not found'} );

    const validation = await Validation.findOne( { title: req.params.val } ).where( { project: project._id } );
  
    if ( !validation )
      return res.status(404).send( { error: 'Validation not found' } );

    const data =  JSON.parse(validation.info);

    res.status(200).send( { projeto: project.title, titulo: validation.title, validacao: data } );

  } catch( err ) {
    console.log( err );
    return res.status(400).send( { error: 'Error on loading Validation' } )
  }
});


router.put( '/:proj/:val', async ( req, res ) => {
  try {
    const { title } = req.body;

    const project = await Project.findOne( { title: req.params.proj } ).where( { assignedTo: req.userId } );
  
    if ( !project )
      return res.status(404).send( { error: 'Project not found'} );

    const validation = await Validation.findOne( { title: req.params.val } ).where( { project: project._id } );
  
    if ( !validation )
      return res.status(404).send( { error: 'Validation not found' } );

    await validation.updateOne( { title: title } );
    
    res.status(200).send( { ok: true } );

  } catch (error) {
    console.log( error );
    res.status(400).send( { error: 'Error updating validation' } )
  }
});

router.delete( '/:proj/:val', async ( req, res ) => {
  try {

    const project = await Project.findOne( { title: req.params.proj } ).select('validations').where( { assignedTo: req.userId } );
  
    if ( !project )
      return res.status(404).send( { error: 'Project not found'} );

    const validation = await Validation.findOne( { title: req.params.val } ).where( { project: project._id } );
  
    if ( !validation )
      return res.status(404).send( { error: 'Validation not found' } );

    const check = project.validations;
  
    if ( check ) {
      const valProj = check.indexOf( validation._id );
      check.splice( valProj, 1 );
  
      await project.save( { validations: check } );
      await Validation.findOneAndDelete( { title: req.params.val } ).where( { project: project._id } );
    }
    else{
      return res.status(404).send( { error: 'Error on loading User Projecs'} );
    }

    const projects = await Project.find( { assignedTo: req.userId } );
    return res.status(200).render( 'main', { projects: projects } );
    
  } catch (error) {
    console.log(error);
    res.status(400).send( { error: 'Error on deleting validation' } );
  }
});


module.exports = app => app.use( '/main/validation', router );