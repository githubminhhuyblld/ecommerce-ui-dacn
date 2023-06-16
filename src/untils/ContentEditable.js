export const saveTitleAfterEdit = (e) => {
    if(e.key === 'Enter'){
        e.preventDefault()
        e.target.blur()
    }
}
export const selectAllInlineTest = (e) => {
    e.target.focus();
    e.target.select();
    // document.execCommand('selectAll',false,null)
}