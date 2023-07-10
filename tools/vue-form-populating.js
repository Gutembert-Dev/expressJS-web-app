module.exports = (function vueFormPopulating(){
	var types = ['text', 'textarea', 'img', 'number', 'frame', 'checkbox', 'radio', 'select', 'submit', 'email', 'password'];
    return function(list, data, viewOnly){
		var keyValue;
        for(var field of list){
			keyValue = Object.entries(field);
			if(!types.includes(keyValue[0][1])){
				console.log("the provided type: \"" + keyValue[0][1] + "\" for the field: \"" + keyValue[0][0] + "\" does not exist.\nPlease these are the allowed types: \"" + types + "\"");
				return "the provided type: \"" + keyValue[0][1] + "\" for the field: \"" + keyValue[0][0] + "\" does not exist.\nPlease these are the allowed types: \"" + types + "\"";
			}
			else{
				switch (keyValue[0][1]) {
					case 'textarea':
						document.getElementById('modal-form').querySelector('textarea[v-model=' + keyValue[0][0] + ']').value = data[keyValue[0][0]];
						document.getElementById('modal-form').querySelector('textarea[v-model=' + keyValue[0][0] + ']').readOnly = viewOnly;
						break;
					case 'img':
						document.getElementById('modal-form').querySelector('img[v-model=' + keyValue[0][0] + ']').value = data[keyValue[0][0]];
						document.getElementById('modal-form').querySelector('img[v-model=' + keyValue[0][0] + ']').readOnly = viewOnly;
						break;
					case 'frame':
						document.getElementById('modal-form').querySelector('frame[v-model=' + keyValue[0][0] + ']').value = data[keyValue[0][0]];
						document.getElementById('modal-form').querySelector('frame[v-model=' + keyValue[0][0] + ']').readOnly = viewOnly;
						break;				
					default:
						switch (keyValue[0][1]) {
							case 'number':
								document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').value = data[keyValue[0][0]];
								document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').readOnly = viewOnly;
								break;
							case 'checkbox':
								if(data[keyValue[0][0]] === 1){
									document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').checked = true;
									document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').disabled = viewOnly;
								}
								else{
									document.getElementById('modal-form').querySelectorAll('input[v-model=' + keyValue[0][0] + ']').checked = false;
									document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').disabled = viewOnly;
								}
								break;
								case 'radio':
									if(data[keyValue[0][0]] === 1){
										document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').checked = true;
										document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').disabled = viewOnly;
									}
									else{
										document.getElementById('modal-form').querySelectorAll('input[v-model=' + keyValue[0][0] + ']').checked = false;
										document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').disabled = viewOnly;
									}
									break;						
							default:
								document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').value = data[keyValue[0][0]];
								document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').readOnly = viewOnly;
								break;
						}
						break;
				}
			}
		}
    }
})()