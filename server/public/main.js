function addNewLanguage() {
    const language = document.querySelector('#newLang').value
    if(language == '') return false
    const appendNodes = `
        <div class="checkbox-option">
            <label for="${language}">${language}</label>
            <input type="checkbox" name="langs" value="${language}" id="${language}">
        </div>
        `
    const opts = document.querySelector('#checkbox-options .options')
    opts.innerHTML += appendNodes
    return false
}

function handleDelete(id) {
    return fetch(`/admin/edit/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        if(res.ok) window.location.href = '/admin/entries'
    })
    .catch(err => console.log(err))
}