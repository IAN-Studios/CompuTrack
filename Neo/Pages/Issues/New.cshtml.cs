using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Runtime.CompilerServices;
using CompuTrack.src.datamgmt;
using System.Xml;

namespace CompuTrack.Pages.Issues
{
    public class NewModel : PageModel
    {
        public void OnGet()
        {
			
			if (User.Identity == null)
			{
				Response.StatusCode = 401;
				return;
			}
            if ((Request.Query["IssueData.ASSETTAG"].ToArray().Length == 0) || 
				(Request.Query["IssueData.DISPLAYTEXT"].ToArray().Length == 0) || (Request.Query["IssueData.DESCRIPTION"].ToArray().Length == 0))
			{
				Response.StatusCode = 400;
				return;
			}

			XmlDocument Profile = dbman.FetchData("DB1", "SELECT UserPrinciples.UserEmail, UserPrinciples.UserGUID, UserPrinciples.Helpdesk, UserPrinciples.Sysadmin\nFROM UserPrinciples\nWHERE(([UserPrinciples].[UserEmail]='" + User.Identity?.Name + "'));", 9, "USERPROFILE");

			Guid GUID = Guid.NewGuid();
            string STATUS = "OPEN";
			string ASSETTAG = Request.Query["IssueData.ASSETTAG"];
			string DISPLAYTEXT = Request.Query["IssueData.DISPLAYTEXT"];
			string DESCRIPTION = Request.Query["IssueData.DESCRIPTION"];
            string USERGUID = Profile.FirstChild.ChildNodes[1].InnerText;
			DateTime CreationDateTime = DateTime.Now;

			dbman.CreateNewIssue(GUID.ToString(), STATUS, int.Parse(ASSETTAG), DISPLAYTEXT, DESCRIPTION, USERGUID, CreationDateTime);
			Response.StatusCode = 201;
		}
    }
}