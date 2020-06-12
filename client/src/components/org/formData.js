// This function lets the object as a new FormData the files 

// Explanation by the Pro-programmer who give me this code snippet

//According to him, it gets all the object states and convert it a single json. with the help of a condition where if the object has a instance of a File
// it will create a new FormData with its property as a file

// Function help by a pro
export function createFormData(object, form, namespace) {
  var formData = form || new FormData();
  for (var property in object) {
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue;
    }
    var formKey = namespace ? namespace + "[" + property + "]" : property;
    if (object[property] instanceof Date) {

      formData.append(formKey, object[property].toISOString());

    } else if ( typeof object[property] === "object" && !(object[property] instanceof File) ) {

      createFormData(object[property], formData, formKey);

    } else {
      formData.append(formKey, object[property]);
    }
  }
  return formData;
};