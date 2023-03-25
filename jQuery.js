var i = 0;

function addData(){
    var newrow = "i_" + i++;
    var rollNumber = $('#rollNo').val();
    var stdName = $('#studentName').val();
    var birthDate = $('#birthdate').val();
    var stdanderd = $('#stdanderd').val();
    
    if(validateAllField()){
        $('#listbody').append(`<tr id=${newrow}><td> ${rollNumber} </td><td> ${stdName} </td><td> ${birthDate} </td><td> ${stdanderd} </td>
        <td><button type="button" id="Edit" onclick="editData(this)">Edit</button>
		<button type="button" class="Delete">Delete</button></td>
        </tr>`);
        resetForm();
    }
}

function resetForm(){
    $('#namelocation1').text("");
    $('#namelocation2').text("");
    $('#namelocation3').text("");
    $('#namelocation4').text("");   

    $('#rollNo').val("");
    $('#studentName').val("");
    $('#birthdate').val("");
    $('#stdanderd').val("");
    
    $("#add").text("Submit");
    $("#add").attr("onclick", "addData()");
};

function editData(eRow){
    let row = $(eRow).closest('tr');
    var editRow = $(row).attr("id");

    $("#rollNo").val(row.find('td:eq(0)').text().trim());
    $("#studentName").val(row.find('td:eq(1)').text().trim());
    $("#birthdate").val(row.find('td:eq(2)').text().trim());
    $("#stdanderd").val(row.find('td:eq(3)').text().trim());

    $("#add").text("Update");
    $("#add").attr("onclick", "updateData("+editRow+")");
	$("#add").attr("data-type", editRow);
    validateAllField();
}

function updateData(editRow){
    var updateNumber = $('#rollNo').val().trim();
    var updateName = $('#studentName').val().trim();
    var updateDate = $('#birthdate').val();
    var updateStd = $('#stdanderd').val();
    let updateRow = $(editRow).find("td");
    
    if (updateNumber!="" && updateName!="" && updateDate!="" && updateStd!="") {
        $(updateRow).eq(0).text(updateNumber);
        $(updateRow).eq(1).text(updateName);
        $(updateRow).eq(2).text(updateDate);
        $(updateRow).eq(3).text(updateStd);
        resetForm();
    }
}

$(document).ready(function(){
    $('#listbody').on('click', '.Delete', function() {
        var deleteRow = $(this).closest("tr");
        let row1 = deleteRow.attr('id');
		var editRowId = $("#add").attr("data-type");
		
        if (confirm("Are you sure want to delete this record!")) {
            deleteRow.remove();
            if(row1 == editRowId){
                resetForm();
            }
        }
    })
});

function validateField(errorID, inputID){
    let valid = $(`#${inputID}`).val().trim();
    if (valid == "") {
        $(`#${errorID}`).text("* Please enter your " + inputID);
        valid = false;
    }
    else{
        $(`#${errorID}`).text("");
        valid = true;
    }
    return valid;
}

function validateAllField(){
    var rnumber = validateField('namelocation1','rollNo');
    var sname = validateField('namelocation2','studentName');
    var bdate = validateField('namelocation3','birthdate');
    var stnd = validateField('namelocation4','stdanderd');
    var validAll = rnumber && sname && bdate && stnd;
    return validAll;
}