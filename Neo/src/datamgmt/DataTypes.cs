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
        public DateTime CREATIONTIME;

        public Issue (ulong Id, string Guid, string Status,
            int AssetTag, string DisplayText, string Description,
            string UserGuid, DateTime CreationDate, DateTime CreationTime):base()
        {
            this.ID = Id;
            this.GUID = Guid;
            this.STATUS = Status;
            this.ASSETTAG = AssetTag;
            this.DISPLAYTEXT = DisplayText;
            this.DESCRIPTION = Description;
            this.USERGUID = UserGuid;
            this.CREATIONDATE = CreationDate;
            this.CREATIONTIME = CreationTime;
        }
    }
    public class Device : DataType
	{

    }
    public class UserProfile : DataType
	{
        public string Email;
        public string GUID;
        public UserProfile(string email, string GUID)
        {
            this.Email = email;
            this.GUID = GUID;
        }
    }
    public class Settings : DataType
	{

    }
    public class Comment : DataType
	{

    }
}
