using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

using CompuTrack.src.datamgmt;
using System.Xml;
using CompuTrack.DataTypes;
using System.Text;
using Microsoft.JSInterop;

namespace CompuTrack.Pages
{
	public class IssuesModel : PageModel
    {
        public void OnGet()
        {
            StringWriter sw = new StringWriter();
            XmlWriter xw = XmlWriter.Create(sw);
            dbman.FetchData("DB1", "SELECT Issues.*\nFROM Issues;", 9, "ISSUELIST").WriteContentTo(xw);
            xw.Close();
        }
    }
}
