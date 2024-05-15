 // Define arrays containing the words for each part of the puzzle
 const words1 = ['go', 'to', 'the','library'];
 const words2 = ['do', 'my', 'homework'];
 const words3 = ['get', 'dressed'];
 const words4 = ['It', 'is', 'next', 'to', 'the', 'bank']; // Update with your words for Part 4
 const words5 = ['Miss', 'Lee', 'is', 'my', 'class', 'teacher']; // Update with your words for Part 5
 const words6 = ['I', 'set', 'the', 'table']; // Update with your words for Part 6
 
 // Select all drop boxes for each part of the puzzle
 const dropBoxes1 = document.querySelectorAll('#drop-box-1, #drop-box-2, #drop-box-3,#drop-box-4,');
 const dropBoxes2 = document.querySelectorAll(' #drop-box-5, #drop-box-6');
 const dropBoxes3 = document.querySelectorAll('#drop-box-7, #drop-box-8');
 const dropBoxes4 = document.querySelectorAll('#drop-box-16, #drop-box-17, #drop-box-18, #drop-box-19, #drop-box-20, #drop-box-21'); // Update with your drop boxes for Part 4
 const dropBoxes5 = document.querySelectorAll('#drop-box-22, #drop-box-23, #drop-box-24, #drop-box-25, #drop-box-26, #drop-box-27'); // Update with your drop boxes for Part 5
 const dropBoxes6 = document.querySelectorAll('#drop-box-28, #drop-box-29, #drop-box-30, #drop-box-31, #drop-box-32'); // Update with your drop boxes for Part 6
 
 // Select all drag boxes for each part of the puzzle
 const dragBoxes1 = document.querySelectorAll('#drag-box-1, #drag-box-2, #drag-box-3,#drag-box-4');
 const dragBoxes2 = document.querySelectorAll('#drag-box-5, #drag-box-6');
 const dragBoxes3 = document.querySelectorAll('#drag-box-7, #drag-box-8');
 const dragBoxes4 = document.querySelectorAll('#drag-box-16, #drag-box-17, #drag-box-18, #drag-box-19, #drag-box-20, #drag-box-21'); // Update with your drag boxes for Part 4
 const dragBoxes5 = document.querySelectorAll('#drag-box-22, #drag-box-23, #drag-box-24, #drag-box-25, #drag-box-26, #drag-box-27'); // Update with your drag boxes for Part 5
 const dragBoxes6 = document.querySelectorAll('#drag-box-28, #drag-box-29, #drag-box-30, #drag-box-31, #drag-box-32'); // Update with your drag boxes for Part 6
 
 // Arrays to store the original positions of drag boxes for each part
 const originalPositions1 = [];
 const originalPositions2 = [];
 const originalPositions3 = [];
 const originalPositions4 = [];
 const originalPositions5 = [];
 const originalPositions6 = [];
 
 // Function to play a sound given its ID
 function playSound(soundId) {
     const audio = document.getElementById(soundId);
     audio.play();
 }
 
 // Function to check the arrangement of words in drop boxes for a particular part
 function checkArrangement(words, dropBoxes, originalPositions) {
     let allDropped = true;
     dropBoxes.forEach(box => {
         if (box.children.length === 0) {
             allDropped = false;
         }
     });
 
     if (allDropped) {
         let correctArrangement = true;
         dropBoxes.forEach((box, index) => {
             const word = box.textContent.trim();
             if (word !== words[index]) {
                 correctArrangement = false;
             }
         });
 
         if (correctArrangement) {
             playSound('correctSound'); // Play sound for correct arrangement
         } else {
             playSound('incorrectSound'); // Play sound for incorrect arrangement
             // If the arrangement is incorrect, reset the positions of drag boxes after a delay
             setTimeout(() => {
                 dragBoxes1.forEach((box, index) => {
                     const originalBox = originalPositions1[index];
                     if (!originalBox.contains(box)) {
                         originalBox.appendChild(box);
                     }
                 });
                 dragBoxes2.forEach((box, index) => {
                     const originalBox = originalPositions2[index];
                     if (!originalBox.contains(box)) {
                         originalBox.appendChild(box);
                     }
                 });
                 dragBoxes3.forEach((box, index) => {
                     const originalBox = originalPositions3[index];
                     if (!originalBox.contains(box)) {
                         originalBox.appendChild(box);
                     }
                 });
                 dragBoxes4.forEach((box, index) => {
                     const originalBox = originalPositions4[index];
                     if (!originalBox.contains(box)) {
                         originalBox.appendChild(box);
                     }
                 });
                 dragBoxes5.forEach((box, index) => {
                     const originalBox = originalPositions5[index];
                     if (!originalBox.contains(box)) {
                         originalBox.appendChild(box);
                     }
                 });
 
                 dragBoxes6.forEach((box, index) => {
                     const originalBox = originalPositions6[index];
                     if (!originalBox.contains(box)) {
                         originalBox.appendChild(box);
                     }
                 });
             }, 1000);
         }
     }
 }
 
 // Function to allow dropping of drag boxes
 function allowDrop(ev) {
     ev.preventDefault();
 }
 
 // Function to handle the start of dragging
 function drag(ev) {
     ev.dataTransfer.setData('text', ev.target.id);
     ev.target.classList.add('green');
 }
 
 // Function to handle the end of dragging
 function dragEnd(ev) {
     ev.target.classList.remove('green');
 }
 
 // Function to handle dropping of drag boxes into drop boxes
 function drop(ev) {
     ev.preventDefault();
     const data = ev.dataTransfer.getData('text');
     const draggedBox = document.getElementById(data);
     const targetBox = ev.target;
 
     // Check if the target box is droppable
     if (targetBox.classList.contains('droppable')) {
         targetBox.appendChild(draggedBox);
         // Check the arrangement of words if all drop boxes are filled
         if (targetBox.parentElement.parentElement.classList.contains('part1')) {
             checkArrangement(words1, dropBoxes1, originalPositions1);
         } else if (targetBox.parentElement.parentElement.classList.contains('part2')) {
             checkArrangement(words2, dropBoxes2, originalPositions2);
         } else if (targetBox.parentElement.parentElement.classList.contains('part3')) {
             checkArrangement(words3, dropBoxes3, originalPositions3);
         } else if (targetBox.parentElement.parentElement.classList.contains('part4')) {
             checkArrangement(words4, dropBoxes4, originalPositions4);
         } else if (targetBox.parentElement.parentElement.classList.contains('part5')) {
             checkArrangement(words5, dropBoxes5, originalPositions5);
         } else if (targetBox.parentElement.parentElement.classList.contains('part6')) {
             checkArrangement(words6, dropBoxes6, originalPositions6);
         }
     }
 }
 
 // Function to initialize the puzzle when the window is loaded
 window.onload = () => {
     // Initialize Part 1
     const shuffledWords1 = words1.slice().sort(() => Math.random() - 0.5);
     dragBoxes1.forEach((box, index) => {
         box.textContent = shuffledWords1[index];
         originalPositions1.push(box.parentElement); // Store original parent
         box.addEventListener('dragstart', drag);
         box.addEventListener('dragend', dragEnd);
     });
     dropBoxes1.forEach(box => {
         box.addEventListener('drop', drop);
         box.addEventListener('dragover', allowDrop);
     });
 
     // Initialize Part 2
     const shuffledWords2 = words2.slice().sort(() => Math.random() - 0.5);
     dragBoxes2.forEach((box, index) => {
         box.textContent = shuffledWords2[index];
         originalPositions2.push(box.parentElement); // Store original parent
         box.addEventListener('dragstart', drag);
         box.addEventListener('dragend', dragEnd);
     });
     dropBoxes2.forEach(box => {
         box.addEventListener('drop', drop);
         box.addEventListener('dragover', allowDrop);
     });
 
     // Initialize Part 3
     const shuffledWords3 = words3.slice().sort(() => Math.random() - 0.5);
     dragBoxes3.forEach((box, index) => {
         box.textContent = shuffledWords3[index];
         originalPositions3.push(box.parentElement); // Store original parent
         box.addEventListener('dragstart', drag);
         box.addEventListener('dragend', dragEnd);
     });
     dropBoxes3.forEach(box => {
         box.addEventListener('drop', drop);
         box.addEventListener('dragover', allowDrop);
     });
 
     // Initialize Part 4
     const shuffledWords4 = words4.slice().sort(() => Math.random() - 0.5);
     dragBoxes4.forEach((box, index) => {
         box.textContent = shuffledWords4[index];
         originalPositions4.push(box.parentElement); // Store original parent
         box.addEventListener('dragstart', drag);
         box.addEventListener('dragend', dragEnd);
     });
     dropBoxes4.forEach(box => {
         box.addEventListener('drop', drop);
         box.addEventListener('dragover', allowDrop);
     });
 
     // Initialize Part 5
     const shuffledWords5 = words5.slice().sort(() => Math.random() - 0.5);
     dragBoxes5.forEach((box, index) => {
         box.textContent = shuffledWords5[index];
         originalPositions5.push(box.parentElement); // Store original parent
         box.addEventListener('dragstart', drag);
         box.addEventListener('dragend', dragEnd);
     });
     dropBoxes5.forEach(box => {
         box.addEventListener('drop', drop);
         box.addEventListener('dragover', allowDrop);
     });
 
     // Initialize Part 6
     const shuffledWords6 = words6.slice().sort(() => Math.random() - 0.5);
     dragBoxes6.forEach((box, index) => {
         box.textContent = shuffledWords6[index];
         originalPositions6.push(box.parentElement); // Store original parent
         box.addEventListener('dragstart', drag);
         box.addEventListener('dragend', dragEnd);
     });
     dropBoxes6.forEach(box => {
         box.addEventListener('drop', drop);
         box.addEventListener('dragover', allowDrop);
     });
 };
 
 
 // Function to toggle the sidebar
 function toggleSidebar() {
     var sidebar = document.querySelector('.sidebar');
     var hamburgerBars = document.querySelectorAll('.hamburger div');
 
     var sidebarWidth = window.getComputedStyle(sidebar).width;
 
     if (sidebarWidth === '350px') {
         sidebar.style.width = '0';
         hamburgerBars.forEach(function(bar) {
             bar.style.transform = 'rotate(0deg)';
         });
     } else {
         sidebar.style.width = '350px';
         hamburgerBars[0].style.transform = 'rotate(-45deg)';
         hamburgerBars[1].style.opacity = '0';
         hamburgerBars[2].style.transform = 'rotate(45deg)';
     }
 }
 
 
 // Add event listener for the hamburger menu button
 var hamburgerButton = document.querySelector('.hamburger');
 hamburgerButton.addEventListener('click', toggleSidebar);
 
 // Function to toggle the visibility of the container
 function toggleContainer() {
     var container = document.getElementById('container');
     var currentLeft = parseInt(window.getComputedStyle(container).left);
 
     container.style.left = (currentLeft === 0) ? '-100%' : '0';
 }
 
 ///End of Hamburger Menu functionality
 
 
 function playAudio(audioId) {
         var audio = document.getElementById(audioId);
         audio.play();
     }
 
 
 
     function playSoundAndStyle(soundId, textId) {
     var audio = document.getElementById(soundId);
     var textToStyle = document.getElementById(textId);
     if (audio.paused) {
         audio.play();
         textToStyle.style.fontWeight = "bold"; // Set text to bold
         textToStyle.style.color = "blue"; // Set text color
         audio.onended = function() {
             textToStyle.style.fontWeight = ""; // Reset font weight after audio ends
             textToStyle.style.color = ""; // Reset text color after audio ends
         };
     } else {
         audio.pause();
         audio.currentTime = 0;
         textToStyle.style.fontWeight = ""; // Reset font weight if audio is paused
         textToStyle.style.color = ""; // Reset text color if audio is paused
     }
 }
 
 let currentSound = 1;
 let audioPlayer = document.getElementById('sound1'); // Get the first audio element
 
 function playAll() {
     audioPlayer.play();
     updateTextStyle(currentSound);
     audioPlayer.addEventListener('ended', playNext);
 }
 
 function playNext() {
     currentSound++;
     if (currentSound <= 16) {
         let nextSoundId = 'sound' + currentSound;
         audioPlayer = document.getElementById(nextSoundId); // Update audioPlayer to the next sound
         audioPlayer.play();
         updateTextStyle(currentSound);
         audioPlayer.addEventListener('ended', playNext);
     }
 }
 
 function updateTextStyle(soundNumber) {
     let textToStyle = document.getElementById('textToHighlight' + soundNumber);
     textToStyle.style.fontWeight = "bold"; // Set text to bold
     textToStyle.style.color = "blue"; // Set text color
     audioPlayer.onended = function() {
         textToStyle.style.fontWeight = ""; // Reset font weight after audio ends
         textToStyle.style.color = ""; // Reset text color after audio ends
     };
 }
 
 function pauseAll() {
     audioPlayer.pause();
     audioPlayer.currentTime = 0;
     audioPlayer.removeEventListener('ended', playNext);
 }
 
 
 
 
 
 
 