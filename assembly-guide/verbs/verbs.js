//should we go class based or functional (aka see tween.js)


//base class for various assembly methods      
function AssemblyMethod(name, target)
{
  this.name = name;
  this.target = target;
  this._animations = [];
}

AssemblyMethod.prototype.start = function()
{
  for(var i= 0; i< this._animations.length;i++)
  {
     this._animations[i].start();
  }
}

//Action verbs for assembly methods
function push(subject, targetPosition, targetDistance, duration)
{
  //for now not based on actual calculations (pitch, lead, nb of starts etc)
  this.duration = duration || 1500;
  this.distance = targetDistance || 0;        
  
  var translation = new TWEEN.Tween( subject.position )
  .to( { x: targetPosition.x, y: targetPosition.y, z:targetPosition }, this.duration )
  .easing( TWEEN.Easing.Exponential.Out);

  this._animations.push( translation );
  return this;
}

function press()//same as place and push ?
{
  return push(subject, targetPosition, targetDistance, duration);
}

function place(subject, targetPosition, targetDistance, duration)//same as push ?
{
  return push(subject, targetPosition, targetDistance, duration);
}

function slide(subject, targetPosition, targetDistance, duration)//again, same as place and push ?
{
  return push(subject, targetPosition, targetDistance, duration);
}

function Screw(name, currentItem, targetItem, turns, distance ,duration)
{
  //for now not based on actual calculations (pitch, lead, nb of starts etc)
  this.duration = duration || 1500;
  this.turns = turns || 0;
  this.distance = distance || 0;        
  var target = this.item;

  var curPos = target.position;
  var curRot = target.rotation;
  
  
  
  var endAnchor   = targetConnector.localToWorld(targetConnector.position).clone();
  //for now use up vector as reference
  subject.up = new THREE.Vector3(0,0,1);
  subject.position.copy( startAnchor );
  
  var dirVect = endAnchor.clone().sub( startAnchor );
  var dirVectNorm = dirVect.clone().normalize();
  var angle = startAnchor.angleTo(endAnchor);
  subject.lookAt( endAnchor ) ;
  
  
  var translation = new TWEEN.Tween( target.position )
  .to( { x: pos.x, y: pos.y, z:offs }, this.duration )
  .yoyo(true)
  .easing( TWEEN.Easing.Exponential.Out);

  var r = turns * Math.PI*2 + curRot.rotation.z;
  var rotation = new TWEEN.Tween( target.rotation )
    .to( { z:r}, this.duration )
    .yoyo(true)
    .easing( TWEEN.Easing.Exponential.Out);

  this._animations.push( translation );
  this._animations.push( rotation );
  
  //visual indications
  var arrow = new DistanceHelper({start: startAnchor, end:endAnchor});
  threeViewer.addToScene( arrow );
  
  
  /*var endAnchor   = targetConnector.localToWorld(targetConnector.position).clone();
          
          //for now use up vector as reference
          subject.up = new THREE.Vector3(0,0,1);
          subject.position.copy( startAnchor );
          
          var dirVect = endAnchor.clone().sub( startAnchor );
          var dirVectNorm = dirVect.clone().normalize();
          
          var angle = startAnchor.angleTo(endAnchor);
          
          subject.lookAt( endAnchor ) ;
          //visual indications
          var arrow = new DistanceHelper({start: startAnchor, end:endAnchor});
          threeViewer.addToScene( arrow );
          
          var duration = 3000;
          var turns = 6;
          var distance = 100;        
          var axis = new THREE.Vector3(1,0,0);

          var curPos = subject.position;
          var curRot = subject.rotation;
          
          var pos = endAnchor.clone();//new THREE.Vector3(100,20,0);
          var offs = 100;
          
          var curRot = new THREE.Euler();
          var targetRot = subject.rotation.clone();
          
          var translation = new TWEEN.Tween( subject.position )
            .to( { x: pos.x, y: pos.y, z:pos.z }, duration )
            .delay(1000);

            var r = turns * Math.PI//*2 ;// + curRot.rotation.z;
            var rotation = new TWEEN.Tween( subject.rotation )
              .to( { z:r}, duration )
              .delay(1000);
              
            animations.push( rotation );
            animations.push( translation );
            translation.onComplete(function(){
              self.onAnimationComplete()
            });
          }*/
  
  return this;
}
