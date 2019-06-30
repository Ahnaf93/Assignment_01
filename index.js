const songForm = document.querySelector('#songForm');
const songInput = document.querySelector('#song-input');
const songList = document.querySelector('#songList');



//event listener
 songForm.addEventListener('submit', newSong);
 songList.addEventListener('click', removeSong);
 document.addEventListener('DOMContentLoaded', loadSong);



 //Add song to list with comfirmation
function newSong(e){
  e.preventDefault();
    
  const song = songInput.value;
  
  if(song === ''){
    alertMessage('Please insert song','#e74c3c');
  } else {
    addSongToList(song);
    saveToLS(song);
    alertMessage('Song add','#2ecc71');
    songForm.reset();
  }
}

//functionality in song list
function addSongToList(song){
 const removeBtn = document.createElement('a');
  removeBtn.className = 'remove-song';
  removeBtn.textContent = 'X';
  
  const li = document.createElement('li');
  li.textContent = song;
  li.appendChild(removeBtn);  
  
  songList.appendChild(li);
}


//Flush song from the array
function removeSong(element){
 if(element.target.classList.contains('remove-song')){
  element.target.parentElement.remove();
  removeFromLS(element.target.parentElement.textContent.slice(0,-1));
  alertMessage('Song removed','#e74c3c');
 }
}

function alertMessage(message,color){
  const paragraph = document.createElement('p');
  paragraph.className = 'message-p';
  paragraph.style.padding = '5px 5px';  
  paragraph.style.backgroundColor = color;
  paragraph.style.color = '#fff';
  paragraph.textContent = message;
  songForm.insertAdjacentElement('beforebegin',paragraph);
  setTimeout(()=>{
   document.querySelector('.message-p').remove();
  },2000);
}

// localStorage
function loadSong(){
  let songs = loadLS();
  songs.forEach(element => {
   addSongToList(element);
  });
 }

 //load song from local storage
function loadLS(){
 let songs;
 if(localStorage.getItem('song') === null){
  songs = [];
 }else{
  songs = JSON.parse(localStorage.getItem('song'));
 }
 return songs;
}

//Save song in the local storage
function saveToLS(song){
 let songs = loadLS();
 songs.push(song);
 localStorage.setItem('song',JSON.stringify(songs));
}

//Remove song from Local storage
function removeFromLS(song){
 let songs = loadLS();
 songs.forEach((sg,index) => {
  if(sg === song){
   songs.splice(index,1);
  }
 });
 localStorage.setItem('song',JSON.stringify(songs));
} 




