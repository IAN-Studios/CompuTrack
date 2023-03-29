using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.NetworkInformation;
using System.Text;

using CompuTrack;
using CompuTrack.DataTypes;
using System.Text.Json;

namespace CompuTrack.Pages
{
    public class EndpointModel : PageModel
    {
        public IActionResult OnPostUpdateIssue(string ID, string GUID, string STATUS, string ASSETTAG, string DISPLAYTEXT, string DESCRIPTION, string USERGUID, string CREATIONDATE, string ASSIGNEEGUID, bool FORCEASSIGNMENT, int ROOMNUM)
        {
            Server.app.Logger.LogInformation($"{ID}, {GUID}, {STATUS}, {ASSETTAG}, {DISPLAYTEXT}, {DESCRIPTION}, {USERGUID}, {CREATIONDATE}");
            Issue resp;
            try
            {
                resp = new Issue((ulong)int.Parse(ID), GUID, STATUS, int.Parse((string)ASSETTAG), DISPLAYTEXT, DESCRIPTION, USERGUID, DateTime.Parse(CREATIONDATE));
			} catch (Exception e)
            {
				resp = new Issue((ulong)int.Parse("0"), "TEMP", "TEMP", int.Parse((string)"0"), "TEMP", "TEMP", "TEMP", DateTime.Now);
				Console.WriteLine(e.ToString());
            }
            return new JsonResult(resp);
        }
        public IActionResult OnPostCreateIssue(string GUID, string STATUS, string ASSETTAG, string DISPLAYTEXT, string DESCRIPTION, string USERGUID, string CREATIONDATE, int ROOMNUM)
        {
			Issue resp = new Issue(GUID, STATUS, int.Parse((string)ASSETTAG), DISPLAYTEXT, DESCRIPTION, USERGUID, DateTime.Parse(CREATIONDATE));
            return new JsonResult(resp);
		}
    }
}
