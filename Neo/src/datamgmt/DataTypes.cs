using CompuTrack;
using System.Diagnostics.CodeAnalysis;

namespace CompuTrack
{
    public class DataType
    {

    }
}
namespace CompuTrack.DataTypes
{
	public class Issue : DataType
    {
        public ulong ID;
        public string GUID;
        public string STATUS;
        public int ASSETTAG;
        public string DISPLAYTEXT;
        public string DESCRIPTION;
        public string USERGUID;
        public DateTime CREATIONDATE;

        public Issue (ulong Id, string Guid, string Status,
            int AssetTag, string DisplayText, string Description,
            string UserGuid, DateTime CreationDate):base()
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
    }
    public class Device : DataType
	{

    }
    public class IssueAssignment : DataType
    {
        public string IssueGUID { get; set; }
        public string AssigneeGUID { get; set; }
        public bool IsForced { get; set; }

        public IssueAssignment(string issueGUID, string assigneeGUID, bool isForced)
        {
            this.IssueGUID = issueGUID;
            this.AssigneeGUID = assigneeGUID;
            this.IsForced = isForced;
        }
        public IssueAssignment(string issueGUID, string assigneeGUID)
        {
            this.IssueGUID = issueGUID;
            this.AssigneeGUID = assigneeGUID;
        }
    }
    public class UserProfile : DataType
	{
        public string Email;
        public string GUID;
        public bool isHelpDesk;
        public bool isSysAdmin;
        public UserProfile(string email, string GUID, bool isHelpDesk, bool isSysAdmin)
        {
            this.Email = email;
            this.GUID = GUID;
            this.isHelpDesk = isHelpDesk;
            this.isSysAdmin = isSysAdmin;
        }
    }
    public class Settings : DataType
	{

    }
    public class Comment : DataType
	{

    }
}
