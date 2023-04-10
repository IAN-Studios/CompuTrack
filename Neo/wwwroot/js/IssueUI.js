﻿``
function submitNewIssueWithRoomNum(AssetTag, RoomNum, Title, Description) {
		$.ajax({
			type: "post",
			url: "/Endpoint?handler=CreateIssue_WRoomNum",
			dataType: "json",
			data: { "STATUS": "OPEN", "ASSETTAG": AssetTag, "DISPLAYTEXT": Title, "DESCRIPTION": Description, "USERGUID": userguid, "ROOMNUM": RoomNum },
			beforeSend: function (xhr) {
				xhr.setRequestHeader("XSRF-TOKEN",
					$('input:hidden[name="__RequestVerificationToken"]').val());
			},
			success: function (result) {
				console.log(result)
				location.href = "/issues"
			},
			failure: function (response) {
				console.warn(response.responseText);
				alert("FAILURE: GENERAL FAILURE.")
			},
			error: function (response) {
				console.error(response.responseText);
				alert("error occured")
			}
		});
		//fetch(new Request(`/Issues/New?IssueData.ASSETTAG=` + AssetTag + `&IssueData.DISPLAYTEXT=` + Title + `&IssueData.DESCRIPTION=` + Description + ``)).then(() => {
		//	Alert("Issue Created Sucessfully. Press OK to Continue.");
		//	window.location.href = "/Issues"
		//})
		return true;
}
function submitNewIssue(AssetTag, Title, Description) {
	if ((AssetTag.length != 6) || (Title == "") || (Description == "")) {
		console.error("Issue does not meet requirements!");
		return false;
	} else {
		$.ajax({
			type: "post",
			url: "/Endpoint?handler=CreateIssue",
			dataType: "json",
			data: { "STATUS": "OPEN", "ASSETTAG": AssetTag, "DISPLAYTEXT": Title, "DESCRIPTION": Description, "USERGUID": UserProf },
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
		//fetch(new Request(`/Issues/New?IssueData.ASSETTAG=` + AssetTag + `&IssueData.DISPLAYTEXT=` + Title + `&IssueData.DESCRIPTION=` + Description + ``)).then(() => {
		//	Alert("Issue Created Sucessfully. Press OK to Continue.");
		//	window.location.href = "/Issues"
		//})
		return true;
	}
}
function ChangeCenterSelection(newselection) {
	try{
		document.getElementById("issues-placeholder").remove()
	} catch {
		Array.from(document.getElementsByClassName("issues-table-content")).forEach(item => item.remove());
	}


	Array.from(document.getElementsByClassName("issues-table-selected")).forEach(item => item.classList.remove("issues-table-selected"))
	newselection.classList.add("issues-table-selected")


	//Render the new Issues Pane in the Table; Delete the old items in the table and generate + Display the new ones. Save the data as a achace for later.
	if (newselection.id == "Issues_UserFilter") {
		var userissues = issueList.filter(element => element.UserGUID == UsrProf.GUID);

		if (userissues.length == 0) {
			var placeholder = document.createElement("p");
			placeholder.classList.add("issues-placeholder");
			placeholder.innerHTML = "No Issues Found.";
			placeholder.id = "issues-placeholder"
			document.getElementById("issues-table-content-container").appendChild(placeholder);
		} else {
			userissues.forEach(element => {
				var container = document.createElement("div");
				container.classList.add("issues-table-content", "issues-issue");

				var icon = document.createElement("img");
				if (element.Status == "OPEN") icon.src = "/assets/images/issue-red.png";
				if (element.Status == "CLOSED") icon.src = "/assets/images/checkmark-green.png";
				if (element.Status == "PENDING") icon.src = "/assets/images/warning-yellow.png";
				icon.height = 20;
				icon.width = 20;

				var IDtext = document.createElement("span");
				IDtext.innerHTML = `#${element.ID}: `;
				IDtext.setAttribute("b-pb86f05ye5", "")
				IDtext.classList.add("issues-table-content", "issues-issue-id")

				var TitleText = document.createElement("span");
				TitleText.innerHTML = element.DisplayText;
				TitleText.setAttribute("b-pb86f05ye5", "")
				TitleText.classList.add("issues-table-content", "issues-issue-title")

				var DateNum = document.createElement("span");
				DateNum.innerHTML = element.CreationDate;
				DateNum.setAttribute("b-pb86f05ye5", "")
				DateNum.classList.add("issues-table-content", "issues-issue-date")

				container.append(icon, IDtext, TitleText, DateNum);
				container.setAttribute("b-pb86f05ye5", "")
				document.getElementById("issues-table-content-container").appendChild(container);
				container.onclick = function () {
					window.location.href = `/Issues/Issue?IssueID=${element.GUID}`;
				};
			})
		}

	} else if (newselection.id == "Issues_Global") {
		if (issueList.length == 0) {
			var placeholder = document.createElement("p");
			placeholder.classList.add("issues-placeholder");
			placeholder.innerHTML = "No Issues Found.";
			placeholder.id = "issues-placeholder"
			document.getElementById("issues-table-content-container").appendChild(placeholder);
		} else {
			issueList.forEach(element => {
				var container = document.createElement("div");
				container.classList.add("issues-table-content", "issues-issue");

				var icon = document.createElement("img");
				if (element.Status == "OPEN") icon.src = "/assets/images/issue-red.png";
				if (element.Status == "CLOSED") icon.src = "/assets/images/checkmark-green.png";
				if (element.Status == "PENDING") icon.src = "/assets/images/warning-yellow.png";
				icon.height = 20;
				icon.width = 20;


				var IDtext = document.createElement("span");
				IDtext.innerHTML = `#${element.ID}: `;
				IDtext.setAttribute("b-pb86f05ye5", "")
				IDtext.classList.add("issues-table-content", "issues-issue-id")
				icon.append(IDtext);

				var TitleText = document.createElement("span");
				TitleText.innerHTML = element.DisplayText;
				TitleText.setAttribute("b-pb86f05ye5", "")
				TitleText.classList.add("issues-table-content", "issues-issue-title")

				var DateNum = document.createElement("span");
				DateNum.innerHTML = element.CreationDate;
				DateNum.setAttribute("b-pb86f05ye5", "")
				DateNum.classList.add("issues-table-content", "issues-issue-date")

				container.append(icon, IDtext,TitleText, DateNum);
				container.setAttribute("b-pb86f05ye5", "")
				document.getElementById("issues-table-content-container").appendChild(container);
				container.onclick = function () {
					window.location.href = `/Issues/Issue?IssueID=${element.GUID}`;
				};
			})
		}

	} else if (newselection.id == "Issues_New") {

		var subhead = document.createElement('h5');
		subhead.innerHTML ="Please provide a 6 digit asset tag and a room number (eg. 105, 314, G10)"
		var titletext = document.createElement("div");
		titletext.innerHTML = "New Issue";
		titletext.setAttribute("b-pb86f05ye5", "")
		titletext.style.fontSize = "32px";
		titletext.append(document.createElement("br"), subhead, document.createElement("br"))
		titletext.classList.add("issues-table-content");

		var assettagholder = document.createElement("span");
		assettagholder.innerHTML = "Asset Tag: "
		assettagholder.setAttribute("b-pb86f05ye5", "")

		var assettaginput = document.createElement("input");
		assettaginput.type = "number";
		assettaginput.minlength = "6";
		assettaginput.maxlength = "6";
		assettagholder.append(assettaginput, document.createElement("span").innerHTML = "   ");
		assettagholder.classList.add("issues-table-content");



		var roomnumholder = document.createElement('span');
		roomnumholder.innerHTML = "Room: "
		roomnumholder.setAttribute("b-pb86f05ye5", "")
		roomnumholder.classList.add("issues-table-content");
		var roomnuminput = document.createElement('input');
		roomnuminput.type = "text";
		roomnuminput.pattern = "((?:[G]|[g])+(?:[0-9]+))|(?:[0-999]+)"
		roomnumholder.append(roomnuminput);
		roomnumholder.append(document.createElement("br"));



		var issuettitlecontainer = document.createElement("span");
		issuettitlecontainer.innerHTML = "Issue Title"
		issuettitlecontainer.appendChild(document.createElement("br"));
		issuettitlecontainer.classList.add("issues-table-content");
		issuettitlecontainer.setAttribute("b-pb86f05ye5", "")
		var issueinput = document.createElement("textarea");
		issueinput.style.resize = "none";
		issueinput.rows = 1;
		issueinput.cols = 120;
		issuettitlecontainer.append(issueinput);
		issuettitlecontainer.append(document.createElement("br"));

		var issuedescriptioncont = document.createElement("span");
		issuedescriptioncont.innerHTML = "Issue Description";
		issuedescriptioncont.append(document.createElement("br"));
		issuedescriptioncont.setAttribute("b-pb86f05ye5", "")
		issuedescriptioncont.classList.add("issues-table-content");
		var issuedesc = document.createElement("textarea");
		issuedesc.style.resize = "none";
		issuedesc.rows = 5;
		issuedesc.cols = 120;
		issuedescriptioncont.append(issuedesc);

		var issuesubmitfooter = document.createElement("div");
		issuesubmitfooter.classList.add("issues-table-content");
		issuesubmitfooter.setAttribute("b-pb86f05ye5", "")
		issuesubmitfooter.width = "100%";
		issuesubmitfooter.innerHTML = "Issue will be automatically marked as OPEN.";
		issuesubmitfooter.style.marginTop = "10px";
		var submitbutton = document.createElement("button");
		submitbutton.style.float = "right";
		submitbutton.innerHTML = "Submit New Issue"
		submitbutton.type = "submit"
		submitbutton.setAttribute("b-pb86f05ye5", "")
		submitbutton.onclick = function () {
			if (roomnuminput.value == "") {
				var submittal = submitNewIssue(assettaginput.value, roomnuminput.value, issueinput.value, issuedesc.value)
			} else {
				var submittal = submitNewIssueWithRoomNum(assettaginput.value, roomnuminput.value, issueinput.value, issuedesc.value)
			}
			if (submittal == false) {
				alert("Invalid Issue Settings!\nFields must not be blank!\nAsset Tag Must be 6 Digits Long!");
			} else {
			}
		};
		issuesubmitfooter.append(submitbutton);


		document.getElementById("issues-table-content-container").append(titletext, assettagholder, roomnumholder, issuettitlecontainer, issuedescriptioncont, issuesubmitfooter);
	}
}

