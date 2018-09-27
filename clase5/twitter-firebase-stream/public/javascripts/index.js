//This must be only once in the ap and be loaded in layout!!!
var config = {
  apiKey: "AIzaSyDA6CsBNuUJz8CuKiY-pcyedUB_bf737Uc",
  authDomain: "curso-node-90ljp.firebaseapp.com",
  databaseURL: "https://curso-node-90ljp.firebaseio.com",
  projectId: "curso-node-90ljp",
  storageBucket: "curso-node-90ljp.appspot.com",
  messagingSenderId: "798351416804"
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
