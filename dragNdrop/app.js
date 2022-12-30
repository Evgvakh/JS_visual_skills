const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

item.addEventListener('dragstart', dragstart);
item.addEventListener('dragend', dragend);

placeholders.forEach(element => {
    element.addEventListener('dragover', dragover);
    element.addEventListener('dragenter', dragenter);
    element.addEventListener('dragleave', dragleave);
    element.addEventListener('drop', dragdrop);
});


function dragstart(e) {    
    e.target.classList.add('hold');
    item.textContent = 'Dragging...';
    setTimeout(() => e.target.classList.add('hide'), 0);    
}

function dragend(e) {   
    e.target.className = 'item';    
    setTimeout(() => {item.textContent = 'Drag it!';}, 500);
    item.textContent = 'DONE!';
}

function dragover(e) {
    e.preventDefault();    
}

function dragenter(e) {
    e.target.classList.add('hovered');    
}

function dragleave(e) {    
    e.target.classList.remove('hovered');
}

function dragdrop(e) {    
    e.target.classList.remove('hovered');
    e.target.append(item);
}

