namespace CompuTrack.DataTypes
{
	public class UserProfile : DataType
	{
		public string Email { get; set; }
		public string GUID { get; set; }
		public bool isHelpDesk { get; set; }
		public bool isSysAdmin { get; set; }
		public UserProfile(string Email, string GUID, bool isHelpDesk, bool isSysAdmin)
		{
			this.Email = Email;
			this.GUID = GUID;
			this.isHelpDesk = isHelpDesk;
			this.isSysAdmin = isSysAdmin;
		}
	}
}
