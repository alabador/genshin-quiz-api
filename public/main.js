const update = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');

update.addEventListener('click', _ => {
    fetch('/skills', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            character: 'Kamisato Ayaka'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true);
    })
})

deleteButton.addEventListener('click', e => {
    fetch('skills', {
        method: 'delete', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            character: 'Kamisato Ayaka'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if(response === 'Kamisato Ayaka is not present.') {
            messageDiv.textContent = 'No Ayaka present, nothing to delete.'
        }
        else {
            window.location.reload()
        }
    })
    .catch(error => console.error(error))
})