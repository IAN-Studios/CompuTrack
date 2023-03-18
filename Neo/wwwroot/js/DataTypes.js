class UserProfile {
	constructor(email, guid, isHelpDesk, isAdmin) {
		this.Email = email;
		this.GUID = guid;
		this.isHelpDesk = isHelpDesk;
		this.isAdmin = isAdmin;
	}
}
class Issue {
	constructor(id, guid, status, assettag, displaytext, description, userguid, creationdate) {
		this.ID = id;
		this.GUID = guid;
		this.Status = status;
		this.AssetTag = assettag;
		this.DisplayText = displaytext;
		this.Description = description;
		this.UserGUID = userguid;
		this.CreationDate = creationdate;
	}
}