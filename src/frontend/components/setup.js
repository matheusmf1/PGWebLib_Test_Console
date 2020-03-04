( () => {

  const navItems = document.querySelectorAll('.nav__items--content');
  navItems.forEach( item => {

    item.addEventListener( 'click', i => {
      i.preventDefault();
      let parent = i.target.parentNode;

      
      othertab = document.getElementsByClassName('active');
      console.log('test, ',othertab );
      othertab[0].classList.remove('active');
      console.log('test02, ',othertab );

      parent.classList.add('active');
    
      let target = i.target.getAttribute('id');

      console.log('target, ', target);
      

    });
  });

  
$("nav a").click(function (e) {

  e.preventDefault();

  $("nav a").removeClass("active");

  $(this).addClass("active");

  if (this.id === !"payment") {

    $(".payment").addClass("noshow");

  } 
  else if (this.id === "payment") {
    $(".payment").removeClass("noshow");
    $(".rightbox")
      .children()
      .not(".payment")
      .addClass("noshow");

  } else if (this.id === "profile") {

    $(".profile").removeClass("noshow");
    $(".rightbox")
      .children()
      .not(".profile")
      .addClass("noshow");

  }
   else if (this.id === "subscription") {
    $(".subscription").removeClass("noshow");
    $(".rightbox")
      .children()
      .not(".subscription")
      .addClass("noshow");

  }
   else if (this.id === "privacy") {
    $(".privacy").removeClass("noshow");
    $(".rightbox")
      .children()
      .not(".privacy")
      .addClass("noshow");

  } 
  else if (this.id === "settings") {
    $(".settings").removeClass("noshow");
    $(".rightbox")
      .children()
      .not(".settings")
      .addClass("noshow");
  }
});



})();