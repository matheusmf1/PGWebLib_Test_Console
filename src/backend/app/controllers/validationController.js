const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Validation = require('../models/validation');
const User = require('../models/user');

const router = express.Router();

router.use( authMiddleware );


router.get( '/', async ( req, res ) => {
  try {

    const validation = await Validation.find(); 
    return res.status(200).send( { validation } );

  } catch (error) {
    res.status(400).send( { error: 'Error on loading Validations' } );
  }
});

router.get('/:val', async ( req, res ) => {
  try{

    const validation = await Validation.findOne( { title: req.params.val } );
   
    if ( !validation )
      return res.status(404).send( { error: 'Validation not found' } );

    res.status(200).send( { validation } );

  } catch( err ) {
    console.log( err );
    return res.status(400).send( { error: 'Error on loading Validation' } )
  }
});


router.post( '/', async ( req, res ) => {
  try {
    const { title, info, projectTitle } = req.body;
  
    const project = await Project.findOne( { title: projectTitle } ).where( { assignedTo: req.userId } );

    console.log('Project: ', project);
    
    if ( !project ) 
      return res.status(404).send( { error: 'Project Does not Exists' } );

    const validation = await new Validation( { title, info, project: project._id } );
    console.log('Validation: ', validation);

    const checkVal = await Validation.findOne( { title: title } ).where( { project: project._id } );
    console.log( 'checkVal: ', checkVal );

    if ( checkVal )
      return res.status(400).send( { error: 'Validation already in this User'} );
  
    project.validations.push( validation );

    await validation.save();
    await project.save(); 

    return res.status(200).json( { validation } );

  } catch ( error ) {
    console.log( error );
    res.status(400).send( { error: 'Error creating new Validation' } );
  }
});


router.put( '/:val', async ( req, res ) => {
  try {

    const { title, info } = req.body;

    const validation = await Validation.findOne( { title: req.params.val } );
    console.log('Validation: ', validation);

    if ( !validation )
      return res.status(404).send( { error: 'Validation not found' } );

    await validation.updateOne( { title: title, info: info } );

    res.status(200).send( { ok: true } );

  } catch (error) {
    console.log( error );
    res.status(400).send( { error: 'Error updating validation' } )
  }
});

router.delete( '/:val', async ( req, res ) => {
  try {

    const validation = await Validation.findOneAndDelete( { title: req.params.val } );

    if ( !validation )
    return res.status(404).send( { error: 'Validation not found' } );

    return res.send( { ok: true } );
    
  } catch (error) {
    res.status(400).send( { error: 'Error on deleting project' } );
  }
});


module.exports = app => app.use( '/main/validation', router );