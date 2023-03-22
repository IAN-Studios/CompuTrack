using System;
using System.Diagnostics.CodeAnalysis;
using CompuTrack.DataTypes;
using CompuTrack.src.datamgmt;

namespace CompuTrack.System
{
	public class SysVariable
	{
		public string Name { get; set; }
		public string Status { get; set; }
		 
		[AllowNull]
		public dynamic Value { get; set; }

		[AllowNull]
		public dynamic[] Values { get; set; }


		public SysVariable(string Name, string Status) {
			this.Name = Name;
			this.Status = Status;
		}
		public SysVariable(string Name, string Status, dynamic Value)
		{
			this.Name = Name;
			this.Status = Status;
			this.Value = Value;
		}
		public SysVariable(string Name, string Status, dynamic[] Values)
		{
			this.Name = Name;
			this.Status = Status;
			this.Values = Values;
		}
	}
	public static class VARLIST
	{
		public static SysVariable[] Variables = new SysVariable[]
		{
			new SysVariable("CompuTrack.Helpdesk.HelpDeskUserList", "STABLE"),
			new SysVariable("CompuTrack.Helpdesk.IssueAssignments", "STABLE"),
			new SysVariable("CompuTrack.Core.UserGUIDSystem", "STABLE"),
			new SysVariable("CompuTrack.Core.System.SysAdminList", "STABLE"),
			new SysVariable("CompuTrack.Easter","OFFLINE")

		};
	}
}
