
export async function strike(event){
    event.stopPropagation();
    const passage = document.querySelector('.passage-body');
    const selection =window.getSelection();
    if (selection.toString().length==0){
        return;
    }
    //setSelection();
    const selected_text = selection.toString();
    const range= selection.getRangeAt(0);

    //get fragments and check for any text inserts.
    const frags = range.extractContents();
    console.log(frags);
    let hasInserts = false;
    let outsideBounds = false;
    frags.childNodes.forEach((child)=>{
        if (child.tagName=="INS"){
            console.log("run.");
            hasInserts=true;
        }
        if (child.tagName=="P"){
            console.log("wtf");
            outsideBounds=true;
        }
    })
    if (hasInserts && !outsideBounds){
        frags.childNodes.forEach((child)=>{
            if (child.tagName=="INS"){
            }
            else if (child.nodeType==Node.TEXT_NODE){
                const del = document.createElement("del");
                del.innerText = child.nodeValue;
                child.parentNode.replaceChild(del, child);
            }
            else{
                const del = document.createElement("del");
                del.innerText = child.innerText;
                child.parentNode.replaceChild(del, child);
            }
        })
        console.log(frags);
        range.insertNode(frags);
        return;
        
    }
    const parent_anchor = selection.anchorNode.parentNode;
    const parent_focus = selection.focusNode.parentNode;

    if ((parent_anchor.tagName=="DEL" || parent_anchor.tagName=="MARK") && parent_anchor==parent_focus){
        console.log("SPLIT.");
        let new_string = document.createTextNode(selected_text)
        let split_type = "del";
        if (parent_anchor.tagName=="MARK"){
            split_type = "mark";
            new_string = document.createElement("del");
            new_string.innerText = selected_text;
        }
        
        const placeholder = document.createElement("del");
        placeholder.innerText = selected_text;
        range.deleteContents();
        range.insertNode(placeholder);

        const prev = placeholder.previousSibling;
        const next = placeholder.nextSibling;
        console.log(prev);
        console.log(next);

        const split_1 = document.createElement(split_type);
        const split_2 = document.createElement(split_type);
        split_1.innerText = prev.nodeValue;
        parent_anchor.parentNode.insertBefore(split_1, parent_anchor);
        parent_anchor.parentNode.insertBefore(new_string, parent_anchor);
        split_2.innerText = next.nodeValue;
        parent_anchor.parentNode.insertBefore(split_2, parent_anchor); 

        parent_anchor.remove();
    }
    else{
        const new_string = document.createElement('del');
        new_string.innerText = selected_text;
        range.deleteContents();
        range.insertNode(new_string);

        const prev = new_string.previousSibling;
        const next = new_string.nextSibling;

        let merged_string = "";
        if ((prev.nodeType==Node.TEXT_NODE && prev.nodeValue=="") || prev.tagName=="DEL"){
            const prev_element = new_string.previousElementSibling;
            if (prev_element.tagName=="DEL"){
                // console.log("Merge before.");
                // console.log(prev);
                merged_string+=prev_element.innerText;
                prev_element.remove();
            }
        }
        merged_string+=new_string.innerText;
        if ((next.nodeType==Node.TEXT_NODE && next.nodeValue=="") || next.tagName=="DEL"){
            const next_element = new_string.nextElementSibling;
            if (next_element.tagName=="DEL"){
                // console.log("Please merge after.");
                // console.log(next);
                merged_string+= next_element.innerText;
                next_element.remove();
            }
        }
        new_string.innerText = merged_string;

    }
    window.getSelection().removeAllRanges();
}

//this is a repeat of the previous function, will most likely combine if we have time.
//i just didnt because i wanted to do something different with mark at first but maybe not.
export async function mark(event){
    event.stopPropagation();
    const passage = document.querySelector('.passage-body');
    const selection =window.getSelection();
    if (selection.toString().length==0){
        return;
    }
    //setSelection();
    const selected_text = selection.toString();
    const range= selection.getRangeAt(0);


    const frags = range.extractContents();
    let hasInserts = false;
    frags.childNodes.forEach((child)=>{
        if (child.tagName=="INS"){
            console.log("run.");
            hasInserts=true;
        }
    })
    if (hasInserts){
        frags.childNodes.forEach((child)=>{
            if (child.tagName=="INS"){}
            else if (child.nodeType==Node.TEXT_NODE){
                const del = document.createElement("mark");
                del.innerText = child.nodeValue;
                child.parentNode.replaceChild(del, child);
            }
            else{
                const del = document.createElement("mark");
                del.innerText = child.innerText;
                child.parentNode.replaceChild(del, child);
            }
        })
        console.log(frags);
        range.insertNode(frags);
        return;
    }

    const parent_anchor = selection.anchorNode.parentNode;
    const parent_focus = selection.focusNode.parentNode;

    if ((parent_anchor.tagName=="DEL" || parent_anchor.tagName=="MARK") && parent_anchor==parent_focus){
        console.log("SPLIT.");
        
        let new_string = document.createTextNode(selected_text)
        let split_type = "mark";
        if (parent_anchor.tagName=="DEL"){
            split_type = "del";
            new_string = document.createElement("mark");
            new_string.innerText = selected_text;
        }
        const placeholder = document.createElement("mark");
        placeholder.innerText = selected_text;
        range.deleteContents();
        range.insertNode(placeholder);

        const prev = placeholder.previousSibling;
        const next = placeholder.nextSibling;
        console.log(prev);
        console.log(next);

        const split_1 = document.createElement(split_type);
        const split_2 = document.createElement(split_type);
        
        split_1.innerText = prev.nodeValue;
        parent_anchor.parentNode.insertBefore(split_1, parent_anchor); 
        
        parent_anchor.parentNode.insertBefore(new_string, parent_anchor);

        split_2.innerText = next.nodeValue;
        parent_anchor.parentNode.insertBefore(split_2, parent_anchor); 

        parent_anchor.remove();
    }
    else{
        const new_string = document.createElement('mark');
        new_string.innerText = selected_text;
        range.deleteContents();
        range.insertNode(new_string);

        const prev = new_string.previousSibling;
        const next = new_string.nextSibling;

        let merged_string = "";
        if ((prev.nodeType==Node.TEXT_NODE && prev.nodeValue=="") || prev.tagName=="MARK"){
            const prev_element = new_string.previousElementSibling;
            if (prev_element.tagName=="MARK"){
                // console.log("Merge before.");
                // console.log(prev);
                merged_string+=prev_element.innerText;
                prev_element.remove();
            }
        }
        merged_string+=new_string.innerText;
        if ((next.nodeType==Node.TEXT_NODE && next.nodeValue=="") || next.tagName=="MARK"){
            const next_element = new_string.nextElementSibling;
            if (next_element.tagName=="MARK"){
                // console.log("Please merge after.");
                // console.log(next);
                merged_string+= next_element.innerText;
                next_element.remove();
            }
        }
        new_string.innerText = merged_string;

    }
    window.getSelection().removeAllRanges();
}

