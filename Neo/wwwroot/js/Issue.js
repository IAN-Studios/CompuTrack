function UpdateIssue() {
	$.ajax({
		type: "post",
		url: "/Endpoint?handler=UpdateIssue",
		dataType: "json",
		data: {
			"IssueGUID": issGUID,
			"STATUS": document.getElementById("MarkStatus").options[document.getElementById("MarkStatus").selectedIndex].value,
			"AssigneeGUID": document.getElementById("MarkAssignee").options[document.getElementById("MarkAssignee").selectedIndex].value
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader("XSRF-TOKEN",
				$('input:hidden[name="__RequestVerificationToken"]').val());
		},
		success: function (result) {
			console.log(result)
		},
		failure: function (response) {
			console.warn(response.responseText);
		},
		error: function (response) {
			console.error(response.responseText);
		}
	});
}