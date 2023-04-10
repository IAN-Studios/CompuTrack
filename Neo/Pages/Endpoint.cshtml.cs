using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.NetworkInformation;
using System.Text;

using CompuTrack;
using CompuTrack.DataTypes;
using System.Text.Json;
using Azure;
using System;
using CompuTrack.src.datamgmt;
using System.Reflection;

namespace CompuTrack.Pages
{
    public class EndpointModel : PageModel
    {
        // Issue Update System
        public IActionResult OnPostUpdateIssue(string IssueGUID, string STATUS, string AssigneeGUID)
        {
            if (AssigneeGUID == null) AssigneeGUID = string.Empty;

            Console.WriteLine($"{IssueGUID} {STATUS} {AssigneeGUID}");

            dbman.Post.UpdateIssue( IssueGUID, STATUS, AssigneeGUID );
            return new JsonResult(ServerResponse.Templates.OK);
        } 




        // Comment Creation/Deletion System
        public IActionResult OnPostCreateComment(string IssueGUID, string OwnerGUID, string Content) { 
            try
            {
                dbman.Insert.Comment_New(IssueGUID, OwnerGUID, Content);
                return new JsonResult(ServerResponse.Templates.ACCEPTED);
            } catch
            {
                return new JsonResult(ServerResponse.Templates.ERROR);
                throw new ArgumentNullException();
            }
        }
        
        
        
        
        /* 
         *  Issue Creation Overloads for client-called functions.
         */
        public IActionResult OnPostCreateIssue_wRoomNum(string STATUS, int ASSETTAG, string DISPLAYTEXT, string DESCRIPTION, string USERGUID, string ROOMNUM) 
        {
			string GUID = Guid.NewGuid().ToString();
            DateTime CREATIONDATE = DateTime.Now;

			dbman.Insert.Issue_New_withRoomNum(GUID, STATUS, ASSETTAG, DISPLAYTEXT, DESCRIPTION, USERGUID, CREATIONDATE, ROOMNUM);
            return new JsonResult(ServerResponse.Templates.ACCEPTED);
        }
        public IActionResult OnPostCreateIssue(string STATUS, int ASSETTAG, string DISPLAYTEXT, string DESCRIPTION, string USERGUID) 
        {
            string GUID = Guid.NewGuid().ToString();
			DateTime CREATIONDATE = DateTime.Now;

			dbman.Insert.Issue_New(GUID, STATUS, ASSETTAG, DISPLAYTEXT, DESCRIPTION, USERGUID, CREATIONDATE);
			return new JsonResult(ServerResponse.Templates.ACCEPTED);
        }
    }
}
