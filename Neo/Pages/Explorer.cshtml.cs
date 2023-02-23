using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.JSInterop;

namespace CompuTrackNeo.Pages
{
    public class ExplorerModel : PageModel
    {
        public void OnGet()
        {
        }
    }


	namespace Explorer
	{
		public class Templates
		{
			public static NavItem[] ExplorerNavPanelList = new NavItem[] {
			new NavItem("Overview"),
				new NavItem(true, "Overview", "OVERVIEW"),
				new NavItem("My Issues", "MYISSUES"),
				new NavItem("Settings", "SETTINGS"),

			new NavItem("Manage"),
				new NavItem("Devices", "DEVICES"),
				new NavItem("Issues", "ISSUES"),
				new NavItem("Threads", "THREADS"),
				new NavItem("Export", "EXPORT")
			};
		}

		public class NavItem
		{
			public string DisplayText;
			public string id;
			public bool selected;
			public string IconPath;
			public bool seperator;

			public NavItem(string DisplayText, string ID, string IconPath)
			{
				this.selected = false;
				this.DisplayText = DisplayText;
				this.id = ID;
				this.IconPath = IconPath;
				this.seperator = false;
			}
			public NavItem(bool selected, string DisplayText, string ID, string IconPath)
			{
				this.selected = selected;
				this.DisplayText = DisplayText;
				this.id = ID;
				this.IconPath = IconPath;
				this.seperator = false;
			}
			public NavItem(bool selected, string DisplayText, string ID)
			{
				this.selected = selected;
				this.DisplayText = DisplayText;
				this.id = ID;
				this.IconPath = null;
				this.seperator = false;
			}
			public NavItem(string DisplayText, string ID)
			{
				this.selected = false;
				this.DisplayText = DisplayText;
				this.id = ID;
				this.IconPath = null;
				this.seperator = false;
			}
			public NavItem(string DisplayText)
			{
				this.selected = false;
				this.DisplayText = DisplayText;
				this.id = null;
				this.IconPath = null;
				this.seperator = true;
			}
		}
	}
}


