using System.Diagnostics.CodeAnalysis;

namespace CompuTrack.DataTypes 
{
	[Serializable]
	public class Issue : DataType
	{
			[AllowNull]
			public ulong ID { get; set; }
		public string GUID { get; set; }
		public string STATUS { get; set; }
		public int ASSETTAG { get; set; }
			[AllowNull]
			public int ROOMNUM { get; set; }
		public string DISPLAYTEXT { get; set; }
		public string DESCRIPTION { get; set; }
		public string USERGUID { get; set; }
		public DateTime CREATIONDATE { get; set; }
			[AllowNull]
			public string ASSIGNEEGUID { get; set; }
			[AllowNull]
			public bool ASSIGNMENTFORCED { get; set; }



		// Overloads with ID
		public Issue(ulong Id, string Guid, string Status,
			int AssetTag, string DisplayText, string Description,
			string UserGuid, DateTime CreationDate) : base()
		{
			this.ID = Id;
			this.GUID = Guid;
			this.STATUS = Status;
			this.ASSETTAG = AssetTag;
			this.DISPLAYTEXT = DisplayText;
			this.DESCRIPTION = Description;
			this.USERGUID = UserGuid;
			this.CREATIONDATE = CreationDate;
		}
		public Issue(ulong Id,string Guid, string Status,
			int AssetTag, string DisplayText, string Description,
			string UserGuid, DateTime CreationDate, string AssigneeGUID, bool ForceAssignment) : base()
		{
			this.ID= Id;
			this.GUID = Guid;
			this.STATUS = Status;
			this.ASSETTAG = AssetTag;
			this.DISPLAYTEXT = DisplayText;
			this.DESCRIPTION = Description;
			this.USERGUID = UserGuid;
			this.CREATIONDATE = CreationDate;
			this.ASSIGNEEGUID = AssigneeGUID;
			this.ASSIGNMENTFORCED = ForceAssignment;
		}
		public Issue(ulong Id, string Guid, string Status,
			int AssetTag, string DisplayText, string Description,
			string UserGuid, DateTime CreationDate, string AssigneeGUID, bool ForceAssignment, int RoomNumber) : base()
		{
			this.ID = Id;
			this.GUID = Guid;
			this.STATUS = Status;
			this.ASSETTAG = AssetTag;
			this.DISPLAYTEXT = DisplayText;
			this.DESCRIPTION = Description;
			this.USERGUID = UserGuid;
			this.CREATIONDATE = CreationDate;
			this.ASSIGNEEGUID = AssigneeGUID;
			this.ASSIGNMENTFORCED = ForceAssignment;
			this.ROOMNUM = RoomNumber;
		}
		public Issue(ulong Id, string Guid, string Status,
			int AssetTag, string DisplayText, string Description,
			string UserGuid, DateTime CreationDate, int RoomNumber) : base()
		{
			this.ID = Id;
			this.GUID = Guid;
			this.STATUS = Status;
			this.ASSETTAG = AssetTag;
			this.DISPLAYTEXT = DisplayText;
			this.DESCRIPTION = Description;
			this.USERGUID = UserGuid;
			this.CREATIONDATE = CreationDate;
			this.ROOMNUM = RoomNumber;
		}














		// ID-Less Overloads
		public Issue( string Guid, string Status,
			int AssetTag, string DisplayText, string Description,
			string UserGuid, DateTime CreationDate) : base()
		{
			this.GUID = Guid;
			this.STATUS = Status;
			this.ASSETTAG = AssetTag;
			this.DISPLAYTEXT = DisplayText;
			this.DESCRIPTION = Description;
			this.USERGUID = UserGuid;
			this.CREATIONDATE = CreationDate;
		}
		public Issue(string Guid, string Status,
			int AssetTag, string DisplayText, string Description,
			string UserGuid, DateTime CreationDate, int RoomNumber) : base()
		{
			this.GUID = Guid;
			this.STATUS = Status;
			this.ASSETTAG = AssetTag;
			this.DISPLAYTEXT = DisplayText;
			this.DESCRIPTION = Description;
			this.USERGUID = UserGuid;
			this.CREATIONDATE = CreationDate;
			this.ROOMNUM = RoomNumber;
		}
		public Issue(string Guid, string Status,
			int AssetTag, string DisplayText, string Description,
			string UserGuid, DateTime CreationDate, string AssigneeGUID, bool ForceAssignment) : base()
		{
			this.GUID = Guid;
			this.STATUS = Status;
			this.ASSETTAG = AssetTag;
			this.DISPLAYTEXT = DisplayText;
			this.DESCRIPTION = Description;
			this.USERGUID = UserGuid;
			this.CREATIONDATE = CreationDate;
			this.ASSIGNEEGUID = AssigneeGUID;
			this.ASSIGNMENTFORCED = ForceAssignment;
		}
		public Issue(string Guid, string Status,
			int AssetTag, string DisplayText, string Description,
			string UserGuid, DateTime CreationDate, string AssigneeGUID, bool ForceAssignment, int RoomNumber) : base()
		{
			this.GUID = Guid;
			this.STATUS = Status;
			this.ASSETTAG = AssetTag;
			this.DISPLAYTEXT = DisplayText;
			this.DESCRIPTION = Description;
			this.USERGUID = UserGuid;
			this.CREATIONDATE = CreationDate;
			this.ASSIGNEEGUID = AssigneeGUID;
			this.ASSIGNMENTFORCED = ForceAssignment;
			this.ROOMNUM = RoomNumber;
		}
	}
}
