class UserProfile {
	constructor(email, guid) {
		this.Email = email;
		this.GUID = guid;
	}
}
class Issue {
	constructor(id, guid, status, assettag, displaytext, description, userguid, creationdate, creationtime) {
		this.ID = id;
		this.GUID = guid;
		this.Status = status;
		this.AssetTag = assettag;
		this.DisplayText = displaytext;
		this.Description = description;
		this.UserGUID = userguid;
		this.CreationDate = creationdate;
		this.CreationTime = creationtime;
	}
}

