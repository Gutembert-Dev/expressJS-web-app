module.exports = (function vueFormParsing(){
	var types = ['text', 'textarea', 'img', 'number', 'frame', 'checkbox', 'radio'];
	var data = {};
    return function(list){
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
						data[keyValue[0][0]] = document.getElementById('modal-form').querySelector('textarea[v-model=' + keyValue[0][0] + ']').value;
						break;
					case 'img':
						data[keyValue[0][0]] = document.getElementById('modal-form').querySelector('img[v-model=' + keyValue[0][0] + ']').value;
						break;
					case 'frame':
						data[keyValue[0][0]] = document.getElementById('modal-form').querySelector('frame[v-model=' + keyValue[0][0] + ']').value;
						break;				
					default:
						switch (keyValue[0][1]) {
							case 'number':
								data[keyValue[0][0]] = isNaN(parseInt(document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').value)) ? 0 : parseInt(document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').value);
								break;
							case 'checkbox':
								data[keyValue[0][0]] = false;
								var checkedFields = document.getElementById('modal-form').querySelectorAll('input[v-model=' + keyValue[0][0] + ']:checked');
								for (var checkedField of checkedFields) {
									if(checkedField.nodeType)
									    data[keyValue[0][0]] = true;
								  }
								break;
								case 'radio':
									data[keyValue[0][0]] = false;
									var checkedFields = document.getElementById('modal-form').querySelectorAll('input[v-model=' + keyValue[0][0] + ']:checked');
									for (var checkedField of checkedFields) {
										if(checkedField.nodeType)
											data[keyValue[0][0]] = true;
									  }
									break;						
							default:
								data[keyValue[0][0]] = document.getElementById('modal-form').querySelector('input[v-model=' + keyValue[0][0] + ']').value;
								break;
						}
						break;
				}
			}
		}
        return data
    }
})()