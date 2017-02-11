import sum from './sum';
import './image_viewer'; //we use this from of import when the code we are importing is not 
//producing/returning any value, the image viewr is just generating an image tag in the dom
//also if we do not import this file it will not be executed.

const total = sum(5, 15);

const totaltext = document.createElement('p');
totaltext.innerText = 'The total is:' + total
document.body.appendChild(totaltext);

