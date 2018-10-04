//This must be only once in the ap and be loaded in layout!!!
var config = {
  authDomain: "",
  databaseURL: "https://curso-node-nuevo90ljp.firebaseio.com",
  projectId: "curso-node-nuevo90ljp",
  storageBucket: "curso-node-nuevo90ljp.appspot.com",
  messagingSenderId: ""
};
firebase.initializeApp(config);

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('#login');
  const card = document.querySelector('.card');

  loginButton.addEventListener('click', () => {
    // On login button click
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((data)=> {
        window.location.href=window.location.origin+'/map';
      }).catch((error)=>{
        console.log(error)
      });
  });
});
